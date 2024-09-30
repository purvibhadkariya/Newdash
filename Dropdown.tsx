'use client';
// Dropdown.tsx
import React from "react";

// Define the type for the props
interface DropdownProps {
  options: string[]; // Array of strings for the options
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Function that handles the change event
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  return (
    <select onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
