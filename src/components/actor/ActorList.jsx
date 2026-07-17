import { useNavigate } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Actor from "/components/actor/Actor";
import Loading from "/components/Loading";


const ActorList = () => {
  const { data, loading } = useFetch("/api/actors");
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`/actors/${id}`);
  };

  return (
    <ol>
      {
        loading ?
          <Loading /> :
          data.map((actor) => {
            return (
              <Actor key={actor.id} actor={actor} onClick={onClick} />
            );
          })
      }
    </ol>
  );
};

export default ActorList;
