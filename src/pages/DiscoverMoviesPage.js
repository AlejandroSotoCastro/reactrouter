import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import Movieitem from "../components/Movieitem";

export default function DiscoverMoviesPage() {
  const history = useHistory();
  const { searchtext } = useParams();

  const [searchText, set_searchText] = useState("");
  const [searchState, set_searchState] = useState({ status: "idle" });

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  //   const search = async () => {
  //     console.log("TODO search movies for:", searchText);
  //     set_searchState({ status: "searching" });
  //     const queryParam = encodeURIComponent(searchText);

  //     // const data = await fetch(
  //     //   `https://www.omdbapi.com/?apikey=d564e94e&s=${queryParam}`
  //     // ).then((r) => r.json());

  //     const response = await axios.get(
  //       `https://www.omdbapi.com/?apikey=d564e94e&s=${queryParam}`
  //     );

  //     if (response.data.Error) {
  //       console.log("no movie");
  //     } else {
  //       set_searchState({ status: "done", data: response.data.Search });
  //       console.log("Yei", response.data.Search);
  //     }
  //   };

  useEffect(() => {
    async function fetchData() {
      if (!searchtext || searchtext === "") {
        set_searchState({ status: "idle" });
        return;
      }
      set_searchState({ status: "searching" });
      const queryParam = encodeURIComponent(searchtext);
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=d564e94e&s=${queryParam}`
      );
      console.log("data", response.data);

      set_searchState({ status: "done", data: response.data.Search });
    }
    fetchData();
  }, [searchtext]);

  return (
    <div>
      <h1>Discover some movies!</h1>

      <p>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button onClick={navigateToSearch}>Search</button>
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
