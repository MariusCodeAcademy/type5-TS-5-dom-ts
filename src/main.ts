// 1d. Sugeneruoti items ul elemente li elementus su prekiu pavadinimu ir kaina ir mygtuku buy

import { ItemObj, items } from './data/db.js';

const cart: cartItem[] = [];

const listEl = document.getElementById('shop-list') as HTMLOListElement | null;
const cartTableBodyEl = document.getElementById(
  'cart-body'
) as HTMLTableSectionElement | null;
const cartTotalEl = document.getElementById('cart-total-amount') as HTMLElement | null;

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
  if (!delBtnEl) throw new Error('delBtnEl el neradau');
  // addto cart
  // ! patvirtinam kad yra tokia reiksme.
  const itemId: string = delBtnEl.dataset.itemId!;
  addItemToCart(Number(itemId));
  // delBtnEl.parentElement?.remove();

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

// 2.1. Susikuriam masyva cart. jis tures objektus {title: , price: , qty: 1}. paspaudus buy, ikeliam ta preke i cart masyva.
function addItemToCart(itemId: number): void {
  // surasti tarp items prekiu preke, kurios id === itemId
  const found: ItemObj | undefined = items.find(
    (iObj: ItemObj): boolean => iObj.id === itemId
  );
  console.log('found ===', found);
  if (!found) return;
  // patikrini ar tokia preke jau yra krepselyje,
  // jei yra tai krepselyje padidinam 1 qty
  // jei nera idedam nauja preke (dabartinis varijantas)
  const { id, title, price } = found;
  const itemToCart: cartItem = {
    itemId: id,
    title,
    price,
    qty: 1,
  };
  cart.push(itemToCart);
  console.log('cart ===', cart);

  drawCartItems(cart, cartTableBodyEl);
  drawTotalPrice();
  // ikelti itemToCart i cart masyva
  // iskonsolinti cart masyva isitikinti kad pavyko
  // is tos prekes mes norim ideti i cart [] {itemId, title, price, qty}
}
// addItemToCart(12);

function drawTotalPrice() {
  const totalCartPrice: number = calculateCartTotal(cart);
  if (!cartTotalEl) return;
  cartTotalEl.textContent = `${totalCartPrice}eur`;
}

function drawCartItems(cartArr: cartItem[], dest: HTMLTableSectionElement | null): void {
  if (!dest) throw new Error('table body not found');

  console.log('drawing cart');

  // isvalom tabble body pries generuojant eilutes
  dest.innerHTML = '';

  cartArr.forEach((cObj: cartItem, idx: number): void => {
    // sukurti eilute
    // ideti ta eilute i cart table body
    const trEl: HTMLTableRowElement = dest.insertRow();
    // surasyti td reiksmes
    trEl.innerHTML = `
    <td>${idx + 1}</td>
    <td>${cObj.title}</td>
    <td>${cObj.price}</td>
    <td>${cObj.qty}</td>
  `;
  });
}

// suskaiciuoti bendra krepselio kaina
function calculateCartTotal(cartArr: cartItem[]): number {
  const totalCartSum = cartArr.reduce((total: number, cObj: cartItem) => {
    // is esamos prekes cObj paimti qty ir padauginti is price ir graznti rezulta
    const oneItemPriceTotal = cObj.price * cObj.qty;
    return total + oneItemPriceTotal;
  }, 0);
  console.log('totalCartSum ===', totalCartSum);
  return totalCartSum;
}
// atvaizduoti virs krepselio
// suma atsinaujina kai idedam preke i krepseli

// cart-total-amount el perkleti bendra suma gauta is calculateCartTotal
