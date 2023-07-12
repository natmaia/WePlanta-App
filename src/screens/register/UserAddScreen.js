import moment from 'moment';
import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, ToastAndroid, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Botao from "../../components/ButtonDefault";


const Campo = (props) => (
  <TextInput
    style={styles.input}
    value={props.valor}
    onChangeText={props.funcao}
    cursorColor={"#335138"}
    keyboardType={props.teclado}
    secureTextEntry={props.seguranca}
    placeholder={props.texto}
  />
);

export default function UserAddScreen({ navigation }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    nasc: "",
    email: "",
    telefone: "",
    confirmacaoEmail: "",
    senha: "",
    confirmacaoSenha: "",
  });

  const changeName = (value) => {
    setUser({
      ...user,
      name: value,
    });
  };

  const changeUserName = (value) => {
    setUser({
      ...user,
      username: value,
    });
  };

  const changeNasc = (value) => {
    const formattedDate = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    setUser({
      ...user,
      nasc: formattedDate,
    });
  };
  


  const changeTelefone = (value) => {
    setUser({
      ...user,
      telefone: value,
    });
  };

  const changeEmail = (value) => {
    setUser({
      ...user,
      email: value,
    });
  };

  const changeConfirmacaoEmail = (value) => {
    setUser({
      ...user,
      confirmacaoEmail: value,
    });
  };

  const changeSenha = (value) => {
    setUser({
      ...user,
      senha: value,
    });
  };

  const changeConfirmacaoSenha = (value) => {
    setUser({
      ...user,
      confirmacaoSenha: value,
    });
  };

  const mostrarToast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      50,
    );
  };

  const prosseguir = (_) => {
    if (user.name === "") {
      mostrarToast('O nome é obrigatório');
      return;
    }
    if (user.username === "") {
      mostrarToast('O username é obrigatório');
      return;
    }
    if (user.nasc === "") {
      mostrarToast('A data de nascimento é obrigatória');
      return;
    }
    if (user.telefone === "") {
      mostrarToast('O telefone é obrigatório');
      return;
    }
    if (user.email === "") {
      mostrarToast('O e-mail é obrigatório');
      return;
    }
    if (user.confirmacaoEmail === "") {
      mostrarToast('A confirmação do e-mail é obrigatória');
      return;
    }
    if (user.senha === "") {
      mostrarToast('A senha é obrigatória');
      return;
    }
    if (user.confirmacaoSenha === "") {
      mostrarToast('A confirmação da senha é obrigatória');
      return;
    }
    if (user.email !== user.confirmacaoEmail) {
      mostrarToast('Os campos de e-mail devem coincidir');
      return;
    }
    if (user.senha !== user.confirmacaoSenha) {
      mostrarToast('Os campos de senha devem coincidir');
      return;
    }

    console.log('Login:', user.email, user.senha, user.nasc);

    navigation.navigate("UserAddressScreen", { user });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.Scroll}>
        <Image
          source={require("../../../assets/WePlantCadastro.png")}
          style={styles.imagem}
        />
        <View style={styles.formulario}>
          <Text style={styles.textoInput}>Nome Completo</Text>
          <Campo
            valor={user.name}
            funcao={changeName}
            teclado='default'
            seguranca={false}
            texto="Informe o seu nome completo"
          />

          <Text style={styles.textoInput}>Username</Text>
          <Campo
            valor={user.username}
            funcao={changeUserName}
            teclado='default'
            seguranca={false}
            texto="Informe como deseja ser chamado"
          />

          <Text style={styles.textoInput}>Data de nascimento</Text>
          <Campo
            valor={user.nasc}
            funcao={changeNasc}
            teclado='numeric'
            seguranca={false}
            texto="Informe sua data de nascimento"
          />


          <Text style={styles.textoInput}>Telefone</Text>
          <Campo
            valor={user.telefone}
            funcao={changeTelefone}
            teclado='number-pad'
            seguranca={false}
            texto="Informe o seu telefone: ex. xx xxxxxxxxx"
          />

          <Text style={styles.textoInput}>E-mail</Text>
          <Campo
            valor={user.email}
            funcao={changeEmail}
            teclado='email-address'
            seguranca={false}
            texto="Informe o seu e-mail"
          />

          <Text style={styles.textoInput}>Confirme seu e-mail</Text>
          <Campo
            valor={user.confirmacaoEmail}
            funcao={changeConfirmacaoEmail}
            teclado='email-address'
            seguranca={false}
            texto="Confirme seu e-mail"
          />

          <Text style={styles.textoInput}>Senha</Text>
          <Campo
            valor={user.senha}
            funcao={changeSenha}
            teclado='default'
            seguranca={true}
            texto="Crie sua senha"
          />

          <Text style={styles.textoInput}>Confirme sua senha</Text>
          <Campo
            valor={user.confirmacaoSenha}
            funcao={changeConfirmacaoSenha}
            teclado='default'
            seguranca={true}
            texto="Confirme sua senha"
          />

          <Botao texto="Prosseguir" funcao={prosseguir} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#green",
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
  },
  formulario: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 50,
  },
  imagem: {
    width: "100%",
    height: 170,
    //width: "100%",
    resizeMode: "contain",
    //left:-10,
    //marginBottom: 20,
    //position: "relative",

  },
  titulo: {
    fontSize: 35,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#335138",
  },
  subtitulo: {
    color: "#335138",
    fontSize: 16,
  },
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
  textoInput: {
    color: "#335138",
    marginTop: 20,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: "#eff4f6",
    borderColor: "#e7e7e7",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    maxWidth: "100%",
    minWidth: "100%",
  },
});
