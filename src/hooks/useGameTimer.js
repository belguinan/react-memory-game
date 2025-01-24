import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateElapsedTimeAction } from '@/helpers/actions';

export const useGameTimer = ({ isGameStarted, showSettings, isPaused }) => {
    const dispatch = useDispatch();
    const timerRef = useRef(null);
    
    const gameStartTime = useSelector(state => state.game.startTime);
    const accumulatedPauseTime = useSelector(state => state.game.accumulatedPauseTime);
    const pauseStartTime = useSelector(state => state.game.pauseStartTime);

    useEffect(() => {
        const calculateElapsedTime = () => {
            if (!gameStartTime) return 0;
            
            const currentPauseTime = pauseStartTime ? Date.now() - pauseStartTime : 0;
            const totalPauseTime = accumulatedPauseTime + (isPaused ? currentPauseTime : 0);
            
            return Math.floor((Date.now() - gameStartTime - totalPauseTime) / 1000);
        };

        if (isGameStarted && !showSettings && !isPaused) {
            timerRef.current = setInterval(() => {
                dispatch(updateElapsedTimeAction(calculateElapsedTime()));
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            
            if (isGameStarted && isPaused) {
                // Update one last time when pausing to ensure accurate display
                dispatch(updateElapsedTimeAction(calculateElapsedTime()));
            }
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isGameStarted, showSettings, isPaused, gameStartTime, accumulatedPauseTime, pauseStartTime, dispatch]);
};