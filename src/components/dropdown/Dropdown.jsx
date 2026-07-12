import { useRef, useState } from "react";

import DropdownButton from "./DropdownButton";
import DropdownContent from "./DropdownContent";
import DropdownItem from "./DropdownItem";


const Dropdown = ({ property, selected, content, onSelect }) => {
  
  const [open, setOpen] = useState(false);
  const dropRef = useRef();

  const toggleDropdown = () => {
    setOpen((open) => !open);
  };

  const onClick = (item) => {
    toggleDropdown();
    onSelect(item);
  };

  return (
    <div ref={dropRef} className="dropdown">
      <DropdownButton toggle={toggleDropdown} open={open}>
        {selected[`${property}`]}
      </DropdownButton>
      <DropdownContent open={open}>
        {
          content.map((item) => {
            return <DropdownItem key={item.id} onClick={() => onClick(item)}>{item[`${property}`]}</DropdownItem>;
          })
        }
      </DropdownContent>
    </div>
  );
};

export default Dropdown;
