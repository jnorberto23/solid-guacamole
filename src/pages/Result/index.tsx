import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useQuestionsStore} from '../../store/QuestionsStore';

import {colors} from '../../config/themes/colors';
import { useNavigation } from '@react-navigation/native';

type TNav = {
  navigate: (value: string) => void;
};

export function Result() {
  const navigation: TNav = useNavigation();
  const correctQuestionsCount = useQuestionsStore(
    state => state.correctQuestionsCount,
  );
  const totalQuestions = useQuestionsStore(state => state.questions.length);
  //   const minutes = useQuestionsStore((state) => state.minutes);
  //   const seconds = useQuestionsStore((state) => state.seconds);

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Quiz Results</Text>
        <Text style={styles.resultStats}>
          Correct Answers: {correctQuestionsCount} / {totalQuestions}
        </Text>
        <Text style={styles.resultStats}>Time Spent: 2</Text>
      </View>

      <TouchableOpacity style={styles.restartButton} onPress={handleGoToHome}>
        <Text style={styles.restartButtonText}>Return to Home</Text>
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
    padding: 20,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.red,
    marginBottom: 10,
  },
  resultStats: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 10,
  },
  restartButton: {
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  restartButtonText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
});
