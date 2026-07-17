import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosPrivateDelete from "/hooks/useAxiosPrivateDelete";
import useAxiosPrivatePost from "/hooks/useAxiosPrivatePost";
import useAxiosPrivatePut from "/hooks/useAxiosPrivatePut";

import Button from "/components/Button";
import Error from "/components/Error";
import CheckboxSection from "/components/forms/CheckboxSection";
import FormError from "/components/forms/FormError";


const ActorForm = ({
  actor = { id: null, firstName: "", lastName: "" },
  movies = [],
  acted = [],
  isModal = false,
  onSaveActor,
}) => {
  const [selectedMovies, setSelectedMovies] = useState(acted);
  const [firstName,setFirstName] = useState(actor.firstName);
  const [lastName,setLastName] = useState(actor.lastName);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState();
  const firstRef = useRef();
  const lastRef = useRef();
  const errRef = useRef();
  const axiosPrivatePost = useAxiosPrivatePost();
  const axiosPrivatePut = useAxiosPrivatePut();
  const axiosPrivateDelete = useAxiosPrivateDelete();
  const navigate = useNavigate();
  const location = useLocation();
  
  const onChangeFirst = (e) => {
    setErrors([]);
    setFirstName(e.target.value);
  };

  const onChangeLast = (e) => {
    setErrors([]);
    setLastName(e.target.value);
  };

  const onCheckboxUpdate = (movie, action) => {
    setErrors([]);
    
    if(action) {
      setSelectedMovies([ ...selectedMovies, movie]);
    }
    else {
      setSelectedMovies(selectedMovies.filter((m) => m.id != movie.id));
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    const holdErrs = [];

    if(!firstName || firstName.trim() === "") {
      holdErrs.push("First Name is Required");
    }
    
    if(!lastName || lastName.trim() === "") {
      holdErrs.push("Last Name is Required");
    }

    if(!holdErrs.length) {
      saveActor();
    }
    else {
      setErrors(holdErrs);
      errRef.current.focus();
    }
  };

  const saveActor = async () => {
    try {
      const diff = selectedMovies.filter((movie) => !acted.some((m) => m.id === movie.id));
      const removedDiff = acted.filter((movie) => !selectedMovies.some((m) => m.id === movie.id));
      const actorApi = actor.id != null ? `api/actors/${actor.id}` : "api/actors";
      let savedActor;
      const updatedActor = {
        firstName: firstName,
        lastName: lastName,
      };

      if(location.pathname.includes("actors/new") || location.pathname.includes("movies/")) {
        const res = await axiosPrivatePost(actorApi, updatedActor);
        savedActor = res?.data;
      }
      else {
        const res = await axiosPrivatePut(actorApi, { id: actor.id, ... updatedActor });
        savedActor = res?.data;
      }
      
      for(const addMovie of diff) {
        await axiosPrivatePost(`api/actors/movies/${addMovie.id}`, savedActor);
      }

      for(const removeMovie of removedDiff) {
        await axiosPrivateDelete(`api/actors/${savedActor.id}/movies/${removeMovie.id}`);
      }

      if(!isModal)
        navigate(-1, { replace: true });
      else
        onSaveActor(savedActor);
    }
    catch(e) {
      console.log("error", e);
      if(!e?.response) {
        if(e?.code) {
          setError(`No Server Response. Error: ${e?.code}`);
        }

        setError(e);
      }
      else if(e.response?.status === 401) {
        setError("Unauthorized");
      }
      else if(e.response?.status === 403) {
        setError(`Forbidden: ${e.message}`);
      }
      else {
        setError(`Unknown error: ${e.response?.status}`);
      }
    }
  };

  useEffect(() => {
    firstRef.current.focus();
  }, []);

  return (
    <>
      {
        isModal && <h1>Add Actor</h1>
      }

      <form className="form" noValidate>
        <FormError errRef={errRef} errors={errors} />
        <Error errRef={errRef} error={error} />

        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input 
            ref={firstRef}
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onChangeFirst}
          />
        </div>

        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            ref={lastRef}
            type="text"
            id="lastName"
            name="lastName" 
            value={lastName}
            onChange={onChangeLast}
          />
        </div>

        {
          !isModal &&
            <CheckboxSection
              title="Movies"
              options={movies}
              checkedList={selectedMovies}
              onChange={onCheckboxUpdate}
            />
        }

        <Button title="Save Actor" onClick={onSave} />
      </form>
    </>
  );
};

export default ActorForm;
