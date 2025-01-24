export const generateCards = (cardCount) => {
    
    const pairs = cardCount / 2;
    const cards = [];
    
    for (let i = 1; i <= pairs; i++) {
        const cardPair = [
            { id: `${i}-1`, image: `/images/${i}.png`, isMatched: false },
            { id: `${i}-2`, image: `/images/${i}.png`, isMatched: false }
        ];
        cards.push(...cardPair);
    }
    
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    return cards;
}

export const formatTime = (seconds) => {
    if (seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}