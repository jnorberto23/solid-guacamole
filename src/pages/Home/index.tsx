import {Text, SafeAreaView, StyleSheet} from 'react-native';
import * as React from 'react';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ff4081'},
});
