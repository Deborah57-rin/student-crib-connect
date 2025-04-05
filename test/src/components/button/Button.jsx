import React from 'react'

const Button = ({handleClick, title, additionalStyles}) => {
  return (
    <button
      onClick={handleClick}
      className={` font-semibold py-2 px-4 rounded-lg shadow-md  transition duration-300 ${additionalStyles}`}>
        {title}
    </button>
  )
}

export default Button
