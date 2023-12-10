import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function Nav() {
  return (
    <>
      <View>
        <Text style={styles.button}>Cards</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    color: '#008080',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Nav;
