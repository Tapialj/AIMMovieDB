

const DropdownItem = ({ onClick, children }) => {
  return (
    <div className="drop-item" onClick={onClick}>
      {children}
    </div>    
  );
};

export default DropdownItem;
