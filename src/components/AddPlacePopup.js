import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [buttonText, setButtonText] = useState('Создать');

  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [linkValidationMessage, setLinkValidationMessage] = useState('');

  const [nameValid, setNameValid] = useState(false);
  const [linkValid, setLinkValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setName('');
    setLink('');
    setNameValid(false);
    setLinkValid(false);
    setFormValid(false);
    setNameValidationMessage('');
    setLinkValidationMessage('');
    setButtonText('Создать');
  }, [isOpen]);

  useEffect(() => {
    if (nameValid && linkValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [nameValid, linkValid]);

  function handleChange(e) {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        setNameValidationMessage(e.target.validationMessage);
        setNameValid(e.target.validity.valid);
        break;
      case 'link':
        setLink(e.target.value);
        setLinkValidationMessage(e.target.validationMessage);
        setLinkValid(e.target.validity.valid);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Создание...');

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        className="popup__form"
        name="place"
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="popup__input-label" htmlFor="place-name">
          <input
            value={name || ''}
            onChange={handleChange}
            type="text"
            name="name"
            id="place-name"
            className="popup__input popup__input_type_place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error">{nameValidationMessage}</span>
        </label>
        <label className="popup__input-label" htmlFor="place-link">
          <input
            value={link || ''}
            onChange={handleChange}
            type="url"
            name="link"
            id="place-link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error">{linkValidationMessage}</span>
        </label>
        <button
          className={`button popup__confirm-button ${
            formValid ? '' : 'popup__confirm-button_disabled'
          }`}
          type="submit"
          disabled={!formValid}
        >
          {buttonText}
        </button>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
