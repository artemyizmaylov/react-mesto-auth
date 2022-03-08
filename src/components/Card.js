import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } =
    props;

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

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
      {isOwn ? (
        <button
          className="button place__trash-button"
          onClick={handleDeleteClick}
          type="button"
        ></button>
      ) : (
        ''
      )}
      <div className="place__image-container" onClick={handleClick}>
        <div
          style={{ backgroundImage: `url(${card.link})` }}
          className="place__img"
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
