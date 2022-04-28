// 1d. Sugeneruoti items ul elemente li elementus su prekiu pavadinimu ir kaina ir mygtuku buy

//  <li><strong>Title</strong> - price <button>buy</button></li>
function makeLiEl(title: string, price: number): HTMLLIElement {
  const li = document.createElement('li');
  const strongEl = document.createElement('strong');
  strongEl.textContent = title;
  li.appendChild(strongEl);

  li.textContent += ' - price ';

  const btnEl = document.createElement('button');
  btnEl.textContent = 'buy';

  return li;
}
