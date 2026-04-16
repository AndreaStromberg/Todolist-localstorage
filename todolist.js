const todoList = () => {
  // Hämta element från DOM
  const todoForm = document.querySelector(".todo-form")
  const todoInput = document.querySelector("#todo-input")
  const todoList = document.querySelector(".todo__list")

  //   Array för att läsa in listan med todos
  let todoArr = []

  //  Funktion för att hämta todos från localstorage
  const getTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]")

    todoArr = todos

    console.log(todoArr)

    renderTodos()
  }

  // Funktion för att spara todos till localStorage
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todoArr))
  }

  // Complete todo item
  const completeTodo = (id) => {
    const todoToBeCompleted = todoArr.find((todo) => todo.id == id)

    // I praktiken en togglefunktion som togglar true och false. Ändrar till det den inte är från början.
    todoToBeCompleted.completed = !todoToBeCompleted.completed

    saveTodos()

    renderTodos()
  }

  // Delete todo item
  const deleteTodo = (id) => {
    // Skapa ny lista utan det borttagna todo
    const listWithoutDeletedTodo = todoArr.filter((todo) => todo.id !== id)

    //Sätt arrayen till den nya listan
    todoArr = listWithoutDeletedTodo

    // spara nya listan i local storage
    saveTodos()

    // Rendera nya listan
    renderTodos()
  }

  // Funktion för att skriva ut todo till DOM
  const addTodoToDOM = (value) => {
    if (!value) return

    // Skapa ett objekt som innehåller information om todo-uppgiften
    const todoItem = {
      id: crypto.randomUUID(),
      task: value,
      completed: false,
    }

    // Skicka todo-uppgiften till arrayen
    todoArr.push(todoItem)
    renderTodos()
  }

  //   Render todos
  const renderTodos = () => {
    // Börjar med att rensa listan
    todoList.innerHTML = ""

    todoArr.forEach((todo) => {
      // Skapa ett tomt listelement
      const todoItemElement = document.createElement("li")

      // Sätt todo-objektets id som dataattribut
      todoItemElement.dataset.id = todo.id

      //sätta klassen completed om det är avklarat
      if (todo.completed) {
        todoItemElement.classList.add("completed")
      }

      // Sätt information i det skapade listelementet
      todoItemElement.innerHTML = `
      <span>${todo.task}</span>
      <button class="delete">Delete</button>
      `

      // Event för att ta hand om complete när man klickar på span i det skapade elementet
      todoItemElement
        .querySelector("span")
        .addEventListener("click", () => completeTodo(todo.id))

      //Event för delete-knapp
      todoItemElement
        .querySelector(".delete")
        .addEventListener("click", () => deleteTodo(todo.id))

      // Lägg till elementet i listan
      todoList.append(todoItemElement)
    })
  }

  // Funktion som hanterar när man trycker på submitknappen
  const handleSubmit = (event) => {
    // Förhindra att webbläsaren laddar om sidan när man trycker på submit
    event.preventDefault()

    // Hämta ut värde från input
    const inputValue = todoInput.value

    if (!inputValue) return

    // Send todo to be added in DOM
    addTodoToDOM(inputValue)

    // Spara information i localstorage
    saveTodos()

    // Rensa inputrutan
    todoInput.value = ""
  }

  getTodos()

  //   Eventlyssnare
  todoForm.addEventListener("submit", handleSubmit)
}

todoList()
