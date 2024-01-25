import { useContext } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const navigate = useNavigate();
  const { userData, setMemberID, setFirstName, setLastName, setEmail, setPhone, setYearLevel, setSection, setHouse } =
    useContext(AppContext);

  const getAPI = async () => {
    try {
      const data = await axios.get(
        `https://apex.oracle.com/pls/apex/cedrick_cs_workspace/ACLCHouseRegistrationMembers/GetAllListOfMembers`
      );
      return data.data.items;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const delMembers = (id) => {
    try {
      axios.delete(
        `https://apex.oracle.com/pls/apex/cedrick_cs_workspace/ACLCHouseRegistrationMembers/RemoveMembers/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const data = useQuery({
    queryKey: ["query"],
    queryFn: getAPI,
    refetchInterval: 500,
  });

  const toUpdate = (membersid, firstname, lastname, email, phone, yearlevel, section, house) => {
    setMemberID(membersid);
    setFirstName(firstname);
    setLastName(lastname);
    setEmail(email);
    setPhone(phone);
    setYearLevel(yearlevel);
    setSection(section);
    setHouse(house);
    navigate("/update");
  };

  return (
    <div className="task-container overflow-auto px-4">
      {data.isLoading && <h1>Loading...</h1>}
      <h1 className="title">List of Members</h1>
      <table>
        <thead>
          <tr>
            <th>Members ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Year Level</th>
            <th>Section</th>
            <th>house</th>
            <th>Date Registered</th>
            <th>Date Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        {data.data?.map((d) => {
          if (d.members_id !== 0) {
            return (
              <tbody>
                <tr>
                  <td>{d.members_id}</td>
                  <td>{d.first_name}</td>
                  <td>{d.last_name}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>{d.yearlevel}</td>
                  <td>{d.section}</td>
                  <td>{d.house_name}</td>
                  <td>{d.created_at}</td>
                  <td>{d.updated_at}</td>
                  <td><button onClick={() => delMembers(d.members_id)}>Delete</button><button onClick={() => toUpdate(d.members_id, d.first_name, d.last_name, d.email, d.phone, d.yearlevel, d.section, d.house_name)}>Edit</button></td>
                </tr>
              </tbody>
            );
          }
        })}
      </table>
      <i
        onClick={() => navigate("/add")}
        className="btn-add-task bi bi-plus-circle-fill"
      ></i>
      <i
        onClick={() => navigate("/")}
        className="btn-logout bi bi-box-arrow-in-left"
      ></i>
    </div>
  );
};
