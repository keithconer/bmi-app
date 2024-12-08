import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export function BMIForm({ weight, setWeight, height, setHeight, calculateBMI }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter weight in kg"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter height in meters"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <Button title="Calculate BMI" onPress={calculateBMI} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    width: '100%',
  },
});
