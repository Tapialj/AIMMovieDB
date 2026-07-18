import useFetch from "/hooks/useFetch";

import DirectorForm from "/components/forms/DirectorForm";
import Loading from "/components/Loading";


const AddDirector = () => {
  const { data: movies, loading: loadingMovies } = useFetch("/api/movies");

  return (
    <main className="director-form">
      <h1>Add Director</h1>

      {
        loadingMovies ?
          <Loading /> :
          <DirectorForm movies={movies} />
      }
    </main>
  );
};

export default AddDirector;
