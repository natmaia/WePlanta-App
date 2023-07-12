import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            source={require('../../../assets/home.png')}
            resizeMode='cover'
            style={styles.container}
        >
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        paddingBottom: 70
    },
    login: {
        width: '100%',
        height: '100%'
    }
});
