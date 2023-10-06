import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {ChevronDown, ChevronUp} from 'react-native-feather';

import {colors} from '../../config/themes/colors';
import {useNavigation} from '@react-navigation/native';
import {fetchCategory} from '../../lib/http';

type TNav = {
  navigate: (value: string) => void;
};

type TCategory = {
  id: number;
  name: string;
};

export default async function Home() {
  const [difficulty, setDifficulty] = useState('Fácil');
  const [category, setCategory] = useState(0);
  const difficultyOptions = ['Fácil', 'Médio', 'Difícil'];

  const categoryOptions: TCategory[] = await fetchCategory();

  const handleDifficultyChange = (selectedItem: string) => {
    setDifficulty(selectedItem);
  };
  const handleCategoryChange = (selectedItem: number) => {
    setCategory(selectedItem);
  };

  const navigation: TNav = useNavigation();

  const startQuiz = () => {
    console.log('Iniciou o quiz');
    navigation.navigate('Trivia');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SOLID GUACAMOLE</Text>

      <View style={styles.dropdownContainer}>
        <Text style={styles.instructions}>Choose difficulty</Text>
        <SelectDropdown
          data={difficultyOptions}
          onSelect={selectedItem => {
            handleDifficultyChange(selectedItem);
          }}
          defaultButtonText={difficulty}
          buttonStyle={styles.input}
          buttonTextStyle={{color: colors.white}}
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

      <View style={styles.dropdownContainer}>
        <Text style={styles.instructions}>Choose category</Text>
        <SelectDropdown
          data={categoryOptions}
          onSelect={({id}) => {
            handleCategoryChange(id);
          }}
          defaultButtonText={difficulty}
          buttonStyle={styles.input}
          buttonTextStyle={{color: colors.white}}
          buttonTextAfterSelection={({name}) => name}
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

      <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
        <Text style={styles.startButtonText}>Start Quiz</Text>
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
    textAlign: 'center',
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },

  input: {
    backgroundColor: colors.darkGrey,
    color: colors.white,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
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
