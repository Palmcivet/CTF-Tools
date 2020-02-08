import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu } from 'antd';

import { SideTree } from '../Configurations/SideTree';
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
                    defaultOpenKeys={["0"]}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    {Object.keys(SideTree).map((cluster, index) => (
                        <SubMenu title={cluster} key={index}>
                            {Object.keys(SideTree[cluster]).map((item) => (
                                <Menu.Item key={item}>
                                    {SideTree[cluster][item]["TAG"]}
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