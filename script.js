
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

//------------CLIENTS FRAME 118 LAYOUT REWORK-----------------------------------
      //------setting up the cliche for Client-object creation------------------

visualViewport.addEventListener('resize', updateRect24);
console.log(visualViewport.width);
const group1ToBeRemoved = document.querySelector('.rect24__frame118__group1');
// let clientsList = document.querySelectorAll('.clientContainer');
// console.log(clientsList.length);  

function updateRect24() {
   let clientsList = document.querySelectorAll('.clientContainer');
   console.log(clientsList.length);  

   if (visualViewport.width <= 767 && clientsList.length === 0) {
      const rect24__frame118 = document.querySelector('.rect24__frame118');      
      const clientsInputList = document.querySelectorAll('.rect24__ul__item');
      


      let orderN = 0;
      for (const clientInput of clientsInputList) {

         
         const clientInputImage = clientInput.children[0].children[0].src;
         // console.log(clientInputImage);
         const clientInputQuotes = clientInput.children[1].children[0].src;
         // console.log(clientInputQuotes);
         const clientInputText1 = clientInput.children[2].children[0].innerText;
         // console.log(clientInputText1);
         const clientInputText2 = clientInput.children[3].children[0].innerText;
         // console.log(clientInputText2);
         const clientInputText3 = clientInput.children[4].children[0].innerText;
         // console.log(clientInputText3);

         class Client {
            constructor(imageSource, imageQuotes, text1, text2, text3, order) {
               this.imageSource = imageSource;
               this.imageQuotes = imageQuotes;
               this.text1 = text1;
               this.text2 = text2;
               this.text3 = text3;
               this.order = order;
            }
         
            createClient() {
                     
               const clientContainer = document.createElement('div');
               clientContainer.classList.add('clientContainer');
               
               const clientContainerA = document.createElement('div');
               clientContainerA.classList.add('clientContainerA');
               
               const clientPicture = document.createElement('img');
               clientPicture.classList.add('clientImg');
               clientPicture.src = this.imageSource;
               clientContainerA.appendChild(clientPicture);
               
               const clientText2 = document.createElement('p');
               clientText2.classList.add('clientText2');
               clientText2.textContent = this.text2;
               clientContainerA.appendChild(clientText2);
         
               const clientText3 = document.createElement('p');
               clientText3.classList.add('clientText3');
               clientText3.textContent = this.text3;
               clientContainerA.appendChild(clientText3);
         
               const clientContainerB = document.createElement('div');
               clientContainerB.classList.add('clientContainerB');
                        
               const clientText1 = document.createElement('p');
               clientText1.classList.add('clientText1');
               clientText1.textContent = this.text1;
               clientContainerB.appendChild(clientText1);
         
               const clientQuotes = document.createElement('img');
               clientQuotes.classList.add('clientQuotes');
               clientQuotes.src = this.imageQuotes;
               

               if (this.order === 0 || this.order === 2) {
                  clientContainer.appendChild(clientContainerB);
                  clientContainer.appendChild(clientContainerA);
                  clientContainer.appendChild(clientQuotes);
                  } else if (this.order === 1) {
                  clientContainer.appendChild(clientContainerA);
                  clientContainer.appendChild(clientContainerB);
                  clientContainer.appendChild(clientQuotes);
                  clientQuotes.classList.add('_revertQuotes');
                  
               }

               if (this.order === 2) {
                  clientQuotes.style.opacity = '0';
               }
         
               rect24__frame118.appendChild(clientContainer);
         
            }
         }

         group1ToBeRemoved.style.display = 'none';

         const theClient = new Client(clientInputImage, clientInputQuotes, clientInputText1, clientInputText2, clientInputText3, orderN);
         theClient.createClient();
         orderN++;

      }
   } else if (visualViewport.width > 767) {
      
      group1ToBeRemoved.style.display = 'flex';
      for (const clientItem of clientsList) {
         clientItem.remove();
      }
      

   }
}


//------------------------------------------------------------------------------

//------------------FEEDBACK FORM BEHAVIOR-----------------------------------
const moveFormButton = document.querySelector('.moveForm');
const movableForm = document.querySelector('.form');
const nameFocused = document.getElementById('contactUs_frame182_name');

function moveForm() {
   movableForm.style.display = 'block';
   moveFormButton.style.display = 'none';
   nameFocused.focus();
}

moveFormButton.addEventListener('click', moveForm);


//---------------------------------------------------------------------------

  