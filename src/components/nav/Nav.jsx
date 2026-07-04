import { NavLink } from "react-router-dom";


const Nav = () => {
  return (
    <header className="nav flex">
      <h1>AIM Movie DB</h1>

      <nav>
        <NavLink to="/">Home</NavLink>
        {" | "}
        <NavLink to="/movies">Movies</NavLink>
        {" | "}
        <NavLink to="/directors">Directors</NavLink>
        {" | "}
        <NavLink to="/actors">Actors</NavLink>
      </nav>
    </header>
  );
};

export default Nav;
