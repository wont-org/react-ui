export const defaultDataSource = [
    {
        label: '测试1',
        background: '',
    },
    {
        label: '测试2',
        background: 'red',
    },
    {
        label: '测试3',
        background: 'green',
    },
    {
        label: '测试4',
        background: 'blue',
    },
    {
        label: '测试5',
        background: 'skyblue',
    },
]
interface SlideConfig {
    tag: 'pre' | 'cur' | 'next'
    background?: string
}

export const slideConfigList: SlideConfig[] = [
    {
        tag: 'pre',
        background: 'green',
    },
    {
        tag: 'cur',
        background: 'red',
    },
    {
        tag: 'next',
        background: 'blue',
    },
]
