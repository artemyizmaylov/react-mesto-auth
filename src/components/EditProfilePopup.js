import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [buttonText, setButtonText] = useState('Сохранить');
  const [formValid, setFormValid] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const [values, setValues] = useState({
    name: {
      value: '',
      message: '',
      isValid: false,
    },
    about: {
      value: '',
      message: '',
      isValid: false,
    },
  });

  useEffect(() => {
    setValues((values) => ({
      ...values,
      name: {
        value: currentUser.name,
        isValid: true,
      },
      about: {
        value: currentUser.about,
        isValid: true,
      },
    }));

    setButtonText('Сохранить');
  }, [currentUser, isOpen]);

  useEffect(() => {
    setFormValid(values.name.isValid && values.about.isValid);
  }, [values]);

  const handleChange = (event) => {
    const { name, value, validationMessage, validity } = event.target;
    setValues((values) => ({
      ...values,
      [name]: {
        value,
        message: validationMessage,
        isValid: validity.valid,
      },
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Сохранение...');
    const data = {
      name: values.name.value,
      about: values.about.value,
    };

    onUpdateUser(data);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={formValid}
      buttonText={buttonText}
    >
      <label className="form__input-label" htmlFor="profile-name">
        <input
          value={values.name.value || ''}
          onChange={handleChange}
          type="text"
          name="name"
          id="profile-name"
          className="form__input form__input_type_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error">{values.name.message}</span>
      </label>
      <label className="form__input-label" htmlFor="profile-about">
        <input
          value={values.about.value || ''}
          onChange={handleChange}
          type="text"
          name="about"
          id="profile-about"
          className="form__input form__input_type_about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error">
          {values.about.message}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
