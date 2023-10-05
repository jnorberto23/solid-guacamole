import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ChevronDown, ChevronUp } from 'react-native-feather';

import { colors } from '../../config/themes/colors';

export default function Home() {
  const [keyWord, setKeyWord] = useState('');
  const [difficulty, setDifficulty] = useState('Fácil');

  const difficultyOptions = ['Fácil', 'Médio', 'Difícil'];

  const handleDifficultyChange = (selectedItem: string) => {
    setDifficulty(selectedItem);
  };

  const startQuiz = () => {
    console.log('Iniciou o quiz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SOLID GUACAMOLE</Text>

      <View style={styles.dropdownContainer}>
        <Text style={styles.instructions}>Escolha a dificuldade</Text>
        <SelectDropdown
          data={difficultyOptions}
          onSelect={selectedItem => {
            handleDifficultyChange(selectedItem);
          }}
          defaultButtonText={difficulty}
          buttonStyle={styles.inputDifficulty}
          buttonTextStyle={{ color: colors.white }}
          buttonTextAfterSelection={selectedItem => selectedItem}
          rowTextForSelection={item => item}
          renderDropdownIcon={isOpened =>
            isOpened ? (
              <ChevronUp stroke="white" width={16} height={16} />
            ) : (
              <ChevronDown stroke="white" width={16} height={16} />
            )
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.instructions}>Digite o tema</Text>
        <TextInput
          placeholder="Palavra-chave"
          placeholderTextColor={colors.white}
          style={styles.inputKeyword}
          onChangeText={setKeyWord}
          value={keyWord}
        />
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
        <Text style={styles.startButtonText}>Iniciar Quiz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkPurple, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.red,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 20,
    color: colors.white, 
    marginBottom: 10,
    textAlign: 'center'
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  inputDifficulty: {
    backgroundColor: colors.darkGrey,
    color: colors.white,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
  },
  inputKeyword: {
    backgroundColor: colors.darkGrey,
    color: colors.white,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  startButton: {
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  startButtonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },
});
