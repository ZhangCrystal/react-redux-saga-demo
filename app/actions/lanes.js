import {fetch} from 'whatwg-fetch'
export const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
export const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";
export function getWeather(url, params) {
    return (dispatch, getState) => {
        fetch(url, params)
            .then(result => {
                result.json().then(function(data){
                    dispatch({
                        type: 'GET_WEATHER_SUCCESS', payload: data,
                    });
                });
            })
            .catch(err => {
                dispatch({
                    type: 'GET_WEATHER_ERROR', error: err,
                });
            });
    };
}