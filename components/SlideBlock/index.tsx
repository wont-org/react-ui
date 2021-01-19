import React, {
    useState, useRef, useEffect, useMemo,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { get, throttle } from '@wont/utils'
import { DefaultSlideSlot } from './DefaultSlideSlot'
import './index.less'

const prefix = 'wont-slide-block'

export interface SlideBlockProps {
    className?: string
    // 触发左右滑动的值
    slideTriggerValue?: number
    // 首尾滑动回弹的值
    slideDebounceValue?: number
    SlideSlot?: PropTypes.ReactComponentLike
    dataSource?: any[]
}

const initTouchOptions = {
    startX: 0,
    endX: 0,
    moveX: 0,
    translateX: 0,
    shouldSlide: false, // hack for mouse move
}

const DefaultDataSource = [
    {
        label: 1,
        style: {
            background: 'green',
        },
    },
    {
        label: 2,
        style: {
            background: 'red',
        },
    },
    {
        label: 3,
        style: {
            background: 'blue',
        },
    },
]

const initSlideStyle = {
    transform: `translateX(${initTouchOptions.translateX}px)`,
}

const SlideBlock: React.FC<SlideBlockProps> = ({
    className,
    slideTriggerValue,
    slideDebounceValue,
    SlideSlot,
    dataSource,
    ...props
}) => {
    const [slideStyle, setSlideStyle] = useState(initSlideStyle)
    const [touchOptions, setTouchOptions] = useState(initTouchOptions)
    // 滑块宽度 === 容器宽度
    const [slideWidth, setSlideWidth] = useState(0)
    const slideRef = useRef(null)
    const len = dataSource.length
    const cls = classNames(`${prefix}-container`, {
        className,
    })

    useEffect(() => {
        const offsetWidth = get(slideRef, 'current.children[0].offsetWidth', 0)
        setSlideWidth(offsetWidth)
    }, [])

    const onTouchStart = (e) => {
        e.persist()
        const { clientX: startX } = get(e, 'changedTouches[0]', e)
        setTouchOptions({
            ...touchOptions,
            startX,
            shouldSlide: true,
        })
    }

    const onTouchEnd = (e, index) => {
        e.persist()
        if (!touchOptions.shouldSlide) {
            return
        }
        touchOptions.shouldSlide = false

        const isFirst = index === 0
        const isLast = index === len - 1

        const { clientX: endX } = get(e, 'changedTouches[0]', e)

        let { startX, translateX } = touchOptions
        const moveX = endX - startX
        // move right
        if (moveX > slideTriggerValue) {
            if (isFirst) {
                setSlideStyle({
                    transform: `translateX(${translateX}px)`,
                })
                return
            }
            translateX += slideWidth
        }
        // move right
        if (moveX < -slideTriggerValue) {
            if (isLast) {
                setSlideStyle({
                    transform: `translateX(${translateX}px)`,
                })
                return
            }
            translateX -= slideWidth
        }

        setTouchOptions({
            ...touchOptions,
            endX,
            moveX,
            translateX,
        })

        setSlideStyle({
            transform: `translateX(${translateX}px)`,
        })
    }

    const onTouchMove = (e, index) => {
        e.persist()
        if (!touchOptions.shouldSlide) {
            return
        }
        const { clientX: endX = 0 } = get(e, 'changedTouches[0]', e)
        const isFirst = index === 0
        const isLast = index === len - 1

        let { startX, translateX } = touchOptions
        let moveX = endX - startX
        // move right
        if (moveX > slideTriggerValue) {
            if (isFirst && moveX >= slideDebounceValue) {
                moveX = slideDebounceValue
            } else if (moveX >= slideWidth) {
                moveX = slideWidth
            }
        }
        // move left
        if (moveX < -slideTriggerValue) {
            if (isLast && moveX <= slideDebounceValue) {
                moveX = -slideDebounceValue
            } else if (moveX <= -slideWidth) {
                moveX = -slideWidth
            }
        }

        translateX += moveX

        const throttleSet = throttle(setSlideStyle, 500)

        throttleSet({
            transform: `translateX(${translateX}px)`,
        })
    }

    return (
        <div
            {...props}
            className={cls}
            style={{
                width: `${slideWidth}px`,
            }}
        >
            <div style={slideStyle} className="slide-wrap">
                {dataSource.map((item = {}, index) => {
                    // 避免因 touch/mouse move 频繁更新
                    const MemoSlideSlot = useMemo(
                        () => <SlideSlot data={item} index={index} />,
                        [item, index],
                    )

                    return (
                        <div
                            key={item.label}
                            ref={slideRef}
                            className="slide"
                            onTouchStart={onTouchStart}
                            onTouchMove={(e) => {
                                onTouchMove(e, index)
                            }}
                            onTouchEnd={(e) => {
                                onTouchEnd(e, index)
                            }}
                            onMouseDown={onTouchStart}
                            onMouseMove={(e) => {
                                onTouchMove(e, index)
                            }}
                            onMouseUp={(e) => {
                                onTouchEnd(e, index)
                            }}
                            onMouseLeave={(e) => {
                                onTouchEnd(e, index)
                            }}
                        >
                            {MemoSlideSlot}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
SlideBlock.propTypes = {
    className: PropTypes.string,
    slideTriggerValue: PropTypes.number,
    slideDebounceValue: PropTypes.number,
    SlideSlot: PropTypes.elementType,
    dataSource: PropTypes.arrayOf(PropTypes.object),
}

SlideBlock.defaultProps = {
    className: '',
    slideTriggerValue: 15,
    slideDebounceValue: 30,
    SlideSlot: DefaultSlideSlot,
    dataSource: DefaultDataSource,
}

export default SlideBlock
