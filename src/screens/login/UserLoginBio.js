import { MaterialIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Botao from "../../components/ButtonDefault";

export default function LoginBioScreen({ navigation }) {
    const [autenticado, setAutenticado] = useState(false);

    async function verificarAutenticacao() {
        const compativel = await LocalAuthentication.hasHardwareAsync();
        console.log(compativel);

        if (!compativel) {
            Alert.alert('Dispositivo incompatível');
            navigation.navigate("LoginScreen");
            return;
        }

        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log(types.map((types) => LocalAuthentication.AuthenticationType[types]));
    }
    async function biometriaAutenticada() {
        const biometriaCadastrada = await LocalAuthentication.isEnrolledAsync();
        console.log(biometriaCadastrada);

        if (!biometriaCadastrada) {
            Alert.alert('Login', 'Nenhuma biomatria localizada');
            navigation.navigate("UserAddScreen");
            return;
        }

        const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login com biometria',
            fallbackLabel: 'Biometria inválida'
        });

        console.log(auth);
        navigation.navigate('Login');
    }


    return (

        <SafeAreaView style={styles.container}>

            <Image
                source={require("../../../assets/WePlantLogoWhiteLogo.png")}
                style={styles.logo}
            />
            <MaterialIcons name="fingerprint" size={80} color={'#63C71F'} style={styles.icon} />

            <Botao texto="Entrar" funcao={biometriaAutenticada} />

            <View style={styles.containerCadastro}>
                <Text style={styles.textoRodape}>
                    Não possui conta?
                    <Text
                        style={styles.textoLink}
                        onPress={() => navigation.navigate("UserAddScreen")}
                    >
                        {" "}
                        Criar conta
                    </Text>
                </Text>
            </View>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
        padding: 5,
        backgroundColor: "white",
    },
    logo: {
        alignItems: "center",
        justifyContent: "center",
        height: 129,
        width: 226,
        top: 10,
    },
    textoInput: {
        color: "#335138",
        marginTop: 20,
    },
    icon: {
        //left: - 135,
        top: 50,
        paddingBottom: 80,
    },
    textoSecundario: {
        color: "#8F8A8A",
        marginTop: 20,
        fontSize: 12,
        height: 15,
        width: 142,
        left: 5,
    },
    textoLink: {
        color: "#63C71F",
        marginTop: 20,
        fontSize: 15,
        letterSpacing: 1,
    },
    containerCadastro: {
        justifyContent: "space-between",
        alignSelf: "center",
        marginTop: 40,
    },
    textoRodape: {
        color: "#8F8A8A",
        marginTop: 20,
        fontSize: 15,
        //right: 50,
        //justifyContent: "space-around",
    },
});