import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function ButtonDefault({ funcao, texto }) {

    return (
        <TouchableOpacity
            onPress={funcao}
            style={{
                height: 50,
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#63C71F',
                padding: 5,
                borderRadius: 50,
                marginTop: 40,
                alignSelf: 'center'
            }}
        >
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    textTransform: "uppercase",
                }}
            >{texto}</Text>
        </TouchableOpacity>
    );

}
