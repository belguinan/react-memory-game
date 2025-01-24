import {useEffect, useState, useMemo, lazy, Suspense} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { generateCards, formatTime } from '@/helpers/helpers.js';
import { useNavigate } from 'react-router-dom';
import { useGameTimer } from '@/hooks/useGameTimer.js'

import { 
    cardUpdatedAction,
    setGamePausedAction,
    resetGameAction,
    setGameStartedAction
} from "@/helpers/actions.js"

const FlipCard = lazy(() => import("@/components/FlipCard"))
const Settings = lazy(() => import("@/components/Settings"))
const PauseOverlay = lazy(() => import("@/components/PauseOverlay"))
const VictoryModal = lazy(() => import("@/components/VictoryModal"))
const GameStats = lazy(() => import("@/components/GameStats"))

export default function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cards = useSelector(state => state.cards);
    const settings = useSelector(state => state.settings);
    const gameStartTime = useSelector(state => state.game.startTime);
    const isGameStarted = useSelector(state => state.game.isStarted);
    const isPaused = useSelector(state => state.game.isPaused);
    const activeSettings = useSelector(state => state.game.gameSettings || state.settings);

    const [showVictoryModal, setShowVictoryModal] = useState(false);
    const [showSettings, setShowSettings] = useState(true);
    const [hasSavedGame, setHasSavedGame] = useState(false);
    const [savedGameStats, setSavedGameStats] = useState(null);
    const [_, setGameSettings] = useState(settings);

    useGameTimer({
        isGameStarted,
        showSettings,
        isPaused,
        gameStartTime
    });

    const handleGameSave = (name, stats) => {
        const gameResult = {
            name,
            date: new Date().toISOString(),
            cardCount: activeSettings.cardCount,
            steps: stats.steps,
            time: stats.elapsedTime
        };
        
        const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
        history.push(gameResult);
        localStorage.setItem('gameHistory', JSON.stringify(history));
        localStorage.removeItem('gameState');
        setHasSavedGame(false);
        setShowSettings(true);
        
        navigate('/history');
    };
    
    const handleStartNewGame = () => {
        dispatch(resetGameAction());
        const newCards = generateCards(settings.cardCount);
        dispatch(cardUpdatedAction(newCards));
        localStorage.removeItem('gameState');
        setShowVictoryModal(false);
        setHasSavedGame(false);
        setShowSettings(false);
        setGameSettings(settings);
        dispatch(setGameStartedAction(true));
    };

    const handleResumeGame = () => {
        try {
            const savedState = JSON.parse(localStorage.getItem('gameState'));
            if (savedState?.cards) {
                dispatch(setGameStartedAction(false));
                dispatch(cardUpdatedAction(savedState.cards));
                setShowSettings(false);
                setGameSettings(savedState?.gameSettings?.settings || savedState?.settings);
                dispatch({ type: 'LOAD_GAME_STATE', value: savedState });
                dispatch(setGamePausedAction(false));
            }
        } catch (error) {
            console.error('Error resuming game:', error);
            handleStartNewGame();
        }
    };

    useEffect(() => {
        const savedState = localStorage.getItem('gameState');
        if (!savedState) return;
    
        try {
            const parsedState = JSON.parse(savedState);
            if (parsedState.cards?.length > 0) {

                setHasSavedGame(true);
                setSavedGameStats({
                    cardCount: parsedState.cards.length,
                    matchedCards: parsedState.cards.filter(card => card.isMatched).length,
                    steps: parsedState.game.steps,
                    elapsedTime: parsedState.game.elapsedTime
                });
    
                if (cards.every(card => card.isMatched)) {
                    dispatch(setGameStartedAction(false));
                    setHasSavedGame(false);
                    setTimeout(() => setShowVictoryModal(true), 1000);
                }
            }
        } catch (error) {
            console.error('Error parsing saved game:', error);
            setHasSavedGame(false);
            setSavedGameStats(null);
        }
    }, [dispatch, cards]);
    
    useEffect(() => {
        if (!isGameStarted || showSettings || showVictoryModal) return;

        const handleVisibilityChange = () => {
            dispatch(setGamePausedAction(document.hidden));
        };

        const handleMouseLeave = () => {
            if (!showSettings && !showVictoryModal) {
                dispatch(setGamePausedAction(true));
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isGameStarted, showSettings, showVictoryModal, dispatch]);

    if (showSettings) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        {hasSavedGame ? (
                            <div className="card border-0 shadow-sm mb-4 rounded-4 fade-in-delay-1">
                                <div className="card-body p-4 rounded-4">
                                    <h3 className="card-title mb-4 fw-bold">
                                        <i className="bi bi-controller me-2"></i>
                                        Welcome Back!
                                    </h3>
                                    <p className="text-muted mb-4">
                                        You have an unfinished game. Would you like to continue where you left off?
                                    </p>
                                    <div className="d-flex gap-3 align-items-center mb-4">
                                        <div className="text-bg-secondary p-3 rounded-3">
                                            <i className="bi bi-grid-3x3-gap me-2"></i>
                                            <span className="fw-semibold">{savedGameStats.cardCount} Cards</span>
                                        </div>
                                        <div className="text-bg-secondary p-3 rounded-3">
                                            <i className="bi bi-check2-square me-2"></i>
                                            <span className="fw-semibold">{savedGameStats.matchedCards} Matched</span>
                                        </div>
                                        <div className="text-bg-secondary p-3 rounded-3">
                                            <i className="bi bi-lightning me-2"></i>
                                            <span className="fw-semibold">{savedGameStats.steps} Steps</span>
                                        </div>
                                        <div className="text-bg-secondary p-3 rounded-3">
                                            <i className="bi bi-clock me-2"></i>
                                            <span className="fw-semibold">{formatTime(savedGameStats.elapsedTime)}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-end">
                                        <button
                                            className="btn btn-primary px-4 py-2 fw-semibold"
                                            onClick={handleResumeGame}
                                        >
                                            Resume Game
                                        </button>
                                        <button
                                            className="btn btn-outline-primary px-4 py-2 fw-semibold"
                                            onClick={handleStartNewGame}
                                        >
                                            Start New Game
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="card border-0 shadow-sm mb-4 rounded-4">
                                    <div className="card-body p-4 rounded-4">
                                        <h3 className="card-title mb-4 fw-bold">
                                            <i className="bi bi-controller me-2"></i>
                                            Welcome to Memory Game!
                                        </h3>
                                        <p className="text-muted mb-4">
                                            Choose your game settings below and start playing!
                                        </p>
                                    </div>
                                </div>
    
                                <Settings />
                                
                                <div className="d-flex justify-content-end mt-4">
                                    <button
                                        className="btn btn-primary px-4 py-2 fw-semibold"
                                        onClick={handleStartNewGame}
                                    >
                                        Start New Game
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container h-100">
            <PauseOverlay isVisible={isPaused}/>

            <div className="row mb-3">
                <div className="col-12">
                    <GameStats />
                </div>
            </div>

            <div className="row">
                <div className="col-12 fade-in-delay-2">
                    <div
                        className={`align-items-center rounded-4 fade-in-delay-3 card-grid ${
                            activeSettings.cardCount === 4 ? 'card-grid-4' :
                            activeSettings.cardCount === 16 ? 'card-grid-16' :
                            'card-grid-32'
                        }`}
                    >
                        {cards.map((card, index) => <FlipCard
                                style={{
                                    opacity: 0,
                                    animation: `fadeInUp 1s ease-out ${index/10}s forwards`
                                }}
                                key={card.id}
                                card={card}
                            />
                        )}
                    </div>
                </div>
            </div>

            {showVictoryModal && <VictoryModal
                stats={savedGameStats}
                onSave={handleGameSave}
                onClose={() => {
                    setShowVictoryModal(false);
                    setShowSettings(true);
                    localStorage.removeItem('gameState');
                    setHasSavedGame(false);
                }}
            />}
        </div>
    );
}