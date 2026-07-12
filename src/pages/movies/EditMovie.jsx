import { useParams } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import MovieForm from "/components/forms/MovieForm";
import Loading from "/components/Loading";


const EditMovie = () => {
  const { id } = useParams();
  const { data: movie, loading: movieLoad } = useFetch(`/api/movies/${id}`);
  const { data: actors, loading: actorsLoad } = useFetch(`/api/movies/${id}/actors`);

  return (
    <>
      <h1>Edit Movie</h1>

      {
        (movieLoad || actorsLoad) ?
          <Loading /> :
          <MovieForm movie={movie} movieActors={actors} />
      }
    </>
  );
};

export default EditMovie;
