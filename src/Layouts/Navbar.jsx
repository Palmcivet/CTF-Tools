import React, { Component } from "react";
import { Menu, Icon, Layout } from 'antd';

const { Header } = Layout;
class NavBar extends Component {
    state = {
        current: 'logo',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Header style={{
                background: 'rgba(0, 0, 0, 0)',
                padding: '0'
            }}>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="logo">
                        <div className="logo">
                            Home
                            </div>
                    </Menu.Item>
                    <Menu.Item key="mail">
                        <Icon type="mail" />
                        Navigation One
                        </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="appstore" />
                        Navigation Two
                        </Menu.Item>
                    <Menu.Item key="alipay">
                        Navigation Four
                        </Menu.Item>
                </Menu>
            </Header>
        );
    }
};

export { NavBar };