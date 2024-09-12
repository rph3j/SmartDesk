import React from 'react';
import Clock from './clock.js'
import Temperature from './temperature.js'
import './main.css';

class Main extends React.Component{

render(){
    return(
        <div className='generalBG Content'>
{/*=======================================
   Every style is defined in main.css
=======================================*/}
            <Clock />
            <Temperature />
        </div>
    )
}

}

export default Main;