/**
 * 
 * @param {*} value 
 * @returns 
 */
export const cardUpdatedAction = (value) => ({type: 'CARD_UPDATED', value: value});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const gameLockedAction = (value) => ({type: 'GAME_LOCKED', value: value});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const updateFlippedCardsAction = (value) => ({type: 'UPDATE_FLIPPED_CARDS', value: value});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const setGameStartedAction = (value) => ({type: 'SET_GAME_STARTED', value: value});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const updateSettingsAction = (value) => ({type: 'UPDATE_SETTINGS', value: value});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const loadGameStateAction = (value) => ({type: 'LOAD_GAME_STATE', value: value});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const updateElapsedTimeAction = (value) => ({type: 'UPDATE_ELAPSED_TIME', value: value});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const resetGameAction = () => ({type: 'RESET_GAME'});

/**
 * 
 * @param {*} value 
 * @returns 
 */
export const setGamePausedAction = (value) => ({type: 'SET_GAME_PAUSED', value: value});
