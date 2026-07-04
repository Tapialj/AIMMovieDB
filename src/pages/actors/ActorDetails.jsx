import { useNavigate, useParams } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Acted from "/components/actor/Acted";
import ActorHero from "/components/actor/ActorHero";
import Loading from "/components/Loading";


const ActorDetails = () => {
  const { id } = useParams();
  const { data: actor, loading: actorLoad } = useFetch(`/api/actors/${id}`);
  const { data: movies, loading: moviesLoad } = useFetch(`/api/actors/${id}/movies`);
  const navigate = useNavigate();
  
  const onEditActorClick = () => {
    navigate(`/edit-actor/${id}`);
  };

  return (
    <main className="actor-details">
      {
        (actorLoad || moviesLoad) ?
          <Loading /> :
          <>
            <ActorHero actor={actor} onEditActorClick={onEditActorClick} />
            <Acted actedMovies={movies} />
          </>
      }
    </main>
  );
};

export default ActorDetails;
