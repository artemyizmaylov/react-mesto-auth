function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <div
      className={`popup image-popup
      ${card && 'popup_opened'}`}
    >
      {card && (
        <div className="popup__image-container">
          <button
            className="button popup__close-button"
            type="button"
            onClick={onClose}
          ></button>
          <img src={card.link} alt={card.name} className="popup__img" />
          <h2 className="popup__heading popup__image-name">{card.name}</h2>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
