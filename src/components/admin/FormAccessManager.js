import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Lock,
  Mail,
  Plus,
  Trash2,
  Unlock,
  Users,
} from "lucide-react";

const API_BASE =
  "https://violent-stacey-solai-aba6a507.koyeb.app";

const FormAccessManager = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ============================================================
  // LOAD FORM
  // ============================================================

  useEffect(() => {
    const loadForm = async () => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const response = await fetch(
          `${API_BASE}/v1/forms/${encodeURIComponent(formId)}`
        );

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to load this form.");
        }

        const data = await response.json();

        const loadedForm = data.form || data;

        if (!loadedForm || typeof loadedForm !== "object") {
          throw new Error("The form could not be found.");
        }

        setForm(loadedForm);

        setEmails(
          Array.isArray(loadedForm.allowedEmails)
            ? loadedForm.allowedEmails
            : []
        );
      } catch (loadError) {
        console.error("Failed to load form access:", loadError);

        setError(
          loadError.message ||
            "Failed to load this form."
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
  // ADD EMAIL + SEND INVITATION
  // ============================================================

  const addEmail = async (event) => {
    event.preventDefault();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      return;
    }

    if (
      emails.some(
        (item) =>
          item.toLowerCase() === normalizedEmail
      )
    ) {
      setError(
        "This email already has access to the form."
      );
      return;
    }

    setAdding(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE}/v1/forms/${encodeURIComponent(
          formId
        )}/access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emails: [normalizedEmail],
          }),
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        throw new Error(
          responseText ||
            "Failed to add email."
        );
      }

      let updatedForm = null;

      try {
        updatedForm =
          JSON.parse(responseText);
      } catch {
        // Backend may return plain text.
      }

      if (
        updatedForm &&
        Array.isArray(
          updatedForm.allowedEmails
        )
      ) {
        setEmails(
          updatedForm.allowedEmails
        );

        setForm(
          (currentForm) => ({
            ...currentForm,
            allowedEmails:
              updatedForm.allowedEmails,
          })
        );
      } else {
        setEmails(
          (currentEmails) => [
            ...currentEmails,
            normalizedEmail,
          ]
        );

        setForm(
          (currentForm) => ({
            ...currentForm,
            allowedEmails: [
              ...(currentForm?.allowedEmails ||
                []),
              normalizedEmail,
            ],
          })
        );
      }

      setEmail("");

      setSuccess(
        `Invitation sent successfully to ${normalizedEmail}.`
      );
    } catch (addError) {
      console.error(
        "Failed to add email:",
        addError
      );

      setError(
        addError.message ||
          "Failed to add email."
      );
    } finally {
      setAdding(false);
    }
  };

  // ============================================================
  // REMOVE EMAIL
  // ============================================================

  const removeEmail = async (
    emailToRemove
  ) => {
    setRemoving(emailToRemove);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE}/v1/forms/${encodeURIComponent(
          formId
        )}/access?email=${encodeURIComponent(
          emailToRemove
        )}`,
        {
          method: "DELETE",
        }
      );

      const responseText =
        await response.text();

      if (!response.ok) {
        throw new Error(
          responseText ||
            "Failed to remove email access."
        );
      }

      setEmails(
        (currentEmails) =>
          currentEmails.filter(
            (item) =>
              item.toLowerCase() !==
              emailToRemove.toLowerCase()
          )
      );

      setForm(
        (currentForm) => ({
          ...currentForm,
          allowedEmails:
            (
              currentForm?.allowedEmails ||
              []
            ).filter(
              (item) =>
                item.toLowerCase() !==
                emailToRemove.toLowerCase()
            ),
        })
      );

      setSuccess(
        `${emailToRemove} has been removed from the access list.`
      );
    } catch (removeError) {
      console.error(
        "Failed to remove email:",
        removeError
      );

      setError(
        removeError.message ||
          "Failed to remove email access."
      );
    } finally {
      setRemoving("");
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">
          Loading form access...
        </p>
      </div>
    );
  }

  // ============================================================
  // FORM NOT FOUND
  // ============================================================

  if (!form) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/forms")
            }
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to forms
          </button>

          <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />

            {error ||
              "The form could not be found."}
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // PUBLIC / PRIVATE
  // ============================================================

  const isPublic =
    form.formsettings?.publicForm === true;

  // ============================================================
  // UI
  // ============================================================

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/admin/forms")
          }
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to forms
        </button>

        {/* HEADER */}

        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-6 mb-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Form Access
            </h1>

            <p className="text-gray-600 mt-1">
              {form.title ||
                "Untitled Form"}
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
              isPublic
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {isPublic ? (
              <Unlock className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}

            {isPublic
              ? "Public form"
              : "Private form"}
          </span>
        </header>

        {/* ACCESS SECTION */}

        <section className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6">

          <div className="flex items-center gap-3 mb-2">

            <Users className="w-5 h-5 text-orange-600" />

            <h2 className="text-lg font-semibold text-gray-900">
              Allowed email addresses
            </h2>

          </div>

          <p className="text-sm text-gray-600 mb-5">
            Add an email address to grant access.
            An invitation email containing the form
            link will be sent automatically.
          </p>

          {/* ADD EMAIL */}

          <form
            onSubmit={addEmail}
            className="flex flex-col sm:flex-row gap-2 mb-5"
          >

            <label
              className="sr-only"
              htmlFor="access-email"
            >
              Email address
            </label>

            <div className="relative flex-1">

              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                id="access-email"
                type="email"
                required
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="name@example.com"
                disabled={adding}
                className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
              />

            </div>

            <button
              type="submit"
              disabled={adding}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-60"
            >

              <Plus className="w-4 h-4" />

              {adding
                ? "Sending..."
                : "Add & Send Invite"}

            </button>

          </form>

          {/* EMAIL LIST */}

          {emails.length > 0 ? (

            <ul className="divide-y divide-gray-100 border-y border-gray-100">

              {emails.map(
                (allowedEmail) => (

                  <li
                    key={allowedEmail}
                    className="flex items-center justify-between gap-3 py-3"
                  >

                    <span className="text-sm text-gray-800 break-all">
                      {allowedEmail}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeEmail(
                          allowedEmail
                        )
                      }
                      disabled={
                        removing ===
                        allowedEmail
                      }
                      aria-label={`Remove ${allowedEmail}`}
                      title="Remove email"
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50"
                    >

                      <Trash2 className="w-4 h-4" />

                    </button>

                  </li>

                )
              )}

            </ul>

          ) : (

            <p className="text-sm text-gray-500 py-4 border-y border-gray-100">
              No email addresses have been added.
            </p>

          )}

          {/* ERROR */}

          {error && (

            <div
              role="alert"
              className="mt-4 p-3 rounded-md border border-red-200 bg-red-50 text-sm text-red-700 flex items-center gap-2"
            >

              <AlertCircle className="w-4 h-4 shrink-0" />

              {error}

            </div>

          )}

          {/* SUCCESS */}

          {success && (

            <p
              role="status"
              className="mt-4 text-sm text-green-700 flex items-center gap-2"
            >

              <CheckCircle className="w-4 h-4" />

              {success}

            </p>

          )}

        </section>
      </div>
    </main>
  );
};

export default FormAccessManager;