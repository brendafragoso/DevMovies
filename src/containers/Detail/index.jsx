
import { useEffect, useState } from "react";
import { Container, Background, Cover, Info, ContainerMovies } from "./styles";
import { getImages } from "../../utils/getImages"
import { useParams } from "react-router-dom";
import { getMovieById, getMovieCredits, getMovieSimilar, getMovieVideos } from "../../services/getData";
import SpanGenres from "../../components/SpanGenres";
import Credits from "../../components/Credits";


function Detail() {
  const { id }  = useParams()
  const [movie, setMovie] = useState()
  const [movieVideos, setMovieVideos] = useState()
  const [movieCredits, setMovieCredits] = useState()
  const [movieSimilar, setMovieSimilar] = useState()

  
  useEffect(() => {
    async function getAllData() {
      Promise.all([
        getMovieById(id),
        getMovieVideos(id),
        getMovieCredits(id),
        getMovieSimilar(id)
      ])
        .then(([movie, videos, credits, similar]) => { 
          console.log('Movie:', movie);
          console.log('Videos:', videos);
          console.log('Credits:', credits);
          console.log('Similar:', similar);
  
          setMovie(movie);
          setMovieVideos(videos);
          setMovieCredits(credits);
          setMovieSimilar(similar);
        })
        .catch((error) => console.error(error))
    }
    getAllData();
  }, []);
  

  console.log('movieVideos:', movieVideos);
  
  return (
    <>
    {movie && (
      <>
    <Background image={getImages (movie.backdrop_path)} />
    <Container>
      <Cover>
       <img src= {getImages (movie.poster_path)}/>

      </Cover>
      <Info>
      <h2>{movie.title}</h2>
      <SpanGenres genres = {movie.genres}/>
      <p>{movie.overview}</p>
      <div>
        <Credits credits={movieCredits}/>
      </div>
      </Info>
    </Container>
    <ContainerMovies>
    {Array.isArray(movieVideos) &&
    movieVideos.map((video) => (
      <div key={video.id}>
        <h4>{video.name}</h4>
        <iframe
          src={`https://www.youtube.com/embed/${video.key}`}
          title='Youtube Video Player'
          height="500px"
          width="100%"
        ></iframe>
      </div>
    ))}
</ContainerMovies>
    </>
  )}
  </>
)}

export default Detail