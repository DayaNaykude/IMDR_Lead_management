import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TasksScreenUser from "./TasksScreenUser";
import TaskScreenAdmin from "./TasksScreenAdmin";

const TaskScreen = () => {
  let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <>
      {userInfo && userInfo.isAdmin ? <TaskScreenAdmin /> : <TasksScreenUser />}
    </>
  );
};

export default TaskScreen;
