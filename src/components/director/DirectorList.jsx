import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivateDelete from "/hooks/useAxiosPrivateDelete";
import useFetch from "/hooks/useFetch";

import Button from "/components/Button";
import Director from "/components/director/Director";
import Loading from "/components/Loading";
import Modal from "/components/modal/Modal";


const DirectorList = () => {
  const { data, setData, loading } = useFetch("/api/directors");
  const [directorDelete, setDirectorDelete] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const axiosPrivateDelete = useAxiosPrivateDelete();
  const navigate = useNavigate();

  const onDeleteModal = (e) => {
    e.preventDefault();
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onClick = (id) => {
    navigate(`/directors/${id}`);
  };

  const onDelete = (director) => {
    setDirectorDelete(director);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const deleteDirector = async (director) => {
    await axiosPrivateDelete(`api/directors/${director.id}`);
    setData(data.filter((d) => d.id != director.id));
    setDirectorDelete({});
    setDeleteModalOpen(false);
  };

  return (
    <>  
      <ol>
        {
          loading ?
            <Loading /> :
            data.map((director) => {
              return (
                <Director key={director.id} director={director} onClick={onClick} onDelete={onDelete} />
              );
            })
        }
      </ol>
      {
        deleteModalOpen &&
          <Modal onModal={onDeleteModal} modalOpen={deleteModalOpen}>
            <section className="delete-modal">
              <p>
                Are you sure you want to delete {directorDelete.firstName} {directorDelete.lastName}?
              </p>

              <Button title="Delete" onClick={() => deleteDirector(directorDelete)} />
              <Button title="Cancel" onClick={() => setDeleteModalOpen(false)} />
            </section>
          </Modal>
      }
    </>
  );
};

export default DirectorList;
