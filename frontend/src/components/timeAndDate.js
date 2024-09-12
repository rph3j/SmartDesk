import React from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import './timeAndDate.css';



/**********************************************************************************************************************************************
    class to disple only today DB records.
    In general, the functions are the same as in the general display. the data differs mainly in that it is taken only from the current date.
    Fnction comments are in the file management.js
 **********************************************************************************************************************************************
 */
class timeAndDate extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            rows: [],
            ifEmpty: false,
            now: new Date()
        };
    }

    componentDidMount() {
        this.feachData();
    }
    async feachData(){
        const res = await axios.get('http://localhost:8080/api/todayData');
        const rows = res.data;
        if(JSON.stringify(rows).length === 2){
            this.setState({ ifEmpty: true });
            this.setState({ rows });
        }else{
            this.setState({ ifEmpty: false });
            this.setState({ rows });
        }
    }

    timeDisplay(ms) { 
        let s = Math.floor(ms / 1000);
        let min = Math.floor(s / 60);
        let h = Math.floor(min / 60);

        s = s % 60;
        min = min % 60;

        return h + ":" + min + ":" + s + " h.";
    }

    dateDisplay(d,mode){
        if(mode){
            return dayjs(d).format("DD.MM.YYYY");
        }else{
            return dayjs(d).format("HH:mm");
        }
    }
    
    tableDisplay(){
        if(this.state.ifEmpty){
            return  (
                'Brak danych z dnia' 
                )
        }else{
            return (
                <table>
                    <thead>
                        <tr><td>Godzina</td><td>Czas spędzony przed biurkiem</td></tr>
                    </thead>
                    <tbody>
                        {this.state.rows.map(row => (
                            <tr><td> {this.dateDisplay(row.date,false)} </td><td> {this.timeDisplay(row.msTime)} </td></tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    }
    
    leadingZero() {
        const month = this.state.now.getMonth()+1
        if(month < 10){
            return "0" + month;
        }else{
            return month;
        }   
    }

    render() {

        return(
            <div className='generalBG timeAndDate'>
                <div className='tableDiv'>
                    Dziś: {this.state.now.getDate()}.{this.leadingZero()}.{this.state.now.getFullYear()}
                    {this.tableDisplay()}
                </div>
                <br/><br/>
                <button className="generalDownButtonStyle singleDownButton" onClick={async () => await this.feachData() }>Odśwież</button>
            </div>
        )
    }
}

export default timeAndDate;