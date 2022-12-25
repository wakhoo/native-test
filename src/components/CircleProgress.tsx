import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
interface MData{
    total:number;
    today:number;
    str:string;
}



    const propStyle = (percent, base_degrees) => {
        const rotateBy = base_degrees + (percent * 3.6);
        return {
          transform:[{rotateZ: `${rotateBy}deg`}]
        };
      }
      
      const renderThirdLayer = (percent) => {
        if(percent > 50){
          /**
          * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
          * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
          * before passing to the propStyle function
          **/
          return <View style={[styles.secondProgressLayer,propStyle((percent - 50), 45) ]}></View>
        }else{
          return <View style={styles.offsetLayer}></View>
        }
      }
      



function CircleProgressBar({total,today,str}:MData){
        const percent=(today/total)*100;
        let firstProgressLayerStyle;
        if(percent > 50){
            firstProgressLayerStyle = propStyle(50, -135);
        }else {
          firstProgressLayerStyle = propStyle(percent, -135);
        }
      
        return(
          <View style={styles.container}>
            <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
            {renderThirdLayer(percent)}

            <Text style={styles.currentText}>{today}</Text>
            <Text style={styles.goalText}>/{total}{str}</Text>


          </View>
        );
}
export default CircleProgressBar;



const styles = StyleSheet.create({
    container: {
      width: 70,
      height: 70,
      borderWidth: 6,
      borderRadius: 100,
      borderColor: '#eee',
      justifyContent: 'center',
      alignItems: 'center' 
    },
    firstProgressLayer: {
        width: 70,
        height: 70,
        borderWidth:6,
        position: 'absolute',
        borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#61E294',
    borderTopColor: '#61E294'   ,
    borderRadius: 100,
    transform:[{rotateZ: '-135deg'}]
      },
      secondProgressLayer:{
        width: 70,
        height: 70,
        position: 'absolute',
        borderWidth: 6,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#61E294',
        borderTopColor: '#61E294',
        transform: [{rotateZ: '45deg'}]
      },
      offsetLayer: {
        width: 70,
        height: 70,
        borderWidth: 6,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#eee',
        borderTopColor: '#eee',
        transform:[{rotateZ: '-135deg'}]
      },
      currentText:{
        position: 'absolute',
        left:10,
        top:15,
    fontSize: 20,
    fontWeight: 'bold'
      },
      goalText:{
        position: 'absolute',
        left:24,
    fontSize: 10,
    fontWeight: 'bold'
      }
  });
