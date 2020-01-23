import React, { Component } from 'react';
import { Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { creators as workActions, selectors } from '../Controllers/modules/workspace';

const { TextArea } = Input;

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '1fr 1fr',
    gridGap: '15px 15px',
    placeItems: 'center center',
}

const itemStyle = {
    width: '360px',
    height: '240px',
    backgroundColor: '#E6EFF4',
    placeSelf: 'center',
    resize: 'none',
}

class rawWorkSpace extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            rawText: this.props.rawText,
        };
    }

    handleChange(e) {
        this.setState({
            rawText: e.target.value,
        });
        this.props.changeText(e.target.value);
    }

    render() {
        const { rawText, resText } = this.props;
        return (
            <div style={containerStyle}>
                <TextArea
                    style={itemStyle}
                    value={this.state.rawText}
                    onChange={this.handleChange}
                    placeholder='输入'
                    allowClear
                />
                {/* TODO:引入工具栏，目前先不管 */}
                <div style={itemStyle}>button</div>
                <TextArea
                    style={itemStyle}
                    value={rawText}
                    placeholder='输出'
                    allowClear
                />
                <TextArea
                    style={itemStyle}
                    value={resText}
                    placeholder='微调后'
                    allowClear
                />
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    console.log(state);

    return {
        rawText: selectors.getRawText(state),
        resText: selectors.getResText(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(workActions, dispatch),
    }
};

const WorkSpace = connect(mapStateToProps, mapDispatchToProps)(rawWorkSpace);

export { WorkSpace };