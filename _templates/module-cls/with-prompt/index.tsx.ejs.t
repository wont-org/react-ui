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
export default class <%= Name %> extends React.Component<<%= Name %>Props, any> {
    static propTypes = {
        text: PropTypes.string,
    }

    static defaultProps = {
        text: '兜底文案',
    }

    constructor(props: <%= Name %>Props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { text = '' } = this.props
        const cls = classNames(`${prefix}-container`, {
        })

        return (
            <div
                className={cls}
                {...this.props}
            >
                {text}
            </div>
        )
    }
}
