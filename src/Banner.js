import React, {useState,useEffect} from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {
    const [movie,setMovie]=useState([]);  // state for the random movie that is selected as banner every time the site reloads
    
  useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchTrending);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length-1)]);
            return request;
        }
        fetchData();
    },[]);  // runs once when the site reloads as their is no dependency 

    console.log(movie);

    function truncate(str,n){
        return str?.length> n ? str.substr(0,n-1)+"...." : str ;
    }

  return (
    <header className='banner' 
      style={{backgroundSize:"cover" , 
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")`,
              backgroundPosition:"center center"}}>

      <div className="banner_contents">
        <h1 className='banner_title'>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">
            {truncate(movie?.overview,170)} 
        </h1>

      </div>
      <div className="banner-fade"/>
    </header>
  )
}

export default Banner
