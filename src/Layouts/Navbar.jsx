import React, { Component } from 'react';
import { Menu } from "element-react";
import 'element-theme-default';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            sidebarExists: false
        };
    }

    onSelect() {
    }

    render() {
        return (
            <div>
                <Menu defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect}>
                    <Menu.Item index="1">主页</Menu.Item>
                    <Menu.Item index="2">处理</Menu.Item>
                    <Menu.Item index="3">管理</Menu.Item>
                </Menu>
            </div>
        );
    }
}

export { Navbar };