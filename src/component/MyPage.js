import "../MyPage.css"
import Navbr from "./Navbar";
import React , {useState, useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

export default function MyPage(){
    const [user,setUser]=useState([]);

    useEffect(() => {    
    Axios.get("/mypage/info")
    .then(res => {
      console.log(res.data.data[0]);
      setUser(res.data.data[0]);
    })
    }, [])
    
    return(
        <div className="MyPage">
            <div className="MyPageNavbar">
                    <Navbr page="MyPage"></Navbr>
            </div>
            <div className="MyPageContent">
                <div className="MyPageTitle">
                    <h1>My Page</h1>
                </div>
                <div className="MyPageImage">
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEzLjMyMyA1MTMuMzIzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTMuMzIzIDUxMy4zMjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LjY2MSwyNTcuMzIzYy0xMzUuMjc1LDAtMjQ1LjMzMywxMTAuMDU5LTI0NS4zMzMsMjQ1LjMzM2MwLDUuODg4LDQuNzc5LDEwLjY2NywxMC42NjcsMTAuNjY3DQoJCQlzMTAuNjY3LTQuNzc5LDEwLjY2Ny0xMC42NjdjMC0xMjMuNTIsMTAwLjQ4LTIyNCwyMjQtMjI0czIyNCwxMDAuNDgsMjI0LDIyNGMwLDUuODg4LDQuNzc5LDEwLjY2NywxMC42NjcsMTAuNjY3DQoJCQljNS44ODgsMCwxMC42NjctNC43NzksMTAuNjY3LTEwLjY2N0M1MDEuOTk1LDM2Ny4zNiwzOTEuOTM2LDI1Ny4zMjMsMjU2LjY2MSwyNTcuMzIzeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LjY2MSwwYy02NC42ODMsMC0xMTcuMzMzLDUyLjYyOS0xMTcuMzMzLDExNy4zMzNzNTIuNjUxLDExNy4zMzMsMTE3LjMzMywxMTcuMzMzczExNy4zMzMtNTIuNjI5LDExNy4zMzMtMTE3LjMzMw0KCQkJUzMyMS4zNDQsMCwyNTYuNjYxLDB6IE0yNTYuNjYxLDIxMy4zMzNjLTUyLjkyOCwwLTk2LTQzLjA3Mi05Ni05NnM0My4wNzItOTYsOTYtOTZjNTIuOTI4LDAsOTYsNDMuMDcyLDk2LDk2DQoJCQlTMzA5LjU4OSwyMTMuMzMzLDI1Ni42NjEsMjEzLjMzM3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
                </div>
                <div className="MyPageUser">
                    <div className="MyPageUserContentTitle">
                        <div>이름</div>
                        <div>아이디</div>
                        <div>이메일</div>
                        <div>전공</div>
                    </div>

                    <div className="MyPageUserContent">
                        <div>{user.name}</div>
                        <div>{user.id}</div>
                        <div>{user.email}</div>
                        <div>{user.major}</div>
                    </div> 
                </div>
                
                <div className="MyPageBtns">
                    <Link to={{
                        pathname: "/editMyPage",
                        state:{
                            name:user.name,
                            id:user.id,
                            pw:user.pw,
                            email:user.email,
                            major:user.major
                        }
                    }}>
                        <button className="MyPageBtn MyPageEditBtn">회원정보 수정</button>
                     
                </Link>
                    
                    <button className="MyPageBtn MyPageExamBtn">시험일정 관리</button>
                    <button className="MyPageBtn MyPageTimeBtn">공부시간 관리</button>
                </div>
            </div>
        </div>
    )
}
