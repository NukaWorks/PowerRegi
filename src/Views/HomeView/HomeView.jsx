import React from "react";
import EmptyDataBtn from "../../Common/Modules/EmptyDataBtn/EmptyDataBtn";
import "./HomeView.scss";

export default function HomeView() {
   return (
       <>
          <div className={"Dynamic__Header"}>
             <h1>Overview</h1>
          </div>

          <div className={"Dynamic__Content App__HomeView"}>
             <EmptyDataBtn/>
          </div>
       </>
   );
}
