import React from "react";
import styled from "styled-components";

const Status = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: whitesmoke;
  border-top-left-radius: 5px;
  -webkit-user-select: none;
  user-select: none;
`;

export default function StatusOverlay() {
   if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      return (
          <Status className={"App__StatusOverlay"}>
             <div className={"App__StatusOverlay--Content"}>
                <h3>{process.env.NODE_ENV === "development" ? "Devel Mode" : ""}</h3>
             </div>
          </Status>
      );
   }
}
