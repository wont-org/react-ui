import React from 'react'
import PropTypes from 'prop-types'
import './button.less'

export interface ButtonProps {
    primary?: boolean
    backgroundColor?: string
    size?: 'small' | 'medium' | 'large'
    label: string
    onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
    primary,
    backgroundColor,
    size,
    label,
    ...props
}) => {
    const mode = primary
        ? 'storybook-button--primary'
        : 'storybook-button--secondary'
    return (
        <button
            type="button"
            className={[
                'storybook-button',
                `storybook-button--${size}`,
                mode,
            ].join(' ')}
            style={{ backgroundColor }}
            {...props}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    /**
     * Is this the principal call to action on the page?
     */
    primary: PropTypes.bool,
    /**
     * What background color to use
     */
    backgroundColor: PropTypes.string,
    /**
     * How large should the button be?
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Button contents
     */
    label: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    onClick: PropTypes.func,
}

Button.defaultProps = {
    backgroundColor: undefined,
    primary: false,
    size: 'medium',
    onClick: undefined,
}