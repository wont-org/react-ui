import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import SlideBlock, { SlideBlockProps } from '.'

export default {
    title: 'Example/SlideBlock',
    component: SlideBlock,
    argTypes: {
        text: {
            type: {
                required: false,
            },
            description: '按钮文案',
            control: {
                type: 'text',
            },
        },
    },
} as Meta

const Template: Story<SlideBlockProps> = (args) => <SlideBlock {...args} />

export const Primary = Template.bind({})
Primary.args = {
    text: '兜底文案',
}
