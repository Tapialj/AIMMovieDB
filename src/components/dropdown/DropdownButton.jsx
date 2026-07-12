import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const DropdownButton = ({ toggle, open, children }) => {
  return (
    <div className={`drop-button ${open ? "open" : null}`} onClick={toggle}>
      {children}
      <span className="toggle-icon">
        { 
          open ?
            <FontAwesomeIcon icon={faChevronUp} /> :
            <FontAwesomeIcon icon={faChevronDown} />  
        }
      </span>
    </div>
  );
};

export default DropdownButton;
