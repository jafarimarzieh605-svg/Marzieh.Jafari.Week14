function ContactItem({ contact, onEdit, onDelete, selected, onSelect }) {
  return (
    <div
      className="contact-card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <input type="checkbox" checked={selected} onChange={() => onSelect(contact)} />
        {/* SVG آیکون مخاطب */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#4a90e2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4v1H4v-1z" fill="#4a90e2" />
        </svg>
        <div>
          <strong style={{ fontSize: "16px" }}>{contact.name} {contact.lastName}</strong>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#555" }}>
            {/* SVG آیکون تلفن */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#555">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.52.73 3.88.73a1 1 0 011 1v3.5a1 1 0 01-1 1C10.29 21.5 2.5 13.71 2.5 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.25 2.68.73 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
            </svg>
            {contact.phone || "No Phone"}
          </div>
          <div style={{ fontSize: "14px", color: "#888" }}>{contact.email}</div>
        </div>
      </div>
      <div className="contact-actions" style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => onEdit(contact)}
          style={{
            backgroundColor: "#f0f0f0",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => { if(window.confirm("Are you sure you want to delete this contact?")) onDelete(contact.id) }}
          style={{
            backgroundColor: "#ff4d4f",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          {/* SVG سطل زباله */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
            <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 3v7h2v-7H8zm4 0v7h2v-7h-2z"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactItem;
