import React from "react";

const Person = ({ person, handleDelete }) => {
  return (
    <div style={{ display: "flex" }}>
      <li>
        {person.name} {person.number}
        <button onClick={handleDelete}>Delete</button>
      </li>
    </div>
  );
};

export default Person;
