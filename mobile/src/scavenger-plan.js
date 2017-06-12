import React, { Component } from 'react';
import ReactNative from 'react-native';
import Update from 'react-addons-update'

const { Alert, TouchableOpacity, Text, View, ScrollView, Image, Modal,TextInput,Button} = ReactNative

class ScavengerItemSelf extends Component{
	render(){
		if(this.props.myTime==-1){
			return(
				<View style={{width:125}}></View>
				)
		}
		return(
			<View style={{flexDirection:'row',width:125}}>
				<Text>X</Text>
				<View>
					<Text>{this.props.title}</Text>
					<Text>{this.props.myTime} minutes</Text>
				</View>
			</View>
		)
	}
}

class ScavengerItemMarker extends Component{
	_onPressButton(){
		this.props.showChallenge(this.props)
	}
	render(){
		if(!this.props.challengeAvailable){
			return(
				<TouchableOpacity>
					<View style={{width:50,height:50,backgroundColor:'#DDDDDD', borderRadius: 25,borderWidth:3,borderColor:"#FFFFFF"}}></View>
				</TouchableOpacity>
				)
		}
		return(
			<TouchableOpacity onPress={this._onPressButton.bind(this)}>
				<View style={{width:50,height:50,backgroundColor:this.props.color, borderRadius: 25,borderWidth:3,borderColor:"#FFFFFF"}}></View>
			</TouchableOpacity>
		)
	}
}

class ScavengerItemRecord extends Component{
	render(){
		if(this.props.recordTime==-1){
			return(
				<View style={{width:125}}></View>
			)
		}
		return(
			<View style={{flexDirection:'row',width:125}}>
				<View style={{width:20,height:20,borderRadius:10,backgroundColor:'#550088'}}></View>
				<View>
					<Text>{this.props.recordUser}</Text>
					<Text>{this.props.recordTime} minutes</Text>
				</View>
			</View>
		)
	}
}


class ScavengerItem extends Component{
	render(){
		return (
			<View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',}}>
				<ScavengerItemSelf style={{flex:2}} {...this.props}></ScavengerItemSelf>
				<ScavengerItemMarker style={{flex:1}} showChallenge={this.props.showChallenge}  {...this.props}></ScavengerItemMarker>
				<ScavengerItemRecord style={{flex:2}} {...this.props}></ScavengerItemRecord>
			</View>
		)
	}
}

class ScavengerLine extends Component{
	render(){
		return (
			<View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
				<View style={{backgroundColor:"#FFFFFF",width:3,height:10,marginTop:-2,marginBottom:-2}}>
				</View>
			</View>
		)
	}
}

class ScavengerPlanView extends Component {
	constructor(props) {
	    super(props);
	    // TODO: save time better to avoid cheating
	    this.state ={
	    	currentTimedLevel:-1,
	    	tstart:null
	    }
	}

	showChallenge(data){
		if(data.myTime==-1){
			// an uncompleted level
			if(this.state.currentTimedLevel!=data.id){
				// first time seeing this challenge, must be the next challenge
				this.setState(Object.assign({},this.state,{currentTimedLevel:data.id,tstart:new Date().getTime()}))
			}
		}
		this.challengeModalRef.showModal(data)
		// alert('so much showboating'+data.title)
	}

	completeChallenge(id){
		this.props.completeTask(id,((new Date().getTime()-this.state.tstart)/1000))
	}

	render() {
		// {color:"#FF0055",title:'All Hands',recordTime:23,recordUser:'Dr.McNinja',myTime:19},
		var items=this.props.levels.map((level) =>
			<View>
				<ScavengerLine></ScavengerLine>
				<ScavengerItem challengeAvailable={level.id<=this.props.currentLevel} showChallenge={this.showChallenge.bind(this)} {...level}></ScavengerItem>
			</View>
		)
		return(
			<View>
				<Text style={{textAlign:'center',marginTop:10,marginBottom:10,fontSize:25}}>Scavenger Hunt</Text>
				<ScavengerChallengeModal
					completeTask={(id)=>this.completeChallenge(id)}
					ref={(ref) => this.challengeModalRef = ref}
				></ScavengerChallengeModal>
				{items}
			</View>
		)
	}
}

class ScavengerChallengeModal extends Component{
	state= { modal: false,description:'',guess:'',answer:'r2d2',correct:false};

	showModal(data){
		this.setState({modal:true,description:data.description,answer:data.answer,id:data.id,guess:''})
	}

	setGuess(text){
		this.setState(Object.assign({},this.state,{guess:text.text,correct:text.text==this.state.answer}))
	}

	submitGuess(){
		this.props.completeTask(this.state.id)
		this.setState(Object.assign({},this.state,{modal:false}))
	}

	cancelGuess(){
		this.setState(Object.assign({},this.state,{modal:false}))
	}

	render(){
		return(
			<Modal
	          animationType={"slide"}
	          transparent={true}
	          visible={this.state.modal}
	          onRequestClose={() => {alert("Modal has been closed.")}}
	          >
	          	<View style={{backgroundColor:'rgba(0,0,0,0.5)',flex: 1,
        flexDirection: 'column',}}>
        			<View style={{backgroundColor:'#FFFFFF',marginTop:60,marginLeft:20,marginRight:20,padding:5,borderRadius:5}}>
		          		<Text>{this.state.description}</Text>
		          		<TextInput
					        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					        onChangeText={(text) => this.setGuess({text})}
					        value={this.state.guess}
					        autoCapitalize="none"
					      />
					      <Button
							  onPress={()=>this.submitGuess()}
							  title="Submit"
							  disabled={!this.state.correct}
							  color="#841584"
							  accessibilityLabel=""
							/>
							 <Button
							  onPress={()=>this.cancelGuess()}
							  title="Cancel"
							  color="#841584"
							  accessibilityLabel=""
							/>
		          		</View>
	         	</View>
	          </Modal>
	    )
	}
}

export default ScavengerPlanView
