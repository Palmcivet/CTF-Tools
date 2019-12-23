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
                    <Menu.Item index="1">处理</Menu.Item>
                    <Menu.SubMenu index="2" title="我的工作台">
                        <Menu.Item index="2-1">选项1</Menu.Item>
                        <Menu.Item index="2-2">选项2</Menu.Item>
                        <Menu.Item index="2-3">选项3</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="3">管理</Menu.Item>
                </Menu>
            </div>
        );
    }
}

export { Navbar };