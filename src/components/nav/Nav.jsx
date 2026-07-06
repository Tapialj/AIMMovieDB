import { NavLink } from "react-router-dom";


const Nav = () => {
  return (
    <header className="nav flex">
      <h1>AIM Movie DB</h1>

      <nav>
        <NavLink to="/">Home</NavLink>
        <span>{" | "}</span>
        <NavLink to="/movies">Movies</NavLink>
        <span>{" | "}</span>
        <NavLink to="/directors">Directors</NavLink>
        <span>{" | "}</span>
        <NavLink to="/actors">Actors</NavLink>
      </nav>
    </header>
  );
};

export default Nav;
