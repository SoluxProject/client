import "../App.css";
import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import { FiAlertCircle } from 'react-icons/fi';
import { FaRegCalendarCheck } from 'react-icons/fa';

function Home() {

  const [todoList, setTodoList] = useState([]);
  const [todoExist, setTodoExist] = useState(false);
  const [todoMsg, setTodoMsg] = useState('');

  const [ddayList, setDdayList] = useState([]);
  const [ddayExist, setDdayExist] = useState(false);
  const [ddayMsg, setDdayMsg] = useState('');

  const [dailynoteList, setDailynoteList] = useState([]);

  const [timerWeekRank, setTimerWeekRank] = useState([]);

  const [token, setToken, removeToken] = useCookies(["loginToken"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(token.loginToken !== undefined) {
      setIsLoggedIn(true);
      // console.log(isLoggedIn);
    }
    else {
      setIsLoggedIn(false);
      // console.log(isLoggedIn);
    }

    Axios.get("/todo/list")
    .then(res => {
      if(res.data.success === undefined) {
        setTodoExist(true);
        setTodoList(res.data);
      }
      else {
        setTodoExist(false);
        setTodoMsg(res.data.message);
      }
    });

    Axios.get("/dailynote/list") 
    .then(res => {
      setDailynoteList(res.data);
    });

    Axios.get("/dday/list")
    .then(res => {
      if(res.data.success === undefined) {
        var result = 
          res.data.map((val) => {
            var obj = {};
            var result = calDday(val.date);
            obj['dday'] = (result>=0 ? `D-${result}` : `D+${result*(-1)}`);
            obj['content'] = val.content;
            return obj;
          });
        setDdayExist(true);
        setDdayList(result);
      }
      else {
        setDdayExist(false);
        setDdayMsg(res.data.message);
      }
    });

    Axios.get('/timerWeek/rank')
    .then(res => {
      if(res.data.success) {
        setTimerWeekRank(res.data.data);
      }
    });

  }, []);

    const LogOut = () => {
      
      // Axios.get('/auth/logout').then (function(response) {console.log(response);}).catch(function(error){});
      if(window.confirm('로그아웃 하시겠습니까?')) 
      {
        Axios.get('/auth/logout')
        .then(response => { 
          console.log(response); 
          window.location.replace('/');
        });
      };
      // .catch(error => {
      //   console.log(error.response)
      // });

      // dispatch({
      //   type: "LOGOUT"
      // });
    }; 

    const alertMsg = () => {
      alert('로그인 후 이용해주세요.');
    };

    const calDday = (dday) => {
      var today = new Date();
      var dday = new Date(Date.parse(dday));
      var gap = dday.getTime() - today.getTime();
      var result = Math.ceil(gap/(1000*60*60*24));
      return result;
  };

    return (
        <div className="Home">

              <section id="header-nav">
                <div className="container_column">
                  <header className="container">
                    {ddayExist ?
                      (
                        <div id="day">
                          {ddayList.map((val,index) => {
                            return(
                              <div key={index} id="dday">
                                  <FaRegCalendarCheck id="calendar"/> <span id="dayLeft">{val.dday}</span> <span id="content">{val.content}</span>
                              </div>
                            )
                          })
                          }
                        </div>
                      ) : 
                      (
                        <div className="item column" id="day">
                          <div id="dday">
                            <span><FiAlertCircle /> {ddayMsg}</span>
                          </div>
                        </div>
                      )
                    }

                    <div className="item column" id="login">
                      
                        <Link to="/mypage">
                          <img src="../img/sweetme.png" alt="Sweet Me" width="60" height="60"/>
                        </Link>
                      
                        {!isLoggedIn ?
                          (
                            <Link to="/auth/login">
                              <div id="button">로그인</div>
                            </Link>
                          ) :
                          (
                            <div id="button" onClick={LogOut}>로그아웃</div>
                          )
                        }
                    </div>
                  </header>
                  <nav className="container">
                    {isLoggedIn ? 
                      (
                        <Link to="/todo">
                          <div className="item">
                            <h4>TO DO LIST</h4>
                          </div>
                        </Link>
                      ) :
                      (
                        <a onClick={alertMsg}>
                          <div className="item">
                            <h4>TO DO LIST</h4>
                          </div>
                        </a>
                      )
                    }
                    {isLoggedIn ? 
                      (
                        <Link to="/dday">
                          <div className="item">
                            <h4>D-DAY</h4>
                          </div>
                        </Link>
                      ) :
                      (
                        <a onClick={alertMsg}>
                          <div className="item">
                            <h4>D-DAY</h4>
                          </div>
                        </a>
                      )
                    }
                    {isLoggedIn ? 
                      (
                        <Link to="/dailynote">
                          <div className="item">
                            <h4>DAILY NOTE</h4>
                          </div>
                        </Link>
                      ) :
                      (
                        <a onClick={alertMsg}>
                          <div className="item">
                            <h4>DAILY NOTE</h4>
                          </div>
                        </a>
                      )
                    }
                    {isLoggedIn ? 
                      (
                        <Link to = '/timer'>
                          <div className="item">
                            <h4>TIMER</h4>
                          </div>
                        </Link> ) :
                      (
                        <a onClick={alertMsg}>
                          <div className="item">
                            <h4>TIMER</h4>
                          </div>
                        </a>
                      )
                    }
                  </nav>
                </div>
              </section>

              <section className="introSection"> 
                    <img src="../img/sweetme_logo.png" alt="Sweet Me" width="700" height="500"></img>
              </section>



              <section id="summary" className="section">
                <div className="section__container">
                  <div className="summary__set">
                    <div className="summary__left">
                      <h1>[Daily Note]</h1>

                      <div className="homeNotes">
                        {dailynoteList.map((val) => {
                          return ( 
                            <div key={val.index} className="box">
                              <div className="subjectDate">
                                <div className="homeSubject">{val.subject}</div>  
                                <div className="homeDate">{new Date(val.date).toDateString()}</div>
                              </div>

                              <div className="content">
                                <div className="homeContent">{val.content}</div>
                                
                              </div>
                            </div> 
                          )
                        })} 
                      </div>

                    </div>
                    <div className="summary__right">
                      <h1>[오늘의 할일]</h1>
                      {todoExist ? 
                        (
                          <div className="to__do">
                            {todoList.map((val) => {
                              return (
                              <div key={val.index}  id="ToDoSet">
                                <div> 
                                  <span>✓ {val.content}</span>  
                                </div>
                              </div>
                              )
                              })
                            }
                          </div>
                        ) :
                        (
                          <div className="to__do">
                            <div id="ToDoSet">
                              <span><FiAlertCircle /> {todoMsg}</span>
                            </div>
                          </div>
                        )
                      }

                      <h1>[Today's ranking]</h1>                    
                      <div className="ranking">
                        {timerWeekRank.map((val, index) => {
                          const  style = {
                            width: `${(val.recordWeek/timerWeekRank[0].recordWeek) * 100}%`,
                          }
                          const hour = parseInt((val.recordWeek/60)/60);
                          const minute = parseInt((val.recordWeek/60)%60);
                          const second = parseInt(val.recordWeek%60);
                          return (
                            <div key={index} className="rank__detail">
                              <div className="rank__name">
                                <div>{val.timerWeekid}</div>
                                <div style={{color: 'rgb(230, 150, 2)'}}>{hour<10 ? `0${hour}` : hour} : {minute<10 ? `0${minute}` : minute} : {second<10 ? `0${second}` : second}</div>
                              </div>
                              <div className="rank__bar">
                                <div className="rank__value" style={style}></div>
                              </div>
                            </div>
                          )})
                        }
                        
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        </div>
  );
}

export default Home;