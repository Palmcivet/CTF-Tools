import React, { Component } from 'react'
import { Affix, Button } from 'antd';

class ToolBar extends Component {
    state = {
        top: 0,
    };

    render() {
        return (
            <Affix offsetTop={this.state.top}>
                <Button type="primary">
                    Affix top
                </Button>
            </Affix>
        );
    }
}

export { ToolBar };