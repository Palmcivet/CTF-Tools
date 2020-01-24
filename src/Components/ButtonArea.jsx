import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { creators as workActions } from "../Controllers/modules/workspace";

const rawButtonArea = (props) => (
    <>
        <Button type="primary" onClick={props.decode}>解码</Button>
        <Button type="primary" onClick={props.encode}>编码</Button>
    </>
);

const mapStateToProps = (state, props) => {
    console.log(state);

    return {
        // rawText: selectors.getRawText(state),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(workActions, dispatch),
    }
};

const ButtonArea = connect(mapStateToProps, mapDispatchToProps)(rawButtonArea);


export { ButtonArea };