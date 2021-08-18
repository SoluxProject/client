import '../MyTime.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import MyPageNavbar from './MyPageNavbar';
import {Link} from 'react-router-dom';

export default function MyTime ({location}){
   
    const id=location.state.id;

    const [recordDay, setRecordDay] = useState('');
    const [recordWeek, setRecordWeek] = useState('');
    const [timerWeekRank, setTimerWeekRank] = useState([]);


    useEffect(() => {
        Axios.get('/timerDay/list')
        .then(res => {
            if(res.data.success === undefined) {
                showRecordDay(res.data[0]);
            }
            else {
                alert(res.data.message);
            }
        })

        Axios.get('/timerWeek/rank')
        .then(res=>{
            if(res.data.success) {
                showRecordWeek((res.data.data.filter(arr => arr.timerWeekid ===id))[0]);
            }
        })
    }, []);

    const showRecordDay = (result) => {
        const hour = parseInt((result.recordDay/60)/60);
        const minute = parseInt((result.recordDay/60)%60);
        const second = parseInt(result.recordDay%60);
        setRecordDay(`${hour<10 ? `0${hour}` : hour} : ${minute<10 ? `0${minute}` : minute} : ${second<10 ? `0${second}` : second}`);
    };

    

    const showRecordWeek = (result) => {
        const hour = parseInt((result.recordWeek/60)/60);
        const minute = parseInt((result.recordWeek/60)%60);
        const second = parseInt(result.recordWeek%60);
        setRecordWeek(`${hour<10 ? `0${hour}` : hour} : ${minute<10 ? `0${minute}` : minute} : ${second<10 ? `0${second}` : second}`);
    };

    return(
        <div className="MyTime">
            <div className="MyPageNavbar">
            <MyPageNavbar page="mytime"></MyPageNavbar>
            </div>
            <div className="MyTimeTitle">나의 공부 시간</div>
            <div className="MyTimeMain">
                <div className="TodayTitle">[오늘의 공부 시간]</div>
                <div className="MyTimeNoteBox">
                    <div className="MyTimeNotes">
                        <div className="Time">{recordDay}</div>
                    </div>
                </div>
                <div className="WeekTitle">[주간 공부 시간]</div>
                <div className="MyTimeNoteBox">
                    <div className="MyTimeNotes">
                        <div className="Time">{recordWeek}</div>
                    </div>
                </div>
            </div>
            <div className="ExamBtn">
                <Link to='/timer'>
                <button className="TimerBtn">Timer</button>
                </Link>
            </div>
            
            
        </div>
    );
}