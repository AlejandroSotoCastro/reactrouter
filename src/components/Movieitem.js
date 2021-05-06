import React from "react";
import { Link } from "react-router-dom";
export default function Movieitem(props) {
  const { Title, Year, Poster, imdbID } = props.movie;

  return (
    <div className="MovieItem">
      <img
        src={Poster}
        alt={Title}
        style={{
          display: "block",
          maxWidth: "100%",
        }}
      ></img>

      <Link to={"/movie/" + imdbID}>{Title + " " + Year} </Link>
    </div>
  );
}
