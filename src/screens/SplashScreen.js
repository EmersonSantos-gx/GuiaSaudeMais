import React, { useEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Caso queira que a tela redirecione após 3 segundos para a Home:
    const timer = setTimeout(() => {
      if (navigation) {
        navigation.replace('Home');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Imagem de fundo com curvas ciano suaves */}
      <ImageBackground
        source={require('../../assets/backgroundsplash.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Logo estática centralizada */}
        <Image
          source={require('../../assets/guiasaudetop.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.75,
    height: width * 0.75,
  },
});