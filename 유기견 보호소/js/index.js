

const menuTitle = document.getElementsByClassName("menu-title");
const header = document.querySelector("header");
const changeImg = document.getElementsByClassName("change-img");

// 마우스 호버시 메뉴창 색상변경
for (let i = 0; i < menuTitle.length; i++) {
  menuTitle[i].addEventListener("mouseover", () => {
    removeActive();
    header.classList.add("open-menu");
    menuTitle[i].classList.add("active");
  });
}

header.addEventListener("mouseleave", () => {
  removeActive();
  header.classList.remove("open-menu");
});

function removeActive() {
  for (let i = 0; i < menuTitle.length; i++) {
    menuTitle[i].classList.remove("active");
  }
}
//transform = translateY(0%); 보인다
//스크롤
//transform = translateY(-100%); 숨는다
//////////////////////////////////////////////////
//scrollTo
// window.scrollTo({top: 300 b})

// 스크롤시 메뉴창 사라짐
let zero = 0;

window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (zero < window.scrollY) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  zero = window.scrollY;
});

// burgerButton();

// scroll width: 100%;
const contentContainerWrapper =
  document.getElementsByClassName("section-content");
window.addEventListener("scroll", () => {
  // console.log(contentContainerWrapper[0].getBoundingClientRect().top);
  if (
    contentContainerWrapper[0].getBoundingClientRect().top - window.scrollY / 2 < 0
  ) {
    contentContainerWrapper[0].classList.add("active");
    // sectionMain.classList.add('change');
  } else {
    contentContainerWrapper[0].classList.remove("active");
    // sectionMain.classList.remove('change');
  }
});

//section-scroll-content
// section-content.active일 때
// section-main position: absolute로 변경하기

const stickySection = document.getElementsByClassName("section-scroll-content");
let opacityText = document.getElementsByClassName("opacity-text");
const sectionMain = document.querySelector(".section-main");
const stickyInitPos =
  stickySection[0].getBoundingClientRect().top + window.scrollY;
window.addEventListener("scroll", () => {
  for (let i = 0; i < opacityText.length; i++) {
    // console.log(stickySection[0].getBoundingClientRect().top < -500-(i*700));
    if (stickySection[0].getBoundingClientRect().top < -500 - i * 500) {
      opacityText[i].classList.add("active");
      sectionMain.classList.add("change");
    } else {
      opacityText[i].classList.remove("active");
      sectionMain.classList.remove("change");
    }
  }
});

/////////////////////////////////////////////////////
// section-sticky-container
const stickyList = document.querySelectorAll(".sticky-list");
const stickysPadding = 400;
const stickyImg = document.querySelectorAll(".sticky-img");

window.addEventListener("scroll", () => {
  for (let i = 0; i < stickyList.length; i++) {
    // console.log(`${i+1} = ${stickyList[i].getBoundingClientRect().top - window.innerHeight + stickysPadding}`);

    if (
      stickyList[i].getBoundingClientRect().top -
        window.innerHeight +
        stickysPadding <
      0
    ) {
      // 사진 나타나게하기
      stickyImg[i].classList.add("active");
    } else {
      stickyImg[i].classList.remove("active");
    }
  }
});

// 자동 슬라이드
let slides = document.querySelector(".slides"),
  slide = document.querySelectorAll(".slides li"),
  currentIndex = 0,
  slideCount = slide.length,
  slideWidth = 1000,
  slideMargin = 0,
  prevBtn = document.querySelector(".controls .prev"),
  nextBtn = document.querySelector(".controls .next");
slideMoveChecker = false;
const viweSlideCount = 1;

makeClone();

function makeClone() {
  for (let i = 0; i < viweSlideCount; i++) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  for (let i = slideCount - 1; i >= slideCount - viweSlideCount; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }

  currentIndex = 1;
  updateWidth();
  setPos();

  setTimeout(() => {
    slides.classList.add("animated");
  }, 100);
}

function updateWidth() {
  let currentSlides = document.querySelectorAll(".slides li");
  let newSlideCount = currentSlides.length;

  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}

function setPos() {
  //  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  //  slides.style.transform = 'translateX(' + initialTranslateValue + 'px)';
  slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

nextBtn.addEventListener("click", function () {
  stopSlide();
  autoSlide();
  moveSlide(currentIndex + 1);
});
prevBtn.addEventListener("click", function () {
  stopSlide();
  autoSlide();
  moveSlide(currentIndex - 1);
});

function moveSlide(num) {
  if (!slideMoveChecker) {
    slideMoveChecker = true;
    setTimeout(() => {
      slideMoveChecker = false;
    }, 500);

    slides.classList.add("animated");
    currentIndex = num;
    // console.log(currentIndex, slideCount);
    setPos();
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = slideCount;
        slides.classList.remove("animated");
        setPos();
      }, 500);
    }

    if (currentIndex === slideCount + viweSlideCount) {
      setTimeout(() => {
        currentIndex = viweSlideCount;
        slides.classList.remove("animated");
        setPos();
      }, 500);
    }
  }

  //  if(currentIndex === slideCount) {
  //   setTimeout(() => {
  //    slides.classList.remove('animated');

  //    currentIndex = 0;
  //   }, 500);
  //   setTimeout(() => {
  //    slides.classList.add('animated');
  //   }, 600);
  //  }

  //  if(currentIndex === -1) {
  //   setTimeout(() => {
  //    slides.classList.remove('animated');

  //    currentIndex = slideCount-1;
  //   }, 500);
  //   setTimeout(() => {
  //    slides.classList.add('animated');
  //   }, 600);
  //  }
}

// auto-slide
// clearInterval(timer);

let timer = undefined;

function nextSlide() {
  moveSlide(currentIndex + 1);
  autoSlide();
}

function autoSlide() {
  if (timer == undefined) {
    timer = setInterval(nextSlide, 3000);
  }
}
autoSlide();

function stopSlide() {
  clearInterval(timer);
  timer = undefined;
}
slides.addEventListener("mouseenter", function () {
  stopSlide();
});
slides.addEventListener("mouseleave", function () {
  autoSlide();
});

// next버튼 작동 시 시간 멈추기 기능

// etc-container row-scroll-slider
// etc-container ->> slider-conainer
// ul.etc-image-container ->> slider
// li.flex-wrap-box ->> slide
const etcContainer = document.querySelector(".etc-container");
const etcWrapper = document.querySelector(".etc-wrapper");
let scrollY = -100;

const vScrollContainer = document.querySelector(".h-scroll-container");
const vScrollContainerWidth = vScrollContainer.getBoundingClientRect().width;
etcContainerHeight =
  vScrollContainerWidth - (window.innerWidth - window.innerHeight);
etcContainer.style.height = `${etcContainerHeight}px`;
// 스크롤 이벤트 리스너
window.addEventListener("scroll", () => {
  console.log(etcContainer.getBoundingClientRect().top);
  console.log(vScrollContainerWidth);
  if (
    etcContainer.getBoundingClientRect().top < 0 &&
    etcContainer.getBoundingClientRect().top >
      (etcContainerHeight - window.innerHeight) * -1
  ) {
    // etcWrapper.style.background = 'red';
    vScrollContainer.style.transform = `translateX(${
      etcContainer.getBoundingClientRect().top
    }px)`;
  } else {
    // etcWrapper.style.background = 'blue';
  }

  //     if(event.deltaY > 0) {
  //  //아래로 스크롤할 때 다음 슬라이드로 이동
  //   scrollLeft +=sliderWidth;
  //  } else {
  //  //위로 스크롤할 때 이전 슬라이드로 이동
  //   scrollLeft +=sliderWidth;
  //  }
  //  //스크롤 범위를 슬라이더의 가로 너비로 제한
  //  scrollLeft = Math.min(Math.max(scrollLeft, 0), (slider.children.length - 1) * sliderWidth);
  //  //슬라이더를 이동
  //  slider.style.transform = `translateX(-${scrollLeft}px)`;
});

// modal-content
const burger = document.querySelector(".burger");
const menuContainer = document.querySelector(".menu-container");

function closeBurger() {
  menuContainer.style.transform = 'translateX(460px)';
    burger.classList.remove('toggle');
}

function burgerButton() {
 burger.addEventListener("click", () => {
  if(burger.classList.contains('toggle')){
    closeBurger();
  }else {
    menuContainer.style.transform = 'translateX(0)';
    burger.classList.add('toggle');
  }

 });
 
}
window.addEventListener('scroll',()=>{
  closeBurger();
})

burgerButton();

// console.log("modalContainer");
// toggle버튼을 실행하면, X가 되면
// modal-content-wrapper가 display: block 상태가되고,
// toggle버튼을 다시 실행하면 display: none;이 된다.
// if(burger.addEventListener('click', ()=> {})) {
//  burger.classList.add('open');
// } else {
//  burger.classList.remove('open');
// }

const resetModal = 0;
//스크롤하면 토글버튼 사라짐, 모달창 사라짐 트랜지션 0
// window.addEventListener('scroll', ()=> {
//   if(resetModal < window.scrollY) {
//     menuContainer.classList.add("moved");
//     burger.classList.remove("toggle");
//   }  else {
//     menuContainer.classList.remove("moved");
//   }
  
// })

// window.addEventListener("scroll", () => {
//   if (window.scrollY >= 100) {
//     header.classList.add("scrolled");
//   } else {
//     header.classList.remove("scrolled");
//   }

//   if (zero < window.scrollY) {
//     header.classList.add("hide");
//   } else {
//     header.classList.remove("hide");
//   }

//   zero = window.scrollY;
// });