import { MdAdd } from 'react-icons/md';
import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import MyPageNavbar from './MyPageNavbar';
import '../ExamDday.css';

export default function ExamDday(){
    const [exam,setExam]=useState('');
    const [examList, setExamList]=useState([]);
    const [isEdit, setIsEdit] = useState(false);

    return(
    <div className="wrapper">
        <div className="MyPageNavbar">
            <MyPageNavbar></MyPageNavbar>
        </div>
        <div className="ExamDday">
            <div className="ExamDdayHeadBlock">
                <h1>시험 일정 관리</h1>
            </div>
        <div className="ExamInsertFormPositioner">
          <div className="ExamInsertForm">
            <input className="ExamInputDay" id="InputMonth" placeholder="월" />
            <input className="ExamInputDay" id="InputDate" placeholder="일" />
            <input className="ExamDdayInput" placeholder="시험" />
          </div>
        </div>
        <button className="CircleButton" >
          <MdAdd />
        </button>
        <div className="ExamScroll">
            <div className="ExamDdaySet">
            <p className="ExamContentMonth">9</p>
                <p>/</p>
                <p className="ExamContentDay">4</p>
                <p className="ExamDdayContent">알고리즘 중간고사</p> 
                <button className="ExamEditButton" >
                    <RiEdit2Fill />
                </button>
                <button className="ExamdeleteBtn">
                    <img src="img/delete.png" className="ExamdeleteImg"></img>
                </button>
                           
            </div>
                
        </div>
    </div>
    
    </div>
        
);
}