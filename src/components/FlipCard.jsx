export default function FlipCard({ card, onCardClick, isDisabled, isMatched, isFlipped, style }) {
    
    const handleClick = () => {
        if (!isDisabled && !isFlipped) {
            onCardClick();
        }
    };

    return (
        <div className="memory-card-wrapper" style={style}>
            <div 
                className={`memory-card ${isDisabled ? 'disabled' : ''} ${isMatched ? 'matched' : ''}`}
                onClick={handleClick}
            >
                <div className="card rounded-4 border-0 h-100">
                    <div className={`card-faces h-100 ${isFlipped ? 'flipped' : ''}`}>
                        <div className={`card-face h-100`}>
                            <div className="card-content h-100 w-100 p-3 shadow rounded-4">
                                {isFlipped ? 
                                    <div 
                                        className="bg-white rounded-2 h-100 w-100 d-flex align-items-center justify-content-center"
                                        style={{
                                            transform: "rotateY(180deg)",
                                            transformStyle: "preserve-3d",
                                            transitionDuration: "500ms"
                                        }}
                                    >
                                        <img src={card.image} className="img-fluid" style={{
                                            maxWidth: '200px',
                                            maxHeight: '200px',
                                        }} />
                                    </div>
                                    : 
                                    <div 
                                        className="bg-primary rounded-2 h-100 w-100"
                                        style={{
                                            transform: "rotateY(0deg)",
                                            transformStyle: "preserve-3d",
                                            transitionDuration: "500ms"
                                        }}
                                    >
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}