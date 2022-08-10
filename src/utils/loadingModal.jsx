
import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View,ActivityIndicator } from 'react-native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function LoadingModal(props){

    const{show} = props;

    const toggleOverlay = () => {
        Toast.show({
            type:'warning',
            position:'bottom',
            text1:"loading...",
            })
        }
    return (
        <Overlay isVisible = {show} onBackdropPress={toggleOverlay} >
            <View>
                <ActivityIndicator size="large" color="#00a680"/>
            </View>
        </Overlay>
    )
}

LoadingModal.defaultProps = {
    show:false,
}