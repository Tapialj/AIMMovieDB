import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivateDelete from "/hooks/useAxiosPrivateDelete";
import useFetch from "/hooks/useFetch";

import Actor from "/components/actor/Actor";
import Button from "/components/Button";
import Loading from "/components/Loading";
import Modal from "/components/modal/Modal";


const ActorList = () => {
  const { data, setData, loading } = useFetch("/api/actors");
  const [actorDelete, setActorDelete] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const axiosPrivateDelete = useAxiosPrivateDelete();
  const navigate = useNavigate();

  const onDeleteModal = (e) => {
    e.preventDefault();
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onClick = (id) => {
    navigate(`/actors/${id}`);
  };

  const onDelete = (actor) => {
    setActorDelete(actor);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const deleteActor = async (actor) => {
    await axiosPrivateDelete(`api/actors/${actor.id}`);
    setData(data.filter((a) => a.id != actor.id));
    setActorDelete({});
    setDeleteModalOpen(false);
  };

  return (
    <>
      <ol>
        {
          loading ?
            <Loading /> :
            data.map((actor) => {
              return (
                <Actor key={actor.id} actor={actor} onClick={onClick} onDelete={onDelete} />
              );
            })
        }
      </ol>
      {
        deleteModalOpen &&
          <Modal onModal={onDeleteModal} modalOpen={deleteModalOpen}>
            <section className="delete-modal">
              <p>
                Are you sure you want to delete {actorDelete.firstName} {actorDelete.lastName}?
              </p>

              <Button title="Delete" onClick={() => deleteActor(actorDelete)} />
              <Button title="Cancel" onClick={() => setDeleteModalOpen(false)} />
            </section>
          </Modal>
      }
    </>
  );
};

export default ActorList;
