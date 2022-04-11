//реализация предпросмотра картинок аватарки пользователя и фотографии жилья
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooserAvatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileChooserAdImage = document.querySelector('#images');
const adImagePreview = document.querySelector('.ad-form__photo img');

//предпросмотр аватарки пользователя
fileChooserAvatar.addEventListener('change', () => {
  const fileAvatarImg = fileChooserAvatar.files[0];
  const fileAvatarName = fileAvatarImg.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileAvatarName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(fileAvatarImg);
  }
});

//предпросмотр фотографии жилья для объявления
fileChooserAdImage.addEventListener('change', () => {
  const fileAdImg = fileChooserAdImage.files[0];
  const fileAdName = fileAdImg.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileAdName.endsWith(it));
  if (matches) {
    adImagePreview.src = URL.createObjectURL(fileAdImg);
  }
});
