import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from './logo.svg'
import './App.css'
import {
  TodoForm,
  TodoList,
  Footer
} from './components/todo'
import {
  addItem,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from './lib/todoHelpers'
import { partial, pipe } from './lib/utils'
import {
  loadTodos,
  createTodo,
  saveTodo,
  destroyTodo
} from './lib/todoService'

class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))

  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo removed'))
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({
      todos: updatedTodos
    })
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo updated'))
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const newTodo = {
      id: generateId(),
      name: this.state.currentTodo,
      isCompleted: false 
    }
    this.setState({
      todos: addItem(this.state.todos, newTodo),
      currentTodo: '',
      errorMessage: ''
    })
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added'))
  }

  showTempMessage = (msg) => {
    this.setState({ message: msg })
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  handleEmptySubmit = evt => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  handleInputChange = evt => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          {this.state.message && <span className='success'>{this.state.message}</span>}
          <TodoForm
            value={this.state.currentTodo}
            onSubmit={submitHandler}
            onChange={this.handleInputChange} />
          <TodoList
            todos={displayTodos}
            onToggle={this.handleToggle}
            onRemove={this.handleRemove} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;