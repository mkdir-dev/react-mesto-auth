import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import Card from './Card'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content page__section">
      <section className="user">
        <div className="user__wrapper">
          <button
            className="user__edit-avatar"
            type="button"
            aria-label="Редактировать"
            onClick={props.onPopupAvatar}>
            <div className="user__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
          </button>
          <div className="user__info">
            <div className="user__text">
              <h1 className="user__name">{currentUser.name}</h1>
              <button
                className="button user__edit"
                type="button"
                aria-label="Редактировать"
                onClick={props.onPopupEdit}>
              </button>
            </div>
            <p className="user__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button user__add"
          type="button"
          aria-label="Добавить"
          onClick={props.onPopupAdd}
        >
        </button>
      </section>

      <section className="places">
        <ul className="places__section">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;