import { useContext, useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();
  const { userData, setUserData } = useContext(AppContext); //global variable para ma access sa tanan file

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [response, setResponse] = useState(""); //All the exception from the api go here

  const loginAPI = async (getPost) => {
    try {
      const data = await axios.post(
        //"https://apex.oracle.com/pls/apex/jao_workspace/account/account/login",
        "https://apex.oracle.com/pls/apex/cedrick_cs_workspace/ACLC_House_Registration_Auth/Login",
        getPost
      );
      setUserData(data.data); //ari ipasa ang mga ge kuha nga data sa table
      return true;
    } catch (err) {
      setResponse(err.response.data.message); //mao ning ang message nga gikan sa API
      return;
    }
  };

  const handleLogin = async () => {
    const data = {
      //mao ni unsaon pag kuha sa data sa table
      email: email,
      password: password,
    };

    const status = await loginAPI(data);
    status && navigate("/home"); //meaning ani ig true ang status kay moadto siya sa /home
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center login-container align-content-center">
          <div className="col-4 border align-content-center text-center login-form">
            <div className="login-title">Log in</div>
            <span style={{ fontSize: "13px", color: "red" }}>{response}</span>
            <div className="row justify-content-center mt-3">
              <div className="col-8">
                <input
                  className="input-container w-100"
                  type="text"
                  placeholder="Email:"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <div className="col-8">
                <input
                  className="input-container w-100"
                  type="password"
                  placeholder="Password:"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <div className="col-8">
                <button onClick={handleLogin} className="login-btn w-100">
                  Log in
                </button>
              </div>
            </div>
            <div className="row justify-content-center mt-2 mb-3">
              <div className="signup-sec">
                <Link to={"/signup"} className="text-white">
                  Create Account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
