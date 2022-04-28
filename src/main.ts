// 1d. Sugeneruoti items ul elemente li elementus su prekiu pavadinimu ir kaina ir mygtuku buy

import { ItemObj, items } from './data/db.js';

const listEl = document.getElementById('shop-list') as HTMLOListElement | null;

//  <li><strong>Title</strong> - price <button>buy</button></li>
function makeLiEl(id: number, title: string, price: number): HTMLLIElement {
  const li = document.createElement('li');
  const strongEl = document.createElement('strong');
  strongEl.textContent = title.slice(0, 12) + ' --- ' + id;
  li.appendChild(strongEl);

  li.append(` - ${price} `);

  const btnEl = document.createElement('button');
  btnEl.textContent = 'buy';
  btnEl.dataset.itemId = id.toString();
  btnEl.addEventListener('click', buyDelete);
  li.append(btnEl);

  return li;
}
// idedam viena item 'shoes' 200
// makeLiEl('shoes', 200);
// const liShoues = makeLiEl('shoes', 200);
// listEl?.appendChild(liShoues);

function makelShopList(arr: ItemObj[]): void {
  if (listEl) listEl.innerHTML = '';

  arr.forEach((arrItem: ItemObj): void => {
    // create item su makeLiEl
    const liEl: HTMLLIElement = makeLiEl(arrItem.id, arrItem.title, arrItem.price);
    // append item created
    listEl?.appendChild(liEl);
  });
}
makelShopList(items);

const btnEl = document.getElementById('sort-price') as HTMLButtonElement | null;

btnEl?.addEventListener('click', sortByPrice);

let asc = true;

function sortByPrice(): void {
  console.log('sort');
  // isrikiuoti
  // const nr: number[] = [2, 8, 21, 5, 55];
  // console.log('nr ===', nr);
  // const sorted: number[] = nr.sort((a: number, b: number) => b - a);
  // console.log('sorted ===', sorted);

  // if (asc) {
  //   const sortedItems: ItemObj[] = items.sort(
  //     (a: ItemObj, b: ItemObj) => a.price - b.price
  //   );
  //   makelShopList(sortedItems);
  // } else {
  //   const sortedItems: ItemObj[] = items.sort(
  //     (a: ItemObj, b: ItemObj) => b.price - a.price
  //   );
  //   makelShopList(sortedItems);
  // }

  // paduoti i makelShopList()
  const sortedItems: ItemObj[] = items.sort((a: ItemObj, b: ItemObj) =>
    asc ? a.price - b.price : b.price - a.price
  );
  makelShopList(sortedItems);

  asc = !asc;
}

// 2. pasaudus mygtuka buy nuperkam preke. Tai reiskia pasalinam ja is saraso.
function buyDelete(event: Event): void {
  const delBtnEl = event.currentTarget as HTMLButtonElement | null;
  console.log('buy');
  console.log(delBtnEl);
  // addto cart
  delBtnEl?.parentElement?.remove();
  // (<HTMLButtonElement | null>event.currentTarget)?.parentElement?.remove();
  /*
  <li>
    <strong>Mens Casual </strong>
    - 22.3
    <button>buy</button>
  </li>
  */
}

interface cartItem {
  itemId: number;
  title: string;
  price: number;
  qty: number;
}
const cart: cartItem[] = [];
// 2.1. Susikuriam masyva cart. jis tures objektus {title: , price: , qty: 1}. paspaudus buy, ikeliam ta preke i cart masyva.
function addItemToCart(itemId: number): void {
  // surasti tarp items prekiu preke, kurios id === itemId
  const found: ItemObj | undefined = items.find(
    (iObj: ItemObj): boolean => iObj.id === itemId
  );
  console.log('found ===', found);
  const itemToCart: cartItem = {
    itemId: found.id,
  };
  // ikelti itemToCart i cart masyva
  // iskonsolinti cart masyva isitikinti kad pavyko
  // is tos prekes mes norim ideti i cart [] {itemId, title, price, qty}
}
addItemToCart(12);

// pagalvoti kur iskviesti addItemToCart() kad veiktu su buy mygtuku
// ko truksta kad veiktu su buy mygtuku
[1, 2, 3].includes(1);
const psiaudoCart = [
  {
    id: 1,
    title: 'yes',
    qty: 1,
  },
  {
    id: 2,
    title: 'maybe',
    qty: 1,
  },
  {
    id: 3,
    title: 'no',
    qty: 1,
  },
];
psiaudoCart.push({
  id: 1,
  title: 'yes',
  qty: 1,
});
