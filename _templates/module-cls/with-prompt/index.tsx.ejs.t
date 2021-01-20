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
export default class <%= name %> extends React.Component<<%= name %>Props, any> {
    static propTypes = {
        className: PropTypes.string,
    }

    static defaultProps = {
        className: '',
    }

    constructor(props: <%= name %>Props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { className = '' } = this.props
        const cls = classNames(`${prefix}-container`, {
            className,
        })

        return (
            <div
                {...this.props}
                className={cls}
            >
                className: {className}
            </div>
        )
    }
}
