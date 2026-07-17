import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "/context/AuthProvider";


const Director = ({ director, onClick, onDelete }) => {
  const { auth } = useAuth();
  
  return (
    <li className="director">
      <div className="name" onClick={() => onClick(director.id)}>
        {director.firstName} {director.lastName}
      </div>
      {
        auth?.user?.roles?.includes("ADMIN") &&
          <FontAwesomeIcon
            icon={faDeleteLeft}
            className="delete"
            onClick={() => onDelete(director)}
          />
      }
    </li>
  );
};

export default Director;
