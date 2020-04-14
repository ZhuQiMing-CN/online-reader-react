/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/13 17:27
 */
import React, { Component, Fragment } from 'react';
import { Space, Radio } from 'antd';

import { Categorylist } from '../../../axios/api';

class Cmale extends Component {
    constructor (props) {
        super(props);
        this.state = {
            majorList: [],
            defaultMajor: ''
        };
    }

    componentDidMount () {
        // 获取分类下小类别
        Categorylist().then(res => {
            if (res.ok === true) {
                // this.state.majorList = res.male;
                // this.defaultMajor = res.male[0].major;
                // this.changeMajor(res.male[0]);
            }
        });
    }

    changeMajor = (e) => {
        console.log(e.target.value)
        // this.setState({
        //     defaultMajor: e.target.value
        // })
    }

    render () {
        return (
            <Fragment>
                <Radio.Group defaultValue={this.state.defaultMajor} buttonStyle="solid">
                    <Space>
                        {
                            this.state.majorList.map((value, index) => (
                                <Radio.Button
                                    value={value}
                                    key={index}
                                    onChange={this.changeMajor}
                                >
                                    {value.major}
                                </Radio.Button>
                            ))
                        }
                    </Space>
                </Radio.Group>
            </Fragment>
        );
    }
}

export default Cmale;
