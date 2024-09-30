'use client';
// FormWithDropdown.tsx
import React, { useState } from "react";
import Dropdown from "./Dropdown"; // Importing the Dropdown component

const FormWithDropdown: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const options = ["Option 1", "Option 2", "Option 3"];

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert(`Selected Option: ${selectedOption}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="dropdown">Choose an option:</label>
            <Dropdown options={options} onChange={handleDropdownChange} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default FormWithDropdown;
