import { useNavigate, useParams } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Loading from "/components/Loading";
import CastCrew from "/components/movie/CastCrew";
import MovieHero from "/components/movie/MovieHero";
import Trailer from "/components/movie/Trailer";


const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, loading } = useFetch(`/api/movies/${id}`);
  const navigate = useNavigate();
  
  const onEditMovieClick = () => {
    navigate(`/edit-movie/${id}`);
  };

  return (
    <main className="movie-details">
      {
        loading ?
          <Loading /> :
          <>
            <MovieHero movie={movie} onEditMovieClick={onEditMovieClick} />
            <Trailer trailer={movie.trailerUrl} />
            <CastCrew movie={movie} />
          </>
      }
    </main>
  );
};

export default MovieDetails;
