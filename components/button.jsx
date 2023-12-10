import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Button() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [managerName, setManagerName] = useState('');

  const handleAddEmployee = async () => {
    try {
      const employeeData = {
        managerName,
        employeeName,
        employeeEmail,
        employeePhone,
      };

      const response = await fetch(
        'https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        },
      );

      if (!response.ok) {
        console.error('Error adding employee:', response.statusText);
        return;
      }

      setEmployeeName('');
      setEmployeeEmail('');
      setEmployeePhone('');
      setManagerName('');

      setModalVisible(false);

      const responseData = await response.json();
      console.log('Employee added successfully:', responseData);
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.button}>Add Employee</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Add Employee</Text>
            <TextInput
              style={styles.input}
              placeholder="Manager Name"
              value={managerName}
              onChangeText={text => setManagerName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Employee Name"
              value={employeeName}
              onChangeText={text => setEmployeeName(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Employee Email"
              value={employeeEmail}
              onChangeText={text => setEmployeeEmail(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Employee Phone"
              value={employeePhone}
              onChangeText={text => setEmployeePhone(text)}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddEmployee}>
              <Text style={styles.buttonText}>Add Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#008080',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: 'rgba(173, 216, 230, 0.8)',
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: 300,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Button;
