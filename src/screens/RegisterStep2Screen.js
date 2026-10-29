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
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function RegisterStep2Screen({ navigation, route }) {
  // Recebe os dados preenchidos na Etapa 1
  const dadosEtapa1 = route?.params?.dadosEtapa1 || {};

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // Calcula a força da senha conforme digitado
  const verificarForcaSenha = (val) => {
    if (!val) return { texto: '', cor: '#BDBDBD', largura: '0%' };

    let pontuacao = 0;
    if (val.length >= 6) pontuacao += 1;
    if (val.length >= 8) pontuacao += 1;
    if (/[A-Z]/.test(val)) pontuacao += 1;
    if (/[0-9]/.test(val)) pontuacao += 1;
    if (/[^A-Za-z0-9]/.test(val)) pontuacao += 1;

    if (pontuacao <= 2) {
      return { texto: 'Senha Fraca', cor: '#E53935', largura: '33%' };
    } else if (pontuacao <= 4) {
      return { texto: 'Senha Média', cor: '#FB8C00', largura: '66%' };
    } else {
      return { texto: 'Senha Segura', cor: '#43A047', largura: '100%' };
    }
  };

  const statusSenha = verificarForcaSenha(senha);

  const handleFinalizarCadastro = () => {
    if (!senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha e confirme sua senha.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas digitadas não coincidem.');
      return;
    }

    const cadastroCompleto = {
      ...dadosEtapa1,
      senha,
    };

    console.log('Cadastro concluído com sucesso:', cadastroCompleto);
    Alert.alert('Sucesso!', 'Sua conta foi criada com sucesso!', [
      {
        text: 'Ir para o Login',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
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
          {/* Logótipo no Topo */}
          <View style={styles.logoHeader}>
            <Image
              source={require('../../assets/guiasaudedown.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Barra de Progresso: Etapa 2 de 2 Ativa */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarActive} />
            <View style={styles.progressBarActive} />
          </View>
          <Text style={styles.stepText}>
            Etapa 2 de 2 <Text style={styles.stepSubText}>- Segurança</Text>
          </Text>

          {/* Título */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Defina sua senha</Text>
            <Text style={styles.subTitle}>
              Crie uma senha segura para proteger sua conta.
            </Text>
            <Text style={styles.requiredNote}>*Campos obrigatórios</Text>
          </View>

          {/* Campo: Nova Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha*</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#757575" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite uma senha"
                placeholderTextColor="#9E9E9E"
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
                  color="#757575"
                />
              </TouchableOpacity>
            </View>

            {/* Barra de Força da Senha */}
            {senha.length > 0 && (
              <View style={styles.passwordStrengthContainer}>
                <View style={styles.strengthBarBackground}>
                  <View
                    style={[
                      styles.strengthBarFill,
                      {
                        width: statusSenha.largura,
                        backgroundColor: statusSenha.cor,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.strengthText, { color: statusSenha.cor }]}>
                  {statusSenha.texto}
                </Text>
              </View>
            )}
          </View>

          {/* Campo: Confirmar Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar senha*</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#757575" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite a senha novamente"
                placeholderTextColor="#9E9E9E"
                secureTextEntry={!mostrarConfirmarSenha}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity
                onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                style={styles.eyeButton}
              >
                <Feather
                  name={mostrarConfirmarSenha ? 'eye-off' : 'eye'}
                  size={20}
                  color="#757575"
                />
              </TouchableOpacity>
            </View>

            {/* Aviso caso as senhas sejam diferentes */}
            {confirmarSenha.length > 0 && senha !== confirmarSenha && (
              <Text style={styles.errorText}>As senhas não coincidem.</Text>
            )}
          </View>

          {/* Dicas de Senha Segura */}
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>Dicas para uma senha segura:</Text>
            <Text style={styles.tipItem}>• Pelo menos 8 caracteres</Text>
            <Text style={styles.tipItem}>• Letras maiúsculas e minúsculas</Text>
            <Text style={styles.tipItem}>• Números e símbolos (ex: @, #, !)</Text>
          </View>

          {/* Botão Criar Conta (Finalizar) */}
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.85}
            onPress={handleFinalizarCadastro}
          >
            <Text style={styles.continueButtonText}>Criar conta</Text>
          </TouchableOpacity>

          {/* Botão Voltar para Etapa 1 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar para a etapa anterior</Text>
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
    paddingTop: 24,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
  },
  logoHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: width * 0.55,
    height: 60,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressBarActive: {
    flex: 1,
    height: 6,
    backgroundColor: '#0097A7',
    borderRadius: 3,
    marginHorizontal: 3,
  },
  stepText: {
    fontSize: 13,
    color: '#0097A7',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepSubText: {
    color: '#757575',
    fontWeight: '400',
  },
  titleSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#004A7C',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 15,
    color: '#6E757C',
    fontWeight: '400',
  },
  requiredNote: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
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
  passwordStrengthContainer: {
    marginTop: 6,
  },
  strengthBarBackground: {
    height: 5,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  strengthBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  errorText: {
    fontSize: 12,
    color: '#E53935',
    marginTop: 4,
    fontWeight: '600',
  },
  tipsBox: {
    backgroundColor: '#F0FAFD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D0EEF7',
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#004A7C',
    marginBottom: 4,
  },
  tipItem: {
    fontSize: 12,
    color: '#455A64',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#0097A7',
    height: 54,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 15,
    color: '#004A7C',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});