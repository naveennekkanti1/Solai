import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const API_URL =
  "https://violent-stacey-solai-aba6a507.koyeb.app";

const SubmitResponse = () => {

  const { id: formId } = useParams();

  const [searchParams] =
    useSearchParams();

  const [form, setForm] =
    useState(null);

  const [respondentEmail, setRespondentEmail] =
    useState(
      searchParams.get("email") || ""
    );

  const [answers, setAnswers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);


  // ============================================================
  // LOAD FORM
  // ============================================================

  useEffect(() => {

    const loadForm = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/v1/forms/${formId}`
          );

        if (!response.ok) {

          throw new Error(
            "Unable to load form"
          );
        }

        const data =
          await response.json();

        setForm(data);

        /*
         * Create answer objects for all fields.
         */
        const initialAnswers =
          (data.fields || []).map(
            (field) => ({
              fieldId:
                field.fieldId,
              label:
                field.label,
              answer: ""
            })
          );

        setAnswers(
          initialAnswers
        );

      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Unable to load form"
        );

      } finally {

        setLoading(false);
      }
    };

    if (formId) {
      loadForm();
    }

  }, [formId]);


  // ============================================================
  // UPDATE ANSWER
  // ============================================================

  const updateAnswer = (
    fieldId,
    value
  ) => {

    setAnswers(
      (previous) =>
        previous.map(
          (item) =>
            item.fieldId === fieldId
              ? {
                  ...item,
                  answer: value
                }
              : item
        )
    );
  };


  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setError("");
    setSuccess(false);


    // ----------------------------------------------------------
    // EMAIL
    // ----------------------------------------------------------

    if (!respondentEmail.trim()) {

      setError(
        "Email address is required."
      );

      return;
    }


    // ----------------------------------------------------------
    // REQUIRED FIELDS
    // ----------------------------------------------------------

    const missingRequiredField =
      (form.fields || []).find(
        (field) => {

          if (!field.required) {
            return false;
          }

          const answer =
            answers.find(
              (item) =>
                item.fieldId ===
                field.fieldId
            );

          return !answer ||
            !answer.answer ||
            !answer.answer.trim();
        }
      );

    if (missingRequiredField) {

      setError(
        `${missingRequiredField.label} is required.`
      );

      return;
    }


    // ----------------------------------------------------------
    // SUBMIT
    // ----------------------------------------------------------

    try {

      setSubmitting(true);

      const payload = {

        formId,

        respondentEmail:
          respondentEmail
            .trim()
            .toLowerCase(),

        answers:
          answers.map(
            (item) => ({
              [item.label]:
                item.answer
            })
          )
      };


      const response =
        await fetch(
          `${API_URL}/v1/forms/submit`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(payload)
          }
        );


      const responseText =
        await response.text();


      if (!response.ok) {

        throw new Error(
          responseText ||
          "Failed to submit form"
        );
      }


      setSuccess(true);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to submit form."
      );

    } finally {

      setSubmitting(false);
    }
  };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-gray-600">
          Loading form...
        </p>

      </div>
    );
  }


  // ============================================================
  // ERROR LOADING FORM
  // ============================================================

  if (!form) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-red-600">
            Unable to load form
          </h2>

          <p className="mt-2 text-gray-600">
            {error}
          </p>

        </div>

      </div>
    );
  }


  // ============================================================
  // SUCCESS
  // ============================================================

  if (success) {

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">

          <div className="text-5xl mb-4">
            ✓
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Response Submitted
          </h2>

          <p className="mt-3 text-gray-600">
            Your response has been submitted successfully.
          </p>

        </div>

      </div>
    );
  }


  // ============================================================
  // FORM
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-red-500 to-purple-600 text-white p-8">

            <h1 className="text-3xl font-bold">
              {form.title}
            </h1>

            {form.description && (
              <p className="mt-3 opacity-90">
                {form.description}
              </p>
            )}

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-8"
          >

            {/* EMAIL */}

            <div className="mb-6">

              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={respondentEmail}
                onChange={(e) =>
                  setRespondentEmail(
                    e.target.value
                  )
                }
                readOnly={
                  Boolean(
                    searchParams.get("email")
                  )
                }
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

            </div>


            {/* FIELDS */}

            {form.fields?.map(
              (field) => {

                const answer =
                  answers.find(
                    (item) =>
                      item.fieldId ===
                      field.fieldId
                  )?.answer || "";


                return (
                  <div
                    key={field.fieldId}
                    className="mb-6"
                  >

                    <label className="block text-gray-700 font-medium mb-2">

                      {field.label}

                      {field.required && (
                        <span className="text-red-500 ml-1">
                          *
                        </span>
                      )}

                    </label>


                    {field.fieldType === "TEXT" && (

                      <input
                        type="text"
                        value={answer}
                        onChange={(e) =>
                          updateAnswer(
                            field.fieldId,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        className="w-full p-3 border rounded-lg"
                      />

                    )}


                    {field.fieldType === "EMAIL" && (

                      <input
                        type="email"
                        value={answer}
                        onChange={(e) =>
                          updateAnswer(
                            field.fieldId,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        className="w-full p-3 border rounded-lg"
                      />

                    )}


                    {field.fieldType === "NUMBER" && (

                      <input
                        type="number"
                        value={answer}
                        onChange={(e) =>
                          updateAnswer(
                            field.fieldId,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        className="w-full p-3 border rounded-lg"
                      />

                    )}


                    {field.fieldType === "DATE" && (

                      <input
                        type="date"
                        value={answer}
                        onChange={(e) =>
                          updateAnswer(
                            field.fieldId,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        className="w-full p-3 border rounded-lg"
                      />

                    )}


                    {field.fieldType === "TEXTAREA" && (

                      <textarea
                        value={answer}
                        onChange={(e) =>
                          updateAnswer(
                            field.fieldId,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        rows={5}
                        className="w-full p-3 border rounded-lg"
                      />

                    )}


                    {field.fieldType === "DROPDOWN" && (

                      <select
                        value={answer}
                        onChange={(e) =>
                          updateAnswer(
                            field.fieldId,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        className="w-full p-3 border rounded-lg"
                      >

                        <option value="">
                          Select an option
                        </option>

                        {field.options?.map(
                          (option) => (

                            <option
                              key={option}
                              value={option}
                            >
                              {option}
                            </option>

                          )
                        )}

                      </select>

                    )}


                    {field.fieldType === "RADIO" && (

                      <div className="space-y-2">

                        {field.options?.map(
                          (option) => (

                            <label
                              key={option}
                              className="flex items-center gap-2"
                            >

                              <input
                                type="radio"
                                name={
                                  field.fieldId
                                }
                                value={
                                  option
                                }
                                checked={
                                  answer ===
                                  option
                                }
                                onChange={(e) =>
                                  updateAnswer(
                                    field.fieldId,
                                    e.target.value
                                  )
                                }
                                required={
                                  field.required
                                }
                              />

                              {option}

                            </label>

                          )
                        )}

                      </div>

                    )}


                    {field.fieldType === "CHECKBOX" && (

                      <div className="space-y-2">

                        {field.options?.map(
                          (option) => {

                            const selected =
                              answer
                                .split(",")
                                .map(
                                  (v) =>
                                    v.trim()
                                )
                                .includes(
                                  option
                                );

                            return (
                              <label
                                key={option}
                                className="flex items-center gap-2"
                              >

                                <input
                                  type="checkbox"
                                  checked={
                                    selected
                                  }
                                  onChange={(e) => {

                                    const current =
                                      answer
                                        ? answer
                                            .split(",")
                                            .map(
                                              (v) =>
                                                v.trim()
                                            )
                                            .filter(
                                              Boolean
                                            )
                                        : [];

                                    const updated =
                                      e.target.checked
                                        ? [
                                            ...current,
                                            option
                                          ]
                                        : current.filter(
                                            (v) =>
                                              v !==
                                              option
                                          );

                                    updateAnswer(
                                      field.fieldId,
                                      updated.join(
                                        ", "
                                      )
                                    );

                                  }}
                                />

                                {option}

                              </label>
                            );
                          }
                        )}

                      </div>

                    )}

                  </div>
                );
              }
            )}


            {/* ERROR */}

            {error && (

              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">

                {error}

              </div>

            )}


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg font-semibold disabled:opacity-50"
            >

              {submitting
                ? "Submitting..."
                : "Submit Response"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default SubmitResponse;