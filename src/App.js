import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDGPDX6Tprb7NZYXsJNd9mfj_9ZxLmGx00",
        authDomain: "auth-ddd29.firebaseapp.com",
        databaseURL: "https://auth-ddd29.firebaseio.com",
        projectId: "auth-ddd29",
        storageBucket: "auth-ddd29.appspot.com",
        messagingSenderId: "309342105728"
      });

      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false })
        }
      });
    };
  };

  renderContent() {
    switch (this.state.loggedIn) {
    case true: 
      return( 
        <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
      );
    case false: 
      return <LoginForm />;
    default: 
      return <Spinner size='large' />;
    }
  }
  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  };
};
