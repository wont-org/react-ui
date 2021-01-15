---
  to: components/<%= name %>/index.tsx
---
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const prefix = 'wont-<%= h.changeCase.paramCase(name) %>'


export interface <%= name %>Props {
    text?: string
}

const <%= name %>: React.FC<<%= name %>Props> = ({
    text,
    ...props
}) => {
    const cls = classNames(`${prefix}-container`, {
    })
    return (
        <div
            className={cls}
            {...props}
        >
            {text}
        </div>
    )
}
<%= name %>.propTypes = {
    text: PropTypes.string,
}

<%= name %>.defaultProps = {
    text: '兜底文案',
}

export default <%= name %>
