// TODO 对data和PropTypes.data 做类型兼容处理
// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'

export interface DefaultSlideSlot {
    index: number
    data: DefaultSlideSlotData
}

interface DefaultSlideSlotData {
    style: DefaultSlideSlotStyle
}
interface DefaultSlideSlotStyle {
    background: string
}

export const DefaultSlideSlot: React.FC<DefaultSlideSlot> = ({
    data,
    index,
}) => {
    console.log('data :>> ', data)
    const onClick = () => {
        console.log('data.style.background :>> ', data.style.background)
    }

    return (
        <div className="slide-slot" style={data.style}>
            {index + 1}
            <div onClick={onClick} aria-hidden="true">
                {data.style.background}
            </div>
        </div>
    )
}

DefaultSlideSlot.propTypes = {
    index: PropTypes.number.isRequired,
    // data: PropTypes.shape({
    //     style: PropTypes.shape({
    //         background: PropTypes.string,
    //     }),
    // }).isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
}

DefaultSlideSlot.defaultProps = {}
