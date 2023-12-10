import React from 'react';
import {StatusBar} from 'react-native';
import Card from './components/card';
import Button from './components/button';
import Nav from './components/nav';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <Nav />
      <Card />
      <Button />
    </>
  );
}

export default App;
