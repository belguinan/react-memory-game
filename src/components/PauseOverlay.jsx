import { useDispatch } from "react-redux";
import { setGamePausedAction } from "@/helpers/actions.js";

export default function PauseOverlay({ isVisible }) {
    const dispatch = useDispatch();
    
    if (!isVisible) return null;
    
    const handleResume = () => {
        dispatch(setGamePausedAction(false));
    };
    
    return (
        <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000
            }}
        >
            <div className="card border-0 shadow-lg fade-in-delay-4">
                <div className="card-body text-center p-4">
                    <i className="bi bi-pause-circle-fill display-1 mb-3 text-primary"></i>
                    <h3 className="fw-bold mb-3">Game Paused</h3>
                    <p className="text-muted mb-4">Move your cursor back to the game to resume</p>
                    <button 
                        className="btn btn-primary px-4 py-2 fw-semibold"
                        onClick={handleResume}
                    >
                        <i className="bi bi-play-fill me-2"></i>
                        Resume Game
                    </button>
                </div>
            </div>
        </div>
    );
}