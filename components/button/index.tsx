import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

export interface ButtonProps {
    type?: string
    size?: 'small' | 'medium' | 'large'
    label: string
    onClick?: () => void
}

const baseCls = 'wont-btn'

const Button: React.FC<ButtonProps> = ({
    type,
    size,
    label,
    ...props
}) => {
    const cls = classNames(`${baseCls}`, {
        [`${baseCls}-${type}`]: type,
        [`${baseCls}-${size}`]: size,
    })
    return (
        <button
            type="button"
            className={cls}
            {...props}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    // primary: PropTypes.bool,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

Button.defaultProps = {
    type: 'primary',
    size: 'medium',
    onClick: undefined,
}

export default Button
