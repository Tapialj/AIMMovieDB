import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "/context/AuthProvider";


const Actor = ({ actor, onClick, onDelete }) => {
  const { auth } = useAuth();

  return (
    <li className="actor">
      <div className="name" onClick={() => onClick(actor.id)}>
        {actor.firstName} {actor.lastName}
      </div>
      {
        auth?.user?.roles?.includes("ADMIN") &&
          <FontAwesomeIcon
            icon={faDeleteLeft}
            className="delete"
            onClick={() => onDelete(actor)}
          />
      }
    </li>
  );
};

export default Actor;
