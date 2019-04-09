import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getWeather} from '../actions/lanes';

class App extends React.Component {
    render() {
        const {getWeather,weather} = this.props;
        return (
            <div>
                <button onClick={()=>{getWeather('../../data.json')}}>天气</button>
                <div>{weather.map((item,index)=>{
                    return(<div key={index}>{item.title}</div>)
                })}</div>
            </div>
        );
    }
}
export default compose(
    connect(state => ({
        lanes: state.lanes,
        weather: state.lanes.weather,
        error: state.lanes.error
    }), {
        getWeather
    }),
)(App);