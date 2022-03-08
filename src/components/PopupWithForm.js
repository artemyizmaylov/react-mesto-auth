function PopupWithForm(props) {
  const { children, name, title, isOpen, onClose } = props;

  return (
    <div
      className={`popup ${name}-popup
      ${isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          className="button popup__close-button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__heading">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;
