
//---------------SEND BUTTON STYLING----------------------
/* const labelSend = document.getElementById('labelSend');
labelSend.style.color = 'rgba(253, 244, 200, 1)';
labelSend.style.backgroundColor = '#CD7F47'; */
//--------------------------------------------------------

//--------------------SLIDER -------------------------------
const slider = document.querySelector('.slider');
const container = document.querySelector('.slider_container');
const slides = document.querySelectorAll('.slide');
const navigations = document.querySelectorAll('.slider_navigation');
const initShift = 50;
let initPos = 3.4;

visualViewport.addEventListener('resize', update);
visualViewport.addEventListener('resize', shiftBox);


init();

function init() {
   for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      
      slide.dataset.order = i;
      slide.style.transform = "translateX(-`${initShift}%`)";
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

   activeOrder = Math.floor(slides.length / 2);



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
         leftSlide.style.transform = "scale(0.5)";
      }

      const rightSlide = document.querySelector(`.slide[data-order="${activeOrder + i}"]`);
      if (rightSlide) {
         rightSlide.style.left = `${width / initPos + i * 440}px`;
         rightSlide.style.transform = "scale(0.5)";
      }

      centerSlide.style.transform = "scale(0.9)";
   
   }
   
}

function clickHandler() { 
   const order = parseInt(this.dataset.order);
   /* console.log(this.dataset.order); */
   activeOrder = order;
   //----implementing infinity effect------------
   if (activeOrder === slides.length - 1) {
      activeOrder = 1;
      
   } else if (activeOrder === 0) {
      activeOrder = slides.length - 2;
   }
   //--------------------------------------------
   
   update();
   
}

function navigationHandler() {
   const { dir } = this.dataset;
   
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
//--------------------------------------------------------------
//------------------SLIDER BUTTONS POSITIONING----------------------------

document.addEventListener('DOMContentLoaded', shiftBox);




function shiftBox() {
   let sliderNavContainer = document.querySelector('.slider__navigation__container');
   let sliderBox = document.querySelector('.slider');
   let slideWidth = document.querySelector('.slide').clientWidth;
   let navWidth = document.querySelector('.slider_navigation').clientWidth;
   let slideContWidth = sliderNavContainer.clientWidth;
   let boxSpan = slideContWidth - (2 * navWidth) - slideWidth;

   
   
   sliderNavContainer.style.top = '0';
   
   if (boxSpan >= 320 && slideContWidth >= 1400) {
      boxOffset = -105;
   } else if (boxSpan >= 320 && slideContWidth < 1400) {
      boxOffset = 33;
            } else if (boxSpan < 320) {
               let top3 = sliderBox.offsetTop;
               boxOffset = -(container.clientHeight / 2) + 34; 
      
                  } 

   let height1 = sliderNavContainer.clientHeight;
   let height2 = sliderBox.clientHeight;

   let top1 = sliderNavContainer.offsetTop;
   let top2 = sliderBox.offsetTop;

   if (top2 >= top1) {
      sliderNavContainer.style.top = top1 + (top2 - top1) + (height2 / 2) - (height1 / 2) - boxOffset + 'px'; 
   } else {
         sliderNavContainer.style.top = top1 - (top1 - top2) + (height2 / 2) - (height1 / 2) - boxOffset + 'px';
      }
   
}

//--------------------------------------------------------------------------------------------------------

//------------------------------FEEDBACK EMAIL FORM VALIDATION -------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();
      let error = formValidate(form);
      
      if (error === 0) {
         e.target.submit();       
      } else {
         alert('Fill the required form fields please.')
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');
      
      
      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }

      }
      return error;
   }
      
   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   //email place function--------------------------
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }

});

//-------------------BIG MENU OPERATION ---------------------------------------
const MenuLinks = document.querySelectorAll(".link[data-goto1]");


if (MenuLinks.length > 0) {



         MenuLinks.forEach(MenuLink => {
         MenuLink.addEventListener('click', onMenuClick1);
         
      });
      function onMenuClick1(e) {
      const clickHolder = e.target;
      if (clickHolder.dataset.goto1 && document.querySelector(clickHolder.dataset.goto1)) {
         const gotoBlock = document.querySelector(clickHolder.dataset.goto1);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;
         
         
        
         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
         }
      }
}




//-------------------------------------------------------------------------------

//--------------------SMALL MENU OPERATION---------------------------------------
const colorLogo = document.querySelector('.headerSmall__menu');
const menuSmall = document.querySelector('.menuSmall');
const menuTurtle = document.querySelector('#menuTurtle');
const body = document.body;

const green = document.querySelector('.green');
const orange = document.querySelector('.orange');
const white = document.querySelector('.white');
colorLogo.addEventListener('click', smallMenuDropout);

function smallMenuDropout() {
   menuSmall.classList.toggle('_dropout');
   green.classList.toggle('_hideGreen');
   orange.classList.toggle('_turnOrange');
   white.classList.toggle('_turnWhite');
   body.classList.toggle('_bodyFreeze');
   menuTurtle.style.opacity = '1.0';
   
   
}


const smallMenuLinks = document.querySelectorAll('.menuSmall__container__link[data-goto]');


if (smallMenuLinks.length > 0) {

   
   

      
      smallMenuLinks.forEach(smallMenuLink => {
         smallMenuLink.addEventListener('click', onSmallMenuClick);
         
      });
      function onSmallMenuClick(e) {
      const smallMenuLink = e.target;
      if (smallMenuLink.dataset.goto && document.querySelector(smallMenuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(smallMenuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.headerSmall').offsetHeight;
         
         
         if (menuSmall.classList.contains('_dropout')) {
            menuSmall.classList.remove('_dropout');
            green.classList.remove('_hideGreen');
            orange.classList.remove('_turnOrange');
            white.classList.remove('_turnWhite');
            body.classList.remove('_bodyFreeze');
         }
         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
         }
      }
}

      //----------adjusting the dropoutmenu under landscape layout-------------
      
      
      visualViewport.addEventListener('resize', () => {
         const landX = window.innerWidth;
         const landY = window.innerHeight;
         const landRatio = landX / landY;
         const ratioTarget1 = document.querySelector('.menuSmall');
         const ratioTarget = document.querySelector('.menuSmall__container');
         const ratioTarget2 = document.querySelectorAll('.menuSmall__container__item');
         const ratioTarget3 = document.querySelector('#menuTurtle'); 
         

         if (landRatio > 1.7 || landY < 450) {
            ratioTarget1.classList.add('_incRatio1');
            ratioTarget.classList.add('_incRatio');
            ratioTarget3.style.display = 'none';
            
            for (i = 0; i < ratioTarget2.length; i++) {
               ratioTarget2[i].classList.add('_incRatio2');
            }
                     
            } else {
               ratioTarget.classList.remove('_incRatio');
               ratioTarget1.classList.remove('_incRatio1');
               ratioTarget3.style.display = 'inherit';
               
               for (i = 0; i < ratioTarget2.length; i++) {
                  ratioTarget2[i].classList.remove('_incRatio2');
               }
            }
      });
//-------------------------------------------------------------------------------

  