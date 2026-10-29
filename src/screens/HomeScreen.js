import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleGoogleLogin = () => {
    // Lógica para login com Google
    console.log('Continuar com Google pressionado');
  };

  const handleAppleLogin = () => {
    // Lógica para login com Apple
    console.log('Continuar com Apple pressionado');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logótipo Horizontal no Topo */}
          <View style={styles.logoHeader}>
            <Image
              source={require('../../assets/guiasaudedown.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Seção de Boas-Vindas */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
            <Text style={styles.welcomeSubtitle}>
              Entre para encontrar saúde e cuidado perto de você.
            </Text>
          </View>

          {/* Campo de E-mail */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail*</Text>
            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={20}
                color="#666666"
                style={styles.leftIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="voce@exemple.com"
                placeholderTextColor="#757575"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Campo de Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha *</Text>
            <View style={styles.inputContainer}>
              <Feather
                name="lock"
                size={20}
                color="#666666"
                style={styles.leftIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite uma senha"
                placeholderTextColor="#757575"
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={styles.eyeButton}
              >
                <Feather
                  name={mostrarSenha ? 'eye-off' : 'eye'}
                  size={20}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Link: Esqueci minha senha */}
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          {/* Botão Principal: Entrar */}
          <TouchableOpacity style={styles.loginButton} activeOpacity={0.85}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Divisor "ou continue com" */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou continue com</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Botão Social: Google */}
          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.7}
            onPress={handleGoogleLogin}
          >
            <AntDesign
              name="google"
              size={22}
              color="#DB4437"
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continuar com Google</Text>
          </TouchableOpacity>

          {/* Botão Social: Apple */}
          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.7}
            onPress={handleAppleLogin}
          >
            <Ionicons
              name="logo-apple"
              size={24}
              color="#000000"
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continuar com Apple</Text>
          </TouchableOpacity>

          {/* Seção: Criar Conta */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Ainda não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupLink}>Criar conta</Text>
                </TouchableOpacity>
          </View>

          {/* Linha Divisória Inferior */}
          <View style={styles.bottomDivider} />

          {/* Link: Explorar sem conta */}
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreText}>Explorar sem conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
  },
  logoHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  logoImage: {
    width: width * 0.9,
    height: 90,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#004A7C',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#6E757C',
    fontWeight: '400',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEDEDE',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 14,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#212121',
  },
  eyeButton: {
    padding: 6,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#004A7C',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#0097A7',
    height: 54,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#424242',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: '#9E9E9E',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 24,
  },
  signupText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  signupLink: {
    fontSize: 15,
    color: '#004A7C',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  bottomDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 22,
  },
  exploreButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  exploreText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#004A7C',
  },
});