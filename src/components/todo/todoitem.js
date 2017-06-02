import React from 'react'
import PropTypes from 'prop-types'
import { partial } from '../../lib/utils'

export const TodoItem = ({onToggle, onRemove, ...todo}) => {
  const handleToggle = partial(onToggle, todo.id)
  const handleRemove = partial(onRemove, todo.id)
  return (
    <li>
      <span className="delete-item"><a href="#" onClick={handleRemove}>X</a></span>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => handleToggle(todo.id)} />
      {todo.name}
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool
}