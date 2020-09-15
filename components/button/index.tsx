import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const tuple = <T extends string[]>(...args: T) => args
const ButtonTypes = tuple('primary', 'success', 'danger', 'warning', 'info')
export type ButtonType = typeof ButtonTypes[number];
export interface ButtonProps {
    type?: ButtonType
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
    type: PropTypes.oneOf(['primary', 'success', 'danger', 'warning', 'info']),
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
