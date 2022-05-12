import { useContext, useRef } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((like) => like === currentUser._id);
  const imageRef = useRef(null);

  const likeButtonClassName = isLiked ? 'place__like-button_active' : '';

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <>
      {isOwn && (
        <button
          className="button place__trash-button"
          onClick={handleDeleteClick}
          type="button"
        />)}
      <div className="place__image-container" onClick={handleClick}>
        <img
          ref={imageRef}
          src={card.link}
          alt={card.name}
          className="place__img"
          onError={() => {
            imageRef.current.src = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png'
            card.link = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png'
          }}
        />
      </div>
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like">
          <button
            className={`button place__like-button ${likeButtonClassName}`}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="place__like-count">{card.likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
