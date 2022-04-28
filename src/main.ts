// 1d. Sugeneruoti items ul elemente li elementus su prekiu pavadinimu ir kaina ir mygtuku buy

import { ItemObj, items } from './data/db.js';

const listEl = document.getElementById('shop-list') as HTMLOListElement | null;

//  <li><strong>Title</strong> - price <button>buy</button></li>
function makeLiEl(title: string, price: number): HTMLLIElement {
  const li = document.createElement('li');
  const strongEl = document.createElement('strong');
  strongEl.textContent = title.slice(0, 12);
  li.appendChild(strongEl);

  li.append(` - ${price} `);

  const btnEl = document.createElement('button');
  btnEl.textContent = 'buy';
  li.append(btnEl);

  return li;
}
// idedam viena item 'shoes' 200
// makeLiEl('shoes', 200);
// const liShoues = makeLiEl('shoes', 200);
// listEl?.appendChild(liShoues);

function makelShopList(arr: ItemObj[]): void {
  arr.forEach((arrItem: ItemObj): void => {
    // create item su makeLiEl
    const liEl: HTMLLIElement = makeLiEl(arrItem.title, arrItem.price);
    // append item created
    listEl?.appendChild(liEl);
  });
}
makelShopList(items);
