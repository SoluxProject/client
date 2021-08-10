import "../SignUp.css";  
import React from 'react';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

function SignUp() {

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');

  const submitSignUp = () => {
    Axios.post('join', {
      name: name,
      id: id,
      pw: pw, 
      email: email,
      major: major
    }).then(res => {
      console.log(res);
      alert(res.data)
    });
  };

  return ( 
    <div className="SignUp">
        <div>
            <div className="signup-row signup-justify-content-center">
            <section className="signup-page-section" id="contact">
            <div className="container-signup">
            <h2 className="text-signup">SignUp</h2>
                    <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                    </div>
                <form id="contactForm-signup" data-sb-form-api-token="API_TOKEN"> 
                    <div className="signup-form-floating signup-mb-3">
                        <input className="input-signup" id="name" type="text" placeholder="이름" onChange={(e) => {
                          setName(e.target.value);
                        }}/>
                       
                    </div> 
                    <div className="signup-form-floating signup-mb-3">
                        <input className="input-signup" id="id" type="text"  placeholder="ID" onChange={(e) => {
                          setId(e.target.value);
                        }}/>
                       
                    </div> 
                    <div className="signup-form-floating signup-mb-3">
                        <input className="input-signup" id="pw" type="text" placeholder="PW" onChange={(e) => {
                          setPw(e.target.value);
                        }}/>
                        
                    </div>  
                    <div className="signup-form-floating signup-mb-3">
                        <input className="input-signup" id="email" type="text" placeholder="email" onChange={(e) => {
                          setEmail(e.target.value);
                        }}/>
                       
                    </div> 
                    <div className="signup-form-floating signup-mb-3">
                        <input className="input-signup" id="major" type="text" placeholder="major" onChange={(e) => {
                          setMajor(e.target.value);
                        }}/>
                        
                    </div> 
                    <Link to="/auth/login">
                      <button className="signup-btn" id="signUp-Button" onClick={submitSignUp}>회원가입하기</button> 
                    </Link>
                    
                </form>
           
            </div>
            </section>
        </div> 
      </div>
    </div>
    
  );
};

export default SignUp;