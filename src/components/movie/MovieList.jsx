import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivateDelete from "/hooks/useAxiosPrivateDelete";
import useFetch from "/hooks/useFetch";

import Button from "/components/Button";
import Loading from "/components/Loading";
import Modal from "/components/modal/Modal";
import Movie from "/components/movie/Movie";


const MovieList = () => {
  const { data, setData, loading } = useFetch("/api/movies");
  const [movieDelete, setMovieDelete] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const axiosPrivateDelete = useAxiosPrivateDelete();
  const navigate = useNavigate();

  const onDeleteModal = (e) => {
    e.preventDefault();
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const onDelete = (movie) => {
    setMovieDelete(movie);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const deleteMovie = async (movie) => {
    await axiosPrivateDelete(`api/movies/${movie.id}`);
    setData(data.filter((m) => m.id != movie.id));
    setMovieDelete({});
    setDeleteModalOpen(false);
  };

  return (
    <>
      <ol>
        {
          loading ?
            <Loading /> :
            data.map((movie) => {
              return (
                <Movie key={movie.id} movie={movie} onClick={onClick} onDelete={onDelete} />
              );
            })
        }
      </ol>
      {
        deleteModalOpen &&
          <Modal onModal={onDeleteModal} modalOpen={deleteModalOpen}>
            <section className="delete-modal">
              <p>
                Are you sure you want to delete {movieDelete.title}?
              </p>

              <Button title="Delete" onClick={() => deleteMovie(movieDelete)} />
              <Button title="Cancel" onClick={() => setDeleteModalOpen(false)} />
            </section>
          </Modal>
      }
    </>
  );
};

export default MovieList;
