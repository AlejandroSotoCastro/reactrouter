import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/">HomePage</Link>
      {" - "}
      <Link to="/about">About this website</Link>
      {" - "}
      <Link to="/discover">Discover it</Link>
    </div>
  );
}
