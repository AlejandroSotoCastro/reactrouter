import React from "react";

export default function Movieitem(props) {
  const { Title, Year, Poster, imdbID } = props.movie;
  console.log(Poster);
  return (
    <div className="MovieItem">
      <img
        src={Poster}
        alt={Poster}
        style={{
          display: "block",
          maxWidth: "100%",
        }}
      ></img>

      {Title + " " + Year}
    </div>
  );
}
