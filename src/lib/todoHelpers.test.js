import {
  addItem,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from './todoHelpers'

test('addItem should add the passed todo to the list', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false }
  ]

  const newTodo = { id: 3, name: 'three', isCompleted: false }
  const expected = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]

  const result = addItem(startTodos, newTodo)

  expect(result).toEqual(expected)
})

test('addItem should not mutate the original list', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false }
  ]

  const newTodo = { id: 3, name: 'three', isCompleted: false }
  const expected = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]

  const result = addItem(startTodos, newTodo)

  expect(result).not.toBe(expected)
})

test('findById should return the expected item from an array', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const expected = { id: 2, name: 'two', isCompleted: false }
  const result = findById(2, startTodos)
  expect(result).toEqual(expected)
})

test('toggleTodo should toggle the isComplete prop of a todo', () => {
  const startTodo = { id: 2, name: 'two', isCompleted: false }
  const expected = { id: 2, name: 'two', isCompleted: true }
  const result = toggleTodo(startTodo)
  expect(result).toEqual(expected)
})

test('toggleTodo should not mutate the original todo', () => {
  const startTodo = { id: 2, name: 'two', isCompleted: false }
  const expected = { id: 2, name: 'two', isCompleted: true }
  const result = toggleTodo(startTodo)
  expect(result).not.toBe(expected)
})

test('updateTodo should update an item by id', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const updatedTodo = { id: 2, name: 'two', isCompleted: true }
  const expectedTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: true },
    { id: 3, name: 'three', isCompleted: false }
  ]

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).toEqual(expectedTodos)
})

test('removeTodo should remove an item by id', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const targetId = 2
  const expectedTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const result = removeTodo(startTodos, targetId)

  expect(result).toEqual(expectedTodos)
})

test('removeTodo should not mutate the original array', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const targetId = 2
  const result = removeTodo(startTodos, targetId)

  expect(result).not.toBe(startTodos)
})

test('filterTodos should return all items for the root route', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const result = filterTodos(startTodos, '/')

  expect(result).toEqual(startTodos)
})

test('filterTodos should return only completed items for the complete route', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: true },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const expectedTodos = [
    { id: 2, name: 'two', isCompleted: true }
  ]
  const result = filterTodos(startTodos, '/complete')

  expect(result).toEqual(expectedTodos)
})

test('filterTodos should return only incompleted items for the active route', () => {
  const startTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 2, name: 'two', isCompleted: true },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const expectedTodos = [
    { id: 1, name: 'one', isCompleted: false },
    { id: 3, name: 'three', isCompleted: false }
  ]
  const result = filterTodos(startTodos, '/active')

  expect(result).toEqual(expectedTodos)
})