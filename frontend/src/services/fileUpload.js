const FILE_TYPES = ["gif", "jpg", "jpeg", "png"];

export const fileUpload = input => {
  return new Promise((resolve, reject) => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    if (!fileName) {
      return reject('You did not load a file');
    }

    const matches = FILE_TYPES.some(function(it) {
      return fileName.endsWith(it);
    });

    if (!matches) {
      return reject('You load not a picture');
    }

    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(file);
  });
};
