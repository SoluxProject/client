import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Todo from './component/Todo';
import Dday from './component/Dday';
import Search from './component/Search';
import Dailynote from './component/Dailynote';
import MyPage from './component/MyPage';
import EditMyPage from './component/EditMyPage';
import Timer from './component/Timer';
import ExamDday from './component/ExamDday';
import DailynoteAdd from './component/DailynoteAdd';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/join" component={SignUp} />
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/dday" component={Dday} />
          <Route exact path="/dailynote" component={Dailynote} />
          <Route exact path="/dailynoteAdd" component={DailynoteAdd} />
          <Route exact path="/auth/search" component={Search} />
          <Route exact path="/mypage" component={MyPage}/>
          <Route exact path="/editMyPage" component={EditMyPage}/>
          <Route exact path="/timer" component={Timer} />
          <Route exact path="/examDday" component={ExamDday}/>
      </div>
    </BrowserRouter>
  );
}

export default App; 