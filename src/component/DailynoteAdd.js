import "../Dailynote.css";
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {Link} from 'react-router-dom';
// import { useHistory } from "react-router-dom";
// import TodoHead from './TodoHead';
//import DailynoteHead from './DailynoteHead';
import { MdAdd } from 'react-icons/md';
import { RiEdit2Fill } from "react-icons/ri";
import Navbar from './Navbar';
 
function DailynoteAdd() {
 

  const [date, setDate] = useState('');
  const [major, setMajor] = useState('');
  const [studynote, setStudynote] = useState("");
  const [dailynoteList, setDailynoteList] = useState([]);
  const [updateDailynote, setUpdateDailynote] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState(-1);

  const EditDailynoteBtn=(val)=>{
    // setNewYear(new Date(Date.parse(val.date)).getFullYear());
    // setNewMonth(new Date(Date.parse(val.date)).getMonth() + 1);
    // setNewDate(new Date(Date.parse(val.date)).getDate() + 1);
    // setNewDay(val.date);
    // setNewDday(val.content);

    if (isEdit ===false){
        setIsEdit(true);
        setIndex(val.index);
    }
    else{
        setIsEdit(false);
        setIndex(-1);
    }

};  
  useEffect(() => {
    Axios.get("/dailynote/list")
    .then(res => {
      setDailynoteList(res.data);
      // countTodo(res.data);
    })
  }, []);
 
   const submitDailynote = () => {
    Axios.post("/dailynote/insert", {
         //todoid: 'serin',
         content: studynote,
         date : date,
         subject : major,  // 수정
     })
     .then(res => {
       console.log(res.data);
       setDailynoteList(res.data);
       
     }).then(()=>{
       setDate('');
       setMajor('');
       setStudynote("");
     })
   };
 

  return (
    <div className="wrapper">
      <div className="navbar">
        <Navbar page="DailyNote"/>
      </div>
 
      <div className="AddNote">  
        <div className="DailynoteHeadBlock">

          <div className="lefthead">
            <div className="headTitle">날짜</div>
            <input type="date" value={date} onChange={ (e) => {
              setDate(e.target.value);
            }} /> 
          </div>
          <div className="righthead">
          <div className="headTitle">과목명</div>
            <input placeholder="Subject" value={major} onChange={ (e) => {
              setMajor(e.target.value);
            }} /> 
          </div>
        </div>

        <div className="inputNoteTitle">오늘의 복습</div> 
         
        <textarea className="inputNote" autoFocus placeholder="기록 후, 'ADD' 버튼을 누르세요" value={studynote} onChange={(e) => {
              //console.log(e.target.value);
              setStudynote(e.target.value); 
        }} />

        <div className="InsertFormPositioner">
          <div className="InsertForm">
          </div>
        </div>
        <Link to="/dailynote">
          <button className="addbtn" onClick={submitDailynote}> ADD </button>
        </Link>
      </div>
    </div>
  );
}

export default DailynoteAdd;