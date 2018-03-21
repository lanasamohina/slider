function Slider (wrapperID, settings) {
  let params = {
    counter: false,
    autoplay: false,
    slideToShow: 1,
  };

  if (settings !== undefined && typeof settings === 'object') {
    let settingsKey = Object.keys(settings);
    
    for (let i = 0; i < settingsKey.length; i++) {
      for (let key in params) {
        if (key === settingsKey[i]) params[key] = settings[settingsKey[i]];
      }
    }
  }

  const endCount = $(`${wrapperID} .slider__item`).length;
  const elWidth = $(`${wrapperID} .slider__item`).innerWidth();

  let currentCount = 1;
  let position = 0;


  $(`${wrapperID} .prev, ${wrapperID} .next`).on('click', function () {
    switchSlide($(this));

    if (params.counter) updateCounter(currentCount);
  });
  
  function switchSlide (selector) {
    let btn = selector.hasClass('next') ? 'next' : 'prev';
    
    if (btn === 'next') {

      if (currentCount < endCount) {
        currentCount++;
        position += elWidth;  
      }
    } else {

      if (currentCount > 1) {
        currentCount--;
        position -= elWidth;
      }
    }
    $(`${wrapperID} .slider__container`).css({
      transform: `translateX(-${position}px)`,
    });
  }

  if (params.counter) {
    function initCounter () {
      const counterWrapper = $('<div class="counter-wrapper">');
      let currentCountContainer = $('<span class="counter__current counter__item">'); 
      let endCountContainer = $('<span class="counter__end counter__item">'); 
      
      currentCountContainer.text(currentCount);
      endCountContainer.text(endCount);

      counterWrapper.appendTo($(wrapperID));
      currentCountContainer.appendTo(counterWrapper);
      endCountContainer.appendTo(counterWrapper);
    }

    function updateCounter (currentCount) {
      $('.counter__current').text(currentCount);
    }
    initCounter();
  }
}