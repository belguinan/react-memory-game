import { useState, useEffect } from 'react';
import { formatTime } from '@/helpers/helpers.js';

export default function History() {
    const [gameHistory, setGameHistory] = useState([]);
    const [sortedHistory, setSortedHistory] = useState([]);
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
        setGameHistory(history);
    }, []);

    useEffect(() => {

        const calculateScore = (game) => {
            const cardScore = game.cardCount * 2;
            const stepScore = 100 - game.steps;
            const timeScore = 100 - Math.min(100, game.time / 2);
            return (cardScore + stepScore + timeScore) / 3;
        };

        let sorted = [...gameHistory];
        
        switch (sortBy) {
            case 'score':
                sorted.sort((a, b) => calculateScore(b) - calculateScore(a));
                break;
            case 'time':
                sorted.sort((a, b) => a.time - b.time);
                break;
            case 'steps':
                sorted.sort((a, b) => a.steps - b.steps);
                break;
            case 'cards':
                sorted.sort((a, b) => b.cardCount - a.cardCount);
                break;
            default:
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setSortedHistory(sorted);
    }, [gameHistory, sortBy]);

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div className="card border-0 shadow-sm rounded-4 fade-in">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="card-title h4 mb-0 fw-bold">
                                    <i className="bi bi-clock-history me-3"></i>
                                    History
                                </h3>
                                
                                {sortedHistory.length > 0 &&
                                    <div className="dropdown">
                                        <button 
                                            className="btn btn-outline-primary dropdown-toggle px-3 py-2"
                                            type="button" 
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-sort-down me-2"></i>
                                            Sort by
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button 
                                                    className={`dropdown-item ${sortBy === 'date' ? 'active' : ''}`}
                                                    onClick={() => setSortBy('date')}
                                                >
                                                    Date
                                                </button>
                                            </li>
                                            <li>
                                                <button 
                                                    className={`dropdown-item ${sortBy === 'score' ? 'active' : ''}`}
                                                    onClick={() => setSortBy('score')}
                                                >
                                                    Best score
                                                </button>
                                            </li>
                                            <li>
                                                <button 
                                                    className={`dropdown-item ${sortBy === 'time' ? 'active' : ''}`}
                                                    onClick={() => setSortBy('time')}
                                                >
                                                    Time
                                                </button>
                                            </li>
                                            <li>
                                                <button 
                                                    className={`dropdown-item ${sortBy === 'steps' ? 'active' : ''}`}
                                                    onClick={() => setSortBy('steps')}
                                                >
                                                    Steps
                                                </button>
                                            </li>
                                            <li>
                                                <button 
                                                    className={`dropdown-item ${sortBy === 'cards' ? 'active' : ''}`}
                                                    onClick={() => setSortBy('cards')}
                                                >
                                                    Cards played
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>

                            {sortedHistory.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-emoji-smile display-3 text-muted mb-3"></i>
                                    <h5 className="text-muted mt-3">You currently don't have any games played yet!</h5>
                                </div>
                            ) : (
                                <table className="table table-hover align-middle mb-0 overflow-hidden rounded-3 border">
                                    <thead className="table-dark">
                                        <tr>
                                            <th className="px-3 py-2 fw-light fst-italic border-0">Name</th>
                                            <th className="px-3 py-2 fw-light fst-italic border-0 text-center">Cards</th>
                                            <th className="px-3 py-2 fw-light fst-italic border-0 text-center">Steps</th>
                                            <th className="px-3 py-2 fw-light fst-italic border-0 text-center">Duration</th>
                                            <th className="px-3 py-2 fw-light fst-italic border-0 text-end">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedHistory.map((game, index) => (
                                            <tr key={index}>
                                                <td className="px-3 py-2 border-0">
                                                    <div className="d-flex align-items-center">
                                                        {game.name ? game.name : 'Guest'}

                                                        {sortBy === 'score' && index === 0 && (
                                                            <i className="bi bi-trophy-fill text-warning ms-3"></i>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 border-0 text-center">
                                                    {game.cardCount}
                                                </td>
                                                <td className="px-3 py-2 border-0 text-center">
                                                    {game.steps}
                                                </td>
                                                <td className="px-3 py-2 border-0 text-center">
                                                    <span className="badge text-bg-success">
                                                        {formatTime(game.time)}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 border-0 text-end">
                                                    {new Date(game.date).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}