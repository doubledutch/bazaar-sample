import React, { Component } from 'react';
import ReactNative from 'react-native';
import Update from 'react-addons-update'
import DD from './dd-bindings'

const { Alert, TouchableOpacity, Text, View, ScrollView, Image } = ReactNative
import Bazaar from 'bazaar-client'
const packageInfo = require('../package.json')
const bazaarInfo = require('../bazaar.json')

import ScavengerPlanView from './scavenger-plan.js'

var ScreenView = ReactNative.View
var eventID = ''
const isSandboxed = false

class HomeView extends Component {
  constructor({ ddOverride }) {
    super()

    const eventID = DD.currentEvent.EventId

    const ScreenView = isSandboxed ? ReactNative.View : ReactNative.Platform.select({
      ios: () => Bazaar.View,
      android: () => ReactNative.View,
      web: () => ReactNative.View
    })()

    const options = {
      isSandboxed: isSandboxed,
      featureName: packageInfo.name,
      eventID: eventID,
      horizonHost: isSandboxed ? 'localhost:7171' : 'bazaar.doubledutch.me'
    }

    this.api = new Bazaar.Client(DD, options)
    this.state = { currentLevel:0,levels:[
        {id:6,color:"#55AAFF",title:'Docs',recordTime:-1,recordUser:null,myTime:-1,description:"Where the memories live",type:'code',answer:'r2d2'},
        {id:5,color:"#55FFFF",title:'Parkside',recordTime:-1,recordUser:null,myTime:-1,description:"Where the chicken sandwich rules",type:'code',answer:'r2d2'},
        {id:4,color:"#55FFAA",title:'Whole Foods',recordTime:11,recordUser:'Anonymous',myTime:-1,description:"Where the lazy lunch lives",type:'code',answer:'r2d2'},
        {id:3,color:"#AAFF55",title:'Marketing',recordTime:4,recordUser:'Six Pence Six Pack',myTime:-1,description:"Where the bugs are featured",type:'code',answer:'r2d2'},
        {id:2,color:"#FFFF55",title:'Engineering',recordTime:61,recordUser:'Lady Ada',myTime:-1,description:"Where the bugs are fabricated",type:'code',answer:'r2d2'},
        {id:1,color:"#FFAA55",title:'Kitchen',recordTime:18,recordUser:'Mr.Mister',myTime:-1,description:"Where the dirty dishes go",type:'code',answer:'r2d2'},
        {id:0,color:"#FF0055",title:'All Hands',recordTime:23,recordUser:'Dr.McNinja',myTime:-1,description:"So much all hands",type:'code',answer:'r2d2'}

      ]}
  }

  componentDidMount() {
    var self = this
/*
    this.api.connect().then((user) => {

      // TODO: query from a collection on load
      // this.api.fetchUserDocumentsInCollection(collection = 'sample_collection', query = null, watch = true).subscribe((results) => {
      //   this.setState({ sampleItems: results })
      // })
    }).catch((err) => {
      debugger
      Alert.alert('Error: ' + err)
    })
*/
    DD.setTitle(`${packageInfo.name}`)
  }

  // TODO - implement inserting of a document
  insertSample() {
    const document = { user_id: this.api.getUserID(), name: new Date().getTime(), image_url: 'Something Else....' }
    this.api.insertIntoCollection('sample_collection', document)
  }

  // TODO - implement deleting of a document
  deleteSample() {
    if (this.state.sampleItems.length) {
      this.api.removeFromCollection('sample_collection', { id: this.state.sampleItems[0].id })
    }
  }

  completeTask(id,time){
    var currentLevel=this.state.currentLevel
    if(currentLevel<=id)currentLevel=id+1
    var levels=[]
    for(var i=0;i<this.state.levels.length;i++){
      var level=this.state.levels[i]
      if(level.id==id){
        var userTime=42
        level=Object.assign({},level,{myTime:time})
        levels.push(level)
      }else{
        levels.push(level)
      }
    }
    this.setState(Object.assign({},this.state,{currentLevel:currentLevel,levels:levels}))
    console.log("the user finished "+id+" in "+time)
  }

  render() {
    const items = (this.state.sampleItems || [])
    const ids = 'Sample Items:' + items.map((x) => x.name).join(', ')
    const idStyle = items.length ? null : { height: 0 }


    return (
      <ScreenView title="" style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <ScavengerPlanView  completeTask={this.completeTask.bind(this)} {...this.state}></ScavengerPlanView>
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
