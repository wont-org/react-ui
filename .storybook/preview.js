// import { MINIMAL_VIEWPORTS} from '@storybook/addon-viewport'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    // viewport: {
    //     viewports: MINIMAL_VIEWPORTS,
    // },
    backgrounds: {
        default: 'white',
        values: [
            {
                name: 'white',
                value: '#f4f4f4'
            },
            {
                name: 'black',
                value: '#333'
            },
        ],
    }
}
