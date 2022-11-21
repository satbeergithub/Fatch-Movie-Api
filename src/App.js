import React, { useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';
import AddMovie from './components/AddMovie';
 
function App() {


  const [movies, setmovies]  = useState([])
  const[isloading , setloading]= useState(false)
  const[error, seterror]= useState(null)
  



 async function fetchmoviehandler ()  {
  setloading(true)
  seterror(null)

  
  try {
    const response = await fetch('https://react-https-8076-default-rtdb.firebaseio.com/movies.json')
    if(!response.ok){
      const message = 'something went wrong!!...please try again' 
      throw new Error (message);
     }
    const data = await response.json();
      console.log (data)
    const loadedmovies = [];
    for (const key in data ){
      loadedmovies.push({
        id:key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
        
      })
    }
    setmovies(loadedmovies)
  
  } 
  catch (error){
  seterror(error.message);
  }
  setloading(false);
 };


function addMovieHandler (mov) {
  fetch('https://react-https-8076-default-rtdb.firebaseio.com/movies.json', {
    method:'POST',
    body: JSON.stringify(mov),
    headers:{
      'Content-Type':'application/json'
    }
  })
}


let content = <p>found no movies</p>
if (movies.length > 0) {
  content = <MoviesList movies={movies} />
}
if (error) {
  content = <p>{error}</p>
}
if (isloading) {
  content=<p>loading....wait for a sec</p>
}

 
  return (
    <React.Fragment>
      <section>
        <AddMovie onaddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchmoviehandler}  >Fetch Movies</button>
      </section>
      <section>
       {/* {!isloading && <MoviesList movies={movies} />} 
       {!isloading &&  movies.length===0 && !error &&<p> Found no movie</p> }
      {!isloading  && error && <p>{error}</p>}
       {isloading && <p>loading....wait for a sec</p>} */}
 
     {content}

      </section>
    </React.Fragment>
  );
}

export default App;





// async function fetchmoviehandler ()  {
//   setloading(true)
//   seterror(null)

  
//   try {
//     const response = await fetch('url of star war api')
//     if(!response.ok){
//       const message = 'something went wrong!!...please try again' 
//       throw new Error (message);
//      }
//     const data = await response.json();
//      console.log(data)
//     const transformedmoviesdata = data.results.map(movieData =>{
//      return {
//        key: movieData.episode_id,
//        title: movieData.title,
//        openingText: movieData.opening_crawl,
//        releaseDate: movieData.release_date
 
//      };
//     })
//     setmovies(transformedmoviesdata)
  
//   } 
//   catch (error){
//   seterror(error.message);
//   }