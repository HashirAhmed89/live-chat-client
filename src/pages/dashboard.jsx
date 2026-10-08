import React from "react";
import Analytics from "./analytics";
import Conversation from "./conversation";
import Ticket from "./ticket";
import Customer from "./customer";
import Agent from "./agent";

const dashboard = () => {
  return (
    <>
      <Analytics />
      <Conversation />
      <Ticket />
      <Customer />
      <Agent />
    </>
  );
};

export default dashboard;
