import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [unitWeight, setUnitWeight] = useState('kg'); // 'kg' or 'lbs'
  const [unitHeight, setUnitHeight] = useState('ft'); // 'm' or 'ft' (for feet/inches)
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Function to calculate BMI
  const calculateBMI = () => {
    // Clear previous errors
    setError('');

    // Validate input values
    if (!weight || isNaN(weight) || !height || isNaN(weight)) {
      setError('Please enter valid numbers for weight and height.');
      setBmi(null);
      setBmiCategory('');
      return; // Prevent calculation if inputs are invalid
    }

    let weightInKg = parseFloat(weight);
    let heightInM = parseFloat(height);

    // Convert weight and height based on selected units
    if (unitWeight === 'lbs') {
      weightInKg = weightInKg * 0.453592; // Convert lbs to kg
    }

    if (unitHeight === 'ft') {
      // Parse height input in "6'1" format (feet and inches)
      const feetInches = height.split("'"); // Split input like "6'1" into ["6", "1"]
      if (feetInches.length === 2) {
        const feet = parseInt(feetInches[0], 10);
        const inches = parseInt(feetInches[1], 10);
        if (isNaN(feet) || isNaN(inches)) {
          setError('Please enter a valid height in feet and inches (e.g., 6\'1").');
          return;
        }
        // Convert to total inches, then to meters
        heightInM = ((feet * 12) + inches) * 0.0254; // Convert total inches to meters
      } else {
        setError('Please enter a valid height in feet and inches (e.g., 6\'1").');
        return;
      }
    }

    // Calculate BMI (Metric: kg/m², Imperial: lbs/in² * 703)
    const bmiValue = weightInKg / (heightInM * heightInM);

    setBmi(bmiValue.toFixed(2)); // Round to two decimal places
    const category = getBmiCategory(bmiValue);
    setBmiCategory(category);

    // Show the modal with the result
    setModalVisible(true);
  };

  // Function to classify BMI
  const getBmiCategory = (bmiValue) => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue >= 18.5 && bmiValue < 24.9) return 'Normal weight';
    if (bmiValue >= 25 && bmiValue < 29.9) return 'Overweight';
    return 'Obese';
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    // Reset values after closing the modal if needed
    setWeight('');
    setHeight('');
    setBmi(null);
    setBmiCategory('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      {/* Weight Input */}
      <TextInput
        style={styles.input}
        placeholder={`Enter weight in ${unitWeight === 'kg' ? 'kg' : 'lbs'}`}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      
      {/* Height Input */}
      <TextInput
        style={styles.input}
        placeholder={`Enter height in ${unitHeight === 'm' ? 'meters' : 'feet'}`}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      {/* Metric Options for Weight */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select weight unit</Text>
        <Picker
          selectedValue={unitWeight}
          onValueChange={(itemValue) => setUnitWeight(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Kilograms (kg)" value="kg" />
          <Picker.Item label="Pounds (lbs)" value="lbs" />
        </Picker>
      </View>

      {/* Metric Options for Height */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select height unit</Text>
        <Picker
          selectedValue={unitHeight}
          onValueChange={(itemValue) => setUnitHeight(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Feet (ft)" value="ft" />
          <Picker.Item label="Meters (m)" value="m" />
        </Picker>
      </View>

      {/* Calculate Button */}
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <MaterialCommunityIcons name="calculator" size={24} color="#fff" />
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>

      {/* Display error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Modal to show BMI result */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialCommunityIcons
              name={bmiCategory === 'Normal weight' ? 'check-circle' : 'alert-circle'}
              size={50}
              color={bmiCategory === 'Normal weight' ? 'green' : 'red'}
            />
            <Text style={styles.modalTitle}>Your BMI: {bmi}</Text>
            <Text style={styles.modalCategory}>{bmiCategory}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Refresh IconButton */}
      <IconButton
        icon="refresh"
        size={30}
        onPress={() => {
          setWeight('');
          setHeight('');
          setBmi(null);
          setBmiCategory('');
          setError('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',  // Dark background
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 8,
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Black button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#333',
    width: '100%',
  },
  resultText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  categoryText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
  },
  modalCategory: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  modalButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

