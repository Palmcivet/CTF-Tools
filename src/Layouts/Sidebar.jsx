import React, { Component } from 'react';
import { Menu, Layout } from 'element-react';
import 'element-theme-default';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onOpen() {
        console.log("open");
    }

    onClose() {
        console.log("close");
    }

    render() {
        return (
            <Layout.Row className="tac">
                <Layout.Col span={8}>
                    <h5>带 icon</h5>
                    <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen} onClose={this.onClose}>
                        <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                            <Menu.ItemGroup title="分组一">
                                <Menu.Item index="1-1">选项1</Menu.Item>
                                <Menu.Item index="1-2">选项2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="分组2">
                                <Menu.Item index="1-3">选项3</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                        <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
                        <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item>
                    </Menu>
                </Layout.Col>
            </Layout.Row>
        )
    }
}

export { Sidebar };