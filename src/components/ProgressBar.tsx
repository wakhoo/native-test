import React,{useEffect, useRef} from "react";
import {Animated, StyleSheet, Text,View} from "react-native"
interface MData{
    totalMin:number;
    todayMin:number;
    week:string;
}

function ProgressBar({totalMin,todayMin,week}:MData){
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
    const dayOfWeek='목'
    const Date=()=>{
        if(dayOfWeek==week){
            return(
                <View>
               
                <Sucess/> 
                <View style={styles.red}/>
                </View>
            )
        }
        else{
            return(
                <Sucess/>
            )
        }
    }
   const Sucess=()=>{
    if(totalMin==todayMin){
        return(
            <View>
                    <View style={styles.bar2}>
                        
                        <Animated.View
                        style={{
                            backgroundColor:"#61E294",
                            width,
                            height:33,
                            borderRadius:5,
                        }}
                        ><Text style={styles.date}>{week}</Text></Animated.View>
                    </View>
                    {/* <Text style={styles.step}>{todayMin}/{totalMin}</Text> */}
                </View>
        )
    }
    else{
        return(
            <View>
            <View style={styles.bar}>
                
                <Animated.View
                style={{
                    backgroundColor:"#B0F0C9",
                    width,
                    height:33,
                    borderTopLeftRadius:5,
                    borderBottomLeftRadius:5
                    
                }}
                ><Text style={styles.date}>{week}</Text></Animated.View>
            </View>
            {/* <Text style={styles.step}>{todayMin}/{totalMin}</Text> */}
        </View>
        )
    }
   } 
return(
   <Date/>
)
}



const styles=StyleSheet.create({
    bar:{
        
        width:100,
        height:35,
        transform:[{rotate:'270deg'}],
        backgroundColor:"#fff",
        borderColor:"#bbb",
        borderWidth:1,
        borderRadius:5,
        marginTop:50,
        top:20,
        left:-20,
        marginRight:-50,
        alignContent:'center',
        justifyContent:'center'
        
    },
    bar2:{
        
        width:100,
        height:35,
        transform:[{rotate:'270deg'}],
        backgroundColor:"#fff",
        borderColor:"#61E294",
        borderWidth:1,
        borderRadius:5,
        marginTop:50,
        top:20,
        left:-20,
        marginRight:-50,
        alignContent:'center',
        justifyContent:'center'
        
    },
    step:{
        color:"#000",

    },
    date:{
        transform:[{rotate:'-270deg'}],
        position:'absolute',
        top:10,
        left:45,
        fontWeight:'bold'
        
    },
    red:{
        borderRadius:100,
        borderWidth:5,
        position: 'absolute',
        borderColor:'red',
        top:35,
        left:40
    }
})

export default ProgressBar;
