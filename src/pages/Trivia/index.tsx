import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Clock } from 'react-native-feather';

import { colors } from '../../config/themes/colors';

export default function Trivia() {
  const [selectedOption, setSelectedOption] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [seconds, setSeconds] = useState(0); 
  const [minutes, setMinutes] = useState(0); 
  const [timerRunning, setTimerRunning] = useState(false);

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

  useEffect(() => {
    if (!timerRunning) {
      setSeconds(0);
      setMinutes(0);
      setTimerRunning(true);
    }

    const interval = setInterval(() => {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      } else {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, timerRunning]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>Questão {questionNumber}</Text>
        <View style={styles.timerContainer}>
          <Clock stroke="white" width={16} height={16} />
          <Text style={styles.timerText}>
            {minutes < 10 ? '0' : ''}{minutes} : {seconds < 10 ? '0' : ''}{seconds} 
          </Text>
        </View>
      </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.red,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    color: colors.white,
    marginLeft: 5,
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