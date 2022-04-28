## DOM public index.html

### naudojam data/data.js

1. Sugeneruoti items ul elemente li elementus su prekiu pavadinimu ir kaina ir mygtuku buy
2. pasaudus mygtuka nuperkam preke. Tai reiskia pasalinam ja is saraso.
   2.1. Susikuriam masyva cart. jis tures objektus {title: , price: , qty: 1}. paspaudus buy, ikeliam ta preke i cart masyva.
3. atvaizduojam cart masyva po prekiu sarasu.
4. Pagaminam lentele su title(primi trys title zodziai), price(kaina), category(kategorija), image(paveiklselis)
5. pridedam select lauka virs lenteles/saraso kuriame yra visos kategorijos is items. Parinkus kategorija rodom tik tos kategorijos items

6. <button id="sort-price">Sort By Price</button> nusitaikyti ir iskviesti sortByPrice() kuri iskonsolina "sort"

7. sortByPrice() fn viduje isrikiuoti items masyva ir paduoti ji i makelShopList

## tarpine uzduotis

1t. Paspaudus mygtuka 'minus' mazinam counter reiksme.
2t. Neleisti mazinti maziau nulio.
