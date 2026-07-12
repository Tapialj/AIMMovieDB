import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "/api/axios";
import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";


const Login = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const [disable, setDisable] = useState(false);
  const userRef = useRef();
  const errRef = useRef();
  const { username, password } = formData;
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [formData]);

  const toRegister = () => {
    navigate("/register");
  };

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "api/auth/authenticate",
        JSON.stringify(userData),
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        },
      );

      const token = res?.data?.token;
      const roles = res?.data?.roles;
      const user = res?.data?.user;
      setAuth({ user, token, roles });
      navigate(from, { replace: true });
    }
    catch(e) {
      if(!e?.response) {
        setError("No Server Response");
      }
      else if(e.response?.status === 400) {
        setError("Missing Username or Password");
      }
      else if(e.response?.status === 401) {
        setError("Unauthorized");
      }
      else {
        setError("Login Failed");
      }
      
      errRef.current.focus();
      setFormData({ username: username, password: "" });
    }
    finally {
      setDisable(false);
    }
  };
  
  const onChange = (e) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    ));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    const userData = {
      username,
      password,
    };
    
    login(userData);
  };

  return (
    <>
      <main className="login">
        <p ref={errRef} className={error ? "error" : "offscreen"} aria-live="assertive">{error}</p>
        <form className="form" noValidate>
          <div className="form-control">
            <input
              type="username"
              id="username"
              name="username"
              ref={userRef}
              autoComplete="off"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
              disabled={disable}
              required
            />
          </div>
          
          <div className="form-control">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="on"
              onChange={onChange}
              disabled={disable}
              required
            />
          </div>

          <div className="form-control">
            <Button
              title="Submit"
              onClick={onSubmit}
              disabled={disable}
            />
          </div>
        </form>
        <section>
          Need an account?<br />
          <span className="line">
            <Button title="Register" onClick={toRegister} />
          </span>
        </section>
      </main>
    </>
  );

};

export default Login;
