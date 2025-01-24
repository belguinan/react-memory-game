import { useDispatch, useSelector } from 'react-redux';
import { updateFlippedCardsAction, gameLockedAction, cardUpdatedAction } from "@/helpers/actions.js";
import store from '@/helpers/store';

const FlipCard = ({ card, style }) => {
    const dispatch = useDispatch();
    const isLocked = useSelector(state => state.isLocked);
    const flippedCardIds = useSelector(state => state.game.flippedCardIds);
    const cards = useSelector(state => state.cards);
    const isGameStarted = useSelector(state => state.game.isStarted);

    const isFlipped = flippedCardIds.includes(card.id) || card.isMatched;
    const isDisabled = card.isMatched || isLocked;

    const handleClick = () => {
        if (isDisabled || isFlipped) return;

        if (flippedCardIds.length === 2) {
            dispatch(updateFlippedCardsAction([]));
            dispatch(gameLockedAction(false));
            return;
        }

        const newFlippedCards = [...flippedCardIds, card.id];
        dispatch(updateFlippedCardsAction(newFlippedCards));

        if (newFlippedCards.length === 2) {
            dispatch(gameLockedAction(true));
            
            const [firstId, secondId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            if (firstCard.image === secondCard.image) {
                setTimeout(() => {
                    dispatch(cardUpdatedAction(
                        cards.map(c => 
                            (c.id === firstId || c.id === secondId)
                                ? { ...c, isMatched: true }
                                : c
                        )
                    ));
                    dispatch(updateFlippedCardsAction([]));
                    dispatch(gameLockedAction(false));
                }, 600);
            } else {
                setTimeout(() => {
                    dispatch(updateFlippedCardsAction([]));
                    dispatch(gameLockedAction(false));
                }, 1100);
            }
        }

        if (!isGameStarted) return;

        const gameState = {
            cards,
            game: {
                flippedCardIds: newFlippedCards,
                isStarted: true,
                startTime: Date.now(),
                steps: flippedCardIds.length,
                elapsedTime: store.getState().game.elapsedTime,
                gameSettings: store.getState().settings
            },
            settings: store.getState().settings
        };

        localStorage.setItem('gameState', JSON.stringify(gameState));
    };

    return (
        <div className="memory-card-wrapper" style={style}>
            <div 
                className={`memory-card ${isDisabled ? 'disabled' : ''} ${card.isMatched ? 'matched' : ''}`}
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
                                        <img src={card.image} className="img-fluid max-w-100px max-h-100px"/>
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
};

export default FlipCard;