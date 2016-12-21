import React, { Component } from 'react';
import ReactNative, { Alert, TouchableOpacity, Text, View, ScrollView, Image } from 'react-native';
import Bazaar from 'bazaar-client'
const packageInfo = require('./package.json')
const bazaarInfo = require('./bazaar.json')

const DD = ReactNative.NativeModules.DDBindings
const eventID = ReactNative.Platform.select({
  ios: () => DD.currentEvent.EventId,
  android: () => JSON.parse(DD.currentEvent).EventId
})();

const ScreenView = ReactNative.Platform.select({
  ios: () => Bazaar.View,
  android: () => ReactNative.View,
})();

class HomeView extends Component {
  constructor() {
    super()
    this.api = new Bazaar.Client(DD, packageInfo.name, eventID)
    this.state = { sampleItems: [] }
  }

  componentDidMount() {
    var self = this

    this.api.connect().then((user) => {
      // TODO: query from a collection on load
      // this.api.fetchUserDocumentsInCollection(collection = 'second_collection', query = null, watch = true).subscribe((results) => {
      //   this.setState({ sampleItems: results })
      // })
    }).catch((err) => {
      Alert.alert('Error: ' + err)
    })

    DD.setTitle(`${packageInfo.name}`)
  }

  // TODO - implement inserting of a document
  insertSample() {
    const document = { user_id: this.api.getUserID(), name: new Date().getTime(), image_url: 'Something Else....' }
    this.api.insertIntoCollection('second_collection', document)
  }

  // TODO - implement deleting of a document
  deleteSample() {
    if (this.state.sampleItems.length) {
      this.api.removeFromCollection('second_collection', { id: this.state.sampleItems[0].id })
    }
  }

  render() {
    const ids = 'Sample Items: ' + (this.state.sampleItems || []).map((x) => x.name).join(', ')

    return (
      <ScreenView title="" style={{ flex: 1 }}>
        <ScrollView style={ styles.container }>
          <Image style={ styles.headerImage } resizeMode="contain" source={{ uri: 'https://doubledutch.me/wp-content/uploads/2016/04/doubledutch-logo-300.png' }} />
          <Text style={ styles.welcome }>{packageInfo.name} ({packageInfo.version})</Text>
          <Text style={ styles.h1 }>Collections</Text>
          {bazaarInfo.collections.map((c) => (
            <View>
              <Text style={styles.h2}>{c.name}</Text>
              <Text style={styles.h3}>User Write Access: {c.userWriteAccess ? 'enabled': 'disabled'}</Text>
              <Text style={styles.h3}>Event Read Access: {c.globalReadAccess ? 'enabled': 'disabled'}</Text>
              <Text style={styles.h3}>Event Write Access: {c.globalWriteAccess ? 'enabled': 'disabled'}</Text>
            </View>
          ))}
          <Text style={ styles.h1 }>Data Interactions</Text>
          <View style={{ opacity: 0.25 }}>
            <Text>TODO: Check the code for samples</Text>
            <Text style={{ height: 0 }}>{ids}</Text>
            <TouchableOpacity disabled={true} onPress={this.insertSample.bind(this)} style={{ padding: 5, backgroundColor: 'blue', margin: 10 }}>
              <Text style={{ color: 'white' }}>Insert item into list</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={true} onPress={this.deleteSample.bind(this)} style={{ padding: 5, backgroundColor: 'red', margin: 10 }}>
              <Text style={{ color: 'white' }}>Delete item list</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenView>
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  headerImage: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#dedede',
    padding: 10,
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  h1: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  h2: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    marginVertical: 2,
  },
  h3: {
    fontSize: 14,
    textAlign: 'left',
    marginVertical: 2,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default HomeView
