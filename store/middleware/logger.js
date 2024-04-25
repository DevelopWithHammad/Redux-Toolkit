// Currying in Javascript
export const logger =  store => next => action => next(action)