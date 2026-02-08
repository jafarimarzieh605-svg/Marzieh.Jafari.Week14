import { useState, useEffect } from "react";

function ContactForm({ onSubmit, contactToEdit, onCancel }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name || "");
      setLastName(contactToEdit.lastName || "");
      setEmail(contactToEdit.email || "");
      setPhone(contactToEdit.phone || "");
    }
  }, [contactToEdit]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (phone && !/^[0-9]{7,15}$/.test(phone)) newErrors.phone = "Invalid phone";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (window.confirm("Are you sure you want to submit this contact?")) {
      onSubmit({ name, lastName, email, phone });
      setName(""); setLastName(""); setEmail(""); setPhone("");
    }
  };

  const inputStyle = {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#4a90e2",
    color: "#fff",
  };

  const buttonHover = {
    filter: "brightness(0.9)",
    transform: "scale(1.02)"
  };

  const [hovered, setHovered] = useState({}); 

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
        style={{ ...inputStyle }}
        placeholder="First Name"
        value={name}
        onChange={e => setName(e.target.value)}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#4a90e2"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#ccc"}
      />
      {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

      <input
        style={{ ...inputStyle }}
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#4a90e2"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#ccc"}
      />
      {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}

      <input
        style={{ ...inputStyle }}
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#4a90e2"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#ccc"}
      />
      {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

      <input
        style={{ ...inputStyle }}
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#4a90e2"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#ccc"}
      />
      {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { filter: "none", transform: "scale(1)" })}
        >
          {contactToEdit ? "Edit" : "Add"}
        </button>
        {contactToEdit && (
          <button
            type="button"
            onClick={onCancel}
            style={{ ...buttonStyle, backgroundColor: "#888" }}
            onMouseEnter={e => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { filter: "none", transform: "scale(1)" })}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
