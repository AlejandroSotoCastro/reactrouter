import { useState } from "react";
import axios from "axios";
import Movieitem from "../components/Movieitem";

export default function DiscoverMoviesPage() {
  const [searchText, set_searchText] = useState("");
  const [searchState, set_searchState] = useState({ status: "idle" });

  const search = async () => {
    console.log("TODO search movies for:", searchText);
    set_searchState({ status: "searching" });
    const queryParam = encodeURIComponent(searchText);

    // const data = await fetch(
    //   `https://www.omdbapi.com/?apikey=d564e94e&s=${queryParam}`
    // ).then((r) => r.json());

    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=d564e94e&s=${queryParam}`
    );
    if (response.data.Error) {
      console.log("no movie");
    } else {
      set_searchState({ status: "done", data: response.data.Search });
      console.log("Yei", response.data.Search);
    }
  };

  return (
    <div>
      <h1>Discover some movies!</h1>

      <p>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>
      <div>
        {searchState.status === "searching" && "loading"}

        <div
          style={{
            margin: "0 100px",
          }}
        >
          <h2>Search results</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {searchState.status === "done" &&
              searchState.data.map((movie) => {
                return <Movieitem key={movie.imdbID} movie={movie} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
