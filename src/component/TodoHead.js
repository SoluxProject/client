import React from 'react';
// import styled from 'styled-components';
//import { useTodoState } from '../TodoContext';
 

function TodoHead(props) {
  //const todos = useTodoState();
  //const undoneTasks = todos.filter(todo => !todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <div className="TodoHeadBlock">
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {props.count}개 남음</div>
      {/* <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div> */}
    </div>
  );
}

export default TodoHead;