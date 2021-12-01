import React from "react";
//import { Redirect } from "react-router-dom";
const Dashboard = () => {
  const textStyle = {
    marginTop: "50px",
    marginLeft: "42%",
    color: "red",
  };

  const chartstyle = (w, h) => {
    return {
      background: " #FFFFFF",
      border: "none",
      borderRadius: "2px",
      boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
      width: `${w}vw`,
      height: `${h}vh`,
      margin: "1%",
    };
  };

  const autoRefresh = 3000;

  const src_leads_count = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=5f79da52-0be2-4fe3-93a1-ed6226d2c72b&autoRefresh=${autoRefresh}&theme=light`;
  const src_leadsByUsers = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=41ca7f72-81f9-449a-a35a-51068b600677&autoRefresh=${autoRefresh}&theme=light`;
  const src_leadsByStatus = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=f6194110-3880-47ee-baf4-4bb52bd4491f&autoRefresh=${autoRefresh}&theme=light`;
  const src_leadsByUsersStatus = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=2acec488-b46e-4332-a0e5-301ba20a113c&autoRefresh=${autoRefresh}&theme=light`;
  const src_leadsByEntrance = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=f3868207-dde1-4db1-bb1e-b2b55ca965aa&autoRefresh=${autoRefresh}&theme=light`;
  const src_leadsBySource = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=699b26f7-d0c5-4a0f-a158-474f676ef9fa&autoRefresh=${autoRefresh}&theme=light`;
  const src_leadsByCity = `https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=74d9ff32-61ed-491c-939d-f78fea3a713a&autoRefresh=${autoRefresh}&theme=light`;

  return (
    <>
      <h1 style={textStyle}>Dashboard</h1>
      <iframe
        style={chartstyle(46, 60)}
        src={src_leads_count}
        title="src_leads_count"
      ></iframe>
      <iframe
        style={chartstyle(46, 60)}
        src={src_leadsByUsers}
        title="src_leadsByUsers"
      ></iframe>
      <iframe
        style={chartstyle(46, 60)}
        src={src_leadsByStatus}
        title="src_leadsByStatus"
      ></iframe>
      <iframe
        style={chartstyle(46, 60)}
        src={src_leadsByUsersStatus}
        title="src_leadsByUsersStatus"
      ></iframe>
      <iframe
        style={chartstyle(92, 80)}
        src={src_leadsByEntrance}
        title="src_leadsByEntrance"
      ></iframe>
      <iframe
        style={chartstyle(92, 80)}
        src={src_leadsBySource}
        title="src_leadsBySource"
      ></iframe>
      <iframe
        style={chartstyle(92, 80)}
        src={src_leadsByCity}
        title="src_leadsByCity"
      ></iframe>
    </>
  );
};
export default Dashboard;
