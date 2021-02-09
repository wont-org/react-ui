---
  to: components/<%= name %>/index.stories.tsx
---
import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import <%= name %>, { <%= name %>Props } from '.'

export default {
    title: 'Example/<%= name %>',
    component: <%= name %>,
    argTypes: {
        className: {
            type: {
                required: false,
            },
            description: 'className',
            control: {
                type: 'text',
            },
        },
    },
} as Meta

const Template: Story<<%= name %>Props> = (args) => <<%= name %> {...args} />

export const Base = Template.bind({})
Base.args = {
    ...<%= name %>.defaultProps,
}
