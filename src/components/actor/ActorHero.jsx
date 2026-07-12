import { Link } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";


const ActorHero = ({ actor, onEditActorClick }) => {
  const { auth } = useAuth();

  return (
    <>
      <div className="route">
        <h3>
          <Link to="/actors">
            <span>Actors</span>
          </Link>
          &emsp;/&emsp;{actor.lastName}, {actor.firstName}
        </h3>
      </div>

      <div className="name flex row">
        <h1>{actor.firstName} {actor.lastName}</h1>
        {
          (auth?.roles?.includes("USER") || auth?.roles?.includes("ADMIN")) &&
            <Button title="Edit" onClick={onEditActorClick} />
        }
      </div>
    </>
  );
};

export default ActorHero;
