import React from 'react'

function Input({ type, name, id, onHandleChange, onKeyPress }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <input name={name} onKeyPress={onKeyPress} onChange={onHandleChange} type={type} className="form-control" id={id} />
    </div>
  )
}

export default Input
