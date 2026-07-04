import { useNavigate } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";
import MovieList from "/components/movie/MovieList";


const Movies = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const onAddMovieClick = () => {
    navigate("/add-movie");
  };

  return (
    <main className="movies flex no-align">
      <section className="flex row">
        <h1>Movies</h1>
        {
          auth?.user?.role?.includes("USER") &&
            <Button title="Add Movie" onClick={onAddMovieClick} />
        }
      </section>
      <MovieList />
    </main>
  );
};

export default Movies;
