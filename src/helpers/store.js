import { createStore } from "redux"

const initialState = {
    cards: [],
    isLocked: false,
    game: {
        flippedCardIds: [],
        matchedCards: [],
        isStarted: false,
        currentScore: 0,
        startTime: null,
        steps: 0,
        elapsedTime: 0,
        gameSettings: null,
        isPaused: false,
        pauseStartTime: null,
        accumulatedPauseTime: 0
    },
    settings: {
        cardCount: 16,
        background: 'default',
        hasPreviousGame: false
    }
}

const loadState = () => {
    try {
        const serializedGameState = localStorage.getItem('gameState');
        const serializedSettings = localStorage.getItem('globalSettings');
        
        let savedState = undefined;
        
        if (serializedGameState) {
            savedState = JSON.parse(serializedGameState);
            
            if (savedState.game && savedState.game.elapsedTime) {
                savedState.game.startTime = Date.now() - (savedState.game.elapsedTime * 1000);
                savedState.game.accumulatedPauseTime = 0;
                savedState.game.pauseStartTime = null;
            }
        }
        
        const savedSettings = serializedSettings ? JSON.parse(serializedSettings) : undefined;
        
        return savedState ? {
            ...savedState,
            settings: savedSettings || savedState.settings
        } : {
            ...initialState,
            settings: savedSettings || initialState.settings
        };
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedGameState = JSON.stringify({
            cards: state.cards,
            game: {
                ...state.game,
                elapsedTime: state.game.elapsedTime,
                startTime: state.game.startTime,
                matchedCards: state.game.matchedCards,
                gameSettings: state.game.gameSettings
            },
            settings: state.settings
        })

        localStorage.setItem('gameState', serializedGameState);
        
        const serializedSettings = JSON.stringify(state.settings);
        localStorage.setItem('globalSettings', serializedSettings);
    } catch (err) {
        console.log(err)
    }
};

const reducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
        
        case 'CARD_UPDATED':
            newState = {
                ...state,
                cards: action.value,
                game: action.value.length === 0 ? 
                    { ...initialState.game } : 
                    state.game
            };
            break;

        case 'GAME_LOCKED':
            newState = {...state, isLocked: action.value};
            break;

        case 'UPDATE_FLIPPED_CARDS':
            newState = {
                ...state,
                game: {
                    ...state.game,
                    flippedCardIds: action.value,
                    steps: action.value.length === 2 ? 
                        state.game.steps : 
                        state.game.steps + 1
                }
            };
            break;

        case 'SET_GAME_PAUSED':
                const now = Date.now();
                if (action.value) { // Pausing
                    newState = {
                        ...state,
                        game: {
                            ...state.game,
                            isPaused: true,
                            pauseStartTime: now
                        }
                    };
                } else { // Unpausing
                    const pauseDuration = state.game.pauseStartTime ? now - state.game.pauseStartTime : 0;
                    newState = {
                        ...state,
                        game: {
                            ...state.game,
                            isPaused: false,
                            pauseStartTime: null,
                            accumulatedPauseTime: state.game.accumulatedPauseTime + pauseDuration,
                            startTime: state.game.startTime // Maintain the original start time
                        }
                    };
                }
                break;

        case 'SET_GAME_STARTED':
            newState = {
                ...state,
                game: {
                    ...state.game,
                    isStarted: action.value,
                    startTime: action.value ? Date.now() : null,
                    accumulatedPauseTime: 0,
                    elapsedTime: 0,
                    gameSettings: action.value ? {...state.settings} : state.game.gameSettings
                }
            };
            break;

        case 'UPDATE_ELAPSED_TIME':
            if (!state.game.startTime) {
                newState = state;
            } else {
                const currentPauseTime = state.game.pauseStartTime ? 
                    Date.now() - state.game.pauseStartTime : 0;
                const totalPauseTime = state.game.accumulatedPauseTime + 
                    (state.game.isPaused ? currentPauseTime : 0);
                    
                const currentElapsed = Math.floor(
                    (Date.now() - state.game.startTime - totalPauseTime) / 1000
                );
                
                newState = {
                    ...state,
                    game: {
                        ...state.game,
                        elapsedTime: currentElapsed
                    }
                };
            }
            break;

        case 'UPDATE_SETTINGS':
            newState = {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.value
                },
                game: {
                    ...state.game,
                    gameSettings: state.game.isStarted ? 
                        state.game.gameSettings : 
                        {...state.settings, ...action.value}
                }
            };
            break;

        case 'LOAD_GAME_STATE':
            newState = {
                ...state,
                ...action.value,
                game: {
                    ...action.value.game,
                    startTime: Date.now() - (action.value.game.elapsedTime * 1000),
                    accumulatedPauseTime: 0,
                    pauseStartTime: null,
                    isStarted: true,
                    gameSettings: action.value.game.gameSettings || action.value.settings
                },
                settings: state.settings
            };
            break;

        case 'RESET_GAME':
            newState = {
                ...state,
                cards: [],
                isLocked: false,
                game: {
                    ...initialState.game,
                    gameSettings: {...state.settings}
                }
            };
            break;

        default:
            return state;
    }
    
    saveState(newState);
    return newState;
};

const storedState = loadState();
const store = createStore(reducer, storedState || initialState);

export default store;