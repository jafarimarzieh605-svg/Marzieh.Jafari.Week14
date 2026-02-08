import { useState } from "react";
import Layout from "./layouts/Layout";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import "./index.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [modal, setModal] = useState(null);

  const filtered = contacts.filter(c =>
    `${c.name} ${c.lastName} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const saveContact = (data) => {
    if (editing) {
      setContacts(contacts.map(c => (c.id === editing.id ? { ...editing, ...data } : c)));
      setEditing(null);
    } else {
      setContacts([...contacts, { ...data, id: Date.now() }]);
    }
  };

  const askDelete = (id) => {
    setModal({
      message: "Delete this contact?",
      onConfirm: () => {
        setContacts(contacts.filter(c => c.id !== id));
        setModal(null);
      }
    });
  };

  const askDeleteSelected = () => {
    setModal({
      message: "Delete selected contacts?",
      onConfirm: () => {
        setContacts(contacts.filter(c => !selectedIds.includes(c.id)));
        setSelectedIds([]);
        setModal(null);
      }
    });
  };

  return (
    <Layout>
      <ContactForm onSave={saveContact} editing={editing} cancelEdit={() => setEditing(null)} />

      <SearchBar search={search} setSearch={setSearch} />

      <button className="danger-btn" onClick={askDeleteSelected} disabled={!selectedIds.length}>
        Delete Selected
      </button>

      <ContactList
        contacts={filtered}
        onEdit={setEditing}
        onDelete={askDelete}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      {modal && (
        <Modal
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={() => setModal(null)}
        />
      )}
    </Layout>
  );
}

export default App;
