import { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const link = useRef(null);
  const [buttonText, setButtonText] = useState('');

  const [values, setValues] = useState({
    message: '',
    isValid: false
  })

  useEffect(() => {
    link.current.value = '';
    setButtonText('Сохранить');
  }, [isOpen]);

  const linkData = (link) => {
    setValues((values) => ({
      ...values,
      message: link.validationMessage,
      isValid: link.validity.valid
    }))
  };


  function handleSubmit(e) {
    e.preventDefault();

    setButtonText('Сохранение...');

    onUpdateAvatar({
      avatar: link.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={values.isValid}
      buttonText={buttonText}
    >
      <label className="form__input-label" htmlFor="avatar-link">
        <input
          ref={link}
          onChange={() => linkData(link.current)}
          type="url"
          name="avatar"
          id="avatar-link"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__input-error avatar-link-error">
          {values.message}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
