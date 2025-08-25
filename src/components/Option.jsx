import React from "react";

function Option({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
    >
      {text}
    </button>
  );
}

export default Option;
