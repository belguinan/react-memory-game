import { useState } from 'react';
import { formatTime } from '@/helpers/helpers.js';

const VictoryModal = ({ onSave, stats, onClose }) => {
    const [gameName, setGameName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const finalStats = {
            ...stats,
            time: stats.elapsedTime,
        };
        
        onSave(gameName.trim() || 'Guest', finalStats);
        onClose();
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{
            backgroundColor: "rgba(0,0,0, .5)",
        }}>
            <div className="modal-dialog modal-dialog-centered fade-in" style={{maxWidth: 650}}>
                <div className="modal-content border-0 rounded-4 shadow">
                    <div className="modal-body p-4">
                        <div className="text-center mb-4">
                            <i className="bi bi-trophy-fill text-warning display-1"></i>
                            <h2 className="mt-3 fw-bold">Congratulations!</h2>
                            <p className="text-muted">You've completed the memory game!</p>
                        </div>

                        <div className="d-flex gap-3 justify-content-center mb-4">
                            <div className="bg-light px-4 py-3 rounded-3">
                                <i className="bi bi-lightning me-2"></i>
                                <span className="fw-semibold">{stats.steps} Steps</span>
                            </div>
                            <div className="bg-light px-4 py-3 rounded-3">
                                <i className="bi bi-clock me-2"></i>
                                <span className="fw-semibold">{formatTime(stats.elapsedTime)}</span>
                            </div>
                            <div className="bg-light px-4 py-3 rounded-3">
                                <i className="bi bi-grid-3x3-gap me-2"></i>
                                <span className="fw-semibold">{stats.cardCount} Cards</span>
                            </div>
                            <div className="bg-light px-4 py-3 rounded-3">
                                <i className="bi bi-check2-square me-2"></i>
                                <span className="fw-semibold">{stats.matchedCards} Matched</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-tag me-2"></i>
                                    Game Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a name for this game"
                                    value={gameName}
                                    onChange={(e) => setGameName(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className="d-flex gap-2 justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary px-4 py-2 fw-semibold"
                                    onClick={onClose}
                                    data-bs-dismiss="modal"
                                >
                                    Skip
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-4 py-2 fw-semibold"
                                >
                                    Save Game
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VictoryModal;