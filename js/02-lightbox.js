import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// Виконуй це завдання у файлах 02-lightbox.html і 02-lightbox.js. Розбий його на декілька підзавдань:

// // Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Використовуй готовий код з першого завдання.
// // Підключення скрипту і стилів бібліотеки, використовуючи CDN сервіс cdnjs.
// Необхідно додати посилання на два файли: simple-lightbox.min.js і simple-lightbox.min.css.
// // Ініціалізація бібліотеки після створення і додання елементів галереї у ul.gallery.
// Для цього ознайомся з документацією SimpleLightbox - насамперед секції «Usage» і «Markup».
// // Подивися в документації секцію «Options» і додай відображення підписів до зображень
// з атрибута alt. Нехай підпис буде знизу і з'являється через 250 мілісекунд після відкриття зображення.

// * посилання на галерею
const galeryUl = document.querySelector(".gallery");

// * ствоерння розмітки
const galleryLi = galleryItems
  .map(
    (galleryItem) =>
      `<li class = "gallery__item"> <a class="gallery__link" href="${galleryItem.original}"> 
    <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}"> </a > </li>`
  )
  .join("");

// * рендер розмітки

galeryUl.insertAdjacentHTML("afterbegin", galleryLi);

// * чипляю слухача кліка на спільного родича Li - UL галерею
galeryUl.addEventListener("click", selectImage);
// * пишу колбек
function selectImage(event) {
  const myTarget = event.target;
  //* скасувою перехід за посилианням що хоче бразуер
  event.preventDefault();
  // * забороняю хапати кліки де попало а тільки на li малюнків
  if (myTarget.className !== "gallery__image") {
    return;
    // ** МОЖНА БУЛО ЩЕ ПРИВЯЗАТИСЬ ...nodeName !=='IMG')...
  }
  console.log(event.target);

  // * застосовую функцію бібліотеки
  (function () {
    const $gallery = new SimpleLightbox(".gallery a", {
      navText: ["<<", ">>"],
      captionsData: "alt",
      captionPosition: "top",
      captionDelay: 250,
      closeText: "X",
      animationSpeed: 300,
      download: "true",
    });
  })();

  // * використовую шаблон з бібліотеки
}
