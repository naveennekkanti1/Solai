import React, { useState } from "react";
import AdminFormLayout from "./AdminFormLayout";
import FormInput from "./FormInput";

const SubmitResponse = () => {
  const [formId, setFormId] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      formId,
      response: responseText,
    };

    await fetch("http://localhost:8081/v1/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Response Submitted!");
  };

  return (
    <AdminFormLayout title="Submit Response" submitText="Submit">
      <FormInput
        label="Form ID"
        value={formId}
        onChange={(e) => setFormId(e.target.value)}
        placeholder="Enter Form ID"
      />

      <FormInput
        label="Response"
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        placeholder="Enter your response..."
      />
    </AdminFormLayout>
  );
};

export default SubmitResponse;
