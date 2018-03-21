function Slider (wrapperID, settings) {
  let params = {
      counter: false,
      autoplay: true,
      autoplaySpeed: 4000,
      infinite: true,
      slideToShow: 1,
  };

  const elementCount = document.querySelectorAll(`${wrapperID} .slider__item`).length; //колличество слайдов
  let endCount = 0; // колличество страниц (будет рассчитано после получения парамаетров)
  let autoplayStop = false; //флаг autoplay
  const slideWidth = document.querySelector(`${wrapperID} .container-wrapper`).clientWidth; // ширина страницы слайдера
  const sliderBlock = document.querySelector(`${wrapperID}`);
  let currentCount = 1;
  let position = 0;

  function init() {
      applySettings(settings); //применяем пользовтельские параметры
      endCount = Math.ceil(elementCount/params.slideToShow); // колличество страниц слайдера
      //установка ширины картинки
      for (let i = 0; i < elementCount; i++) {
          document.querySelectorAll(`${wrapperID} .slider__item`)[i].style.width = Math.ceil(slideWidth/params.slideToShow)+'px';
      }
      //обработчик клика на стрелки
      sliderBlock.addEventListener('click', ev => {
          if (ev.target.parentNode.tagName === 'BUTTON') {
              let btn = ev.target.parentNode.classList.contains('next') ? 'next' : 'prev';
              switchSlide(btn);
              if (params.counter) updateCounter(currentCount);
              ev.preventDefault();
          }
      });
      if (params.counter) {
          initCounter();
      }
      autoplay();
      autoplayMouseHandler();
  }

  //применение пользовательских настроек
  function applySettings(settings) {
      if (settings !== undefined && typeof settings === 'object') {
          let settingsKey = Object.keys(settings);
          for (let i = 0; i < settingsKey.length; i++) {
              for (let key in params) {
                  if (key === settingsKey[i]) params[key] = settings[settingsKey[i]];
              }
          }
      }
  }

  //обработчик наведения мыши на слайдер
  function autoplayMouseHandler() {
    sliderBlock.addEventListener('mouseover', () => {
      autoplayStop = true;
    });
    sliderBlock.addEventListener('mouseout', () => {
      autoplayStop = false;
    });
  }

  //функия автоматической прокрутки
  function autoplay() {
    if(params.autoplay && params.infinite) {
      setTimeout(() => {
        if( !autoplayStop){
            switchSlide('next');
            if (params.counter) updateCounter(currentCount);
        }
        autoplay();
      },params.autoplaySpeed);
    }
  }

  //функция переключения
  function switchSlide (btn) {
    if (btn === 'next') {

      if (currentCount < endCount) {
        currentCount++;
        position += slideWidth;
      }else if(currentCount === endCount && params.infinite) {
          currentCount = 1;
          position = 0;
      }

    } else {
      if (currentCount > 1) {
        currentCount--;
        position -= slideWidth;
      }
      else if(currentCount == 1 && params.infinite) {
          currentCount = endCount;
          position = slideWidth*(endCount-1);
      }
    }
    let sliderContainer = document.querySelector(`${wrapperID} .slider__container`);
    sliderContainer.style.transform = `translateX(-${position}px)`;
  }

  //функция инициализации счетчика
  function initCounter () {
    const counterWrapper = document.createElement('div');
    counterWrapper.classList.add('counter-wrapper');
    let currentCountContainer = document.createElement('span');
    currentCountContainer.classList.add('counter__current');
    currentCountContainer.classList.add('counter__item');
    let endCountContainer = document.createElement('span');
    endCountContainer.classList.add('counter__end');
    endCountContainer.classList.add('counter__item');
    currentCountContainer.innerText = currentCount;
    endCountContainer.innerText = endCount;
    counterWrapper.appendChild(currentCountContainer);
    counterWrapper.appendChild(endCountContainer);
    sliderBlock.appendChild(counterWrapper);
  }

  //функция обновления счетчика
  function updateCounter (currentCount) {
    let counterCurrent = sliderBlock.querySelector('.counter__current');
    counterCurrent.innerText = currentCount;
  }
  init();
}