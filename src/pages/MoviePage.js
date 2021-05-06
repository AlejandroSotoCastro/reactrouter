import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

export default function MoviePage() {
  const route_parameters = useParams();

  const [movieData, set_movieData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=d564e94e&i=${route_parameters.imdb_id}`
      );
      console.log("data", response.data);
      set_movieData(response.data);
    }
    fetchData();
  }, [route_parameters.imdb_id]);

  if (!movieData) {
    return <div>Loading</div>;
  }

  console.log(route_parameters);
  // etc.
  return (
    <div>
      {" "}
      <div>
        <h1>
          {movieData.Title} ({movieData.Year})
        </h1>
        <p> {movieData.Genre}</p>
        <p>Director {movieData.Director} </p>
        <p>Language {movieData.Language} </p>
        <p>Plot {movieData.Plot} </p>
        <p>IMDB RATING {movieData.Ratings[0].Value} </p>
        <img
          src={movieData.Poster}
          alt={movieData.Title}
          style={{
            display: "block",
          }}
        ></img>
      </div>
    </div>
  );
}
