import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => (
    <View style={style.container}>
        <Text style={style.title}>NUTRIPIC</Text>
    </View>
);

const  style =  StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor: '#ce2727',

        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 50,
        color: '#fff',
    }
});

export default Header;