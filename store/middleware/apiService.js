import { handleError } from "../slices/productsReducer";

export const apiService = store => next => action => {
    const dispatch = store.dispatch;
    const BASE_URL = 'https://fakestoreapi.com';
    if (action.type === "api/makeCall") {
        next(action)
        const { url, onSuccess, onStart, onError } = action.payload;
        dispatch({
            type: onStart
        })
        fetch(`${BASE_URL}${url}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                dispatch({
                    type: onSuccess,
                    payload: data
                })
            }).catch((err) => {
                dispatch({
                    type: onError,
                    payload: err
                })
            })
    } else {
        next(action)
    }

}


// API creator
export const fetchData = (payload) => ({ type: "api/makeCall", payload });