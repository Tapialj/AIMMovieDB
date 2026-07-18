

const Backdrop = ({ children, onModal }) => {
  // document.body.style.overflow = "hidden";
  
  return (
    <div className="backdrop" onClick={onModal}>
      {children}
    </div>
  );
};

export default Backdrop;
