import * as types from "../actions/lanes";
const initialState = {
    weather:[],
    error:''
};
export default function lanes(state = initialState, action) {
    switch (action.type) {
        case types.GET_WEATHER_SUCCESS:
            return {...state, weather:action.payload};
        case types.GET_WEATHER_ERROR:
            return {...state, error:action.error};
        default:
            return state;
    }
}