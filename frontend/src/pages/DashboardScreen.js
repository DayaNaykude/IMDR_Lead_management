import React from "react";
//import { Redirect } from "react-router-dom";
const Dashboard = () => {
  const style1 = {
    background: " #FFFFFF",
    border: "none",
    borderRadius: "2px",
    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
    width: "640px",
    height: "480px",
  };

  const src1 =
    "https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=41ca7f72-81f9-449a-a35a-51068b600677&autoRefresh=28800&theme=light";
  const src2 =
    "https://charts.mongodb.com/charts-project-0-yxocx/embed/charts?id=2acec488-b46e-4332-a0e5-301ba20a113c&autoRefresh=28800&theme=light";

  return (
    <>
      <iframe style={style1} src={src1}></iframe>
      <iframe style={style1} src={src2}></iframe>
    </>
  );
};
export default Dashboard;
