import {getResource} from "./services/services";

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
   
   getResource("http://localhost:3000/menu")
      .then(data => {
         
         data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
         });
      });
}

export default cards;