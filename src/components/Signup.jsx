import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";
import axios from "axios";
import { AppContext } from "../App";
import { useContext, useState } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");


  const [response, setResponse] = useState(""); //All the exception from the api go here

  const signupAPI = async (newPost) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/cedrick_cs_workspace/ACLC_House_Registration_Auth/Register",
        newPost
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.messege); //mao ning ang message nga gikan sa API
      return;
    }
  };

  const signupFn = async () => {
    const data = {
      //mao ni unsaon pag post
      firstname: first_name,
      lastname: last_name,
      email: email,
      password: password,
    };

    const status = await signupAPI(data);

    status && navigate("/"); //meaning ani ig true ang status kay moadto siya sa default /
  };

  return (
    <div className="container">
      <h1>Register New Account</h1>
      <span style={{ fontSize: "13px", color: "red" }}>
        {response}
      </span>
      <div className="col-12">
        <input
          type="text"
          className="signup-container w-75"
          placeholder="First Name:"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="col-12">
        <input
          type="text"
          className="signup-container w-75"
          placeholder="Last Name:"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="col-12">
        <input
          type="text"
          className="signup-container w-75"
          placeholder="Email:"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="password"
          className="signup-container w-75"
          placeholder="Password:"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="col">
        <button onClick={signupFn} className="btn-signup">
          Sign up
        </button>
        <div className="w-75 text-end">
          <Link style={{ color: "black" }} to={"/"}>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};
