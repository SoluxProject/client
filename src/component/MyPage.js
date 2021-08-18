import "../MyPage.css"
import Navbr from "./Navbar";
import React , {useState, useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import MyPageNavbar from "./MyPageNavbar";

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
                    <MyPageNavbar page="mypage"></MyPageNavbar>
            </div>
            <div className="MyPageContent">
                <div className="MyPageTitle">
                    <h1>My Page</h1>
                </div>
                <div className="MyPageImage">
                    <img src="../img/noonsong.png" width="170" height="180" />
                </div>
                <div className="MyPageUser">
                    <div className="MyPageUserContentTitle">
                        <div>이름</div>
                        <div>아이디</div>
                        <div>이메일</div>
                        <div>전공</div>
                        <div>전화번호</div>
                    </div>

                    <div className="MyPageUserContent">
                        <div>{user.name}</div>
                        <div>{user.id}</div>
                        <div>{user.email}</div>
                        <div>{user.major}</div>
                        <div>{user.tel}</div>
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
                            major:user.major,
                            tel: user.tel
                        }
                    }}>
                        <button className="MyPageBtn MyPageEditBtn">회원정보 수정</button>
                     
                </Link>
                    <Link to={{
                        pathname:"/examDday",
                        state: {
                            id:user.id
                        }
                        }}>
                        <button className="MyPageBtn MyPageExamBtn">시험일정 관리</button>
                    </Link>
                    <Link to={{
                        pathname:"/mytime",
                        state: {
                            id:user.id
                        }
                        }}>
                        <button className="MyPageBtn MyPageTimeBtn">공부시간 관리</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
