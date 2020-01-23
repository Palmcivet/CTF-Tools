import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu } from 'antd';

import { SideTree } from '../Components/SideTree';
import { creators as workActions } from '../Controllers/modules/workspace';

const { SubMenu } = Menu;

class rawSideBar extends Component {
    state = {
        theme: 'light',
        current: '1',
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
        this.props.changeEncoding(e.key);
    };

    render() {
        return (
            <div style={{ width: 254 }}>
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    defaultOpenKeys={[SideTree[0][[0]]]}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    {SideTree.map((cluster) => (
                        <SubMenu key={cluster[0]} title={cluster[1]}>
                            {Object.values(cluster[2]).map((item, index = 0) => (
                                // TODO: SideTree 设计不合理
                                <Menu.Item key={Object.keys(cluster[2])[index]}>
                                    {item["TAG"]}
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    ))}
                </Menu>
            </div >
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        theme: state.theme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(workActions, dispatch),
    }
};

const SideBar = connect(mapStateToProps, mapDispatchToProps)(rawSideBar);

export { SideBar };