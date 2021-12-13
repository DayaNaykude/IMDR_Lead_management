import React from "react";
import SignInOutContainer from "./containers";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import ResetPasswordScreen from "./pages/ResetPasswordScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserListScreen from "./pages/HomePageFolder/UserListScreen";
import ReportScreen from "./pages/ReportScreen";
import HelpScreen from "./pages/HelpScreen";
import DashboardScreen from "./pages/DashboardScreen";
import SettingScreen from "./pages/SettingScreen";
import Navbar from "./components/Navbar/NavbarScreen";
// import Footer from "./components/Footer";
import UserProfileScreen from "./pages/HomePageFolder/UserProfileScreen";
import AddContact from "./pages/TaskScreen/AddContactScreen";
import LeadDetails from "./pages/TaskScreen/LeadDetailsScreen";
import TaskScreen from "./pages/TaskScreen/TaskScreen";
import DataScreen from   "./pages/DataScreen";
import TrashScreen from "./pages/TrashScreen";

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
          <Route exact path="/report" component={() => <ReportScreen />} />
          <Route
            exact
            path="/profile"
            component={() => <UserProfileScreen />}
          />
          <Route exact path="/add" component={() => <AddContact />} />
          <Route exact path="/view" component={() => <LeadDetails />} />

          <div>
            <Navbar />
            <Route exact path="/" component={() => <TaskScreen />} />
            <Route
              exact
              path="/Dashboard"
              component={() => <DashboardScreen />}
            />
             <Route
              exact
              path="/trash"
              component={() => <TrashScreen />}
            />
            <Route
              exact
              path="/data"
              component={() => <DataScreen />}
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
