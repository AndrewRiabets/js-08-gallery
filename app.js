const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];



const galleryContainerRefs = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxButtonRef = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const galleryMarkup = createGalleryMarkup(galleryItems);
let index;
// Создание разметки списка
galleryContainerRefs.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <p
            class="gallery__link"
            href="${original}"
            >
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </p>
        </li>`
    }).join(''); 
};
// 

// Делегирование и открытие модалки
galleryContainerRefs.addEventListener ('click', onModalOpen);
function onModalOpen(evt) {
  window.addEventListener('keydown', onEscModalClose);
  window.addEventListener('keydown', gallerySlideLeft);
  window.addEventListener('keydown', gallerySlideRight);
  

  const isGallaryLink = evt.target.classList.contains('gallery__image')
  if (!isGallaryLink) {
    return;
  }
  evt.preventDefault();
  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = evt.target.dataset.source;
  lightboxImageRef.alt = evt.target.alt;

  galleryItems.forEach(function (item, idx) {
    if (evt.target.alt === item.description) {
      index = idx
    }});
  };
  // 

  // закрытие модалки и очистка src
  lightboxButtonRef.addEventListener('click', onModalclose);
  lightboxOverlayRef.addEventListener('click', onModalclose);


  function onModalclose() {
    window.removeEventListener('keydown', onModalclose);
    window.removeEventListener('keydown', gallerySlideLeft);
    window.removeEventListener('keydown', gallerySlideRight);
    lightboxRef.classList.remove('is-open');
    lightboxImageRef.src = '';
    lightboxImageRef.alt = '';
  }

function onEscModalClose(evt) {
    if (evt.code === 'Escape') {
      onModalclose()
    };
  }
  // 


  // слайдер
function gallerySlideLeft(evt) {
  if (evt.code === 'ArrowLeft' && index >= 1) {
    index -= 1;
    galleryItems.forEach(function (item, idx) {
    if (idx === index) {
      lightboxImageRef.src = item.original,
        lightboxImageRef.alt = item.alt;
      }
    });
    
  }
};

  function gallerySlideRight(evt) {
    if (evt.code === 'ArrowRight' && index <= 8) {
      index += 1;
      galleryItems.forEach(function (item, idx) {
        if (idx === index) {
          lightboxImageRef.src = item.original,
            lightboxImageRef.alt = item.alt;
        }
    });
    }};
// 


