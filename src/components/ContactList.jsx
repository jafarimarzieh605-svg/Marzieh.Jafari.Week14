import { useState } from "react";
import ContactItem from "./ContactItem";

function ContactList({ contacts, onEdit, onDelete }) {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (contact) => {
    setSelectedContacts(prev =>
      prev.includes(contact) ? prev.filter(c => c !== contact) : [...prev, contact]
    );
  };

  const deleteSelected = () => {
    if (window.confirm("آیا از حذف گروهی مخاطبین مطمئن هستید؟")) {
      selectedContacts.forEach(c => onDelete(c.id));
      setSelectedContacts([]);
    }
  };

  return (
    <div>
      <input placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)} />
      <button onClick={deleteSelected} disabled={!selectedContacts.length}>حذف گروهی</button>
      {filtered.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
          selected={selectedContacts.includes(contact)}
          onSelect={toggleSelect}
        />
      ))}
    </div>
  );
}
export default ContactList;
