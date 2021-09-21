// import { fontSize } from "@mui/system";
import React from "react";
import "./home.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//import { Redirect } from "react-router-dom";

const Home = () => {
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

  const homeStyle = {
    margin: "200px",
  };

  return (
    <div className="home">
      <img src="images/IMDRPicture.png" className="imageStyle"></img>
      hello
    </div>
  );
};
export default Home;
