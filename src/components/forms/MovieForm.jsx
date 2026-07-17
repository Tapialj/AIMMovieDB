import { parseDate } from "@internationalized/date";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosPrivatePost from "/hooks/useAxiosPrivatePost";
import useAxiosPrivatePut from "/hooks/useAxiosPrivatePut";
import useFetch from "/hooks/useFetch";

import Button from "/components/Button";
import Dropdown from "/components/dropdown/Dropdown";
import Error from "/components/Error";
import ActorForm from "/components/forms/ActorForm";
import CheckboxSection from "/components/forms/CheckboxSection";
import DirectorForm from "/components/forms/DirectorForm";
import FormError from "/components/forms/FormError";
import RadioButtonSection from "/components/forms/RadioButtonSection";
import Loading from "/components/Loading";
import Modal from "/components/modal/Modal";
import MyDatePicker from "/components/MyDatePicker";

import { formatDateForBackend } from "/utils/dateUtils";


const MovieForm = ({
  movie = null,
  movieDirectors = [],
  movieActors = [],
}) => {
  const { data: actors, loading: actorsLoad } = useFetch("/api/actors");
  const { data: directors, loading: directorsLoad } = useFetch("/api/directors");
  const { data: genres, loading: genresLoad } = useFetch("/api/genres");
  const { data: ratings, loading: ratingsLoad } = useFetch("/api/ratings");
  const [title, setTitle] = useState(movie ? movie.title : "");
  const [movieLength, setMovieLength] = useState(movie ? movie.movieLength : 0);
  const [releaseDate, setReleaseDate] = useState(movie ?
    parseDate(movie.releaseDate) :
    parseDate(moment().format("YYYY-MM-DD")));
  const [trailerUrl, setTrailerUrl] = useState(movie ? movie.trailerUrl : "");
  const [selectedDirectors, setSelectedDirectors] = useState(movieDirectors);
  const [selectedActors, setSelectedActors] = useState(movieActors);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [actorModalOpen, setActorModalOpen] = useState(false);
  const [directorModalOpen, setDirectorModalOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState();
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const titleRef = useRef();
  const ratingRef = useRef();
  const lengthRef = useRef();
  const trailerRef = useRef();
  const errRef = useRef();
  const axiosPrivatePost = useAxiosPrivatePost();
  const axiosPrivatePut = useAxiosPrivatePut();
  const navigate = useNavigate();
  const location = useLocation();

  const onActorCheckboxUpdate = (actor, action) => {
    setErrors([]);

    if(action) {
      setSelectedActors([ ...selectedActors, actor]);
    }
    else {
      setSelectedActors(selectedActors.filter((a) => a.id === actor.id));
    }
  };

  const onDirectorCheckboxUpdate = (director, action) => {
    setErrors([]);

    if(action) {
      setSelectedDirectors([ ...selectedDirectors, director]);
    }
    else {
      setSelectedDirectors(selectedDirectors.filter((d) => d.id === director.id));
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const onChangeTitle = (e) => {
    setErrors([]);
    setTitle(e.target.value);
  };

  const onChangeRating = (e) => {
    setErrors([]);
    setSelectedRating(ratings[e.target.value - 1]);
  };

  const onChangeLength = (e) => {
    setErrors([]);
    setMovieLength(e.target.value);
  };

  const onChangeTrailer = (e) => {
    setErrors([]);
    setTrailerUrl(e.target.value);
  };

  const onDirectorModal = (e) => {
    e.preventDefault();
    setDirectorModalOpen(!directorModalOpen);
  };
  const onActorModal = (e) => {
    e.preventDefault();
    setActorModalOpen(!actorModalOpen);
  };

  const isNumeric = (str) => {
    if(typeof str != "string")
      return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  const validUrl = (url) => {
    if(url.includes("youtube.com/watch?v="))
      return true;
    return false;
  };

  const onSaveDirector = (savedDirector) => {
    setSelectedDirectors([ ...selectedDirectors, savedDirector]);
    directors.push(savedDirector);
    setDirectorModalOpen(false);
  };

  const onSaveActor = (savedActor) => {
    setSelectedActors([ ...selectedActors, savedActor]);
    actors.push(savedActor);
    setActorModalOpen(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    const holdErrs = [];

    if(!title || title.trim() === "") {
      holdErrs.push("Title is Required");
    }
    
    if(!movieLength || movieLength === "") {
      holdErrs.push("Movie Length is Required");
    }
    else if(!isNumeric(movieLength)) {
      holdErrs.push("Movie length should be whole number in minutes");
    }
    
    if(!releaseDate) {
      holdErrs.push("Release Date is Required");
    }
    
    if(!trailerUrl || trailerUrl.trim() === "") {
      holdErrs.push("Trailer is Required");
    }
    else if(!validUrl(trailerUrl)) {
      holdErrs.push("Please enter a valid Youtube video link (youtube.com/watch?v=****)");
    }
    
    if(!selectedGenre || selectedGenre.genre?.trim() === "") {
      holdErrs.push("Genre is Required");
    }

    if(!selectedRating || selectedRating.rating?.trim() === "") {
      holdErrs.push("Rating is Required");
    }

    if(!holdErrs.length) {
      saveMovie();
    }
    else {
      setErrors(holdErrs);
      errRef.current.focus();
    }
  };

  const saveMovie = async () => {
    try {
      const movieApi = movie ? `api/movies/${movie.id}` : "api/movies";
      const movieObject = {
        title: title,
        movieLength: movieLength,
        releaseDate: formatDateForBackend(releaseDate),
        trailerUrl: trailerUrl,
        genre: selectedGenre,
        rating: selectedRating,
        directors: selectedDirectors,
        actors: selectedActors,
      };
      console.log("movie", movieObject);
      if(location.pathname.includes("movies/new")) {
        await axiosPrivatePost(movieApi, movieObject);
      }
      else {
        await axiosPrivatePut(movieApi, { id: movie.id, ... movieObject });
      }

      navigate(-1, { replace: true });
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
    if(!genresLoad && !fullyLoaded)
      setSelectedGenre(movie ? movie.genre : genres[0]);
    if(!ratingsLoad && !fullyLoaded)
      setSelectedRating(movie ? movie.rating : ratings[0]);
    if(!fullyLoaded && selectedGenre && selectedRating)
      setFullyLoaded(true);
  }, [genresLoad, ratingsLoad, selectedGenre, selectedRating]);

  return (
    <main className="movies/edit">
      {
        (!fullyLoaded || genresLoad || directorsLoad || actorsLoad || ratingsLoad) ?
          <Loading /> :
          <>
            <form className="form" noValidate>
              <FormError errors={errors} />
              <Error errRef={errRef} error={error} />

              <div className="form-control">
                <label htmlFor="title">Movie Title</label>
                <input
                  ref={titleRef}
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onFocus={handleFocus}
                  onChange={onChangeTitle}
                />
              </div>

              <div className="form-control">
                <label>Genre</label>
                <Dropdown
                  property="genre"
                  selected={selectedGenre}
                  content={genres}
                  onSelect={setSelectedGenre}
                />
              </div>

              <div className="form-control">
                <label htmlFor="movieLength">Movie Length in minutes</label>
                <input
                  ref={lengthRef}
                  id="movieLength"
                  name="movieLength"
                  inputMode="numeric"
                  autoComplete="off"
                  type="number"
                  value={movieLength}
                  onFocus={handleFocus}
                  onChange={onChangeLength}
                />
              </div>

              <div className="form-control">
                <label>Movie Release date</label>
                <MyDatePicker aria-label="date" value={releaseDate} onChange={setReleaseDate} />
              </div>

              <div className="form-control">
                <label htmlFor="trailerUrl">Youtube Trailer URL</label>
                <input
                  ref={trailerRef}
                  type="url"
                  id="trailerUrl"
                  name="trailerUrl"
                  value={trailerUrl}
                  onFocus={handleFocus}
                  onChange={onChangeTrailer}
                />
              </div>

              <div className="form-control rating">
                <RadioButtonSection
                  ref={ratingRef}
                  title="MPAA Rating"
                  options={ratings}
                  checkedOption={selectedRating.id}
                  onChange={onChangeRating}
                />
              </div>

              <div className="form-control flex">
                {/* <RadioButtonSection
                  ref={directorRef}
                  title="Directors"
                  options={directors}
                  checkedOption={selectedDirector.id}
                  onChange={onChangeDirector} https://www.youtube.com/watch?v=38A__WT3-o0
                /> */}
                <CheckboxSection
                  title="Directors"
                  options={directors}
                  checkedList={selectedDirectors}
                  onChange={onDirectorCheckboxUpdate}
                />

                <div className="btn-container">
                  <Button title="Add New Director" onClick={onDirectorModal} />
                </div>
              </div>

              <div className="form-control flex">
                <CheckboxSection
                  title="Actors"
                  options={actors}
                  checkedList={selectedActors}
                  onChange={onActorCheckboxUpdate}
                />

                <div className="btn-container">
                  <Button title="Add New Actor" onClick={onActorModal} />
                </div>
              </div>

              <Button title="Save Movie" onClick={onSave} />
            </form>
            {
              actorModalOpen &&
                <Modal onModal={onActorModal}>
                  <ActorForm isModal="true" onSaveActor={onSaveActor} />
                </Modal>
            }
            {
              directorModalOpen &&
                <Modal onModal={onDirectorModal}>
                  <DirectorForm isModal="true" onSaveDirector={onSaveDirector} />
                </Modal>
            }
          </>
      }
    </main>
  );
};

export default MovieForm;
