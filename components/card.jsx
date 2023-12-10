import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

const ManagerCard = ({manager}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handleViewMore = () => {
    setShowDetails(!showDetails);
  };
  const handleButtonPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const textColor = manager.backgroundColor === 'black' ? 'white' : 'black';

  return (
    <TouchableWithoutFeedback
      onPress={handleViewMore}
      onPressIn={handleButtonPressIn}
      onPressOut={handleButtonPressOut}>
      <View style={[styles.card, {backgroundColor: manager.backgroundColor}]}>
        {showDetails ? (
          // Inside Card details
          <View style={styles.card2}>
            <Text style={[styles.heading, {color: textColor}]}>
              {manager.name}
            </Text>
            <Text style={{color: textColor}}>Email: {manager.email}</Text>
            <Text style={{color: textColor}}>Phone: {manager.phone}</Text>
          </View>
        ) : (
          // Outside Card Deatils
          <View>
            <Text style={[styles.Manager, {color: textColor}]}>
              {/* Manager: {manager.parentId} */}
              {manager.parentId ? `Manager: ${manager.parentId}` : 'No Manager'}
            </Text>
            <Text style={[styles.Subordinates, {color: textColor}]}>
              Subordinates: {manager.name}
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={handleViewMore}>
          <Text style={styles.viewButton}>
            {showDetails ? 'View Manager' : 'View Employee'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Card = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d',
        );
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {employeeData.map(employee => (
          <ManagerCard key={employee.id} manager={employee} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 300,
  },
  card2: {
    padding: 16,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    // width: 200,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  Manager: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  Subordinates: {
    fontSize: 18,
    marginTop: 8,
  },

  viewButton: {
    backgroundColor: '#008080',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    borderColor: 'rgba(173, 216, 230, 0.8)',
    borderWidth: 2,
  },
});

export default Card;
