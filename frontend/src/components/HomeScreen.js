import React from "react";
//import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const HomeScreen = () => {
  let history = useHistory();
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/auth/home", config);
        setUser(data);
        console.log(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div>Welcome to home page</div>;
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};
export default HomeScreen;
