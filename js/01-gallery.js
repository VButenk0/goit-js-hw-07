// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні.

// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на ul.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

import { galleryItems } from "./gallery-items.js";
// Change code below this line
let instance = null;

const galleryEl = document.querySelector(".gallery");

const galleryItemsEl = galleryItems.map((galleryItemsInfo) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${galleryItemsInfo.original}">
        <img
          class="gallery__image"
          src="${galleryItemsInfo.preview}"
          data-source="${galleryItemsInfo.original}"
          alt="${galleryItemsInfo.description}"
        />
      </a>
    </li>
  `;
});

galleryEl.insertAdjacentHTML("afterbegin", galleryItemsEl.join(""));

const onGalleryItemClick = (e) => {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const url = e.target.dataset.source;

  const basicLightboxOptions = {
    onClose() {
      document.removeEventListener("keydown", onDocumentKeyPress);
    },
  };

  instance = basicLightbox.create(
    `
    <img src="${url}">
`,
    basicLightboxOptions
  );

  instance.show();

  document.addEventListener("keydown", onDocumentKeyPress);
};

const onDocumentKeyPress = ({ code }) => {
  console.log(code);

  if (code === "Escape") {
    instance.close();
  }
};

galleryEl.addEventListener("click", onGalleryItemClick);
