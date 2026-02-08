function ContactItem({ contact, onEdit, onDelete, checked, onCheck }) {
  return (
    <div className="contact-card">
      <input type="checkbox" checked={checked} onChange={onCheck} />

      <div className="avatar">👤</div>

      <div className="info">
        <strong>{contact.name} {contact.lastName}</strong>
        <span>{contact.email}</span>
        <span>📞 {contact.phone}</span>
      </div>

      <div className="actions">
        <button className="icon-btn" onClick={onEdit}>✏️</button>
        <button className="icon-btn danger" onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default ContactItem;
