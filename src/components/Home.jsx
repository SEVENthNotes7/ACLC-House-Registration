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
      //console.log(data.data.items);
      return data.data.items;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const statusAPI = async (newStatus, id) => {
    try {
      await axios.put(
        `https://apex.oracle.com/pls/apex/jao_workspace/todo/todo/status/${id}`,
        newStatus
      );
      return true;
    } catch (err) {
      console.log(err);
    }
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
  const handleStatus = async (status, id) => {
    const data = {
      status: status == true ? false : true,
    };
    await statusAPI(data, id);
  };

  return (
    <div className="task-container overflow-auto px-4">
      {data.isLoading && <h1>Loading...</h1>}
      {data.data?.map((d) => {
        console.log(d.members_id);
        if (d.members_id !== 0) {
          return (
            <div className="row justify-content-center">
              <div
                className="task-finished todo-task col-10"
                onClick={() => toUpdate(d.members_id)}
              >
                {d.members_id}
              </div>
              <div className="action">
                <i
                  onClick={() => navigate("/add")}
                  className="btn-add-task bi bi-plus-circle-fill"
                ></i>
                <i
                  onClick={() => navigate("/")}
                  className="btn-logout bi bi-box-arrow-in-left"
                ></i>
              </div>
            </div>
          );
        } 
      })}
    </div>
  );
};
