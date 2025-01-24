import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from '@/helpers/helpers.js';
import { updateElapsedTimeAction } from '@/helpers/actions';

export default function GameStats() {
    const dispatch = useDispatch();
    const timerRef = useRef(null);
    const [displayedSteps, setDisplayedSteps] = useState(0);
    
    const elapsedTime = useSelector(state => state.game.elapsedTime);
    const steps = useSelector(state => state.game.steps);
    const isGameStarted = useSelector(state => state.game.isStarted);
    const isPaused = useSelector(state => state.game.isPaused);
    const gameStartTime = useSelector(state => state.game.startTime);
    const cardCount = useSelector(state => state.game.gameSettings?.cardCount || state.settings.cardCount);
    const matchedCards = useSelector(state => state.cards.filter(card => card.isMatched).length);

    useEffect(() => {
        const calculateElapsedTime = () => {
            if (!gameStartTime) return 0;
            return Math.floor((Date.now() - gameStartTime) / 1000);
        };

        if (isGameStarted && !isPaused) {
            timerRef.current = setInterval(() => {
                dispatch(updateElapsedTimeAction(calculateElapsedTime()));
            }, 1000);
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [dispatch, gameStartTime, isGameStarted, isPaused]);

    useEffect(() => {
        if (steps !== displayedSteps) {
            setDisplayedSteps(steps);
        }
    }, [steps]);

    return (
        <div className={`card border-0 shadow-sm rounded-3 overflow-hidden fade-in-delay-1`}>
            <div className="card-body p-0">
                <div className="d-flex justify-content-start align-items-center">
                    <div className="d-flex align-items-center w-100">
                        <div className="px-4 py-3 border-end">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-clock fs-5"></i>
                                <span className="fw-semibold">{formatTime(elapsedTime)}</span>
                            </div>
                        </div>
                        <div className="px-4 py-3 border-end">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-check2-square fs-5"></i>
                                <span className="fw-semibold">{matchedCards} Matched</span>
                            </div>
                        </div>
                        <div className={`px-4 py-3 flex-grow-1`}>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-lightning-charge fs-5"></i>
                                <div className="steps-counter">
                                    <span 
                                        className="fw-semibold"
                                        key={displayedSteps}
                                    >
                                        {displayedSteps} Steps
                                    </span>
                                    
                                    {steps > cardCount * 3 && (
                                        <small className="text-muted ms-3">
                                            (Try to match with fewer steps)
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}