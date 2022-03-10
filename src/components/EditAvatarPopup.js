import { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const link = useRef(null);
  const [linkValid, setLinkValid] = useState(false);
  const [linkValidationMessage, setLinkValidationMessage] = useState('');

  const [buttonText, setButtonText] = useState('Сохранить');

  const linkData = (link) => {
    setLinkValid(link.validity.valid);
    setLinkValidationMessage(link.validationMessage);
  };

  useEffect(() => {
    link.current.value = '';
    setLinkValid(false);
    setLinkValidationMessage('');
    setButtonText('Сохранить');
  }, [isOpen]);

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
    >
      <form
        className="form"
        name="avatar"
        method="post"
        noValidate
        onSubmit={handleSubmit}
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
            {linkValidationMessage}
          </span>
        </label>
        <button
          className={`button submit-button ${
            linkValid ? '' : 'submit-button_disabled'
          }`}
          disabled={!linkValid}
        >
          {buttonText}
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
