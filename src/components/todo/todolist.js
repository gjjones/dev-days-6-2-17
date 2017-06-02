import React from 'react'
import PropTypes from 'prop-types'
import { TodoItem } from './todoitem'

export const TodoList = ({
  todos,
  onToggle: handleToggle,
  onRemove: handleRemove
}) => (
  <ul>
    {todos.map(todo =>
        <TodoItem
          key={todo.id}
          onToggle={handleToggle}
          onRemove={handleRemove}
          {...todo} />
      )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
}