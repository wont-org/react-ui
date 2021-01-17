import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { get, throttle } from '@wont/utils'
import './index.less'

const prefix = 'wont-slide-block'

export interface SlideBlockProps {
    text?: string
}
// 触发左右滑动的值
const VALID_SLIDE_UNIT = 15
// 滑块宽度
const SLIDER_WIDTH = 200
// 首尾滑动回弹的值
const LIMIT_UNIT = 30

let touchOptions = {
    startX: 0,
    endX: 0,
    moveX: 0,
    translateX: 0,
}

const listData = [
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
const len = listData.length

const initSlideStyle = {
    transform: `translateX(${touchOptions.translateX}px)`,
}

const SlideArea: React.FC<SlideBlockProps> = ({ ...props }) => {
    const cls = classNames(`${prefix}-container`, {})

    const slideRef = useRef(null)
    const [slideStyle, setSlideStyle] = useState(initSlideStyle)

    const onTouchStart = (e) => {
        const { clientX: startX } = get(e, 'changedTouches[0]', {})
        console.log('startX :>> ', startX)
        touchOptions.startX = startX
    }

    const onTouchMove = (e, index) => {
        const { clientX: endX = 0 } = get(e, 'changedTouches[0]', {})
        const isFirst = index === 0
        const isLast = index === len - 1

        let { startX, translateX } = touchOptions
        let moveX = endX - startX
        // moveRight
        if (moveX > VALID_SLIDE_UNIT) {
            if (isFirst && moveX >= LIMIT_UNIT) {
                moveX = LIMIT_UNIT
            } else if (moveX >= SLIDER_WIDTH) {
                moveX = SLIDER_WIDTH
            }
        }
        // moveLeft
        if (moveX < -VALID_SLIDE_UNIT) {
            if (isLast && moveX <= LIMIT_UNIT) {
                moveX = -LIMIT_UNIT
            } else if (moveX <= -SLIDER_WIDTH) {
                moveX = -SLIDER_WIDTH
            }
        }

        translateX += moveX
        // console.log('onTouchMove translateX :>> ', translateX)

        const throttleSet = throttle(setSlideStyle, 500)

        throttleSet({
            transform: `translateX(${translateX}px)`,
        })
        // setSlideStyle({
        //     transform: `translateX(${translateX}px)`,
        // })
    }

    const onTouchEnd = (e, index) => {
        e.persist()
        // console.log('onTouchEnd', e, index)

        const isFirst = index === 0
        const isLast = index === len - 1
        console.log('isFirst, isLast :>> ', isFirst, isLast)

        const { clientX: endX } = get(e, 'changedTouches[0]', {})
        console.log('endX :>> ', endX)

        let { startX, translateX } = touchOptions
        const moveX = endX - startX

        if (moveX > VALID_SLIDE_UNIT) {
            if (isFirst) {
                setSlideStyle({
                    transform: `translateX(${translateX}px)`,
                })
                return
            }
            console.log('moveX  right:>> ', moveX)
            translateX += SLIDER_WIDTH
        }
        if (moveX < -VALID_SLIDE_UNIT) {
            if (isLast) {
                setSlideStyle({
                    transform: `translateX(${translateX}px)`,
                })
                return
            }
            console.log('moveX  left:>> ', moveX)
            translateX -= SLIDER_WIDTH
        }

        touchOptions = {
            ...touchOptions,
            endX,
            moveX,
            translateX,
        }
        console.log('translateX :>> ', translateX)

        setSlideStyle({
            transform: `translateX(${translateX}px)`,
        })
    }

    return (
        <div ref={slideRef} className={cls} {...props}>
            <div style={slideStyle} className="slide-wrap">
                {listData.map(({ style = {}, label }, index) => (
                    <div
                        key={label}
                        style={style}
                        className="slide"
                        onTouchStart={onTouchStart}
                        onTouchMove={(e) => {
                            onTouchMove(e, index)
                        }}
                        onTouchEnd={(e) => {
                            onTouchEnd(e, index)
                        }}
                        // onMouseDown={onTouchStart}
                        // onMouseMove={(e) => {
                        //     onTouchMove(e, index)
                        // }}
                        // onMouseUp={(e) => {
                        //     onTouchEnd(e, index)
                        // }}
                    >
                        <div className="left-slide-area">left-slide-area</div>
                        <div className="content">{label}</div>
                        <div className="right-slide-area">right-slide-area</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
SlideArea.propTypes = {
    text: PropTypes.string,
}

SlideArea.defaultProps = {
    text: '兜底文案',
}

export default SlideArea
