import React from "react";
import navbar from "../Components/navbar";

const mainlayout = ({ childrens }) => {
  return <>
  <navbar/>
  {childrens}
  </>;
};

export default mainlayout;
