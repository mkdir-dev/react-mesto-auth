import React from 'react'

import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()

    props.onAddPlace({
      name: title,
      link
    })
    setTitle('')
    setLink('')
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add'
      buttonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_title-place"
        id="title-place"
        name="title-place"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleChangeTitle}
        required />
      <span className="popup__input-error" id="title-place-error"></span>
      <input className="popup__input popup__input_type_link-place"
        id="link-place"
        name="link-place"
        type="url"
        placeholder="Ссылка на картинку"
        minLength="2"
        onChange={handleChangeLink}
        required />
      <span className="popup__input-error" id="link-place-error"></span>
    </PopupWithForm>


  );
}

export default AddPlacePopup;