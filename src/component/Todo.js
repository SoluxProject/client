import "../ToDo.css";
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {Link} from 'react-router-dom';
// import { useHistory } from "react-router-dom";
import TodoHead from './TodoHead';
import { MdAdd } from 'react-icons/md';
import { RiEdit2Fill } from "react-icons/ri";
import Navbar from './Navbar';
 
function Todo() {

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");
  const [todoCount, setTodoCount] = useState(0);

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

  useEffect(() => {
    Axios.get("/todo/list")
    .then(res => {
      setTodoList(res.data);
      countTodo(res.data);
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
      <div className="ToDo"> 
        <TodoHead count={todoCount} />  {/* TodoHead : 날짜, 남은 투 두 개수 */}
          

        <div className="InsertFormPositioner">
          <div className="InsertForm">
          <input className="Input" autoFocus placeholder="할 일을 입력 후, '+' 버튼을 누르세요" value={todo} onChange={(e) => {
              //console.log(e.target.value);
              setTodo(e.target.value); 
            }} />
          </div>
        </div>
        
        <button className="CircleButton" onClick={submitTodo}>
          <MdAdd />
        </button>
        
        <div className="ToDoScroll">
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
        </div>

      </div>
    </div>
  );
}

export default Todo;