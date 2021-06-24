import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import api from '../utils/api'
import * as auth from '../utils/auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import ProtectedRoute from './ProtectedRoute'
import Header from './Header'
import Main from './Main'
import Register from './Register'
import Login from './Login'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import PopupConfirm from './PopupConfirm'
import ImagePopup from './ImagePopup'
import InfoTooltip from './InfoTooltip'

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])
  const [loggedIn, setloggedIn] = React.useState(false)
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false)
  const [isSuccessRegistration, setSuccessRegistration] = React.useState(false)

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
      })
      .catch(err => {
        console.log(`Данные с сервера не получены. Ошибка: ${err}.`)
      })
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setInfoTooltipPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c)
        setCards(newCards)
      })
      .catch(err => {
        console.log(`Не удалось обработать отметку "Мне нравится". Ошибка: ${err}.`)
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(item => item !== card)
        setCards(newCards)
      })
      .catch(err => {
        console.log(`Не удалось удалить карточку. Ошибка: ${err}.`)
      })
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Не удалось изменить данные пользователя. Ошибка: ${err}.`)
      })
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then(avatar => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Не удалось изменить аватар пользователя. Ошибка: ${err}.`)
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Не удалось создать новую карточку. Ошибка: ${err}.`)
      })
  }

  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(res => {
        // dsf
        //console.log(res.json())
        if (res) {
          // console.log(res.json())
          setSuccessRegistration(true)
          setInfoTooltipPopupOpen(true)
        } else {
          setSuccessRegistration(false)
          setInfoTooltipPopupOpen(false)
        }
      })
  }

  function handleLogin(email, password) {
    return auth.authorization(email, password)
      .then(res => {
        if (res) {
          setloggedIn(true)
        }
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <ProtectedRoute
          path='/'
          component={Main}
          loggedIn={loggedIn}
          onPopupAvatar={handleEditAvatarClick}
          onPopupEdit={handleEditProfileClick}
          onPopupAdd={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Route path='/sign-up'>
          <Register
            onRegister={handleRegister}
          />
        </Route>

        <Route path='/sign-in'>
          <Login
            onLogin={handleLogin}
          />
        </Route>

        <Route>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='sign-in' />}
        </Route>

        <Footer />

        {loggedIn &&
          <>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <PopupConfirm />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
            />
          </>
        }
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegistration={isSuccessRegistration}
        />


      </div>
    </CurrentUserContext.Provider>
  )
}

export default App