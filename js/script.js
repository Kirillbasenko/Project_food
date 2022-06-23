import tabs from "./modules/tabs";
import calk from "./modules/calk";
//import cards from "./modules/cards";
import modal from "./modules/modal";
import slider from "./modules/slider";
import timer from "./modules/timer";
import forms from "./modules/forms";
import {openModal} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () =>{
   const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 300000);
   tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
   calk();
   //cards();
   modal("[data-modal]", ".modal", modalTimerId);
   slider({
      container: ".offer__slider",
      slide: '.offer__slide',
      prevArrow: '.offer__slider-prev',
      nextArrow: '.offer__slider-next',
      totalCounter: "#total",
      currentCounter: "#current",
      wrapper: ".offer__slider-wrapper",
      field: ".offer__slider-inner",
   });
   timer(".timer", "2022-07-12");
   forms("form", modalTimerId);
});

