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
        const testButton = create(
            <Button label="button" />,
        )
        expect(testButton).toBeTruthy()
    })
})
