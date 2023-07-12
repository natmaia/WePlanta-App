import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";


import { Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

import Botao from "../../components/ButtonDefault";
import HomePage from '../../routes/HomePage';
import { Button } from 'react-native';


export default function Login({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    senha: "",
    lembrarSenha: "",
  });

  const changeUsername = (value) => {
    setUser((prevState) => ({
      ...prevState,
      username: value,
    }));
  };

  const changeSenha = (value) => {
    setUser((prevState) => ({
      ...prevState,
      senha: value,
    }));
  };

  const changeLembrarSenha = (value) => {
    setUser((prevState) => ({
      ...prevState,
      lembrarSenha: value,
    }));
  };

  const mostrarToast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      50
    );
  };
  const [acesso, setAcesso] = useState({
    id: "",
    token: "",
  });

  const login = async () => {
    if (user.username === "") {
      mostrarToast("O username é obrigatório");
      return;
    }
    if (user.senha === "") {
      mostrarToast("A senha é obrigatória");
      return;
    }

    try {
      const data = {
        username: user.username,
        password: user.senha,
      };

      console.log(JSON.stringify(data, null, 2));

      const response = await axios.post(
        "http://localhost:8080/users/login",
        data
      );

      if (response.status === 200) {
        mostrarToast("Login realizado com sucesso!");
        const responseBody = response.data;
        console.log(responseBody);

        const token = responseBody.token;

        const updatedAcesso = {
          id: responseBody.id,
          token: token,
        };

        setAcesso(updatedAcesso);

        const dataToStoreString = JSON.stringify(updatedAcesso);
        const chave = "acesso"; // Chave para armazenar os dados de acesso no SecureStore

        await SecureStore.setItemAsync(chave, dataToStoreString);

        //navigation.navigate("Menu"); 
        navigation.navigate("Menu", { id: responseBody.id });

      } else if (response.status === 404) {
        mostrarToast("E-mail ou senha inválidos");
      }
    } catch (error) {
      mostrarToast("Erro ao fazer login. Tente novamente." + error);
      console.error(error);
    }
  };

  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/WePlantLogoWhiteLogo.png")}
        style={styles.logo}
      />

      <MaterialIcons name="email" size={20} color={'#63C71F'} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={user.username}
        onChangeText={changeUsername}
        cursorColor={"#335138"}
        keyboardType="email-address"
        placeholder=" Digite seu e-mail"
      />

      <MaterialIcons name="lock" size={20} color={'#63C71F'} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={user.senha}
        onChangeText={changeSenha}
        cursorColor={"#335138"}
        secureTextEntry={true}
        keyboardType="number-pad"
        placeholder=" Digite sua senha"
      />


      <View style={styles.containerCheckbox}>
        <Checkbox
          style={styles.checkbox}
          disabled={false}
          value={user.lembrarSenha}
          onValueChange={changeLembrarSenha}
          isChecked={user.lembrarSenha}
          color={user.lembrarSenha ? '#63C71F' : undefined}

        />

        <Text style={styles.textoSecundario}>Lembrar minha senha</Text>
        <Text style={styles.textoLink}>Esqueci a senha</Text>
      </View>

      <Botao texto="Entrar" funcao={login} />

      <View style={styles.containerBio}>
        <TouchableOpacity activeOpacity={0.7} style={styles.buttonBio} onPress={() => navigation.navigate("LoginBio")}>
          <MaterialIcons name="fingerprint" size={50} color={'#63C71F'} style={styles.iconBio} />
          <Text style={styles.textoLinkBio}>Entrar com biometria</Text>
        </TouchableOpacity>
      </View>


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
  );

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
    position: "relative",
    height: 129,
    width: 226,
    top: 30,
  },
  input: {
    paddingHorizontal: 50,
    marginTop: 15,
    height: 45,
    width: 320,
    left: 0,
    top: 35,
    borderRadius: 50,
    borderColor: '#63C71F',
    borderWidth: 1,
    paddingLeft: 40,
    marginHorizontal: 20,
    fontSize: 18,
  },
  input2: {
    paddingHorizontal: 18,
    //marginTop: 80,
    height: 40,
    maxWidth: "100%",
    minWidth: "100%",
    borderRadius: 50,
    borderColor: "#63C71F",
    marginTop: 10,
  },
  icon: {
    left: - 135,
    top: 85,
  }, containerBio: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonBio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
  },
  iconBio: {
    marginRight: 10,
  },
  textoLinkBio: {
    color: '#63C71F',
    fontSize: 18,
  },
  containerCheckbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
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
    //justifyContent: "space-between",

  },
  checkbox: {
    marginTop: 20,
    borderColor: "#63C71F",
    borderRadius: 5,
  },
  containerCadastro: {
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 10,
  },
  textoRodape: {
    color: "#8F8A8A",
    marginTop: 20,
    fontSize: 15,
    //right: 50,
    //justifyContent: "space-around",
  },
});