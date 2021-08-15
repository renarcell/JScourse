import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AppendItem from '../append-item';

import './app.css';

class App extends Component {
  idElement = 100;

  getToDoList = () => {
    fetch('http://localhost:3000/todos')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  }).catch(() => {
    return [{
      "label": "Drink coffee",
      "important": true,
      "done": false,
      "id": 1
    }]
  });
  }

  state = { todoData: [
    this.createTodoElement('Drink Coffee',false),
    this.createTodoElement('Make Awesome App', true),
    this.createTodoElement('Have a lunch', false),
  ],
  searchInput: '',
  filterState: 'all'};

  getTodoArray = (searchText = '', state = 'all') => {
    let Arr = this.state.todoData.filter(item => {
      return item.label.toLowerCase().includes(searchText.toLowerCase());
    });
    switch(state) {
      case "all":
        return Arr;
        break;
      case "active":
        return Arr.filter(item => !item.done);
        break;
      case "done":
        return Arr.filter(item => item.done);
        break;
      default:
        return Arr;
    }
    
  };

  setSearchInput = (text) => {
    this.setState({
      searchInput: text
    });
  }

  setFilter = (state) => {
    this.setState({
      filterState: state
    });
  }

  createTodoElement(label, important) {
    return { label, important, done: false, id: this.idElement++ }
  }


  deleteElement = (id) => {
    this.setState(state => {
      let newObj = {todoData: state.todoData.filter((item) => (item.id !== id))};
      return newObj;
    });
  }

  appendElement = (text) => {
    this.setState(state => {
      let newObj = {todoData: [...state.todoData, 
        this.createTodoElement(text)]};
      return newObj;
    });
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
        let newTodoData = todoData.map(item => {
              if (item.id === id) {
                return {...item, important: !item.important}
              } else {
                return item
              }
        });
        return {
          todoData: newTodoData
        }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
        let newTodoData = todoData.map(item => {
              if (item.id === id) {
                return {...item, done: !item.done}
              } else {
                return item
              }
        });
        return {
          todoData: newTodoData
        }
    })
  }

  render () {  
    const {todoData} = this.state;
    const [totalToDoTasks, totalDoneTasks] = todoData.reduce((total, item) => {
      item.done ? ++total[1] : ++total[0]; 
      return total}, [0, 0]);

    
    return (
      <div className="todo-app">
        <AppHeader toDo={totalToDoTasks} 
        done={totalDoneTasks} />
        <div className="top-panel d-flex">
          <SearchPanel onChange={this.setSearchInput}/>
          <ItemStatusFilter setFilter={this.setFilter}/>
        </div>

        <TodoList 
        todos={this.getTodoArray(this.state.searchInput, this.state.filterState)}
        onDeleted={this.deleteElement}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}/>
        <AppendItem onAppend={this.appendElement}/>
      </div>
    );
  }
};

export default App;
