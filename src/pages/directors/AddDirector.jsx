import useFetch from "/hooks/useFetch";

import DirectorForm from "/components/forms/DirectorForm";
import Loading from "/components/Loading";


const AddDirector = () => {
  const { data: movies, loading: loadingMovies } = useFetch("/api/movies");

  return (
    <>
      <h1>Add Director</h1>

      {
        loadingMovies ?
          <Loading /> :
          <DirectorForm movies={movies} />
      }
    </>
  );
};

export default AddDirector;
