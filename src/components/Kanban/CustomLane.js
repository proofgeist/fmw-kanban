import React, { useState } from "react";

import {
  Title,
  LaneHeader,
  RightContent
} from "react-trello/dist/styles/Base.js";
// import LaneMenu from "./LaneHeader/LaneMenu";

function MyLane(props) {
  return (
    <div style={{ backgroundColor: "red" }} onClick={props.onClick}>
      <LaneHeader>
        <Title>{"Hi"}</Title>
        <RightContent>{"label"}</RightContent>
      </LaneHeader>
      )}
    </div>
  );
}

export default MyLane;
