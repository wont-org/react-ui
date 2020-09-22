// learn and copy from antd
import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
// eslint-disable-next-line jest/no-export
export default function mountTest(Component) {
    describe('mount and unmount', () => {
    // https://github.com/ant-design/ant-design/pull/18441
        it('component could be updated and unmounted without errors', () => {
            const wrapper = mount(<Component />)
            expect(() => {
                wrapper.setProps({})
                wrapper.unmount()
            }).not.toThrow()
        })
    })
}
