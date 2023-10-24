import React from "react";
import { Link } from "react-router-dom";

const AddBusinessButton = () => {
  return (
    <div>
      <Link to="add-business">
        <button
          type="button"
          className="rounded-md bg-cyan-950 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-950"
        >
          Add Business
        </button>
      </Link>
    </div>
  );
};

export default AddBusinessButton;
