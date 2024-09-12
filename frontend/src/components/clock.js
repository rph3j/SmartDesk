import { useState, useEffect } from 'react';

// simple clock
function Clock(){
    const [date, setDate] = useState(new Date());
    
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    return (
        <div className="General ClocksParams" >
          <p className='Text'>
            {date.toLocaleTimeString()}
          </p>
        </div>
    );
  }

export default Clock;