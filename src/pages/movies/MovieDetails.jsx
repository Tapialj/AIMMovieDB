import { useNavigate, useParams } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Loading from "/components/Loading";
import CastCrew from "/components/movie/CastCrew";
import MovieHero from "/components/movie/MovieHero";
import Trailer from "/components/movie/Trailer";


const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, loading: movieLoad } = useFetch(`/api/movies/${id}`);
  const { data: directors, loading: directorsLoad } = useFetch(`/api/movies/${id}/directors`);
  const { data: actors, loading: actorsLoad } = useFetch(`/api/movies/${id}/actors`);
  const navigate = useNavigate();
  
  const onEditMovieClick = () => {
    navigate(`/movies/edit/${id}`);
  };

  return (
    <main className="movie-details">
      {
        (movieLoad || directorsLoad || actorsLoad) ?
          <Loading /> :
          <>
            <MovieHero movie={movie} onEditMovieClick={onEditMovieClick} />
            <Trailer trailer={movie.trailerUrl} />
            <CastCrew actors={actors} directors={directors} />
          </>
      }
    </main>
  );
};

export default MovieDetails;
