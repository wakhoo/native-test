import React,{useEffect, useRef} from "react";
import {Animated, StyleSheet, Text,View} from "react-native"
interface MData{
    totalMin:number;
    todayMin:number;
}

function ProgressBar({totalMin,todayMin}:MData){
    const loaderValue = useRef(new Animated.Value(0)).current;

    const load = (count: number)=>{
        Animated.timing(loaderValue,{
            toValue:(count/totalMin)*100,
            duration:500,
            useNativeDriver:false
        }).start();
    }

    const width = loaderValue.interpolate({
        inputRange:[0,100],
        outputRange:["0%","100%"],
        extrapolate:"clamp"
    });

    useEffect(()=>{
        load(todayMin)
    },[todayMin]);
    
return(
    <View>
        <View style={styles.bar}>
            
            <Animated.View
            style={{
                backgroundColor:"#61E294",
                width,
                height:33,
                borderTopLeftRadius:5,
                borderBottomLeftRadius:5
                
            }}
            ><Text style={styles.date}>목</Text></Animated.View>
        </View>
        <Text style={styles.step}>{todayMin}/{totalMin}</Text>
    </View>
)
}



const styles=StyleSheet.create({
    bar:{
        
        width:"30%",
        height:35,
        transform:[{rotate:'270deg'}],
        backgroundColor:"#fff",
        borderColor:"#3c3c3c",
        borderWidth:1,
        borderRadius:5
    },
    step:{
        color:"#fff",

    },
    date:{
        transform:[{rotate:'-270deg'}],
        
    }
})

export default ProgressBar;
