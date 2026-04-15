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
  const completeTodo = () => {}

  // Delete todo item
  const deleteTodo = () => {}

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
      const todoItemElement = document.createElement("li")
      todoItemElement.innerHTML = todo.task
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
