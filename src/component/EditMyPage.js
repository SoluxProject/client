import "../EditMyPage.css"
import React , {useState, useEffect,useCallback} from 'react';
import axios from "axios";
import { RiEdit2Fill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa";
import MyPageNavbar from "./MyPageNavbar";

export default function EditMyPage({location}){
    
    const id=location.state.id;
    const name=location.state.name;
    const pw=location.state.pw;
    const email=location.state.email;
    const major=location.state.major;
    const tel=location.state.tel;

    const [boolChangePw,setBoolChangePw]=useState(false);
    const [newPw, setNewPw]=useState(pw);
    const [newEmail, setNewEmail]=useState(email);
    const [newMajor, setNewMajor]=useState(major);
    const [newTel, setNewTel]=useState(tel);

    const newUser ={
        id:id,
        name: name,
        email:newEmail,
        major:newMajor,
        pw: boolChangePw ? newPw : pw ,
        tel:newTel
    }
    
    const changePw=useCallback(
        (e) => {
            setNewPw(e.target.value);
        },
        []
    );
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
    const changeTel=useCallback(
        (e) => {
            setNewTel(e.target.value);
        },
        []
    );
    

    const editPw=(id ,name, newPw)=>{
        setBoolChangePw(true);
        axios.post('/mypage/changePw',{
            id:id,
            name: name, 
            newPw: newPw
        })
    }

    const editEmail=(id, newUser)=>{
        axios.post('/mypage/changeEmail',{
            id:id,
            newEmail:newUser,
        })
    }
    const editMajor=(id,newUser )=>{
        
        axios.post('/mypage/changeMajor',{
            id:id,
            newMajor:newUser,
        })
    }
    const editTel=(id, newUser)=>{
        axios.post('/mypage/changeTel',{
            id:id,
            newTel:newUser,
        })
    }
    return(
        <div className="EditMyPage">
            
            <MyPageNavbar></MyPageNavbar>
            <div className="EditMyPageMainContent">
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
                        <div>전화번호</div>
                    </div>
                    <div className="EditMyPageContent">
                        <div className="EditMyPageCont">{name}</div>
                        <div className="EditMyPageCont">{id}</div>
                        <div className="EditMyPageInputBtn">
                            <input autoFocus placeholder="변경할 비밀번호를 입력하세요" onChange={changePw}></input>
                            <button className="EditMyPageEditBtn" onClick={()=>editPw(id, name, newPw)}><RiEdit2Fill /></button>
                        </div>
                        <div className="EditMyPageInputBtn">
                            <input defaultValue={newEmail} onChange={changeEmail}></input>
                            <button className="EditMyPageEditBtn" onClick={()=>editEmail(id, newUser)}><RiEdit2Fill /></button>
                        </div>
                        <div className="EditMyPageInputBtn">
                            <input defaultValue={newMajor} onChange={changeMajor}></input>
                            <button className="EditMyPageEditBtn" onClick={()=>editMajor(id, newUser)}><RiEdit2Fill /></button>
                        </div>
                        <div className="EditMyPageInputBtn">
                            <input defaultValue={newTel} onChange={changeTel}></input>
                            <button className="EditMyPageEditBtn" onClick={()=>editTel(id, newUser)}><RiEdit2Fill /></button>
                        </div>
                
                    </div>
            </div>
            </div>
            
        </div>
    )
}