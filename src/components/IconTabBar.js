import { View, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function RoulesIcon({ focused, size, color }) {
    const imageSource = focused
        ? require('../../assets/iconBlack.png')
        : require('../../assets/iconWhite.png');

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={{ width: 60, height: 60, tintColor: {color} }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#63C71F',
    },
});
