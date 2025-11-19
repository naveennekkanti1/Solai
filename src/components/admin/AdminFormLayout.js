import React from "react";

const AdminFormLayout = ({ title, children, onSubmit, submitText = "Submit" }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {children}

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminFormLayout;
