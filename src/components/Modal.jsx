function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-back">
      <div className="modal-box">
        <p>{message}</p>
        <div className="row">
          <button className="primary-btn" onClick={onConfirm}>Confirm</button>
          <button className="secondary-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
