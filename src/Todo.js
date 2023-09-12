class Todo {

  static nextId = 1;

  // Recall a Todo has an id, text, and completed variable
  constructor(text) {
    this.id = Todo.nextId++;
    this.text = text;
    this.completed = false;
  }

  // No need for function keyword, just name the fxn
  toggle() {
    this.completed = !this.completed;
  }
}