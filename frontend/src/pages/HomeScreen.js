import React from "react";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import AboutScreen from "../pages/HomePageFolder/AboutScreen";

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
  marginLeft: "400px",
  marginTop: "20px",
};
const btnStyle = {
  backgroundColor: "#11a6da",
  color: "white",
  width: "200px",
  fontSize: "20px",
  padding: "20px",
  marginLeft: "450px",
  marginTop: "25px",
};
const Home = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          style={about}
          startIcon={<PersonIcon fontSize="large" />}
          onClick={handleOpen}
        >
          MY PROFILE
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <AboutScreen />
          </Box>
        </Modal>
      </Grid>
    </div>
  );
};
export default Home;
