// TODO 先禁用掉，后面整理规则，对stories文件做过滤
/* eslint-disable react/prop-types */
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import SlideBlock, { SlideBlockProps } from '.'

export default {
    title: 'Others/SlideBlock',
    component: SlideBlock,
    argTypes: {
        onMouseLeave: { action: 'onMouseLeave' },
        className: {
            description: 'className',
            table: {
                defaultValue: {
                    summary: '',
                },
            },
            control: {
                type: 'text',
            },
            type: {
                required: false,
            },
        },
        slideTriggerValue: {
            description: '触发左右滑动的值',
            table: {
                defaultValue: {
                    summary: 15,
                },
            },
            control: {
                type: 'number',
            },
            type: {
                required: false,
            },
        },
        slideDebounceValue: {
            description: '首尾滑动回弹的值',
            table: {
                defaultValue: {
                    summary: 30,
                },
            },
            control: {
                type: 'number',
            },
            type: {
                required: false,
            },
        },
    },
} as Meta

const SelfSlideSlot = ({ data, index }) => (
    <div className="slide-reset" style={data.style}>
        {index}
    </div>
)

const Template: Story<SlideBlockProps> = (args) => <SlideBlock {...args} />

export const Base = Template.bind({})
Base.args = {
    ...SlideBlock.defaultProps,
}

export const SlideSlot = Template.bind({})
SlideSlot.args = {
    ...SlideBlock.defaultProps,
    SlideSlot: SelfSlideSlot,
}
