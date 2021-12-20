import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
//import { Redirect } from "react-router-dom";
const Help=()=>{
    let history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);


return(
    <div>
    {userInfo && userInfo.isAdmin && (
       <p>hii</p>
    )}
    </div>
)
};
export default Help;