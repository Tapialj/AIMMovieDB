

const Backdrop = ({ children, onModal }) => {
  
  return (
    <div className="backdrop" onClick={onModal}>
      {children}
    </div>
  );
};

export default Backdrop;
