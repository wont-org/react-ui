---
  to: components/<%= name %>/_tests_/index.test.tsx
---
import React from 'react'
import <%= name %> from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('<%= name %> test', () => {
    mountTest(() => <<%= name %> />)
})
