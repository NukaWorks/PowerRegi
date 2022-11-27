import React from "react";
import { NavLink } from "react-router-dom";
import "./ConsoleMgmt.scss";

export default function ConsoleMgmt() {
  return (
    <>
      <div className={"Dynamic__Header"}>
        <h1>Console Management</h1>
      </div>

      <div className={"Dynamic__Content App__ConsoleMgmt"}>
        <p>Console Management</p>
        <NavLink to={"/idmsa?logout=true&redirect=/console"}>Logout</NavLink>
      </div>
    </>
  );
}
