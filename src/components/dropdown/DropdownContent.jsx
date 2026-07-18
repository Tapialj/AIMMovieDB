

const DropdownContent = ({ open, children }) => {
  return (
    <div className={`drop-content ${open ? "open" : null}`}>
      {children}
    </div>
  );
};

export default DropdownContent;
