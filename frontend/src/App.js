import React from "react";
import SignInOutContainer from "./containers";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import ResetPasswordScreen from "./pages/ResetPasswordScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserListScreen from "./pages/HomePageFolder/UserListScreen";
import TasksScreenUser from "./pages/TaskScreen/TasksScreenUser";
import HelpScreen from "./pages/HelpScreen";
import DashboardScreen from "./pages/DashboardScreen";
import SettingScreen from "./pages/SettingScreen";
import Navbar from "./components/Navbar/NavbarScreen";
import Footer from "./components/Footer";
import UserProfileScreen from "./pages/HomePageFolder/UserProfileScreen";
import AddContact from "./pages/TaskScreen/AddContactScreen";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={SignInOutContainer} />
          <Route exact path="/register" component={SignInOutContainer} />
          <Route
            exact
            path="/forgotpassword"
            component={() => <ForgotPasswordScreen />}
          />
          <Route
            exact
            path="/resetpassword/:resetToken"
            component={() => <ResetPasswordScreen />}
          />
          <Route exact path="/users" component={() => <UserListScreen />} />
          <Route
            exact
            path="/profile"
            component={() => <UserProfileScreen />}
          />
          <Route exact path="/add" component={() => <AddContact />} />

          <div>
            <Navbar />
            <Route exact path="/" component={() => <TasksScreenUser />} />
            {/* <Route exact path="/"></Route> */}

            {/* <Route exact path="/Task" component={() => <TasksScreenUser />} /> */}
            <Route
              exact
              path="/Dashboard"
              component={() => <DashboardScreen />}
            />
            <Route exact path="/Help" component={() => <HelpScreen />} />
            <Route exact path="/Settings" component={() => <SettingScreen />} />
          </div>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
