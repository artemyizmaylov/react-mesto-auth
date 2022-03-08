import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [buttonText, setButtonText] = useState('Сохранить');

  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [descriptionValidationMessage, setDescriptionValidationMessage] =
    useState('');

  const [nameValid, setNameValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameValid(true);
    setDescriptionValid(true);
    setFormValid(true);
    setNameValidationMessage('');
    setDescriptionValidationMessage('');
    setButtonText('Сохранить');
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (nameValid && descriptionValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [nameValid, descriptionValid]);

  function handleChange(e) {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        setNameValidationMessage(e.target.validationMessage);
        setNameValid(e.target.validity.valid);
        break;
      case 'about':
        setDescription(e.target.value);
        setDescriptionValidationMessage(e.target.validationMessage);
        setDescriptionValid(e.target.validity.valid);
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Сохранение...');

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        className="popup__form"
        name="profile"
        method="post"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="popup__input-label" htmlFor="profile-name">
          <input
            value={name || ''}
            onChange={handleChange}
            type="text"
            name="name"
            id="profile-name"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error">{nameValidationMessage}</span>
        </label>
        <label className="popup__input-label" htmlFor="profile-about">
          <input
            value={description || ''}
            onChange={handleChange}
            type="text"
            name="about"
            id="profile-about"
            className="popup__input popup__input_type_about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error">
            {descriptionValidationMessage}
          </span>
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

export default EditProfilePopup;
