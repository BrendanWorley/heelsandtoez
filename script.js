const slider = document.querySelector('.slider');
const container = document.querySelector('.slider_container');
const slides = document.querySelectorAll('.slide');
const navigations = document.querySelectorAll('.slider_navigation');
const initShift = 50;
let initPos = 3.4;

visualViewport.addEventListener('resize', update);

/* if (container.clientWidth < 1218) {
   initPos = 23; 
} */


init();

function init() {
   for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];

      slide.dataset.order = i;
      slide.style.transform = "translateX(-`${initShift}%)";
      /* console.log(initShift); */
      slide.addEventListener('click', clickHandler);
   }   

   if (container.clientWidth < 1218) {
      initPos = 110; 
   } else {
      initPos = 3.4;
   }

   for (const navigation of navigations) {
      navigation.addEventListener('click', navigationHandler);
   }

   activeOrder = Math.floor(slides.length /2);



   update();
}

function update() {
   const { width, height } = container.getBoundingClientRect();
   
   if (container.clientWidth < 1218) {
      initPos = 110; 
   } else {
      initPos = 3.4;
   }
   /* console.log(initPos); */

   for (let i = 0; i < slides.length; i++) {
      const leftSlide = document.querySelector(`.slide[data-order="${activeOrder - i}"]`);
      const centerSlide = document.querySelector(`.slide[data-order="${activeOrder}"]`);

      if (leftSlide) {
         leftSlide.style.left = `${width / initPos - i * 440}px`;
         leftSlide.style.transform = "scale(0.69)";
      }

      const rightSlide = document.querySelector(`.slide[data-order="${activeOrder + i}"]`);
      if (rightSlide) {
         rightSlide.style.left = `${width / initPos + i * 440}px`;
         rightSlide.style.transform = "scale(0.69)";
      }

      centerSlide.style.transform = "scale(1.0)";
   
   }
}

function clickHandler() { 
   const order = parseInt(this.dataset.order, slides.length);
   
   activeOrder = order;
   //----implementing infinity effect------------
   if (activeOrder === slides.length - 1) {
      activeOrder = 1;
   } else if (activeOrder === 0) {
      activeOrder = slides.length - 2;
   }
   //-------------------------------------------
   update();
}

function navigationHandler() {
   const { dir } = this.dataset;
   /* console.log(this.dataset); */
   if (dir === 'prev') {
      activeOrder = Math.max(0, activeOrder - 1);
   } else if (dir === 'next') {
      activeOrder = Math.min(slides.length - 1, activeOrder + 1);
   }
   //----implementing infinity effect------------
   if (activeOrder === slides.length - 1) {
      activeOrder = 1;
   } else if (activeOrder === 0) {
      activeOrder = slides.length - 2;
   }
   //-------------------------------------------
   update();
}

