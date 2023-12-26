import { useContext } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const navigate = useNavigate();
  const { userData, updateId, setUpdateId, setUpdateTitle } =
    useContext(AppContext);

  const getTodoAPI = async () => {
    try {
      const data = await axios.get(
        //`https://apex.oracle.com/pls/apex/jao_workspace/todo/todos/${userData?.account_id}`
        `https://apex.oracle.com/pls/apex/cedrick_cs_workspace/ACLCHouseRegistrationMembers/GetAllListOfMembers`
      );
      return data.data.items;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const delMembers = (id) => {
    console.log(id);
  };

  const data = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoAPI,
    refetchInterval: 500,
  });

  const toUpdate = (todoId, title) => {
    setUpdateId(todoId);
    setUpdateTitle(title);
    navigate("/update");
  };
  return (
    <div className="task-container overflow-auto px-4">
      {data.isLoading && <h1>Loading...</h1>}
      <h1 className="title">List of Members</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Year Level</th>
            <th>Section</th>
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
                  <td>{d.created_at}</td>
                  <td>{d.updated_at}</td>
                  <td><button onClick={() => delMembers(d.members_id)}>Delete</button><button onClick={() => toUpdate(d.members_id)}>Update</button></td>
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
