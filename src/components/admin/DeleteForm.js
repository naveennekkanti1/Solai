import React, { useState } from "react";
import AdminFormLayout from "./AdminFormLayout";
import FormInput from "./FormInput";

const API_BASE =
  "https://violent-stacey-solai-aba6a507.koyeb.app";

const DeleteForm = () => {
  const [formId, setFormId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedId = formId.trim();

    if (!trimmedId) {
      alert("Please enter a Form ID.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this form?\n\n" +
        "This will also delete all responses associated with the form."
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/v1/forms/${encodeURIComponent(trimmedId)}`,
        {
          method: "DELETE",
        }
      );

      const contentType = response.headers.get("content-type");

      let result;

      if (contentType?.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      if (!response.ok) {
        const message =
          typeof result === "string"
            ? result
            : result?.message || "Failed to delete form.";

        throw new Error(message);
      }

      alert("Form deleted successfully!");

      setFormId("");
    } catch (error) {
      console.error("Delete form error:", error);

      alert(
        `Failed to delete form.\n\n${
          error.message || "Please try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminFormLayout
      title="Delete Form"
      submitText={loading ? "Deleting..." : "Delete"}
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Form ID"
        value={formId}
        onChange={(e) => setFormId(e.target.value)}
        placeholder="Enter Form ID"
        disabled={loading}
      />
    </AdminFormLayout>
  );
};

export default DeleteForm;