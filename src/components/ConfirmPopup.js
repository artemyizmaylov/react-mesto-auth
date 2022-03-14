import { useEffect, useState } from 'react';

function ConfirmPopup({ card, onClose, onCardDelete }) {
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    setButtonText('Да');
  }, [card]);

  function handleConfirm() {
    setButtonText('Удаление...');

    onCardDelete(card);
  }

  return (
    <div
      className={`popup confirm-popup
      ${card && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          className="button popup__close-button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__heading">Вы уверены?</h2>
        <button
          className="button form__submit-button"
          type="button"
          onClick={handleConfirm}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
