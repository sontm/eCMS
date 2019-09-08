import React, { Component } from 'react'
import { Input, Button } from 'antd';

// props
//    productId, onIncrease(id), onDecrease(id), initialValue, maxValue, minValue
export default class AppTouchSpin extends Component {
    render() {
        return (
            <Input style={{width: "120px", textAlign:"center"}}
                addonBefore={
                    <span className="noselect">-</span>
                } 
                addonAfter={
                    <span className="noselect">+</span>
                } 
                value={this.props.value} />
        )
    }
}
