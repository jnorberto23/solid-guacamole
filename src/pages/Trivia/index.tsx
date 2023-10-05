import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { colors } from '../../config/themes/colors';

export default function Trivia() {
  const [selectedOption, setSelectedOption] = useState('');

  const question = 'Qual é a capital da França?';
  const options = [
    { key: 'a', text: 'Londres' },
    { key: 'b', text: 'Madrid' },
    { key: 'c', text: 'Berlim' },
    { key: 'd', text: 'Paris' },
    { key: 'e', text: 'Roma' },
  ];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.optionButton,
              selectedOption === option.key && styles.selectedOption,
            ]}
            onPress={() => handleOptionClick(option.key)}>
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkPurple,
    padding: 20,
  },
  question: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.red,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '90%'
  },
  optionButton: {
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: colors.purple,
  },
});
