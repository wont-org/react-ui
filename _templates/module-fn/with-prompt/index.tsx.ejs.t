---
  to: components/<%= name %>/index.tsx
---
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const prefix = 'wont-<%= name %>'


export interface <%= Name %>Props {
    text?: string
}

const <%= Name %>: React.FC<<%= Name %>Props> = ({
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
<%= Name %>.propTypes = {
    text: PropTypes.string,
}

<%= Name %>.defaultProps = {
    text: '兜底文案',
}

export default <%= Name %>
