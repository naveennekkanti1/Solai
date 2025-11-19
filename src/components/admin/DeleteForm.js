import React, { useState } from "react";
import AdminFormLayout from "./AdminFormLayout";
import FormInput from "./FormInput";

const DeleteForm = () => {
  const [formId, setFormId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`https://violent-stacey-solai-aba6a507.koyeb.app/v1/forms/${formId}`, {
      method: "DELETE",
    });

    alert("Form Deleted Successfully!");
  };

  return (
    <AdminFormLayout title="Delete Form" submitText="Delete">
      <FormInput
        label="Form ID"
        value={formId}
        onChange={(e) => setFormId(e.target.value)}
        placeholder="Enter Form ID"
      />
    </AdminFormLayout>
  );
};

export default DeleteForm;
