import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
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
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false)
  const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false)
  const history = useHistory()

  React.useEffect(() => {
    checkToken()
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn, history])

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
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
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
        localStorage.setItem('token', res.token)
        setIsInfoTooltipPopupOpen(true)
        history.push('/sign-in')
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true)
        setIsSuccessRegistration(false)
      })
      .catch(err => {
        console.log(`Не удалось зарегистрироваться. Ошибка: ${err}.`)
      })
  }

  function handleLogin(email, password) {
    return auth.authorization(email, password)
      .then(res => {
        localStorage.setItem('token', res.token)
        setLoggedIn(true)
        history.push('/')
      })
      .catch(err => {
        console.log(`Не удалось войти. Ошибка: ${err}.`)
      })
  }

  function checkToken() {
    const token = localStorage.getItem('token')
    if (token) {
      auth.getToken(token)
        .then(res => {
          setUserEmail(res.data.email)
          setLoggedIn(true)
        })
        .catch(err => {
          console.log(`Не удалось передать токен. Ошибка: ${err}.`)
        })
    } else {
      console.log('Нет токена - потерялся')
      return
    }
  }

  function hendleSignOut() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    setUserEmail('')
    history.push('/sihn-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          onSignOut={hendleSignOut}
        />

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
        {
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegistration={isSuccessRegistration}
          />
        }
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App