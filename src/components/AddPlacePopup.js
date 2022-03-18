import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [buttonText, setButtonText] = useState('Создать');
  const [formValid, setFormValid] = useState(false);

  const [values, setValues] = useState({
    name: {
      value: '',
      message: '',
      isValid: false,
    },
    link: {
      value: '',
      message: '',
      isValid: false,
    },
  });

  useEffect(() => {
    setValues({
      name: {
        value: '',
        message: '',
        isValid: false,
      },
      link: {
        value: '',
        message: '',
        isValid: false,
      },
    });
    
    setButtonText('Создать');
  }, [isOpen]);

  useEffect(() => {
    setFormValid(values.name.isValid && values.link.isValid);
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

    setButtonText('Создание...');

    const data = {
      name: values.name.value,
      link: values.link.value,
    };

    onAddPlace(data);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={formValid}
      buttonText={buttonText}
    >
      <label className="form__input-label" htmlFor="place-name">
        <input
          value={values.name.value}
          onChange={handleChange}
          type="text"
          name="name"
          id="place-name"
          className="form__input form__input_type_place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-error">{values.name.message}</span>
      </label>
      <label className="form__input-label" htmlFor="place-link">
        <input
          value={values.link.value}
          onChange={handleChange}
          type="url"
          name="link"
          id="place-link"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__input-error">{values.link.message}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
