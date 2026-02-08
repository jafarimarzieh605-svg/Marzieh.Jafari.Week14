import { useEffect, useState } from "react";

function ContactForm({ onSave, editing, cancelEdit }) {
  const [form, setForm] = useState({ name: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = true;
    if (!form.lastName.trim()) err.lastName = true;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = true;
    if (!/^\d{7,}$/.test(form.phone)) err.phone = true;
    setErrors(err);
    return !Object.keys(err).length;
  };

  const submit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    setForm({ name: "", lastName: "", email: "", phone: "" });
  };

  return (
    <form className="card" onSubmit={submit}>
      <input name="name" placeholder="First Name" value={form.name} onChange={change} className="input" />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={change} className="input" />
      <input name="email" placeholder="Email" value={form.email} onChange={change} className="input" />
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={change} className="input" />

      <div className="row">
        <button className="primary-btn">{editing ? "Update" : "Add Contact"}</button>
        {editing && (
          <button type="button" className="secondary-btn" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
