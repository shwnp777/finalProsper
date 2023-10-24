import React from "react";

const SingleInput = ({ title, input, setInput }) => {
  return (
    <div>
      <label
        htmlFor={input}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1">
        <input
          id={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          autoComplete={input}
          required
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default SingleInput;
