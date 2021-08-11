import "../EditMyPage.css"
import React , {useState, useEffect,useCallback} from 'react';
import axios from "axios";
import { RiEdit2Fill } from "react-icons/ri";

export default function EditMyPage({location}){
    
    const id=location.state.id;
    const name=location.state.name;
    const pw=location.state.pw;
    const email=location.state.email;
    const major=location.state.major;

    const [newEmail, setNewEmail]=useState(email);
    const [newMajor, setNewMajor]=useState(major);

    const changeEmail=useCallback(
        (e) => {
            setNewEmail(e.target.value);
        },
        []
    );
    const changeMajor=useCallback(
        (e) => {
            setNewMajor(e.target.value);
        },
        []
    );

    const editEmail=(id, {data})=>{
        console.log(data);
        axios.post('/mypage/changeEmail',{
            id:id,
            newEmail:data,
        })
        
        
    }
    const editMajor=(id, {data})=>{
        
        axios.post('/mypage/changeMajor',{
            id:id,
            newMajor:data,
        })
    }
    
    return(
        <div className="EditMyPage">
            <div className="EditMyPageTitle">
                    <h1>회원정보 수정</h1>
            </div>
            <div className="EditMyPageUser">
                    <div className="EditMyPageContentTitle">
                        <div>이름</div>
                        <div>아이디</div>
                        <div>비밀번호</div>
                        <div>이메일</div>
                        <div>전공</div>
                    </div>
                    <div className="EditMyPageContent">
                        <div className="EditMyPageCont">{name}</div>
                        <div className="EditMyPageCont">{id}</div>
                        <div className="EditMyPageInputBtn">
                            <input value={pw}></input>
                            <button className="EditMyPageEditBtn"><RiEdit2Fill /></button>
                        </div>
                        <div className="EditMyPageInputBtn">
                            <input value={newEmail} onChange={changeEmail}></input>
                            <button className="EditMyPageEditBtn" onClick={editEmail(id, newEmail)}><RiEdit2Fill /></button>
                        </div>
                        <div className="EditMyPageInputBtn">
                            <input value={newMajor} onChange={changeMajor}></input>
                            <button className="EditMyPageEditBtn" onClick={editMajor(id, newMajor)}><RiEdit2Fill /></button>
                        </div>
                
                    </div>
            </div>
        </div>
    )
}