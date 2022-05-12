import { useContext } from 'react';
import { lazy, Suspense } from 'react/cjs/react.production.min';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Card = lazy(() => import('./Card.js'))

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <div className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              className="profile__avatar"
            />
          </div>
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </div>
      <ul className="places">
        {cards.map((card) => (
          <li className="place" key={card._id}>
            <Suspense fallback={<img src='https://static.tildacdn.com/tild3637-3531-4565-a161-653761663261/74H8gif.gif' alt='Loading' style={{width: '90%', height:  '90%'}}/>}>
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            </Suspense>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
