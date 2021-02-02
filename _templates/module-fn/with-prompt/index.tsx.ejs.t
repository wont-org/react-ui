---
  to: components/<%= name %>/index.tsx
---
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const prefix = 'wont-<%= h.changeCase.paramCase(name) %>'


export interface <%= name %>Props {
    className?: string
}

const <%= name %>: React.FC<<%= name %>Props> = ({
    className,
    ...props,
}) => {
    const cls = classNames(`${prefix}-container`, {
        className,
    })
    return (
        <div
            {...props}
            className={cls}
        >
            {`className: ${className}`}
        </div>
    )
}
<%= name %>.propTypes = {
    className: PropTypes.string,
}

<%= name %>.defaultProps = {
    className: '',
}

export default <%= name %>
