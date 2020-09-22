import React from 'react'
import {
    create,
    // act,
} from 'react-test-renderer'
import Button from '../index'
import mountTest from '../../../tests/shared/mountTest'


describe('Button test', () => {
    mountTest(() => <Button label="button" />)
    it('label', () => {
        const testButtonLabel = create(
            <Button label="button" />,
        )
        expect(testButtonLabel).toMatchSnapshot()
    })
    it('type', () => {
        const testButtonType = create(
            <Button label="button" type="primary" />,
        )
        expect(testButtonType).toMatchSnapshot()
    })
    it('size', () => {
        const testButtonType = create(
            <Button label="button" type="primary" size="medium" />,
        )
        expect(testButtonType).toMatchSnapshot()
    })
})
