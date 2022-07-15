const slider = document.querySelector('.slider');
const container = document.querySelector('.slider_container');
const slides = document.querySelectorAll('.slide');
const navigations = document.querySelectorAll('.slider_navigation');

init();

function init() {
   for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];

      slide.dataset.order = i;
      slide.style.transform = "translateX(-50%)";
      slide.addEventListener('click', clickHandler);
   }   

   for (const navigation of navigations) {
      navigation.addEventListener('click', navigationHandler);
   }

   activeOrder = Math.floor(slides.length /2);

   update();
}

function update() {
   const { width, height } = container.getBoundingClientRect();
   console.log(width);

   for (let i = 0; i < slides.length; i++) {
      const leftSlide = document.querySelector(`.slide[data-order="${activeOrder - i}"]`);
      const centerSlide = document.querySelector(`.slide[data-order="${activeOrder}"]`);

      if (leftSlide) {
         leftSlide.style.left = `${width / 3.4 - i * 400}px`;
         leftSlide.style.transform = "scale(0.5)";
      }

      const rightSlide = document.querySelector(`.slide[data-order="${activeOrder + i}"]`);
      if (rightSlide) {
         rightSlide.style.left = `${width / 3.4 + i * 400}px`;
         rightSlide.style.transform = "scale(0.5)";
      }

      centerSlide.style.transform = "scale(1.0)";
   
   }
}

function clickHandler() { 
   const order = parseInt(this.dataset.order, slides.length);
   console.log(order);
   console.log(this.dataset);
   activeOrder = order;
   update();
}

function navigationHandler() {
   const { dir } = this.dataset;
   
   if (dir === 'prev') {
      activeOrder = Math.max(0, activeOrder - 1);
   } else if (dir === 'next') {
      activeOrder = Math.min(slides.length - 1, activeOrder + 1);
   }
   update();
}

console.log(activeOrder);