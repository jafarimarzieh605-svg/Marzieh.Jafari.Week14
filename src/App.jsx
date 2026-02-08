import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactItem from "./components/ContactItem";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const updateContact = (updated) => {
    setContacts(
      contacts.map((c) =>
        c.id === editingContact.id ? { ...c, ...updated } : c
      )
    );
    setEditingContact(null);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
    setSelectedContacts(selectedContacts.filter((s) => s !== id));
  };

  const deleteSelectedContacts = () => {
    setContacts(contacts.filter((c) => !selectedContacts.includes(c.id)));
    setSelectedContacts([]);
  };

  const toggleSelectContact = (contact) => {
    setSelectedContacts((prev) =>
      prev.includes(contact.id)
        ? prev.filter((id) => id !== contact.id)
        : [...prev, contact.id]
    );
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

  const deleteButtonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "10px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Contact App
      </h1>

      <ContactForm
        onSubmit={editingContact ? updateContact : addContact}
        contactToEdit={editingContact}
        onCancel={() => setEditingContact(null)}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        <input
          style={inputStyle}
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        />

        <button
          style={deleteButtonStyle}
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete selected contacts?"
              )
            ) {
              deleteSelectedContacts();
            }
          }}
          disabled={selectedContacts.length === 0}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
        >
          Delete Selected
        </button>
      </div>

      {filteredContacts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No contacts found</p>
      ) : (
        filteredContacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            selected={selectedContacts.includes(contact.id)}
            onSelect={toggleSelectContact}
            onEdit={(c) => setEditingContact(c)}
            onDelete={deleteContact}
          />
        ))
      )}
    </div>
  );
}

export default App;
