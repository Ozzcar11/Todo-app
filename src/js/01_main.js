const todoInput = document.querySelector('.todo__input')
const todoList = document.querySelector('.todo__list')
const footerClear = document.querySelector('.footer__clear')
const filterRadio = document.querySelector('.footer__filters')

window.onload = showChecked()
window.onload = checkListCount()

const generateTodoText = (text) => {
   return `
      <li class="todo__item">
         <label class="todo__item-toggle">
            <input class="todo__item-checkbox" type="checkbox">
            <span></span>
         </label>
         <span class="todo__item-text">${text}</span>
         <input class="todo__item-input" type="text">
         <button class="todo__item-button">
            <svg class="todo__item-img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="rgba(138, 1, 1, 0.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <line x1="18" y1="6" x2="6" y2="18"/>
               <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
         </button>
      </li>
   `
}


todoInput.addEventListener('keyup', addTodo)
todoList.addEventListener('click', eventCheck)
todoList.addEventListener('dblclick', editTodo)
footerClear.addEventListener('click', clearCompleted)
filterRadio.addEventListener('click', filterTodo)



function checkListCount() {
   let footer = document.querySelector('.footer')
   if (document.querySelectorAll('.todo__item').length === 0) {
      footer.style.display = 'none'
   } else if (footer.style.display == 'none') footer.style.display = 'flex'
}

function countItems() {
   let count = 0
   let countChecked = document.querySelectorAll('.todo__item-checkbox')
   const footerNumber = document.querySelector('.footer__numb')
   countChecked = Array.from(countChecked).forEach(item => {
      if (item.checked === false) count++
   })
   if (footerNumber !== null) footerNumber.textContent = count
}

function addTodo(e) {
   if (todoInput.value === '') return
   if(e.key === 'Enter') {
      todoList.insertAdjacentHTML('beforeend', generateTodoText(todoInput.value))
      todoInput.value = ''
      checkListCount()
      countItems()
   }
}

function eventCheck(e) {
   const item = e.target
   switch (item.classList[0]) {
      case 'todo__item-button':
         deleteTodo(item)
         countItems()
         break
      case 'todo__item-checkbox':
         itemChecked(item)
         countItems()
         break
   }
}

function clearCompleted() {
   const itemChecked = document.querySelectorAll('.item-checked')
   itemChecked.forEach((item) => item.closest('.todo__item').remove())
   checkListCount()
   showChecked()
}

function deleteTodo(item) {
   item.parentElement.remove()
   checkListCount()
   showChecked()
}

function itemChecked(item) {
   item.parentElement.nextElementSibling.classList.toggle('item-checked')
   showChecked()
   filterTodo()
}

function showChecked() {
   if (document.querySelectorAll('.item-checked').length === 0) {
      footerClear.disabled = true
   } else footerClear.disabled = false
}

function filterTodo(e) {
   const todos = todoList.children
   for (let i of todos) {
      switch (document.querySelector('input[name=filter]:checked').value) {
         case 'all':
            i.style.display = 'flex'
            break
         case 'completed':
            if (i.children[1].classList.contains('item-checked')) {
               i.style.display = 'flex'
            } else {
               i.style.display = 'none'
            }
            break
         case 'active':
            if (!i.children[1].classList.contains('item-checked')) {
               i.style.display = 'flex'
            } else {
               i.style.display = 'none'
            }
            break
      }
   }
}

function editTodo(e) {
   if (e.target.classList.contains('todo__item-text')) {
      const textElem = e.target
      const inputElem = textElem.nextElementSibling
      inputElem.value = textElem.textContent
      textElem.style.display = 'none'
      textElem.parentElement.querySelector('.todo__item-button').style.display = 'none'
      inputElem.style.display = 'block'
      inputElem.focus()
      inputElem.onblur = () => {
         textElem.textContent = inputElem.value
         inputElem.style.display = 'none'
         textElem.style.display = 'block'
         textElem.parentElement.querySelector('.todo__item-button').style.display = 'block'
      }
   }
}

