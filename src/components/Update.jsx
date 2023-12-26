import { useNavigate } from "react-router-dom";
import "../css/Update.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

export const Update = () => {
  const navigate = useNavigate();
  const { members_id, first_name, setFirstName, last_name, setLastName, email, setEmail, phone, setPhone, yearlevel, setYearLevel, section, setSection } = useContext(AppContext);
  const [response, setResponse] = useState("");
  const UpdateMembersDetails = async (updatePost) => {
    try {
      await axios.put(
        `https://apex.oracle.com/pls/apex/cedrick_cs_workspace/ACLCHouseRegistrationMembers/UpdateMembersDetails/${members_id}`,
        updatePost
      );
      return true;
    } catch (err) {
      setResponse(err.response.data.message);
      console.log(err);
      return;
    }
  };

  const handleUpdate = async () => {
    const data = {
      firstname: first_name,
      lastname: last_name,
      email: email,
      phone: phone,
      yearlevel: yearlevel,
      section: section,
    };
    const status = await UpdateMembersDetails(data);
    status && navigate("/home");
  };

  return (
    <div className="container">
      <h1>Update House Member Details</h1>
      <label>Member ID:</label><span>{members_id}</span>
      <p className="text-danger fw-bold">{response}</p>
      <span>First Name:</span>
      <input
        id="update-input"
        className="update-input w-100"
        type="text"
        defaultValue={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <span>Last Name</span>
      <input
        id="update-input"
        className="update-input w-100"
        type="text"
        defaultValue={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
      <span>Email</span>
      <input
        id="update-input"
        className="update-input w-100"
        type="text"
        placeholder="Update:"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>Phone</span>
      <input
        id="update-input"
        className="update-input w-100"
        type="text"
        placeholder="Update:"
        defaultValue={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <span>Year Level</span>
      <input
        id="update-input"
        className="update-input w-100"
        type="text"
        placeholder="Update:"
        defaultValue={yearlevel}
        onChange={(e) => setYearLevel(e.target.value)}
      />
      <span>Section</span>
      <input
        id="update-input"
        className="update-input w-100"
        type="text"
        placeholder="Update:"
        defaultValue={section}
        onChange={(e) => setSection(e.target.value)}
      />
      <button
        className="btn-update-delete w-100"
        onClick={handleUpdate}
      >
        Update
      </button>
      <button
        className="btn-update-delete w-100"
        onClick={() => navigate("/home")}
      >
        Cancel
      </button>
    </div>
    // <div className="container-fluid" style={{ height: "100vh" }}>
    //   <div className="row justify-content-center ">
    //     <div className="col-5 text-white ">
    //       <div className="update-container text-center ">
    //         <div className="update-task-container overflow-auto">
    //           <div className="row justify-content-center ">
    //             <div className="col-7 mt-4 ">

    //             </div>
    //             <div className="col-7 mt-4 ">

    //             </div>
    //             <div className="col-7 mt-4 ">
    //               {/* <button
    //                 className="btn-update-delete w-100"
    //                 onClick={handleDelete}
    //               >
    //                 Delete
    //               </button> */}
    //             </div>
    //           </div>
    //         </div>
    //         <i
    //           onClick={() => navigate("/home")}
    //           className="btn-return bi bi-arrow-return-left"
    //         ></i>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
