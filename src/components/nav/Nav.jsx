import { NavLink, useLocation, useNavigate } from "react-router-dom";

import axios from "/api/axios";
import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";


const Nav = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = (link) => {
    navigate(link);
  };

  const logout = async (e) => {
    e.preventDefault();
    
    await axios.get(
      "api/logout",
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-type": "application/json",
        },
        withCredentials: true,
      },
    );
    setAuth({});
    navigate(location.pathname);
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
      <section>
        {
          auth?.user ?
            <span className="logout">
              <h2>{auth.user.username}</h2>
              <Button title="Logout" onClick={logout} />
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
