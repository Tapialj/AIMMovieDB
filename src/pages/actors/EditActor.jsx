import { useParams } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import ActorForm from "/components/forms/ActorForm";
import Loading from "/components/Loading";


const EditActor = () => {
  const { id } = useParams();
  const { data: actor, loading: loadingActor } = useFetch(`/api/actors/${id}`);
  const { data: movies, loading: loadingMovies } = useFetch("/api/movies");
  const { data: acted, loading: loadingActed } = useFetch(`/api/actors/${id}/movies`);
  
  return (
    <>
      <h1>Edit Actor</h1>

      {
        (loadingActor || loadingMovies || loadingActed) ?
          <Loading /> :
          <ActorForm actor={actor} movies={movies} acted={acted} />
      }
    </>
  );
};

export default EditActor;
