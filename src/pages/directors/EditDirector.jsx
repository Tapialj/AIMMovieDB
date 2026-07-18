import { useParams } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import DirectorForm from "/components/forms/DirectorForm";
import Loading from "/components/Loading";


const EditDirector = () => {
  const { id } = useParams();
  const { data: director, loading: loadingDirector } = useFetch(`/api/directors/${id}`);
  const { data: movies, loading: loadingMovies } = useFetch("/api/movies");
  const { data: directed, loading: loadingDirected } = useFetch(`/api/directors/${id}/movies`);

  return (
    <main className="director-form">
      <h1>Edit Director</h1>

      {
        (loadingDirector || loadingMovies || loadingDirected) ?
          <Loading /> :
          <DirectorForm director={director} movies={movies} directed={directed} />
      }
    </main>
  );
};

export default EditDirector;
