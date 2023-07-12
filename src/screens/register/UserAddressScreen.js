import axios from 'axios';
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Botao from "../../components/ButtonDefault";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import Api from "../../service/ApiCep";


const Campo = (props) => <TextInput
    style={styles.input}
    value={props.valor}
    onChangeText={props.funcao}
    cursorColor={"#63C71F"}
    keyboardType={props.teclado}
    secureTextEntry={props.seguranca}
    placeholder={props.texto}
/>

export default function UserAddressScreen({ navigation, route }) {
    const { user } = route.params;
    const [endereco, setEndereco] = useState({
        zipCode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "Brasil",
    });

    async function buscarCEP() {
        if (endereco.zipCode === "") {
            Alert.alert("CEP inválido");
            return;
        }

        try {
            const response = await Api.get(`/${endereco.zipCode}/json/`);
            const { logradouro, bairro, localidade, uf } = response.data;
            setEndereco(prevState => ({
                ...prevState,
                street: logradouro,
                neighborhood: bairro,
                city: localidade,
                state: uf
            }));
        } catch (error) {
            console.log("ERROR", error);
        }
    }


    const [enderecosSugeridos, setEnderecosSugeridos] = useState([]);

    const finalizarCadastro = async () => {
        try {
            const data = {
                name: user.name,
                birthday: user.nasc,
                username: user.username,
                email: user.email,
                password: user.senha,
                address: {
                    number: endereco.number,
                    street: endereco.street,
                    neighborhood: endereco.neighborhood,
                    city: endereco.city,
                    state: endereco.state,
                    CEP: endereco.zipCode,
                    country: endereco.country
                },
                phone: {
                    number: user.telefone,
                    ddi: "+55",
                    ddd: "74"
                }
            };
            console.log(JSON.stringify(data, null, 2));

            const response = await axios.post('http://localhost:8080/users/add', data);
            0
            if (response.status === 201) {
                // Cadastro realizado com sucesso
                mostrarToast('Cadastro realizado com sucesso!');
                navigation.navigate('UserDetailScreen');
            } else {
                // Tratar erro de requisição
                mostrarToast('Erro ao finalizar o cadastro.');
            }
        } catch (error) {
            // Tratar erro de requisição
            mostrarToast('Erro ao finalizar o cadastro. Tente novamente.' + { error });
            console.error(error);
        }
    };

    const changeZipCode = (value) => {
        setEndereco({
            ...endereco,
            zipCode: value,
        });
    };

    const changeStreet = (value) => {
        setEndereco({
            ...endereco,
            street: value,
        });
    };

    const changeNumber = (value) => {
        setEndereco({
            ...endereco,
            number: value,
        });
    };

    const changeNeighborhood = (value) => {
        setEndereco({
            ...endereco,
            neighborhood: value,
        });
    };

    const changeCity = (value) => {
        setEndereco({
            ...endereco,
            city: value,
        });
    };

    const changeState = (value) => {
        setEndereco({
            ...endereco,
            state: value,
        });
    };

    const changeCountry = (value) => {
        setEndereco({
            ...endereco,
            country: value,
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
    }

    const cadastrar = (_) => {
        if (endereco.zipCode == "") {
            mostrarToast('O CEP é obrigatório')
            return;
        }
        if (endereco.street == "") {
            mostrarToast('O endereço é obrigatório')
            return;
        }
        if (endereco.number == "") {
            mostrarToast('O numérico é obrigatório')
            return;
        }
        if (endereco.neighborhood == "") {
            mostrarToast('O bairro é obrigatório')
            return;
        }
        if (endereco.city == "") {
            mostrarToast('O cidade é obrigatório')
            return;
        }
        if (endereco.state == "") {
            mostrarToast('O estado é obrigatório')
            return;
        }
        if (endereco.country == "") {
            mostrarToast('O pais é obrigatório')
            return;
        }

        alert("Cadastro realizado com sucesso!");

        navigation.navigate("Login", { user });
        finalizarCadastro();
    };

    // const buscarEnderecosSugeridos = async (cepPrefixo) => {
    //     try {
    //         const response = await axios.get(`https://viacep.com.br/ws/${cepPrefixo}/json/`);
    //         if (response.status === 200) {
    //             const enderecos = response.data.map((endereco) => `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}`);
    //             setEnderecosSugeridos(enderecos);
    //         } else {
    //             setEnderecosSugeridos([]);
    //         }
    //     } catch (error) {
    //         setEnderecosSugeridos([]);
    //     }
    // };

    // const onSelectEndereco = (enderecoSelecionado) => {
    //     const enderecoInfo = enderecoSelecionado.split(', ');
    //     setEndereco({
    //         ...endereco,
    //         street: enderecoInfo[0],
    //         neighborhood: enderecoInfo[1],
    //         city: enderecoInfo[2],
    //         state: enderecoInfo[3],
    //         country: enderecoInfo[4],
    //     });
    // };

    return (
        <SafeAreaView>
            <ScrollView style={styles.Scroll}>
                <Image
                    source={require("../../../assets/WePlantCadastro.png")}
                    style={styles.imagem}
                />
                <View style={styles.formulario}>
                    <Text style={styles.textoInput}>CEP: </Text>
                    <Campo
                        valor={endereco.zipCode}
                        funcao={changeZipCode}
                        teclado='number-pad'
                        seguranca={false}
                        onChangeText={(texto) => setZipCode(texto)}
                        placeholder="CEP"
                    // texto="Informe o seu CEP"
                    // onPress={buscarCEP}
                    />

                    <Botao texto="Buscar" funcao={buscarCEP} />

                    <Text style={styles.textoInput}>Endereço: </Text>
                    <Campo
                        valor={endereco.street}
                        funcao={changeStreet}
                        teclado='default'
                        seguranca={false}
                        texto="Informe o seu endereço"
                    />

                    <Text style={styles.textoInput}>Número: </Text>
                    <Campo
                        valor={endereco.number}
                        funcao={changeNumber}
                        teclado='number-pad'
                        seguranca={false}
                        texto="Informe o número"
                    />

                    <Text style={styles.textoInput}>Bairro </Text>
                    <Campo
                        valor={endereco.neighborhood}
                        funcao={changeNeighborhood}
                        teclado='default'
                        seguranca={false}
                        texto="Informe o bairro"
                    />

                    <Text style={styles.textoInput}>Cidade </Text>
                    <Campo
                        valor={endereco.city}
                        funcao={changeCity}
                        teclado='default'
                        seguranca={false}
                        texto="Informe a cidade"
                    />

                    <Text style={styles.textoInput}>Estado </Text>
                    <Campo
                        valor={endereco.state}
                        funcao={changeState}
                        teclado='default'
                        seguranca={false}
                        texto="Informe a cidade"
                    />

                    <Text style={styles.textoInput}>País </Text>
                    <Campo
                        valor={endereco.country}
                        funcao={changeCountry}
                        teclado='default'
                        texto="Informe o país "
                    />
                    <Botao texto="Cadastrar " funcao={cadastrar} />
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
        resizeMode: "contain",

    },
    titulo: {
        fontSize: 35,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#335138",
    },
    subtitulo: {
        color: "#335138",
        fontSize: 20,
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
        paddingHorizontal: 18,
        //marginTop: 80,
        height: 40,
        maxWidth: "100%",
        minWidth: "100%",
        borderRadius: 50,
        borderColor: "#63C71F",
        marginTop: 10,
        backgroundColor: "#eff4f6",
        borderWidth: 1,
    }
});
