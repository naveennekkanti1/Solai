import React from "react";

const FormInput = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>
  );
};

export default FormInput;
