import "../Login.css";
import React, {useState} from 'react';
import Axios from "axios";
import {Link} from 'react-router-dom';
import {useHistory} from "react-router-dom";

function Login() {
  const [id, setId] = useState("");
  const[pw, setPw] = useState("");

  let history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    Axios.post("/auth/login", null, {
    params: {
      'id': id,
      'pw': pw,
    }
  })
  
  .then(res => {
    console.log(res.data);
    alert(res.data);
    window.location.href = "/";
    // history.push(`/${res.data}`);
    // history.push("/");
  })
  // .then(history.push("/"));
  
  //.then(window.location.href = "/");
};

return (
  <div className="Login">
    <div>
      <div className="login-row login-justify-content-center">
        <section className="login-page-section" id="contact">
          <div className="container-login">
            <h2 className="login-text">LOGIN</h2>
              <div className="divider-custom">
                <div className="divider-custom-line"></div>
                </div>
                <div className="login-row login-justify-content-center">
                  <div className="col-lg-8">
                    <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                      <div className="form-floating mb-3">
                        <input className="input-login" id="name" type="text" data-sb-validations="required" placeholder="ID"
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <input className="input-login" id="pw" type="text" data-sb-validations="required,email" placeholder="PW"
                        onChange={(e) => {
                          setPw(e.target.value);
                        }}
                        />
                      </div>
                      <button className="login-btn" style={{ width:312.594, marginBottom: '10px', textDecoration: 'none'}} onClick={submit}>로그인</button>
                      <br></br>
                      <Link to='/auth/search'>
                        <button className="login-btn" type="submit">ID/PW 찾기</button>
                      </Link>
                      <Link to="/auth/join">
                        <button className="login-btn">회원가입</button>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
  </div>
);
}

export default Login;