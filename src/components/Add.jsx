import { useContext, useState } from "react";
import "../css/Add.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const Add = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  // const [title, setTitle] = useState("");
  // update Parameters.
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yearlevel, setYearLevel] = useState("");
  const [section, setSection] = useState("");

  const [response, setResponse] = useState("");

  const addAPI = async (newMember) => {
    try {
      await axios.post(
        "https://apex.oracle.com/pls/apex/cedrick_cs_workspace/ACLCHouseRegistrationMembers/AddMembers",
        newMember
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      return;
    }
  };

  const addMembers = async () => {
    // console.log(first_name);
    // console.log(last_name);
    // console.log(email);
    // console.log(phone);
    // console.log(yearlevel);
    // console.log(section);
    const member = {
      firstname: first_name,
      lastname: last_name,
      email: email,
      phone: phone,
      yearlevel: yearlevel,
      section: section,
    };
    const status = await addAPI(member);
    status && navigate("/home");
  };

  return (
    <div className="container">
      <div className="add">
        <h1>Add Member to the List</h1>
        <p className="text-danger fw-bold">{response}</p>
        <span>First Name:</span><input
          className="add-input w-100"
          type="text"
          placeholder="First Name:"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <span>Last Name:</span>
        <input
          className="add-input w-100"
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <span>Email</span>
        <input
          className="add-input w-100"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Phone No.</span>
        <input
          className="add-input w-100"
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <span>Year Level:</span>
        <input
          className="add-input w-100"
          type="text"
          placeholder="Year Level"
          onChange={(e) => setYearLevel(e.target.value)}
        />
        <span>Section:</span>
        <input
          className="add-input w-100"
          type="text"
          placeholder="Section"
          onChange={(e) => setSection(e.target.value)}
        />
        <button className="btn-add w-100" onClick={addMembers}>
          Add
        </button>
      </div>
      <i
        onClick={() => navigate("/home")}
        className="btn-return bi bi-arrow-return-left"
      ></i>
    </div>
  );
};
