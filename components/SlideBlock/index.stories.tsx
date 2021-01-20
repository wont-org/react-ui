// TODO 先禁用掉，后面整理规则，对stories文件做过滤
/* eslint-disable react/prop-types */
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import SlideBlock, { SlideBlockProps } from '.'

export default {
    title: 'Others/SlideBlock',
    component: SlideBlock,
    // parameters see detail https://storybook.js.org/docs/react/writing-docs/doc-blocks#argstable
    parameters: {
        docs: {
            description: {
                component: '左右滑动容器，支持pc和mobile',
            },
        },
    },
    argTypes: {
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
        dataSource: {
            description:
                '数据源，组件内会自行遍历，遍历每项数据会作为```data```传入```SlideSlot```，下标会作为```index```传入',
            control: {
                type: 'object',
            },
            type: {
                required: false,
            },
        },
        SlideSlot: {
            description:
                '自定义滑动内容，function、class组件。接收两个参数，```data```和```index```',
            control: {
                type: null,
            },
            type: {
                required: false,
            },
        },
    },
} as Meta

const SelfSlideSlot = ({ data, index }) => (
    <div className="slide-reset" style={data.style}>
        {index + 1}
        :
        {data.label}
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
SlideSlot.parameters = {
    docs: {
        description: {
            story: '传入自定义组件```SlideSlot```',
        },
    },
}
