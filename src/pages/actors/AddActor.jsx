import useFetch from "/hooks/useFetch";

import ActorForm from "/components/forms/ActorForm";
import Loading from "/components/Loading";


const AddActor = () => {
  const { data: movies, loading: loadingMovies } = useFetch("/api/movies");

  return (
    <main className="actor-form">
      <h1>Add Actor</h1>

      {
        loadingMovies ?
          <Loading /> :
          <ActorForm movies={movies} />
      }
    </main>
  );
};

export default AddActor;
