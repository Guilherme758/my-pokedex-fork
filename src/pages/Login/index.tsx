import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Logo from '../../assets/logo.png';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { validateLogin } from '../../services/authSqlite';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>> ();

  const handleLogin = () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (validateLogin(email.trim().toLowerCase(), password.trim())){
        navigation.reset({
          index: 0,
          routes: [{name: "PokemonList"}],
        })
      }
      else {
        setPassword("")
        setIsLoading(false)
        setErrorMessage("Usuário não encontrado")
      }
    }
    catch (error) {
      setPassword("")
      setIsLoading(false)
      setErrorMessage("Erro ao procurar o usuário")
    }
    
  };

  const isButtonDisabled = isLoading || !email || !password;

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.textTop}>Pokédex</Text>
      </View>
      
      <View style={styles.boxMid}>
      <Text style={styles.titleInput}>E-mail</Text>
      <View style={styles.boxInput}>
      <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.textInput}
        />
      </View>
      <Text style={styles.titleInput}>Senha</Text>      
      <View style={styles.boxInput}>
      <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry
          style={styles.textInput}
        />
      </View>        
      </View>
      <View style={styles.boxBottom}>
      <TouchableOpacity 
        style={[styles.buttonEntrar, isButtonDisabled && {opacity: 0.2}]} 
        disabled={isButtonDisabled} 
        onPress={handleLogin}>
          {isLoading ? 
          <ActivityIndicator color={theme.colors.text}/>: 
          <Text style={styles.buttonEntrarText}>Entrar</Text>
          }
        </TouchableOpacity>
        {errorMessage ? <Text style={{color: 'red', marginTop: 8}}>{errorMessage}</Text> : null} 
      </View>
    </View>
  );
};

