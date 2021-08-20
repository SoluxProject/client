import '../Search.css';
import React, {useState} from 'react';
import Axios from "axios";
import {Link} from 'react-router-dom';

function Search() {
    const [menu, setMenu] = useState('id');

    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [idMsg, setIdMsg] = useState('');

    const [id, setId] = useState('');
    const [name2, setName2] = useState('');
    const [newPw, setNewPw] = useState('');
    const [pwMsg, setPwMsg] = useState('');

    const [idDone, setIdDone] = useState(false);
    const [pwDone, setPwDone] = useState(false);
    
    const clearInput = () => {
        var e = document.getElementsByClassName('inquiry-input');
        for(var i=0; i<e.length; i++){
            e[i].value = '';
        }
    };
    
    const idInquiry = () => {
        Axios.post('/auth/searchId', {
            name: name,
            tel: tel,
        })
        .then(res => {
            console.log(res.data);
            if(res.data.result) {
                setIdMsg(`회원님의 아이디는 ${res.data.message[0].id} 입니다.`);
            }
            else{
                setIdMsg(res.data.message);
            }
            setIdDone(true);
        })

        setName('');
        setTel('');
    };

    const pwInquiry = () => {
        Axios.post('/auth/searchPw', {
            id: id,
            name: name2,
            newPw: newPw,
        })
        .then(res => {
            console.log(res.data);
            setPwMsg(res.data.message);
            setPwDone(true);
        })
       
        setId('');
        setName2('');
        setNewPw('');
    };

    return (
        <div className="Inquiry">
            <div className="inquiry-header">
                <h2 className="header-text">ID/PW 찾기</h2>
                <div className="header-line"></div>
            </div>
            <div className="inquiry-menu">
                <div className="menu-box" id={menu==='id' ? 'color':'none'} onClick={()=>{setMenu('id'); setIdDone(false); setPwDone(false); clearInput();}}>아이디 찾기</div>
                <div className="menu-box" id={menu==='pw' ? 'color':'none'} onClick={()=>{setMenu('pw'); setIdDone(false); setPwDone(false); clearInput();}} style={{border:'none'}}>비밀번호 찾기</div>
            </div>
            
            {menu==='id' ?
            (<div className="inquiry-main">
                <h4>이름과 전화번호를 입력하세요.</h4>
                <input className="inquiry-input" id="name" type="text" onChange={(e) => {setName(e.target.value)}} placeholder="이름" />
                <input className="inquiry-input" id="tel" type="text" onChange={(e)=> {setTel(e.target.value)}} placeholder="'-' 없이 숫자만 입력" />
                <button className="inquiry-submit" type="submit" onClick={idInquiry}>제출</button> 
            </div>
            ) :
            (
            <div className="inquiry-main">
                <h4>아이디, 이름과 수정할 비밀번호를 입력하세요.</h4>
                <input className="inquiry-input" id="id" type="text" onChange={e => {setId(e.target.value)}} placeholder="ID" />
                <input className="inquiry-input" id="name" type="text" onChange={e => {setName2(e.target.value)}} placeholder="이름" />
                <input className="inquiry-input" id="pw" type="password" onChange={e => {setNewPw(e.target.value)}} placeholder="PW" />
                <button className="inquiry-submit" type="submit" onClick={pwInquiry}>제출</button>
            </div>
            )}

            {(menu === 'id') && (idDone === true) && 
            (<div className="inquiry-result">
                <p>{idMsg}</p>
                <Link to='/auth/login'>
                    <button className="inquiry-submit" type="submit" style={{fontSize: '0.75rem'}}>로그인하러 가기</button>
                </Link>
            </div>)}

            {(menu === 'pw') && (pwDone === true) &&
            (<div className="inquiry-result">
                <p>{pwMsg}</p>
                <Link to='/auth/login'>
                    <button className="inquiry-submit" type="submit" style={{fontSize: '0.75rem'}}>로그인하러 가기</button>
                </Link>
            </div>)}
        </div>
    )
};

export default Search;