import React from 'react';
import Modal from 'react-modal';
import dayjs from 'dayjs';
import axios from 'axios';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { applyPlugin } from 'jspdf-autotable'
import './management.css';

applyPlugin(JsPDF);
  
class management extends React.Component {
    constructor(probs){
      super(probs);

      this.state = {
          generalRows: [],
          showLedModal: false,
          showDBModal: false,
          ledModealLabel: 'Led Management',
          ifEmptyGeneral: false,
          isAutoMode: false
      };
      Modal.setAppElement('body');
    }  
    componentDidMount(){
        this.fetchGeneral()
    }

    // change the icon for the mode
    componentDidUpdate(){
      if(this.state.isAutoMode)
      {
          document.querySelector(".lightInfo").classList.add("Off");
          document.querySelector(".lightInfo").classList.remove("On");
          document.querySelector(".autoMode").classList.remove("ghost");
      }else{
          document.querySelector(".lightInfo").classList.add("Off");
          document.querySelector(".lightInfo").classList.remove("On");
          document.querySelector(".autoMode").classList.add("ghost");
      }
      
    }
    // fetch data from the database
    async fetchGeneral(){
        const res = await axios.get('http://localhost:8080/api/timeData');
        const rows = res.data;
        console.log(JSON.stringify(rows).length);
        if( JSON.stringify(rows).length === 2 ){
            this.setState({ generalRows: rows })
            this.setState({ ifEmptyGeneral: true })
        }else{
            this.setState({ generalRows: rows })
            this.setState({ ifEmptyGeneral: false })
        }
        //console.log(this.state.rows);
    }
/*=========================================================================
                      Features from light
=========================================================================*/ 
    async toggleLight(onORoff){
        if(!this.state.isAutoMode)
        {
          if(onORoff){
              await axios.get('http://localhost:8080/api/On');
              document.querySelector(".lightInfo").classList.add("On");
              document.querySelector(".lightInfo").classList.remove("Off");
          }else{
              await axios.get('http://localhost:8080/api/Off');
              document.querySelector(".lightInfo").classList.add("Off");
              document.querySelector(".lightInfo").classList.remove("On");
          }
        }
    }
    // RGB LED strip configuration
    async onSubmit(R,G,B){
      await axios.post('http://localhost:8080/api/RGB', { 
          Red: R,
          Green: G,
          Blue: B
        },{
          headers: {
/*=========================================================================
  Without this header, the bodyparser does not work and you will not send anything
=========================================================================*/
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
    }
/*=========================================================================
                            Showing modals
=========================================================================*/
    // modal for setting Led stip color
    toggleLedModal(){
      this.setState({ 
        showLedModal:  !this.state.showLedModal
      });
      console.log('dziala')
    };
    // modal for all db record
    toggleDBModal(){
        if(!this.state.showDBModal){
          this.fetchGeneral()
        }
        this.setState({ 
          showDBModal:  !this.state.showDBModal        
        });
      }
/*=========================================================================
                            other functions
=========================================================================*/
    // helper for displaying date
    dateDisplay(d,mode){
      if(mode){
          return dayjs(d).format("DD.MM.YYYY");
      }else{
          return dayjs(d).format("HH:mm");
      }
    }

    // helper for displaying time
    timeDisplay(ms) { 
      // floor rounds to the smallest nearest integer
      let s = Math.floor(ms / 1000);
      let min = Math.floor(s / 60);
      let h = Math.floor(min / 60);

      s = s % 60; // % the remainder of dividing two integers
      min = min % 60;

      return h + ":" + min + ":" + s + " h.";
  }

  // generating pdf report
  generatePDF(){
    const report = new JsPDF();
    let text = 'Time Report';
    var pageWidth = report.internal.pageSize.width || report.internal.pageSize.getWidth();
    report.setFontSize(22);
    report.text(text, pageWidth / 2, 20, {align: 'center'});
    autoTable(report, {
      startY: 25,
      theme: 'grid',
      styles: { halign: 'center' },
      head: [['Data','Czas spedzony przed biurkiem']],
      body: this.state.generalRows.map(row => (
        [[ this.dateDisplay(row.date,true) ], [this.timeDisplay(row.msTime)]]
      ))
    });
    console.log(this.state.generalRows);
    report.save('report.pdf');
  }

  // clear db records 
  async clearTable(){
    await axios.delete('http://localhost:8080/api/clearTable');
    this.toggleDBModal();
  }

  // DB record display as table
  tableDisplayGeneral(){
    if(this.state.ifEmptyGeneral){
      return  (
          'Brak danych' 
          )
    }else{
      return (
        <table>
          <thead>
              <tr><td>Data</td><td>Czas spędzony przed biurkiem</td></tr>
          </thead>
          <tbody>
              {this.state.generalRows.map(row => (
                  <tr><td> {this.dateDisplay(row.date,true)} </td><td> {this.timeDisplay(row.msTime)} </td></tr>
              ))}
          </tbody>
        </table>
      )
    }
  }

    render() {
        return(
          <div className='generalBG ManagementPanel'>
            <div className='lightPanel'>
              <button className="generalButtonStyle" onClick={async () => {this.toggleLight(true)}}>ON</button> 
              <button className="generalButtonStyle" onClick={async () => {this.toggleLight(false)}}>OFF</button> 
            </div>
            <span className="lightInfo Off"><span className='autoMode Text ghost'>AUTO MODE</span></span>

{/*=================================== 
      Color changing buttons
         (for led strip)
======================================*/}
              <Modal isOpen={this.state.showLedModal} className='modal'>
                <button className='generalButtonStyle' onClick={() => this.onSubmit(1,0,0)}> Red </button>
                <button className='generalButtonStyle' onClick={() => this.onSubmit(0,1,0)}> Green </button>
                <button className='generalButtonStyle' onClick={() => this.onSubmit(0,0,1)}> Blue </button>
                <button className='generalButtonStyle' onClick={() => this.onSubmit(1,1,0)}> Yellow </button>
                <button className='generalButtonStyle' onClick={() => this.onSubmit(0,1,1)}> Aqua </button>
                <button className='generalButtonStyle' onClick={() => this.onSubmit(1,0,1)}> Purple </button>
                <button className='generalButtonStyle' onClick={() => this.onSubmit(1,1,1)}> White </button>
                <br />
                <button className='generalButtonStyle exitAndOff' onClick={async () => {
                                        await axios.get('http://localhost:8080/api/LedOff');
                                                                                    }}> Off </button>
                <br /><br />
                <button className='generalButtonStyle exitAndOff' onClick={async () => this.toggleLedModal() }>EXIT</button>
              </Modal>
{/*=================================== 
        General database show
======================================*/}
              <Modal isOpen={this.state.showDBModal} className='modal'>
                <div className='tableDiv'>
                  {this.tableDisplayGeneral()}
                </div>
                <br />
                <button className='generalButtonStyle modeButton' onClick={ async () => this.clearTable() } >clearTable</button> 
                <button className='generalButtonStyle modeButton' onClick={ async () => this.generatePDF() } >Export PDF</button>
                <br />
                <button className='generalButtonStyle exitAndOff' onClick={async () => this.toggleDBModal() }>EXIT</button>
                
              </Modal>

{/*=================================== 
          Mode changing
======================================*/}
              <div>
                <button className="generalButtonStyle singleButton" onClick={async () => this.toggleLedModal() }>Led Color Editior</button>
                <button className="generalButtonStyle singleButton" onClick={async () => this.toggleDBModal() }>General Time Data</button>
                <button className="generalButtonStyle singleButton modeButton"
                  onClick={async () => {
                    await axios.get('http://localhost:8080/api/switchMode');
                    this.setState({
                        isAutoMode: !this.state.isAutoMode
                    })
                  }}>
                SwitchMode</button> 
              </div>
          </div>
        )
    }
}

export default management;