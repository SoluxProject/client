import "../ToDo.css";
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {Link} from 'react-router-dom';
import TodoHead from './TodoHead';
import { MdAdd } from 'react-icons/md';
import { RiEdit2Fill } from "react-icons/ri";
import Navbar from './Navbar';
 
function Todo() {

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");
  const [todoCount, setTodoCount] = useState(0);

  const[todoListExist, setTodoListExist] = useState(false);

  const countTodo = (arr) => {
    let count = 0;
    for(var i=0; i<arr.length; i++) {
      if(arr[i].check === 0) {
        count++;
      } 
    }
    setTodoCount(count);
  };
  
  const showTodoList = (res) => {
    if(res.data.success === undefined) {
      setTodoListExist(true);
      setTodoList(res.data);
      countTodo(res.data);
    }
    else {
      setTodoListExist(false);
      alert(res.data.message);
    }
  };

  useEffect(() => {
    Axios.get("/todo/list")
    .then(res => {
      showTodoList(res);
    })
  }, []);

  const submitTodo = () => {
    Axios.post("/todo/insert", {
         todoid: 'seoin',
         content: todo,
     })
     .then(res => {
        if(!res.data.success && res.data.message==='todo 추가 오류') {
          alert(res.data.message);
        }
        else {
          showTodoList(res);
        }
     })
     .then(()=>{
       setTodo('');
     })
  };

  const deleteTodo = (val) => {
    if(window.confirm(`'${val.content}'를 삭제하시겠습니까?`)) {
      Axios.post('/todo/delete', {
        index: val.index,
      })
      .then(res => {
        if(!res.data.success && res.data.message==='todo delete 오류') {
          alert(res.data.message);
        }
        else {
          showTodoList(res);
        }
      });
    }
  };

  const changeTodo = (val, data) => {
    Axios.post('/todo/change', {
      index: val.index,
      content: data,
    })
    .then(res => {
      if(!res.data.success && res.data.message==='todo change 오류') {
        alert(res.data.message);
      }
      else {
        showTodoList(res);
      }
    });

    setUpdateTodo("");
  }; 

  const checkTodo = (val) => {
    Axios.post('/todo/check', {
      index: val.index,
    })
    .then(res => {
      if(!res.data.success && (res.data.message==='todo check to 0 오류' || res.data.message==='todo check to 1 오류')) {
        alert(res.data.message);
      }
      else {
        showTodoList(res);
      }
    })
  };

  const clearInput = () => {
    var e = document.getElementsByClassName('EditToDo');
    for(var i=0; i<e.length; i++){
        e[i].value = '';
    }
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
        
        {todoListExist ?
          (
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
                    <button className="EditButton"  onClick={() => {changeTodo(val, updateTodo); clearInput();}}>
                      <RiEdit2Fill />
                    </button>
                    <button className="deleteBtn" onClick={() => {deleteTodo(val);}}><img src="img/delete.png" className="deleteImg"></img></button>
                  </div>
                  
                </div>
                )
             })
            }
            </div>
          ) : 
          (
            <div className="ToDoScroll">
              <div id="ToDoSet" />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Todo;