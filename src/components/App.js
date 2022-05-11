import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import InfoTooltip from './InfoTooltip.js';

import Header from './Header';
import Main from './Main.js';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute.js';

import api from '../utils/Api.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardForDelete, setCardForDelete] = useState(null);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(false);

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmDelete(card) {
    setCardForDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRegistrationPopupOpen(false);
    setSelectedCard(null);
    setCardForDelete(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(user) {
    api
      .setUser(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onRegister(data) {
    api
      .register(data)
      .then((res) => {
        if (res) {
          setSuccessRegistration(true);
          setIsRegistrationPopupOpen(true);
          navigate('/sign-in');
        } else {
          setSuccessRegistration(false);
          setIsRegistrationPopupOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function onLogin(data) {
    api
      .login(data)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', 'true');
          api
            .getUser()
            .then((res) => setUserEmail(res.email))
            .catch((err) => console.log(err));
          navigate('/');
        } else {
          setIsRegistrationPopupOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    api
      .logout()
      .then(() => {
        localStorage.setItem('loggedIn', 'false');
        setLoggedIn(false);
        setUserEmail('');
      })
      .catch((err) => console.log(err))
  }

  // логика первой загрузке приложения
  useEffect(() => {
    // проверка авторизации
    if (localStorage.getItem('loggedIn') === 'true') {
      api
        .getUser()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/');
            setCurrentUser(res)
            setUserEmail(res.email);
          }
        })
        .catch((err) => console.log(err));
    }

    // добавление закрытия по нажатию на Escape
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getCards()
      .then(cards => setCards(cards))
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={userEmail} loggedIn={loggedIn} exit={onSignOut} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDelete}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register
              register={onRegister}
              isPopupOpen={isRegistrationPopupOpen}
              openPopup={setIsRegistrationPopupOpen}
              closePopup={closeAllPopups}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login
              login={onLogin}
              isPopupOpen={isRegistrationPopupOpen}
              openPopup={setIsRegistrationPopupOpen}
              closePopup={closeAllPopups}
              setLoggedIn={setLoggedIn}
              setUserEmail={setUserEmail}
            />
          }
        />
      </Routes>
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ConfirmPopup
        card={cardForDelete}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        isOpen={isRegistrationPopupOpen}
        onClose={closeAllPopups}
        success={successRegistration}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
