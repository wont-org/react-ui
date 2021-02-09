import React, {
    useState, useRef, useEffect, useMemo,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { get, throttle } from '@wont/utils'
import { DefaultSlideSlot } from './DefaultSlideSlot'
import { slideConfigList, defaultDataSource, SlideConfig } from './constant'
import './index.less'

const prefix = 'wont-slide-block'

export interface SlideBlockProps {
    className?: string
    // 触发左右滑动的值
    slideTriggerValue?: number
    cur?: number
    // 首尾滑动回弹的值
    slideDebounceValue?: number
    SlideSlot?: PropTypes.ReactComponentLike
    dataSource?: object[]
}

const initTouchOptions = {
    startX: 0,
    endX: 0,
    moveX: 0,
    translateX: 0,
    shouldSlide: false, // 滑动时机，由finishSlide决定
    finishSlide: true, // 是否完成滑动，完成后transform应为none
}

const initSlideStyle = {
    transform: `translateX(${initTouchOptions.translateX}px)`,
    transition: 'transform .4s ease',
}

const SlideBlock: React.FC<SlideBlockProps> = ({
    className,
    slideTriggerValue,
    slideDebounceValue,
    SlideSlot,
    dataSource,
    cur,
    ...props
}) => {
    const [configList, setConfigList] = useState(slideConfigList)
    const [curIndex, setCurIndex] = useState(cur)
    const [slideStyle, setSlideStyle] = useState(initSlideStyle)
    const [touchOptions, setTouchOptions] = useState(initTouchOptions)
    // 滑块宽度 === 容器宽度
    const [slideWidth, setSlideWidth] = useState(0)
    const [slideHeight, setSlideHeight] = useState(0)
    const slideRef = useRef(null)
    const len = dataSource.length
    const cls = classNames(`${prefix}-container`, {
        className,
    })

    const initDataSource = (curIdx) => {
        const getTag = (index) => {
            switch (index) {
            case 0:
                return 'pre'
            case 1:
                return 'cur'
            case 2:
                return 'next'
            default:
                return ''
            }
        }
        const sliceStart = curIdx === 0 ? 0 : curIdx - 1
        const sliceNum = curIdx === 0 ? 2 : 3
        let result: SlideConfig[] = dataSource.slice(
            sliceStart,
            sliceStart + sliceNum,
        )
        if (result.length === 2) {
            if (curIdx === 0) {
                result.unshift({})
            } else {
                result.push({})
            }
        }
        result = result.map((item, index) => ({
            ...item,
            tag: getTag(index),
        }))
        console.log('result :>> ', result)
        setConfigList(result)
    }

    useEffect(() => {
        const { offsetWidth = 0, offsetHeight = 0 } = get(
            slideRef,
            'current.firstChild',
            {},
        )
        setSlideWidth(offsetWidth)
        setSlideHeight(offsetHeight)
        initDataSource(0)
    }, [])

    const onTouchStart = (e) => {
        e.persist()
        if (!touchOptions.finishSlide) return
        const { clientX: startX } = get(e, 'changedTouches[0]', e)
        setTouchOptions({
            ...initTouchOptions,
            startX,
            shouldSlide: touchOptions.finishSlide,
        })
    }

    const initSlide = () => new Promise((resolve) => {
        touchOptions.finishSlide = false
        console.log('time!')
        const timeId = setTimeout(() => {
            setSlideStyle({
                transform: 'initial',
                transition: 'initial',
            })
            clearTimeout(timeId)
            touchOptions.finishSlide = true
            resolve(true)
        }, 400)
    })

    const onTouchEnd = async (e) => {
        e.persist()
        if (!touchOptions.shouldSlide) {
            return
        }
        touchOptions.shouldSlide = false
        const isFirst = curIndex === 0
        const isLast = curIndex === len - 1

        const { clientX: endX } = get(e, 'changedTouches[0]', e)

        let { startX, translateX } = touchOptions
        const moveX = endX - startX
        let direction: 'left' | 'right'

        // move right
        if (moveX > slideTriggerValue) {
            if (isFirst) {
                setSlideStyle({
                    transform: `translateX(${translateX}px)`,
                    transition: 'transform .4s ease',
                })
                return
            }
            translateX += slideWidth
            direction = 'right'
        }
        // move left
        if (moveX < -slideTriggerValue) {
            if (isLast) {
                setSlideStyle({
                    transform: `translateX(${translateX}px)`,
                    transition: 'transform .4s ease',
                })
                return
            }
            translateX -= slideWidth
            direction = 'left'
        }

        setSlideStyle({
            transform: `translateX(${translateX}px)`,
            transition: 'transform .4s ease',
        })
        if (!direction) {
            return
        }
        await initSlide()
        const curIdx = direction === 'left' ? curIndex + 1 : curIndex - 1
        setCurIndex(curIdx)
        initDataSource(curIdx)

        setTouchOptions({
            ...touchOptions,
            endX,
            moveX,
            translateX,
        })
    }

    const onTouchMove = (e) => {
        e.persist()
        if (!touchOptions.shouldSlide) {
            return
        }
        const { clientX: endX = 0 } = get(e, 'changedTouches[0]', e)
        const isFirst = curIndex === 0
        const isLast = curIndex === len - 1

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

        const throttleSet = throttle(setSlideStyle, 400)

        throttleSet({
            transform: `translateX(${translateX}px)`,
            transition: 'transform .4s ease',
        })
    }

    return (
        <div
            {...props}
            className={cls}
            style={{
                width: `${slideWidth}px`,
                height: `${slideHeight}px`,
            }}
        >
            <div style={slideStyle} className="slide-wrap">
                {configList.map((item) => {
                    // 避免因 touch/mouse move 频繁更新
                    const MemoSlideSlot = useMemo(
                        () => Object.keys(item).length > 1 && (
                            <SlideSlot data={item} index={curIndex} />
                        ),
                        [item, curIndex],
                    )

                    return (
                        <div
                            key={item.tag}
                            ref={slideRef}
                            className={`slide ${item.tag}`}
                            onTouchStart={onTouchStart}
                            onTouchMove={(e) => {
                                onTouchMove(e)
                            }}
                            onTouchEnd={(e) => {
                                onTouchEnd(e)
                            }}
                            onMouseDown={onTouchStart}
                            onMouseMove={(e) => {
                                onTouchMove(e)
                            }}
                            onMouseUp={(e) => {
                                onTouchEnd(e)
                            }}
                            onMouseLeave={(e) => {
                                onTouchEnd(e)
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
    cur: PropTypes.number,
    slideTriggerValue: PropTypes.number,
    slideDebounceValue: PropTypes.number,
    SlideSlot: PropTypes.elementType,
    dataSource: PropTypes.arrayOf(PropTypes.object),
}

SlideBlock.defaultProps = {
    className: '',
    cur: 0,
    slideTriggerValue: 15,
    slideDebounceValue: 30,
    SlideSlot: DefaultSlideSlot,
    dataSource: defaultDataSource,
}

export default SlideBlock
