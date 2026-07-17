import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";
import useLogout from "/hooks/useLogout";

import Button from "/components/Button";


const Nav = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const onClick = (link) => {
    navigate(link);
  };

  const onLogout = async (e) => {
    e.preventDefault();

    await logout();
    window.location.reload();
  };

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
      <section className="authentication">
        {
          auth?.user ?
            <span className="logout">
              <h2>{auth.user.username}</h2>
              <Button title="Logout" onClick={onLogout} />
            </span> :
            <span className="login-register">
              <Button title="Login" onClick={() => onClick("/login")} />
              <Button title="Register" onClick={() => onClick("/register")} />
            </span>
        }
      </section>
    </header>
  );
};

export default Nav;
