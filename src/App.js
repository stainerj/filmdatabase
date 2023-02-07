import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory, useHistory } from "history"; 

import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

//https://www.youtube.com/watch?v=b9eMGE7QtTk

//API Key 
const API_URL = 'http://www.omdbapi.com/?apikey=keygoeshere'

/*const movie1 = {
    "Title": "Aprile",
    "Year": "1998",
    "imdbID": "tt0118635",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjk2ZGNjMWEtNDMxYy00OTk3LThhMmUtN2NkZTI5MzE4ZThmXkEyXkFqcGdeQXVyMzIwNDY4NDI@._V1_SX300.jpg"
  }*/

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const history = createBrowserHistory();
    //const [ locationKeys, setLocationKeys ] = useState([]);
    //const history = useNavigate();
 
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    }

    /*useEffect(() => {
      searchMovies('Paris');
    }, []);*/

    return (
      
      <div className="app">
        <h1>Film Database (The Open Movie Database)</h1>
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") 
                {searchMovies(searchTerm)}
                //history.push(searchTerm)
                history.push({
                  pathname: "/",// current path
                  search: searchTerm// param needed
                })
              }
            }
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0
            ? (
              <div className="container">
                {movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))}
            </div>
            ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )
        }

        
      </div>
  );
}

export default App;