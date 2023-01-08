import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube" 
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl,isLarge }) {

  const [movies, setMovies] = useState([]);  // empty array initially
  const [trailerUrl,setTrailerUrl]=useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results);   // request.data.results is an array
      return request;
    }
    fetchData();  // calling the function
  }, [fetchUrl]);   //  fetchUrl is a dependency

  const opts = {         // from documentation of react-youtube npm
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick=(movie)=>{
    if(trailerUrl){
      setTrailerUrl("");
    }
    else{
      movieTrailer(movie?.name|| "")
      .then((url)=>{
        const urlParams=new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error)=>console.log(error));
    }
  }

  console.log(movies);

  return (
    <div className='row'>

      <h2>{title}</h2>

       <div className='row_posters'>
        {movies.map(movie => (
          <img className={`row_poster ${isLarge && "row_posterLarge"}`} onClick={(movie) => handleClick(movie)} key={movie.id} src={`${base_url}${isLarge ? movie.poster_path: movie.backdrop_path}`} onError={(event) => event.target.style.display = 'none'} alt={movie.name} />  
        ))}
      </div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}  {/*if trailerUrl is present then play the trailer*/}
    </div>
  )
}

export default Row
