import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import Button, { ButtonProps } from '.'

export default {
    title: 'Form/Button',
    component: Button,
    argTypes: {
        // backgroundColor: { control: 'color' },
        onClick: { action: 'clicked' },
        label: {
            type: {
                required: true,
            },
            description: '按钮文案',
            control: {
                type: 'text',
            },
        },
        type: {
            description: '按钮类型',
            table: {
                defaultValue: {
                    summary: 'primary',
                },
                type: {
                    summary: ['primary', 'success', 'danger', 'warning', 'info'],
                },
            },
            control: {
                type: 'select',
                options: ['primary', 'success', 'danger', 'warning', 'info'],
            },
        },
        size: {
            description: '按钮大小',
            table: {
                defaultValue: {
                    summary: 'medium',
                },
                type: {
                    summary: ['large', 'medium', 'small', 'mini'],
                },
            },
            control: {
                type: 'select',
                options: ['large', 'medium', 'small', 'mini'],
            },
        },
    },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    label: 'Button',
    type: 'primary',
    size: 'medium',
}
