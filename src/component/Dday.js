import { MdAdd } from 'react-icons/md';
import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "../Dday.css";
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import Navbar from './Navbar';
 
export default function Dday(){
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
    const [ddayListExist, setDdayListExist] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [index, setIndex] = useState(-1);

    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [date, setDate] = useState(0);
    const [dday, setDday] = useState('');
    const [ddayList, setDdayList] = useState([]);

    const [newYear, setNewYear] = useState(0);
    const [newMonth, setNewMonth] = useState(0);
    const [newDate, setNewDate] = useState(0);
    const [newDday, setNewDday] = useState('');

    useEffect(() => {
        Axios.get("/dday/list")
        .then(res => {
            showDdayList(res);
        })
      }, []);

    const showDdayList = (res) => {
        if(res.data.success===undefined) {
            setDdayListExist(true);
            setDdayList(res.data);
        }
        else {
            setDdayListExist(false);
            alert(res.data.message);
        }
    };

    const calDday = (dday) => {
        var today = new Date();
        var dday = new Date(Date.parse(dday));
        var gap = dday.getTime() - today.getTime();
        var result = Math.ceil(gap/(1000*60*60*24));
        return result+1;
    };

    const EditDdayBtn=(val)=>{
        if (isEdit ===false){
            setIsEdit(true);
            setIndex(val.index);
        }
        else{
            setIsEdit(false);
            setIndex(-1);
        }
    };

    const changeDate = (idx) => {
        Axios.post('/dday/changeDate', {
            idx: idx,
            date: new Date(newYear, newMonth-1, newDate),
        })
        .then(res => {
            if(!res.data.success && res.data.message==='dday 날짜 수정 오류'){
                alert(res.data.message);
            }
            else {
                setIsEdit(false);
                setIndex(-1);
                showDdayList(res);
            }
        });

        setNewYear(0);
        setNewMonth(0);
        setNewDate(0);
    };

    const changeCont = (idx) => {
        Axios.post('/dday/changeCont', {
            idx: idx,
            content: newDday,
        })
        .then(res => {
            if(!res.data.success && res.data.message==='dday 내용 수정 오류'){
                alert(res.data.message);
            }
            else {
                setIsEdit(false);
                setIndex(-1);
                showDdayList(res);
            }
        });

        setNewDday('');
    };
    
    const submitDday = () => {
        Axios.post("/dday/insert", {
             id: 'ex1',
             date: new Date(year, month-1, date),
             content: dday,
         })
         .then(res => {
            if(!res.data.success && res.data.message==='dday insert 오류') {
                alert(res.data.message);
            }
            else{
                showDdayList(res);
            }
         })
         .then(()=>{
            setYear(0);
            setMonth(0);
            setDate(0);
            setDday('');
         })
    };

    const deleteDday = (idx) => {
        if(window.confirm('삭제하시겠습니까?')) {
            Axios.post('/dday/delete', {
            index: idx,
            })
            .then(res => {
                if(!res.data.success && res.data.message==='dday delete 오류') {
                    alert(res.data.message);
                }
                else{
                    showDdayList(res);
                }
            });
        }
    };

    return (
    <div className="wrapper">
        <div className="navbar">
            <Navbar page="Dday"/>
        </div>
        <div className="Dday"> 
            <div className="DdayHeadBlock">
                <h1>D-day</h1>
                <h4>{dateString}</h4>
            </div>
            <div className="InsertFormPositioner">
                <div className="DdayInsertForm">
                    <input className="InputDay" id="InputYear" placeholder="년" onChange = {(e) => {setYear(Number(e.target.value))}}/>
                    <input className="InputDay" id="InputMonth" placeholder="월" onChange = {(e) => {setMonth(Number(e.target.value))}}/>
                    <input className="InputDay" id="InputDate" placeholder="일" onChange = {(e) => {setDate(Number(e.target.value))}}/>
                    <input className="DdayInput" placeholder="일정" onChange = {(e) => {setDday(e.target.value)}}/>
                </div>
            </div>
          
            <button className="CircleButton" onClick={submitDday}>
                <MdAdd />
            </button>
            {ddayListExist ?
            (
                <div className="DdayScroll">
                    {ddayList.map((val) => {
                    return( 
                            <div key={val.index} className="DdaySet">
                                {calDday(val.date)>=0 ? 
                                (<p className="Ddayday">D-{calDday(val.date)}</p>) :
                                (<p className="Ddayday">D+{calDday(val.date) * (-1)}</p>)
                                }
                                <p className="DdayContent">{val.content}</p> 
                                <button className="DdayEditButton" onClick={() => {EditDdayBtn(val)}} >
                                    <RiEdit2Fill />
                                </button>
                                <button className="DdaydeleteBtn" onClick={() => {deleteDday(val.index);}}>
                                    <img src="img/delete.png" className="deleteImg"></img>
                                </button>
                                {isEdit && (index === val.index) && 
                                    (
                                        <div className="child">
                                            <input className="EditDday" id="EditYear" placeholder="년" onChange = {(e) => {setNewYear(Number(e.target.value))}} />
                                            <input className="EditDday" id="EditMonth" placeholder="월" onChange = {(e) => {setNewMonth(Number(e.target.value))}} />
                                            <input className="EditDday" id="EditDay" placeholder="일" onChange = {(e) => {setNewDate(Number(e.target.value))}} />
                                            <button className="DdayEditButton" onClick = {() => {changeDate(val.index)}}>
                                                <AiOutlineCheckCircle />
                                            </button>
                                            <input className="EditDdayContent" placeholder="일정" onChange = {(e) => {setNewDday(e.target.value)}} />
                                            <button className="DdayEditButton" onClick = {() => {changeCont(val.index)}}>
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
                <div className="DdayScroll">
                    <div className="DdaySet" />
                </div>
            )
            }
        </div>
    </div>
    );
    
}