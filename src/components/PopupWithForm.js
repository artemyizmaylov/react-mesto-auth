function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
  formValid,
  buttonText,
  onSubmit
}) {
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
        <form
          className="form"
          name={name}
          method="post"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`button form__submit-button ${
              formValid ? '' : 'form__submit-button_disabled'
            }`}
            type="submit"
            disabled={!formValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
