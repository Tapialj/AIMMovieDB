import useFetch from "/hooks/useFetch";

import ActorForm from "/components/forms/ActorForm";
import Loading from "/components/Loading";


const AddActor = () => {
  const { data: movies, loading: loadingMovies } = useFetch("/api/movies");

  return (
    <>
      <h1>Add Actor</h1>

      {
        loadingMovies ?
          <Loading /> :
          <ActorForm movies={movies} />
      }
    </>
  );
};

export default AddActor;
