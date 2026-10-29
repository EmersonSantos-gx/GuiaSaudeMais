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
  Modal,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CreateAccountScreen({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [sexoSelecionado, setSexoSelecionado] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  // Estado do Modal de Sexo
  const [modalSexoVisible, setModalSexoVisible] = useState(false);
  const opcoesSexo = ['Feminino', 'Masculino', 'Outro', 'Prefiro não informar'];

  // Formatação automática do celular: (82) 9 0000-0000
  const handleCelularChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

    let formatted = cleaned;
    if (cleaned.length > 2 && cleaned.length <= 7) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length > 7) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length > 0) {
      formatted = `(${cleaned}`;
    }
    setCelular(formatted);
  };

  // Formatação automática da data: DD/MM/AAAA
  const handleDataChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    let formatted = cleaned;
    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }
    setDataNascimento(formatted);
  };

  const handleContinuar = () => {
    // Validação dos dados obrigatórios da Etapa 1
    if (!nomeCompleto || !email || !celular) {
      alert('Por favor, preencha os campos obrigatórios (*).');
      return;
    }

    const dadosEtapa1 = {
      nomeCompleto,
      nomeSocial,
      email,
      celular,
      sexoSelecionado,
      dataNascimento,
    };

    // Navega para a Etapa 2 (onde será criada a senha)
    navigation.navigate('RegisterStep2', { dadosEtapa1 });
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

          {/* Barra de Progresso / Etapas */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarActive} />
            <View style={styles.progressBarInactive} />
          </View>
          <Text style={styles.stepText}>
            Etapa 1 de 2 <Text style={styles.stepSubText}>- Seus dados</Text>
          </Text>

          {/* Título da Página */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Crie sua conta</Text>
            <Text style={styles.subTitle}>Preencha os dados para começar.</Text>
            <Text style={styles.requiredNote}>*Campos obrigatórios</Text>
          </View>

          {/* Nome completo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome completo*</Text>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#757575" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#9E9E9E"
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
              />
            </View>
          </View>

          {/* Nome social */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome social (opcional)</Text>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#757575" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Como prefere ser chamado(a)?"
                placeholderTextColor="#9E9E9E"
                value={nomeSocial}
                onChangeText={setNomeSocial}
              />
            </View>
          </View>

          {/* E-mail */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail*</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color="#757575" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="voce@exemple.com"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Celular com DDD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Celular com DDD*</Text>
            <View style={styles.inputContainer}>
              <Feather name="phone" size={20} color="#757575" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="(82) 9 0000-0000"
                placeholderTextColor="#9E9E9E"
                keyboardType="phone-pad"
                value={celular}
                onChangeText={handleCelularChange}
              />
            </View>
          </View>

          {/* Sexo (Menu Suspenso) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sexo</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.8}
              onPress={() => setModalSexoVisible(true)}
            >
              <Feather name="users" size={20} color="#757575" style={styles.leftIcon} />
              <Text style={[styles.dropdownText, !sexoSelecionado && { color: '#9E9E9E' }]}>
                {sexoSelecionado ? sexoSelecionado : 'Informe seu sexo'}
              </Text>
              <Feather name="chevron-down" size={20} color="#757575" style={styles.rightIcon} />
            </TouchableOpacity>
          </View>

          {/* Data de Nascimento */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data de Nascimento (opcional)</Text>
            <View style={styles.inputContainer}>
              <Feather name="calendar" size={20} color="#757575" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#9E9E9E"
                keyboardType="numeric"
                value={dataNascimento}
                onChangeText={handleDataChange}
              />
            </View>
          </View>

          {/* Botão Continuar */}
          <TouchableOpacity 
            style={styles.continueButton} 
            activeOpacity={0.85}
            onPress={handleContinuar}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>

          {/* Rodapé: Já tem uma conta? Entrar */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal do Menu Suspenso de Sexo */}
      <Modal
        visible={modalSexoVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalSexoVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalSexoVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o sexo</Text>
            <FlatList
              data={opcoesSexo}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSexoSelecionado(item);
                    setModalSexoVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText, 
                    sexoSelecionado === item && styles.modalItemTextSelected
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    marginRight: 6,
  },
  progressBarInactive: {
    flex: 1,
    height: 6,
    backgroundColor: '#9E9E9E',
    borderRadius: 3,
    marginLeft: 6,
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
  rightIcon: {
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#212121',
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    color: '#212121',
  },
  continueButton: {
    backgroundColor: '#0097A7',
    height: 54,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  footerLink: {
    fontSize: 15,
    color: '#004A7C',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    maxHeight: 300,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004A7C',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
  },
  modalItemTextSelected: {
    color: '#0097A7',
    fontWeight: '700',
  },
});