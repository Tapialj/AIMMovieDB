import { Link } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";


const DirectorHero = ({ director, onEditDirectorClick }) => {
  const { auth } = useAuth();
  
  return (
    <>
      <div className="route">
        <h3>
          <Link to="/directors">
            <span>Directors</span>
          </Link>
          &emsp;/&emsp;{director.lastName}, {director.firstName}
        </h3>
      </div>

      <div className="name flex row">
        <h1>{director.firstName} {director.lastName}</h1>
        {
          (auth?.roles?.includes("USER") || auth?.roles?.includes("ADMIN")) &&
            <Button title="Edit" onClick={onEditDirectorClick} />
        }
      </div>
    </>
  );
};

export default DirectorHero;
