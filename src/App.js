import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Todo from './component/Todo';
import Dday from './component/Dday';
import Search from './component/Search';
import Dailynote from './component/Dailynote';

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
          <Route exact path="/auth/search" component={Search} />
      </div>
    </BrowserRouter>
  );
}

export default App; 