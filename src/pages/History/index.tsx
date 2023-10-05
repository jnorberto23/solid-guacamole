import {Text, SafeAreaView, StyleSheet} from 'react-native';
import * as React from 'react';

export default function History() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>History</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#9312b4'},
});
