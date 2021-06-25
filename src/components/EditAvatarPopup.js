import React from 'react'

import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  //const currentUser = React.useContext(CurrentUserContext)
  const avatarRef = React.useRef('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log(avatarRef.current.value)

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_type_avatar" ref={avatarRef} id="avatar" name="avatar" type="url"
        placeholder="Ссылка на картинку" minLength="2" required />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;