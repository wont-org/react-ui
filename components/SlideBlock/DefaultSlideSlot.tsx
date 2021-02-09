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
    const style = {
        background: data.background || 'black',
    }

    return (
        <div className="slide-slot" style={style}>
            <p>{data.label}</p>
            <p>{`index: ${index}`}</p>
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
