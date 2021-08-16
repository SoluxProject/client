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
import DailynoteAdd from './DailynoteAdd';
 
function Dailynote() { 

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
 

  const deleteDailynote = (val) => {
    if(window.confirm(`'${val.content}'를 삭제하시겠습니까?`)) {
    Axios.post('/dailynote/delete', {
      index: val.index,
    })
    .then(res => {
      setDailynoteList(res.data);
      //countTodo(res.data);
    });
  }
  };
 
  const changeDailynote = (val, data) => {
    Axios.post('/dailynote/change', {
      index: val.index,
      content: data,
    })
    .then(res => {
      setDailynoteList(res.data);
      //countTodo(res.data);

    });
    setUpdateDailynote("");
  }; 
 

  return (
    <div className="wrapper">
      <div className="navbar">
        <Navbar page="DailyNote"/>
      </div>
      <div className="leftright">
        <div className="dailynoteleft">
          <p className="dailynoteTitle">Daily Notes</p> 
          <Link to="/dailynoteAdd">
            <div className="item">
              <div className="leftadd">추가하기</div>
            </div>
          </Link>
        </div>
    
 
      <div className="notes">
         
        {dailynoteList.map((val) => {
          return (
            <div key={val.index} className="dailybox">
              <div className="valSubject"> 
                <div className="subjectText">{val.subject}</div>  
              </div>

              <div className="contentDate">
                <div className="valContent">
                  <div>{val.content}</div>
                  <div className="EditDeleteDaily">
                    <button className="DdaydeleteBtn" onClick={() => {deleteDailynote(val);}}>
                      <img src="img/delete.png" className="deleteImg"></img>
                    </button>  
                  </div> 
                </div>
                <div className="valDate">{new Date(val.date).toDateString()}</div>
              </div>
            </div> 
          )
        })} 
      </div>
      </div> 
    </div>
  );
}

export default Dailynote;