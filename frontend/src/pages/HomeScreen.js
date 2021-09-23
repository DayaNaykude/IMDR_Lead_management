import React from "react";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons//Person";
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./home.css";

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

  const about = {
    backgroundColor: "#11a6da",
    color: "white",
    fontSize: "20px",
    padding: "10px 20px 20px 20px",
    marginLeft: "400px",
    marginTop: "20px",
  };
  const btnStyle = {
    backgroundColor: "#11a6da",
    color: "white",
    width: "200px",
    fontSize: "20px",
    padding: "10px 20px 20px 20px",
    marginLeft: "450px",
    marginTop: "25px",
  };
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
          startIcon={<PersonIcon fontSize="large" />}
        >
          ABOUT ME
        </Button>
      </Grid>
    </div>
  );
};
export default Home;
