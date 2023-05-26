import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:
// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні.
// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на ul.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

// * посилання на галерею
const galeryUl = document.querySelector(".gallery");

// * створюю розмітку
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
  //* скасувою перехід за посилианням за бажанням бразуера
  event.preventDefault();
  // * забороняю хапати кліки де попало а тільки на  img
  if (myTarget.className !== "gallery__image") {
    return;
    // МОЖНА БУЛО ЩЕ ПРИВЯЗАТИСЬ ...nodeName !=='IMG'...
  }
  console.log(event.target);
  // *підготував змінну куди буду кидати урл
  let myUrl;
  // *кидаю урл батька цільвого елемента на велике зображення
  myUrl = myTarget.parentNode.getAttribute("href");
  // записую альт в змінну
  const altFormodal = myTarget.getAttribute("alt");
  // * додаю дейта атрибут
  event.target.dataset.source = myUrl;

  // * використовую шаблон з бібліотеки
  // (https://basiclightbox.electerious.com/
  // доку ментація тут https://github.com/electerious/basicLightbox#readme)
  // * ТА замінюю срс перед відкриттям вікна
  const modalWindow = basicLightbox.create(`

    <img src= "${myUrl}" width="1280" height="600" alt="${altFormodal}">
`);
  //*  це метод показу вікна з бібліотеки
  modalWindow.show();
  //*  роблю закриття по кліку ескейпом
  galeryUl.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      modalWindow.close();
    }
  });
}
