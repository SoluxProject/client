import { MdAdd } from 'react-icons/md';
import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import MyPageNavbar from './MyPageNavbar';
import '../ExamDday.css';
import axios from 'axios';

export default function ExamDday({location}){
    
    const id=location.state.id;

    const [month, setMonth] = useState(0);
    const [date, setDate] = useState(0);
    const [exam,setExam]=useState('');
    const [year, setYear]=useState(2021);

    const [newMonth, setNewMonth] = useState(0);
    const [newDate, setNewDate] = useState(0);
    const [newExam, setNewExam] = useState('');

    const [examList, setExamList]=useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [examListExist, setExamListExist]=useState(false);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        Axios.get("/manage/list")
        .then(res => {
            showExamList(res);
        })
    }, []);

    const showExamList = (res)=>{
        if(res.data.success===undefined) {
            setExamListExist(true);
            setExamList(res.data);
        }
        else {
            setExamListExist(false);
            alert(res.data.message);
        }
    }

    const submitExam = ()=>{
        axios.post("/manage/insert",{
            manageid:id,
            date: new Date(year, month-1, date+1),
            subject: exam
        })
        .then(()=>{
            setMonth(0);
            setDate(0);
            setExam('');
         })
    }
    const calcMonth =(date) =>{
        var date = new Date(Date.parse(date));
        var month=date.getMonth();
        return month+1;
    }
    const calcDay =(date) =>{
        var date = new Date(Date.parse(date));
        var day=date.getDate();
        return day;
    }
    const EditExamDday =(val) =>{
        if (isEdit ===false){
            setIsEdit(true);
            setIndex(val.index);
        }
        else{
            setIsEdit(false);
            setIndex(-1);
        }
    }
    const changeExamDate=(idx)=>{
        Axios.post('/manage/changeDate', {
            index: idx,
            date: new Date(2021,newMonth-1, newDate+1),
        })
        .then(res => {
            if(!res.data.success && res.data.message==='dday 날짜 수정 오류'){
                alert(res.data.message);
            }
            else {
                setIsEdit(false);
                setIndex(-1);
                showExamList(res);
            }
        });

        setNewMonth(0);
        setNewDate(0);
    }
    const changeExamCont=(idx)=>{
        Axios.post('/manage/changeSub', {
            index: idx,
            subject: newExam,
        })
        .then(res => {
            if(!res.data.success && res.data.message==='dday 내용 수정 오류'){
                alert(res.data.message);
            }
            else {
                setIsEdit(false);
                setIndex(-1);
                showExamList(res);
            }
        });

        setNewExam('');
    }
    const deleteExam = (idx) => {
        if(window.confirm('삭제하시겠습니까?')) {
            Axios.post('/manage/del', {
            index: idx,
            })
            .then(res => {
                if(!res.data.success && res.data.message==='dday delete 오류') {
                    alert(res.data.message);
                }
                else{
                    showExamList(res);
                }
            });
        }
    };

    return(
    <div className="wrapper">
        <div className="MyPageNavbar">
            <MyPageNavbar page="examdday"></MyPageNavbar>
        </div>
        <div className="ExamDday">
            <div className="ExamDdayHeadBlock">
                <h1>시험 일정 관리</h1>
            </div>
        <div className="InsertFormPositioner">
          <div className="InsertForm ExamInsertForm">
            <input className="ExamInputDay" id="InputMonth" placeholder="월" onChange = {(e) => {setMonth(Number(e.target.value))}} />
            <input className="ExamInputDay" id="InputDate" placeholder="일" onChange = {(e) => {setDate(Number(e.target.value))}}/>
            <input className="ExamDdayInput" placeholder="시험" onChange = {(e) => {setExam(e.target.value)}}/>
          </div>
        </div>
        <button className="CircleButton" onClick={()=>submitExam} >
          <MdAdd />
        </button>
        {examListExist ? 
        (
            <div className="ExamScroll">
                {examList.map((val) => {
                        return( 
                                <div key={val.index} className="ExamDdaySet">
                                <p className="ExamContentMonth">{calcMonth(val.date)}</p>
                                <p>/</p>
                                <p className="ExamContentDay">{calcDay(val.date)}</p>
                                <p className="ExamDdayContent">{val.subject}</p> 
                                <button className="ExamEditButton" onClick={()=>EditExamDday(val)}>
                                    <RiEdit2Fill />
                                </button>
                                <button className="ExamdeleteBtn" onClick={()=>deleteExam(val.index)} >
                                    <img src="img/delete.png" className="ExamdeleteImg"></img>
                                </button>
                                {isEdit && (index === val.index) && 
                                    (
                                        <div className="Examchild">
                                            <input className="EditDday" id="EditExamMonth" placeholder="월" onChange = {(e) => {setNewMonth(Number(e.target.value))}} />
                                            <input className="EditDday" id="EditExamDay" placeholder="일" onChange = {(e) => {setNewDate(Number(e.target.value))}} />
                                            <button className="DdayEditButton" onClick={()=>changeExamDate(val.index)}>
                                                <AiOutlineCheckCircle />
                                            </button>
                                            <input className="EditDdayContent" placeholder="시험" onChange = {(e) => {setNewExam(e.target.value)}} />
                                            <button className="DdayEditButton"onClick={()=>changeExamCont(val.index)} >
                                                <AiOutlineCheckCircle />
                                            </button>
                                        </div>
                                    )
                                }
                                </div>
                        )})
                }        
            </div>
        ) : 
        (
            <div className="ExamScroll">
                    <div className="ExamDdaySet" />
            </div>
        )
        }
        
    </div>
    
    </div>
        
);
}