/**
 * 
 * @param {*} action 
 * @param {*} value 
 * 
 * @returns 
 */
export const actionFactory = (action, value) => {
    return {
        type: action.toUpperCase(), 
        value
    }
}