import React from 'react'

function Button(
    {
        children,
        type = 'button',
        bgColor = 'bg-text-secondary',
        textColor = 'text-primary',
        className = '',
        ...props
    }) {
    return <button 
    type={type} 
    className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} hover:bg-text-primary hover:cursor-pointer`} 
    {...props} 
    >{children}</button>
}

export default Button