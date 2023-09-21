const menuTitle = document.getElementsByClassName('menu-title');
const header = document.querySelector('header');
const changeImg = document.getElementsByClassName('change-img');


// 마우스 호버시 메뉴창 색상변경
for(let i = 0; i < menuTitle.length; i++) {
 menuTitle[i].addEventListener('mouseover', ()=> {
  removeActive();
  header.classList.add('open-menu');
  menuTitle[i].classList.add('active'); 
 })
}

header.addEventListener('mouseleave', ()=> {
 removeActive();
 header.classList.remove('open-menu');
})

function removeActive() {
 for(let i = 0; i < menuTitle.length; i++) {
  menuTitle[i].classList.remove('active');
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

window.addEventListener("scroll", ()=> {
 if(window.scrollY >= 100) {
  header.classList.add("scrolled");
 } else {
  header.classList.remove("scrolled");
 }

 if(zero <  window.scrollY) {
  header.classList.add("hide");
 } else {
  header.classList.remove("hide");
 }

 zero = window.scrollY;
})



// scroll width: 100%;
const contentContainerWrapper = document.getElementsByClassName('section-content');
window.addEventListener('scroll', ()=> {
 // console.log(contentContainerWrapper[0].getBoundingClientRect().top);
 if (contentContainerWrapper[0].getBoundingClientRect().top - window.scrollY/2< 0 ) {
  contentContainerWrapper[0].classList.add("active");
 } else {
  contentContainerWrapper[0].classList.remove("active");
 }
})

//section-scroll-content
const stickySection = document.getElementsByClassName("section-scroll-content");
let opacityText = document.getElementsByClassName("opacity-text");

const stickyInitPos = stickySection[0].getBoundingClientRect().top + window.scrollY;
window.addEventListener('scroll', ()=>{
 for(let i = 0; i < opacityText.length; i++) {
  // console.log(stickySection[0].getBoundingClientRect().top < -500-(i*700));
  if(stickySection[0].getBoundingClientRect().top < -500-(i*500)){
   opacityText[i].classList.add('active');
  }else{
   opacityText[i].classList.remove('active')
  }
 }
})

/////////////////////////////////////////////////////
// section-sticky-container
const stickyList = document.querySelectorAll(".sticky-list");
const stickysPadding = 400;
const stickyImg = document.querySelectorAll(".sticky-img");

window.addEventListener('scroll', ()=> {
 for(let i = 0; i < stickyList.length ; i++){
  // console.log(`${i+1} = ${stickyList[i].getBoundingClientRect().top - window.innerHeight + stickysPadding}`);

  if(stickyList[i].getBoundingClientRect().top - window.innerHeight + stickysPadding < 0 ) {
   // 사진 나타나게하기
   stickyImg[i].classList.add("active")
  } else {
   stickyImg[i].classList.remove("active")
  }
 }
})

// 자동 슬라이드
let slides = document.querySelector('.slides'),
    slide = document.querySelectorAll('.slides li'),
    currentIndex = 0,
    slideCount = slide.length,
    slideWidth = 1000,
    slideMargin = 0,
    prevBtn = document.querySelector('.controls .prev'),
    nextBtn = document.querySelector('.controls .next');

makeClone();

function makeClone() {
 for(let i = 0; i < slideCount; i++) {
  let cloneSlide = slide[i].cloneNode(true);
  cloneSlide.classList.add('clone');
  slides.appendChild(cloneSlide);
 }
 for(let i = slideCount -1; i >= 0; i--) {
  let cloneSlide = slide[i].cloneNode(true);
  cloneSlide.classList.add('clone');
  slides.prepend(cloneSlide);
 }
 updateWidth();
 setInitialPos();

 setTimeout(() => {
  slides.classList.add('animated')
 }, 100);
}

function updateWidth() {
 let currentSlides = document.querySelectorAll('.slides li');
 let newSlideCount = currentSlides.length;

 let newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
 slides.style.width = newWidth;
}

function setInitialPos() {
 let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
 slides.style.transform = 'translateX(' + initialTranslateValue + 'px)';
}

nextBtn.addEventListener('click', function() {
 moveSlide(currentIndex + 1);
})
prevBtn.addEventListener('click', function() {
 moveSlide(currentIndex - 1);
})

function moveSlide(num) {
 slides.style.left = -num * (slideWidth + slideMargin) + 'px';
 currentIndex = num;
 // console.log(currentIndex, slideCount);
 if(currentIndex == slideCount || currentIndex == -slideCount) {
  setTimeout(() => {
   slides.classList.remove('animated');
   slides.style.left = '0px';
   currentIndex = 0; 
  }, 500);
  setTimeout(() => {
   slides.classList.add('animated');
  }, 600);
 }
} 

// auto-slide
// clearInterval(timer);

let timer = undefined;

function autoSlide() {
 if(timer == undefined) {
  timer = setInterval(() => {
   moveSlide(currentIndex + 1);
  }, 3000);
 }
}
autoSlide();

function stopSlide() {
 clearInterval(timer);
 timer = undefined;
}
slides.addEventListener('mouseenter', function() {
 stopSlide();
})
slides.addEventListener('mouseleave', function() {
 autoSlide();
})




// etc-container row-scroll-slider
// etc-container ->> slider-conainer
// ul.etc-image-container ->> slider
// li.flex-wrap-box ->> slide
const etcContainer = document.querySelector('.etc-container');
const etcWrapper = document.querySelector('.etc-wrapper');
let scrollY = -100;

const vScrollContainer = document.querySelector(".h-scroll-container")
const vScrollContainerWidth = vScrollContainer.getBoundingClientRect().width;
etcContainerHeight = vScrollContainerWidth-(window.innerWidth-window.innerHeight);
etcContainer.style.height = `${etcContainerHeight}px`
// 스크롤 이벤트 리스너
window.addEventListener('scroll', ()=> {
 console.log(etcContainer.getBoundingClientRect().top);
 console.log(vScrollContainerWidth)
 if(etcContainer.getBoundingClientRect().top < 0 && etcContainer.getBoundingClientRect().top > (etcContainerHeight - window.innerHeight)*-1) {
  // etcWrapper.style.background = 'red';
  vScrollContainer.style.transform = `translateX(${etcContainer.getBoundingClientRect().top}px)`
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

})



