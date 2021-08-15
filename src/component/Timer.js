import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import Navbar from './Navbar';
import '../Timer.css';
import { VscDebugStart } from 'react-icons/vsc';
import { AiOutlinePause } from 'react-icons/ai';
import { VscDebugRestart } from 'react-icons/vsc';
import { AiOutlineSave } from 'react-icons/ai';


function Timer() {
    const time = useRef(0);
    const intervalId = useRef(null);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [hr, setHr] = useState(0);
    
    const [date, setDate] = useState('');
    const [recordDay, setRecordDay] = useState('');
    // console.log(`렌더링...time: ${time.current}`);

    const startTimer = () => {
        intervalId.current = setInterval(() => {
            setHr(parseInt((time.current/60)/60));
            setMin(parseInt((time.current/60)%60)); 
            setSec(parseInt(time.current % 60));
            time.current += 1}, 1000);
        // console.log(`시작...intervalId: ${intervalId.current}`);
    };

    const stopTimer = () => {
        clearInterval(intervalId.current);
        // console.log(`정지...intervalId: ${intervalId.current}`);
    };

    const resetTimer = () => {
        time.current = 0;
        setHr(0);
        setMin(0);
        setSec(0);
        // console.log(`초기화...time:${time.current} intervalId: ${intervalId.current}`);
    };

    const saveTimer = () => {
        if(window.confirm('기록을 저장하시겠습니까?')) {
            Axios.post('/timerDay/update', {
                recordDay: time.current,
            })
            .then(res => {
                if(res.data.success === undefined) {
                    showRecord(res.data[0]);
                }
                else {
                    alert(res.data.message);
                }
            })
        }
    };

    const showRecord = (result) => {
        const hour = parseInt((result.recordDay/60)/60);
        const minute = parseInt((result.recordDay/60)%60);
        const second = parseInt(result.recordDay%60);
        setDate(`${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()}`); 
        setRecordDay(`${hour<10 ? `0${hour}` : hour} : ${minute<10 ? `0${minute}` : minute} : ${second<10 ? `0${second}` : second}`);
    };

    useEffect(() => {
        Axios.get('/timerDay/list')
        .then(res => {
            if(res.data.success === undefined) {
                showRecord(res.data[0]);
            }
            else {
                alert(res.data.message);
            }
        })
    }, []);

    return (
        <div className = 'wrapper'>
            <div className = 'navbar'>
                <Navbar page="Timer" />
            </div>
            <div className = 'Timer'>
                <div className = 'timer-set'>
                    <h2 style={{color: 'white'}}>TIMER</h2>
                    <div className = 'time'>
                        {hr<10 ? `0${hr}` : hr} : {min<10 ? `0${min}` : min} : {sec<10 ? `0${sec}` : sec}
                    </div>
                    <div className = 'control'>
                        <VscDebugStart className='control-btn' title="START" onClick={startTimer} />
                        <AiOutlinePause className='control-btn' title="STOP" onClick={stopTimer} />
                        <AiOutlineSave className='control-btn' title="SAVE" onClick={saveTimer} />
                        <VscDebugRestart className='control-btn' title="RESET" onClick={resetTimer} />
                    </div>
                </div>
                <div className = 'dayRecord-set'>
                    <div className = 'dayRecord-bar'>
                        <span>날짜</span>
                        <span>기록</span>
                    </div>
                    <div className = 'dayRecord-list'>
                        <span>{date}</span>
                        <span>{recordDay}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;