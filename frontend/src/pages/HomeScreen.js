import React from "react";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";

import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import './home.css';



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 720,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const about = {
  backgroundColor: "#11a6da",
  color: "white",
  fontSize: "20px",
  padding: "20px",
  marginLeft: "350px",
  marginTop: "250px",
};
const btnStyle = {
  backgroundColor: "#11a6da",
  color: "white",
  width: "200px",
  fontSize: "20px",
  padding: "20px",
  marginLeft: "380px",
  marginTop: "250px",
};
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
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchData();
  }, [history]);

  return (
    <div
      className="imageStyle"
      style={{ backgroundImage: 'url("images/IMDRPicture.png")' }}
    >
      <Grid>
        {user && user.isAdmin && (
          <Button
            type="submit"
            style={btnStyle}
            variant="contained"
            fontSize="large"
            startIcon={<PeopleIcon fontSize="large" />}
            onClick={() => {
              history.push("/users");
            }}
          >
            USERS
          </Button>
        )}
        <Button
         type="submit"
         style={about}
         variant="contained"
         fontSize="large"
         startIcon={<PersonIcon fontSize="large" />}
         onClick={() => {
           history.push("/profile");
         }}
         >
          MY PROFILE
        </Button>
        
      </Grid>
    </div>
  );
};
export default Home;
