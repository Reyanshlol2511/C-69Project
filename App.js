import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {

    constructor(){

        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }

    }
    
    getCameraPermission = async()=>{
  const{status}= await Permissions.askAsync(Permissions.Camera);
        this.setState({
            hasCameraPermissions: status==="granted",
            buttonState: 'clicked',
            scanned: false
        })
    }
    handleBarCodeScanned = async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
        
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState==='clicked' & hasCameraPermissions) {
            return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} />

            )
        }

        else if(buttonState ==="normal"){
        
        return(
            <View style={styles.container}>
                <Text style={styles.displayText}>{hasCameraPermissions==="true"?this.state.scannedData:
                "Request Camera Permission" }   </Text>
                
             <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission} >
             <Image source={require('./assets/Barcode-Scanner.jpg')}/>
             <Text style={styles.scanButtonText}>
             Scan QR Code
             </Text>
             </TouchableOpacity>
             
             
            </View>
        )
      }
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    displayText: {
        fontSize: 10,
        textDecorationLine: 'underline',
    },
    scanButton: {
        backgroundColor: '#F45603',
        padding: 10,
        margin: 10,
    },
    scanButtonText: {
        fontSize: 20,
        color: '#FFFFFF'
    },
})