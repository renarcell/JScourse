module.exports = () => {
    function createTodoElement(label, important, id) {
        return { label, important, done: false, id }
      };
    return {
        todos: [
        createTodoElement('Drink coffee', false, 1),
        createTodoElement('Make Awesome App', true, 2),
        createTodoElement('Have a lunch', false, 3),
    ]};
  }