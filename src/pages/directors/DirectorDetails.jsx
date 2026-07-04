import { useNavigate, useParams } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Directed from "/components/director/Directed";
import DirectorHero from "/components/director/DirectorHero";
import Loading from "/components/Loading";


const DirectorDetails = () => {
  const { id } = useParams();
  const { data: director, loading: directorLoad } = useFetch(`/api/directors/${id}`);
  const { data: movies, loading: moviesLoad } = useFetch(`/api/directors/${id}/movies`);
  const navigate = useNavigate();

  const onEditDirectorClick = () => {
    navigate(`/edit-director/${id}`);
  };

  return (
    <main className="director-details">
      {
        (directorLoad || moviesLoad) ?
          <Loading /> :
          <>
            <DirectorHero director={director} onEditDirectorClick={onEditDirectorClick} />
            <Directed directedMovies={movies} />
          </>
      }
    </main>
  );
};

export default DirectorDetails;
