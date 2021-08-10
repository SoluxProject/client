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
 
function Dailynote() {

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");
  const [todoCount, setTodoCount] = useState(0);

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
 


  const countTodo = (arr) => {
    let count = 0;
    for(var i=0; i<arr.length; i++) {
      if(arr[i].check === 0) {
        count++;
      } 
    }
    // console.log(count);
    setTodoCount(count);
  };

  // useEffect(() => {
  //   Axios.get("/todo/list")
  //   .then(res => {
  //     setTodoList(res.data);
  //     countTodo(res.data);
  //   })
  // }, []);

  useEffect(() => {
    Axios.get("/dailynote/list")
    .then(res => {
      setDailynoteList(res.data);
      // countTodo(res.data);
    })
  }, []);

  const submitTodo = () => {
    Axios.post("/todo/insert", {
         todoid: 'seoin',
         content: todo,
     })
     .then(res => {
       console.log(res.data);
       setTodoList(res.data);
       countTodo(res.data);
     }).then(()=>{
       setTodo('');
     })
     
   };

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
 
  
  const deleteTodo = (val) => {
    if(window.confirm(`'${val.content}'를 삭제하시겠습니까?`)) {
    Axios.post('/todo/delete', {
      index: val.index,
    })
    .then(res => {
      setTodoList(res.data);
      countTodo(res.data);
    });
  }
  };

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

  const changeTodo = (val, data) => {
    Axios.post('/todo/change', {
      index: val.index,
      content: data,
    })
    .then(res => {
      setTodoList(res.data);
      countTodo(res.data);

    });
    setUpdateTodo("");
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

  const checkTodo = (val) => {
    Axios.post('/todo/check', {
      index: val.index,
    })
    .then(res => {
      setTodoList(res.data);
      countTodo(res.data);
    });
  };

  return (
    <div className="wrapper">
      <div className="navbar">
        <Navbar page="Todo"/>
      </div>
 
      <div className="notes">
        {/* <p>여기에 내용 띄울 예정</p> */}
        <div className="inputNoteTitle">Daily Notes</div> 
          
        <div classname="DailynoteScroll"></div>
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
                    <button className="DdayEditButton" onClick={() => {EditDailynoteBtn(val)}} >
                      <RiEdit2Fill />
                    </button>
                    <button className="DdaydeleteBtn" onClick={() => {deleteDailynote(val);}}>
                      <img src="img/delete.png" className="deleteImg"></img>
                    </button>  
                    {/* {isEdit && (index === val.index) && 
                      (
                        <div className="child">
                           <input className="EditDday" id="EditYear" placeholder="년" onChange = {(e) => {setNewYear(Number(e.target.value))}} />
                            <input className="EditDday" id="EditMonth" placeholder="월" onChange = {(e) => {setNewMonth(Number(e.target.value))}} />
                            <input className="EditDday" id="EditDay" placeholder="일" onChange = {(e) => {setNewDate(Number(e.target.value))}} />
                            <button className="DdayEditButton" onClick = {() => {changeDate(val.index)}}>
                              <AiOutlineCheckCircle />
                            </button>
                            <input className="EditDdayContent" placeholder="일정" onChange = {(e) => {setNewDday(e.target.value)}} />
                            <button className="DdayEditButton" onClick = {() => {changeCont(val.index)}}>
                              <AiOutlineCheckCircle />
                            </button>
                        </div>
                      )
                    } */}



                  </div>
                  
                </div>
                <div className="valDate">{val.date}</div>
              </div>
            </div>
            // <div key={val.index} className="dailybox">
            //   <div className="subjectDate">
            //     <div className="valSubject">{val.subject}</div>
            //     <div className="valDate">{val.date}</div>
            //   </div>
            //   <p className="content">{val.content}</p>
            // </div>
          )
        })}

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
        
        <button className="addbtn" onClick={submitDailynote}> ADD </button>
        {/* <button className="addbtn" onClick={submitDailynote}> ADD </button> */}
        
        {/* <div className="ToDoScroll">
        {todoList.map((val) => {
          return (
            
          <div key={val.index}  id="ToDoSet">
            <div className="CheckContent">
              <input className="checkbox" type="checkbox" checked={val.check} onChange={()=> {checkTodo(val);}}/>
              <p className="ToDoContent">{val.content}</p> 
            </div>
            

            <div className="EditDelete">
              <input className="EditToDo" type="text" autoFocus placeholder="할 일 수정하기"onChange={(e) => {setUpdateTodo(e.target.value)}} />
              <button className="EditButton"  onClick={() => {changeTodo(val, updateTodo)}}>
                <RiEdit2Fill />
              </button>
              <button className="deleteBtn" onClick={() => {deleteTodo(val);}}><img src="img/delete.png" className="deleteImg"></img></button>
            </div>
            
          </div>
          
          )
        })
        }
        </div> */}

      </div>
    </div>
  );
}

export default Dailynote;