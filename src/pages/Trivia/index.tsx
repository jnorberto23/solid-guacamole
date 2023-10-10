import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Clock} from 'react-native-feather';

import {colors} from '../../config/themes/colors';
import {useQuestionsStore} from '../../store/QuestionsStore';
import {useNavigation} from '@react-navigation/native';

type TOption = {
  key: string;
  text: string;
  isCorrect: boolean;
};

type TNav = {
  navigate: (value: string) => void;
};
export default function Trivia() {
  const navigation: TNav = useNavigation();

  const [selectedOption, setSelectedOption] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const questions = useQuestionsStore(state => state.questions);
  const setCorrectQuestionsCount = useQuestionsStore(
    state => state.setCorrectQuestionsCount,
  );

  const handleOptionClick = (option: TOption) => {
    setSelectedOption(option.key);
    if (option.isCorrect) {
      setCorrectQuestionsCount();
    }
  };
  const handleFinishTrivia = () => {
    navigation.navigate('Result');
  };

  const goToNextQuestion = () => {
    setSelectedOption('');
    setIndex(index + 1);
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
        <Text style={styles.questionNumber}>Question {index + 1}</Text>
        <View style={styles.timerContainer}>
          <Clock stroke="white" width={16} height={16} />
          <Text style={styles.timerText}>
            {minutes < 10 ? '0' : ''}
            {minutes} : {seconds < 10 ? '0' : ''}
            {seconds}
          </Text>
        </View>
      </View>

      <Text style={styles.question}>{questions[index].description}</Text>

      <View style={styles.optionsContainer}>
        {questions[index].answers.map(option => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.optionButton,
              selectedOption === option.key && styles.selectedOption,
            ]}
            onPress={() => handleOptionClick(option)}>
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {index < questions.length - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleFinishTrivia}>
          <Text style={styles.nextButtonText}>Finish Trivia</Text>
        </TouchableOpacity>
      )}
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
    gap: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.red,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '90%',
  },
  optionButton: {
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: colors.purple,
  },
  nextButton: {
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  nextButtonText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
});
