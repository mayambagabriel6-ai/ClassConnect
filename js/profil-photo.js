document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input');
  const editPhotoBtn = document.getElementById('edit-photo-btn');
  const profilPhoto = document.getElementById('profil-photo');

  if (!fileInput || !editPhotoBtn || !profilPhoto) return;

  editPhotoBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (event) => {
    const [file] = event.target.files || [];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      profilPhoto.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
});
