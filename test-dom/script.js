import { books } from "./deckare.js"

const cardGrid = document.querySelector('.card-grid')

// console.log('Deckare', books, cardGrid)
addBooks(books)

function addBooks(books) {
	books.forEach(book => {
		// Skapa DOM-element
		const card = document.createElement('section')
		const cardTitle = document.createElement('h3')
		const cardAuthor = document.createElement('p')
		const cardPrice = document.createElement('p')
		const borrowButton = document.createElement('button')

		// Lägg till innehåll till elementen
		card.classList.add('card')

		cardTitle.innerText = book.title
		cardAuthor.innerText = book.author
		cardPrice.innerText = book.price
		borrowButton.innerText = 'Låna'

		borrowButton.addEventListener('click', () => {
			// Ta bort hela "card" när man klickar
			card.remove()
		})

		// Lägg in element i parent
		card.append(cardTitle)
		card.append(cardAuthor)
		card.append(cardPrice)
		card.append(borrowButton)

		// Lägg till "card" på sidan
		cardGrid.append(card)
	})
}



const cardPriceButton = document.querySelector('#card-price-button')
cardPriceButton.addEventListener('click', () => {
	// öka priset 10% -> modifiera listan med lista.map eller vanlig for-loop
	// ta bort alla cards
	// lägg till cards igen - kan vi använda en funktion?

	let expensiveBooks = books.map(item => {
		return {
			...item,
			price: item.price * 1.10
		}
	})
	// let expensiveBooks2 = books.map(item => ({
	// 	...item,
	// 	price: item.price * 1.10
	// }))
	// console.log('10% dyrare: ', expensiveBooks)
	cardGrid.innerHTML = ''
	addBooks(expensiveBooks)
})



const tabs = Array.from( document.querySelectorAll('.tabs .tab') )
const tabContentList = Array.from( document.querySelectorAll('.tab-content-container .tab-content') )

tabs.forEach((tab, index) => {
	tab.addEventListener('click', () => {
		// Toggla synlighet, toggla markering på fliken
		hideAllContent()
		tabContentList[index].classList.remove('hidden')
		deselectTabs()
		tab.classList.add('active')
	})
})
function hideAllContent() {
	tabContentList.forEach(content => {
		content.classList.add('hidden')
	})
}
function deselectTabs() {
	tabs.forEach(tab => {
		tab.classList.remove('active')
	})
}
/*
startTab.addEventListener('click', () => {
	tabContentList[0].classList.remove('hidden')
	tabContentList[1].classList.add('hidden')
	calendarTab.classList.remove('active')
	startTab.classList.add('active')
})
calendarTab.addEventListener('click', () => {
	tabContentList[0].classList.add('hidden')
	tabContentList[1].classList.remove('hidden')
	calendarTab.classList.add('active')
	startTab.classList.remove('active')
})
*/


const showDialog = document.querySelector('#show-dialog')
const closeDialogButton = document.querySelector('#close-dialog')
const dialog = document.querySelector('dialog')
const dialogContainer = document.querySelector('.dialog-container')

dialog.addEventListener('click', event => {
	event.stopPropagation()
})
showDialog.addEventListener('click', () => {
	dialogContainer.classList.remove('hide')
	dialog.show()
})
closeDialogButton.addEventListener('click', closeDialog)
dialogContainer.addEventListener('click', closeDialog)

function closeDialog() {
	dialog.close()
	dialogContainer.classList.add('hide')
}

dialog.show()