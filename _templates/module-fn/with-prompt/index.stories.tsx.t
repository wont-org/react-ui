---
  to: components/<%= name %>/index.stories.tsx
---
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import <%= Name %>, { <%= Name %>Props } from '.'

export default {
    title: 'Example/<%= Name %>',
    component: <%= Name %>,
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

const Template: Story<<%= Name %>Props> = (args) => <<%= Name %> {...args} />

export const Primary = Template.bind({})
Primary.args = {
    text: '兜底文案',
}
