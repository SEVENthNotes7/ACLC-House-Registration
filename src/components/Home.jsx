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
        `https://apex.oracle.com/pls/apex/jao_workspace/todo/todos/${userData?.account_id}`
      );
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
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row justify-content-center ">
        <div className="col-3 d-flex justify-content-center align-items-center">
          <div className="animal-img"></div>
        </div>
        <div className="col-5">
          <div className="todo-container text-center ">
            <div className="task-container overflow-auto px-4">
              {data.isLoading && <h1>Loading...</h1>}
              {data.data?.map((d) => {
                if (d.status === 0) {
                  return (
                    <div className="row justify-content-center">
                      <div
                        className="todo-task col-10"
                        onClick={() => toUpdate(d.todo_id, d.title)}
                      >
                        {d.title}
                      </div>
                      <div className="col-1 pt-3">
                        <i
                          className="task-checkbox bi bi-clipboard2-check"
                          onClick={() => handleStatus(d.status, d.todo_id)}
                        ></i>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="row justify-content-center">
                    <div
                      className="task-finished todo-task col-10"
                      onClick={() => toUpdate(d.todo_id, d.title)}
                    >
                      {d.title}
                    </div>
                    <div className="col-1 pt-3">
                      <i
                        className="checkbox-finish task-checkbox bi bi-clipboard2-check"
                        onClick={() => handleStatus(d.status, d.todo_id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
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
        <div className="col-3 d-flex justify-content-center align-items-center">
          <div className="animal-img"></div>
        </div>
      </div>
    </div>
  );
};
