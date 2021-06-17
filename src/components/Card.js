import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === currentUser._id
  const cardDeleteButtonClassName = (
    `place-card__delete ${isOwn ? 'place-card__delete' : 'place-card__delete_hidden'}`
  )
  const isLiked = props.card.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = `place-card__like ${isLiked ? 'place-card__like_active' : ''}`

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place-card">
      <img className="place-card__image" src={props.link} alt={props.name} onClick={handleClick} />
      <div className="place-card__wrapper">
        <h2 className="place-card__name">{props.name}</h2>
        <div className="place-card__like-wrap">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="Нравится"></button>
          <p className="place-card__like-count">{props.likes}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} aria-label="Удалить">
      </button>
    </li>
  );
}

export default Card;