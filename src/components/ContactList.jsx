import ContactItem from "./ContactItem";

function ContactList({ contacts, onEdit, onDelete, selectedIds, setSelectedIds }) {
  const toggle = (id) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter(i => i !== id)
        : [...selectedIds, id]
    );
  };

  if (!contacts.length) return <p>No contacts</p>;

  return (
    <div className="list">
      {contacts.map(c => (
        <ContactItem
          key={c.id}
          contact={c}
          onEdit={() => onEdit(c)}
          onDelete={() => onDelete(c.id)}
          checked={selectedIds.includes(c.id)}
          onCheck={() => toggle(c.id)}
        />
      ))}
    </div>
  );
}

export default ContactList;
