import { useNavigate } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Loading from "/components/Loading";
import Movie from "/components/movie/Movie";


const MovieList = () => {
  const { data, loading } = useFetch("/api/movies");
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <ol>
        {
          loading ?
            <Loading /> :
            data.map((movie) => {
              return (
                <Movie key={movie.id} movie={movie} onClick={onClick} />
              );
            })
        }
      </ol>
    </div>
  );
};

export default MovieList;
