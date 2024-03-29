/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calk.js":
/*!****************************!*\
  !*** ./js/modules/calk.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calk(){
   const result = document.querySelector(".calculating__result span");

   let sex, height, weight, age, ratio;

   if(localStorage.getItem("sex")){
      sex = localStorage.getItem("sex");
   } else{
      sex = "female";
      localStorage.setItem("sex", "female");
   }
   if(localStorage.getItem("ratio")){
      ratio = localStorage.getItem("ratio");
   } else{
      ratio = 1.375;
      localStorage.setItem("ratio", 1.375);
   }

   function initLocalSettings(selector, activeClass){
      const elements = document.querySelectorAll(selector);
      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if(elem.getAttribute("id") === localStorage.getItem("sex")){
            elem.classList.add(activeClass);
         }
         if(elem.getAttribute("data-ratio") === localStorage.getItem("ratio")){
            elem.classList.add(activeClass);
         }
      });
   }
   initLocalSettings("#gender div", "calculating__choose-item_active");
   initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

   function calcTotal(){
      if(!sex || !height || !weight || !age || !ratio){
         result.textContent = "________";
         return;
      }
      if(sex == "female"){
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else{
         result.textContent =  Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }
   calcTotal();
   function getStaticInformation(selector, activeClass){
      const element = document.querySelectorAll(selector);
      element.forEach(elem => {
         elem.addEventListener("click", (e) => {
         let target = e.target;
         if(target.getAttribute("data-ratio")){
            ratio = +e.target.getAttribute("data-ratio");
            localStorage.setItem("ratio", +target.getAttribute('data-ratio'));
         }else {
            sex = target.getAttribute("id");
            localStorage.setItem("sex",target.getAttribute("id"));
         }
         element.forEach(elem => {
            elem.classList.remove(activeClass);
         });
         target.classList.add(activeClass);
         calcTotal();
      });
      });
   }
   getStaticInformation("#gender div", "calculating__choose-item_active");
   getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
   function  getDinamicInformation(selector){
      const input = document.querySelector(selector);

      input.addEventListener("input", () => {
         if(input.value.match(/\D/g)){
            input.style.border = "1px solid red";
         } else{
            input.style.border = "none";
         }
         switch (input.getAttribute("id")) {
            case "height":
               height = + input.value;
               break;
            case "weight":
               weight = + input.value;
               break;
            case "age":
               age = + input.value;
               break;
         }
         calcTotal();
      });
   }
   getDinamicInformation("#height");
   getDinamicInformation("#weight");
   getDinamicInformation("#age");
   function User(name, age){
      this.name = name;
      this.age = age;

      this.say = function() {
         console.log(`Имя пользователя: ${this.name}, возраст ${this.age}`);
      };
   }
   const ivan = new User("Ivan", 27);
   ivan.say();
}
/* harmony default export */ __webpack_exports__["default"] = (calk);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


function cards(){
   class MenuCard{
      constructor(src, alt, title, descr, price, parentSelector, ...clases){
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.clases = clases;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 35;
         this.chengeToUAH();
         
      }
      
      chengeToUAH(){
         
         this.price = this.transfer * this.price;
         
      }
      render(){
         const element = document.createElement("div");
         if(this.clases.length === 0){
            this.element = "menu__item";
            element.classList.add(this.element);
         } else{
            this.clases.forEach(className => element.classList.add(className));
         }
         element.innerHTML = `
         <img src=${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.title}</h3>
         <div class="menu__item-descr">${this.descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> долл/день</div>
         </div>
         `;
         this.parent.append(element);
      }
   }
   
   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu")
      .then(data => {
         
         data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
         });
      });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");



function forms(formSelector, modalTimerId){
   const forms = document.querySelectorAll(formSelector);
   const message = {
      loading: "img/form/spinner.svg",
      success: "Спасибо! Скоро мы с вами свяжемся",
      failure: "Что-то пошло не так..."
   };
   forms.forEach(item => {
      bindPostData(item);
   });
   
   function bindPostData(form) {
         form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                  display: block;
                  margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
         
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            //postData("server.php", json)
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("https://jsonplaceholder.typicode.com/posts", json)
            .then(data => {
                  console.log(data);
                  showThanksModal(message.success);
                  statusMessage.remove();
            }).catch(() => {
                  showThanksModal(message.failure);
            }).finally(() => {
                  form.reset();
            });
         });
      }
   function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');

         prevModalDialog.classList.add('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);

         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
            <div class="modal__content">
                  <div class="modal__close" data-close></div>
                  <div class="modal__title">${message}</div>
            </div>
         `;
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
         }, 4000);
      }
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function openModal(modalSelector, modalTimerId){
      const modal = document.querySelector(modalSelector);
      modal.classList.add("show");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
      if(modalTimerId){
         clearInterval(modalTimerId);
      }
   }
   function closeModal(modalSelector){
      const modal = document.querySelector(modalSelector);
      modal.classList.add("hide");
      modal.classList.remove("show");
      document.body.style.overflow = "";
   }
function modal(triggerSelector, modalSelector, modalTimerId){
   const modalTrigger = document.querySelectorAll(triggerSelector),
         modal = document.querySelector(modalSelector),
         modalCloseBtn = document.querySelector("[data-close]");
   console.log(modalCloseBtn);
   modalTrigger.forEach(btn => {
      btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
   });
   
   modalCloseBtn.addEventListener("click", () => closeModal(modalSelector));
   modal.addEventListener("click", (e) =>{
      if (e.target === modal || e.target.getAttribute('data-close') == ""){
         closeModal(modalSelector);
      }
   });
   document.addEventListener("keydown", (e) =>{
      if(e.code === "Escape"  && modal.classList.contains("show")){
         closeModal(modalSelector);
      }
   });
   function showModalByScroll(){
      if(window.pageYOffset + document.documentElement.clientHeight >= document.
         documentElement.scrollHeight -1){
         openModal(modalSelector, modalTimerId);
         window.removeEventListener("scroll", showModalByScroll);
      }
   }
   window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
   let slideIndex = 1,
         offset = 0;
   const slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      prev = document.querySelector(prevArrow),
      next = document.querySelector(nextArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      sliderField = document.querySelector(field),
      width = window.getComputedStyle(slidesWrapper).width;
      
      function slideNumber(){
         if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
         } else{
            current.textContent = slideIndex;
         }
      }
      function opacityDots(){
         dots.forEach(dot => dot.style.opacity = ".5");
         dots[slideIndex - 1].style.opacity = 1;
      }
      if(slides.length < 10){
         total.textContent = `0${slides.length}`;
         current.textContent = `0${slideIndex}`;
      } else{
         total.textContent = slides.length;
         current.textContent = slideIndex;
      }
      
      sliderField.style.width = 100 * slides.length + "%";
      sliderField.style.display = "flex";
      sliderField.style.transition = "0.5s all";
      slidesWrapper.style.overflow = "hidden";
      slides.forEach(slide => {
         slide.style.width = width;
      });

      slider.style.position = "relative";

      const indicators = document.createElement("ol"),
            dots = [];

      indicators.classList.add("carousel-indicators");
      indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
      `;
      slider.append(indicators);

      for(let i = 0; i < slides.length; i++){
         const dot = document.createElement("li");
         dot.setAttribute("data-slide-to", i + 1);
         dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
         `;
         if(i == 0){
            dot.style.opacity = 1;
         }
         indicators.append(dot);
         dots.push(dot);
      }

      next.addEventListener("click", () =>{
         if(offset == +width.replace(/\D/g, "") * (slides.length - 1)){
            offset = 0;
         } else{
            offset += +width.replace(/\D/g, "");
         }
         sliderField.style.transform = `translateX(-${offset}px)`;
         if(slideIndex == slides.length){
            slideIndex = 1;
         }else{
            slideIndex++;
         }

         slideNumber();
         opacityDots();
      });
      prev.addEventListener("click", () =>{
         if (offset == 0) {
            offset = +width.replace(/\D/g, "") * (slides.length - 1);
         } else {
            offset -= +width.replace(/\D/g, "");
         }
         sliderField.style.transform = `translateX(-${offset}px)`;
         if(slideIndex == 1){
            slideIndex = slides.length;
         }else{
            slideIndex--;
         }

         slideNumber();
         opacityDots();
      });

      dots.forEach(dot => {
         dot.addEventListener("click", (e) =>{
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset =  +width.replace(/\D/g, "") * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;

            slideNumber();

            opacityDots();
         });
      });
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove(activeClass);
      });
	}

	function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
   }
   
   hideTabContent();
   showTabContent();

	tabsParent.addEventListener('click', function(event) {
      const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
               if (target == item) {
                  hideTabContent();
                  showTabContent(i);
               }
         });
	}
   });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadLine){
   function getTimeRemaining(endtime){
      const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
      return {
         "total": t,
         "days": days,
         "hours": hours,
         "minutes": minutes,
         "seconds": seconds,
      };
   }
   
   function getZero(num){
      if(num >= 0 && num < 10){
         return `0${num}`;
      } else{
         return num;
      }
   }
   function setClock(selector, endtime){
      const timer = document.querySelector(selector),
            days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);
      updateClock();
      function updateClock(){
         const t = getTimeRemaining(endtime);
         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
         
         if(t.total <= 0){
            clearInterval(timeInterval);
         }
      }
   }
   setClock(id, deadLine);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calk */ "./js/modules/calk.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");









window.addEventListener("DOMContentLoaded", () =>{
   const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(".modal", modalTimerId), 300000);
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
   (0,_modules_calk__WEBPACK_IMPORTED_MODULE_1__["default"])();
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimerId);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
      container: ".offer__slider",
      slide: '.offer__slide',
      prevArrow: '.offer__slider-prev',
      nextArrow: '.offer__slider-next',
      totalCounter: "#total",
      currentCounter: "#current",
      wrapper: ".offer__slider-wrapper",
      field: ".offer__slider-inner",
   });
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])(".timer", "2023-02-24");
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])("form", modalTimerId);
});


}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map