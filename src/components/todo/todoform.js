import React from 'react'
import PropTypes from 'prop-types'

export const TodoForm = ({value, onSubmit: handleSubmit, onChange: handleChange}) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={value}
      onChange={handleChange} />
  </form>
)

TodoForm.propTypes = {
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}
