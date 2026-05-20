import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../pages/Login';
import PokemonListScreen from '../pages/PokemonList';
import PokemonDetailScreen from '../pages/PokemonDetail';
import PokemonCameraScreen from '../pages/PokemonCamera';
import PokemonMapScreen from '../pages/PokemonMap';

export type RootStackParamList = {
    Login: undefined;
    PokemonList: undefined;
    PokemonDetail: {id: number, uri?: string};
    PokemonCamera: {id: number};
    PokemonMap: { id: number; name?: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(){
    return (
        <Stack.Navigator 
            initialRouteName='Login'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="PokemonList" component={PokemonListScreen}/>
            <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen}/>
            <Stack.Screen name="PokemonCamera" component={PokemonCameraScreen}/>
            <Stack.Screen name="PokemonMap" component={PokemonMapScreen} />
        </Stack.Navigator>
    )
}