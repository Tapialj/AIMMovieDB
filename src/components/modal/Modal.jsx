import Backdrop from "/components/modal/Backdrop";


const Modal = ({ children, onModal }) => {

  return (
    <Backdrop onModal={onModal}>
      <article className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </article>
    </Backdrop>
  );
};

export default Modal;
