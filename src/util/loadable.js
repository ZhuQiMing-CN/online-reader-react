/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/23 13:48
 */
import React from 'react';
import Loadable from 'react-loadable';

const Loading = (props) => {
    const { error } = props
    if (error) {
        return (
            <div>
                <p>{error.stack ? error.stack : ''}</p>
            </div>
        )
    }
    return <div></div>
}
// 通用的过场组件
const loadableComponent = (loader, render) => {
    const config = {
        loader,
        loading: Loading,
        delay: 1000,
    }
    if (render) {
        config.render = render;
    }
    return Loadable(config);
}

export default loadableComponent;
