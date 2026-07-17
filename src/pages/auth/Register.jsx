import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "/api/axios";
import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [disable, setDisable] = useState(false);
  const userRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const toLogin = () => {
    navigate("/login");
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(
        "api/auth/register",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
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
    catch(err) {
      if(!err?.response) {
        setErrMsg("No Server Response");
      }
      else if(err.response?.status === 409) {
        setErrMsg("Username Taken");
      }
      else {
        setErrMsg("Registration Failed");
      }

      errRef.current.focus();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if(!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    
    const userRequest = {
      username: user,
      password: pwd,
    };

    register(userRequest);
  };

  return (
    <>
      <main className="register">
        <p ref={errRef} className={errMsg ? "error" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form className="form" noValidate>
          <div className="form-control">
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              Must begin with a letter.
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>


          <div className="form-control">
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. 
              Must include uppercase and lowercase letters, a number and a special character. 
              Allowed special characters: 
              <span aria-label="exclamation mark"> !</span> 
              <span aria-label="at symbol"> @</span> 
              <span aria-label="hashtag"> #</span> 
              <span aria-label="dollar sign"> $</span> 
              <span aria-label="percent"> %</span>
            </p>
          </div>


          <div className="form-control">
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
          </div>

          <Button
            title="Register"
            onClick={onSubmit}
            disabled={
              disable ||
              !validName ||
              !validPwd ||
              !validMatch ?
                true :
                false
            }
          />
        </form>

        <section>
          Already registered?
          <span className="line">
            <Button title="Sign In" onClick={toLogin} />
          </span>
        </section>
      </main>
    </>
  );
};

export default Register;
