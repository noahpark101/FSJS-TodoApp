import "../style.css";

// Factory function
function createTodoApp() {
  // Array to store our todos
  let todos = [];
  let nextTodoId = 1;
  let filter = "all"; // Initial filter setting

  function addTodo(text) {
    todos = [...todos, { 
      id: nextTodoId++, 
      text, // was "text: text, " but can be shortened
      completed: false 
    }];
  }

  // Assumption that each todo text is unique
  function toggleCompleted(text) {
    // map() does not modify the array, just returns a new array (typical fxnal programming style)

    // todos = todos.map((todo) => {
      // if (todo.text === text) {
      //   return {
      //     id: todo.id,
      //     text: todo.text,
      //     completed: !todo.completed
      //   }
      // } else {
      //   return todo;
      // }
    // });
    todos = todos.map((todo) =>
      todo.text === text
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo,
    );
  }

  function getVisibleTodos() {
    // Filter todos based on the current filter setting
    if (filter === 'active') {
      return todos.filter( (todo) => !todo.completed )
    } else if (filter === 'completed') {
      return todos.filter( (todo) => todo.completed )
    } else {
      return todos;
    }
  }

  function setFilter(newFilter) {
    filter = newFilter;
  }

  // Returns an object that includes the functions inside createTodoApp()
  return {
    addTodo,
    toggleCompleted,
    getVisibleTodos,
    setFilter
  }
}

const todoApp = createTodoApp();

// Function to render the todos based on the current filter
function renderTodos() {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = ''; // Clear the current list to avoid duplicates

  // filter is a higher order function
  // If we're just reutrning one line, no need for curly brackets or return keyword
  // filteredTodos = todos.filter((todo) => todo.completed);
  const filteredTodos = todoApp.getVisibleTodos();

  // Go through the filtered todos and add them to the DOM
  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('p-4', 'todo-item');

    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    // was assigned to filteredTodos[i].text when it was a for-loop
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.style.textDecoration = 'line-through';
    }

    const todoEdit = document.createElement('input');
    todoEdit.classList.add('hidden', 'todo-edit');
    // was assigned to filteredTodos[i].text when it was a for-loop
    todoEdit.value = todo.text;

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoEdit);
    todoListElement.appendChild(todoItem);
  });
}

// This function is replaced by the anonymous arrow function by filteredTodos.forEach() above
// function doSomethingForEachTodo() {}

// Function to handle adding a new todo
document.getElementById('new-todo').addEventListener('keydown', (event) => {
  // Check if the pressed key is 'Enter' and the input is not empty
  if (event.key === 'Enter' && event.target.value.trim() !== '') {
    // Add the new todo to the todos array, clear input field, then rerender todos
    const text = event.target.value.trim();
    todoApp.addTodo(text) // was todos.push({ id: nextTodoId++, text: event.target.value, completed: false });
    event.target.value = '';
    renderTodos(); 
  }
});

// Function to handle marking a todo as completed
document.getElementById('todo-list').addEventListener('click', (event) => {
  // Check if the clicked element has the class 'todo-text'
  if (event.target.classList.contains('todo-text')) {
    // Find the clicked todo in the todos array and toggle its completed status
    // for (let i = 0; i < todos.length; i++) {
    //   if (todos[i].text === event.target.textContent) {
    //     todos[i].completed = !todos[i].completed;
    //     break;
    //   }
    // }
    const text = event.target.value;
    todoApp.toggleCompleted(text);
    renderTodos(); // Re-render the todos
  }
});

// click on any of the links (all active completed)
document.getElementById('todo-nav').addEventListener('click', (event) => {
  // Function to handle changing the filter

  // Check if the clicked element is an anchor tag ('A' for a link)
  if (event.target.tagName === 'A') {

    // Extract the filter value from the href attribute
    // .slice(2) means to dump the /#/ and get the value after
    const hrefValue = event.target.getAttribute('href').slice(2);
    const newFilter = hrefValue === '' ? 'all' : hrefValue;
    todoApp.setFilter(newFilter);
    renderTodos(); // Re-render the todos based on the new filter
  }
});

// // Function to handle changing the filter REPLACED WITH ARROW FXN ABOVE
// function handleFilterClick(event) {
//   // Check if the clicked element is an anchor tag ('A' for a link)
//   if (event.target.tagName === 'A') {

//     // Extract the filter value from the href attribute
//     // .slice(2) means to dump the /#/ and get the value after
//     const hrefValue = event.target.getAttribute('href').slice(2);
//     filter = hrefValue === '' ? 'all' : hrefValue;
//     renderTodos(); // Re-render the todos based on the new filter
//   }
// }

// // click on any of the links (all active completed)
// const todoNavElement = document.getElementById('todo-nav');
// todoNavElement.addEventListener('click', handleFilterClick);

// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', renderTodos);