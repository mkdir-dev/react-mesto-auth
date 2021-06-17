import PopupWithForm from './PopupWithForm'

function PopupConfirm() {
  return (
    <PopupWithForm
      title='Вы уверены?'
      name='confirm'
      buttonText='Да'
    >
    </PopupWithForm>
  );
}

export default PopupConfirm;