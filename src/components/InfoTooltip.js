import { useState, useEffect } from 'react';
import successImage from '../images/success-img.svg';
import unsuccessImage from '../images/unsuccess-img.svg';

function InfoTooltip(props) {
  const [message, setMessage] = useState('');
  const { isOpen, onClose } = props;

  useEffect(() => {
    setMessage('Yes');
  });

  return (
    <div className={`popup registration-popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="button popup__close-button"
          type="button"
        />
        <img className="registration-image" src={successImage} />
        <h2 className="popup__heading popup__heading_centered">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
