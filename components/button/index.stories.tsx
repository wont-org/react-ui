import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import Button, { ButtonProps } from '.'

export default {
    title: 'From/Button',
    component: Button,
    argTypes: {
        // backgroundColor: { control: 'color' },
        type: {
            control: {
                type: 'select',
                options: ['primary', 'success', 'danger', 'warning', 'info'],
            },
        },
    },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    label: 'Button',
    type: 'primary',
}
