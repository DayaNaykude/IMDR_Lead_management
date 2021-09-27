import React from "react";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./home.css";

// backend imports
import { useSelector } from "react-redux";

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

  // *************** Backend Stuff

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <div>
      {error && <span className="error-message">{error}</span>}
      {loading && <h3>Loading...</h3>}
      <Grid>
        {userInfo && userInfo.isAdmin && (
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
