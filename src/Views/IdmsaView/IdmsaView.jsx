import React from "react";
import "./IdmsaView.scss";
import Idmsa from "../../Common/Modules/Idmsa/Idmsa";

export default function IdmsaView() {
   return (
       <>
          <div className={"Dynamic__Header"}>
             <h1>Login to PowerRegi</h1>
          </div>

          <div className={"Dynamic__Content App__IdmsaView"}>
             <Idmsa/>
          </div>
       </>
   );
}
