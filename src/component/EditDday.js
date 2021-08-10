import "../Dday.css";
import React, { useState } from 'react';
import Axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function EditDday(props){
    const date = new Date(Date.parse(props.date));
    const [newYear, setNewYear] = useState(0);
    const [newMonth, setNewMonth] = useState(0);
    const [newDate, setNewDate] = useState(0);
    const [newDday, setNewDday] = useState('');

    // const changeDday = (idx) => {
    //     Axios.post('/dday/changeDate', {
    //         idx: idx,
    //         date: new Date(newYear, newMonth-1, newDate),
    //     }).then(res => {console.log(res.data)});

    //     Axios.post('/dday/changeCont', {
    //         idx: idx,
    //         content: newDday,
    //     }).then(res => )
    // };

    return(
        <div className="child">
            <input className="EditDday" id="EditYear" placeholder="년" value={date.getFullYear()} onChange = {(e) => {setNewYear(Number(e.target.value))}} />
            <input className="EditDday" id="EditMonth" placeholder="월" value={date.getMonth() + 1} onChange = {(e) => {setNewMonth(Number(e.target.value))}} />
            <input className="EditDday" id="EditDay" placeholder="일" value={date.getDate() + 1} onChange = {(e) => {setNewDate(Number(e.target.value))}} />
            <input className="EditDdayContent" placeholder="일정" value={props.content} onChange = {(e) => {setNewDday(e.target.value)}} />
            <button className="DdayEditButton" /*onClick = {() => {changeDday(props.idx)}}*/>
                <AiOutlineCheckCircle />
            </button>
        </div>
    )
}