import moment from "moment";
import { Link } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";
import MovieInfo from "/components/movie/MovieInfo";


const MovieHero = ({ movie, onEditMovieClick }) => {
  const { auth } = useAuth();

  return (
    <>
      <div className="route">
        <h3>
          <Link to="/movies">
            <span>Movies</span>
          </Link>
          &emsp;/&emsp;{movie.title}
        </h3>
      </div>

      <div className="movie-title flex row">
        <h1>
          {movie.title} <span className="subtitle">({moment(movie.releaseDate).format("YYYY")})</span>
        </h1>
        {
          auth?.user?.roles?.includes("USER") &&
            <Button title="Edit" onClick={onEditMovieClick} />
        }
      </div>

      <MovieInfo movie={movie} />
    </>
  );
};

export default MovieHero;
