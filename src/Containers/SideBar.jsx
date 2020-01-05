import React, { Component } from 'react';
import { Menu, Icon, Switch } from 'antd';

const { SubMenu } = Menu;

class SideBar extends Component {
    state = {
        theme: 'light',
        current: '1',
    };

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <div
                style={{
                    width: 256,
                }}
            >
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    defaultOpenKeys={['Base']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <Menu.Item key="0">Base 0</Menu.Item>
                    <SubMenu key="Base" title="Base">
                        <Menu.Item key="1">Base 72</Menu.Item>
                        <Menu.Item key="2">Base 97</Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<Icon type="appstore" />}
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                    <Menu.Item key="13">Option 12</Menu.Item>
                    <Menu.Item key="14">Option 12</Menu.Item>
                    <Menu.Item key="15">Option 12</Menu.Item>
                    <Menu.Item key="16">Option 12</Menu.Item>
                    <Menu.Item key="17">Option 12</Menu.Item>
                </Menu>
            </div >
        );
    }
}

export { SideBar };