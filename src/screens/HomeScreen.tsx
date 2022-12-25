import { css } from '@emotion/native'
import { useRef,useState } from 'react'
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity,View } from 'react-native'

import CircleProgressBar from '@app/components/CircleProgress'
import ProgressBar from '@app/components/ProgressBar'
import SmallProgressBar from '@app/components/SmallProgress'
import { STATUS, SwipeablePanel } from '@app/components/SwipeablePanel'
const HomeScreen: React.FC = () => {
	const [panelStatus, setPanelStatus] = useState(2)
	const panelHeight = Dimensions.get('window').height * 0.8
    const minimizedHeight = Dimensions.get('window').height * 0.35
    const opacityAnim = useRef(new Animated.Value(0.5)).current

	const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,        
        canClose: false,
        canScroll: false,
        orientation: 'portrait',
        showCloseButton: false,
        largePanelHeight: panelHeight,
        smallPanelHeight: minimizedHeight,
        bigBackgroundOpacity: 0.0,
        smallBackgroundOpacity: 0.0,
        onChangeStatus: (status: STATUS) => changedStatus(status),
        statusChangeDone: (status: STATUS) => statusChangeDone(status) 
      });

	  const [isPanelActive, setIsPanelActive] = useState(true);

	  const statusChangeDone = (status: STATUS) => {
        setPanelStatus(status)
      }
	  const changedStatus = (status: STATUS) => {
        if (status == 2) {
            setPanelStatus(status)
            Animated.timing(opacityAnim, {
                toValue: 0.6,
                duration: 700,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(opacityAnim, {
                toValue: 0.0,
                duration: 700,
                useNativeDriver: true
            }).start()
        }
    } 


	// static data to build front-end UI
	const userData = {
		targetMinutes: 20,
		targetDaysPerWeek: 6,
		targetDaysPerMonth: 20
	}
	const data = {
		todayMinutes: 6,
		currentDays: 5,
	}
    const Goal=()=>{
        if(data.todayMinutes!=userData.targetMinutes){
            return(
                <Text style={css`font-size: 18px; text-align: center`}>{userData.targetMinutes-data.todayMinutes}분 더 대화하시면 오늘 목표가 달성돼요!</Text>
            )
        }
        else{
            return(
                <Text style={css`font-size: 18px; text-align: center`}>오늘의 목표를 달성하였습니다!</Text>
            )
        }
    }
    const Progress=()=>{
        if(panelStatus==2){
            return(
                <View>
                    <Text style={css`font-size: 18px; text-align: center;`}>이번 주에 4일 연속으로 접속하셨어요.</Text>
                    <Goal/>
                     <View style={[css`
                            flex: 0.3;
                            flex-direction: row;
                            justify-content: flex-end;
                            // background-color: red;
                            // height:"100%";
                        `]}>
                            
                            
                            {/* <MBText>{JSON.stringify(greetings.data)}</MBText> */}
                            {/* Enter statistics */}
                            <ProgressBar totalMin={userData.targetMinutes} todayMin={20} week={'월'}/>
                            <ProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'화'}/>
                            <ProgressBar totalMin={userData.targetMinutes} todayMin={20} week={'수'}/>
                            <ProgressBar totalMin={userData.targetMinutes} todayMin={data.todayMinutes} week={'목'}/>
                            <ProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'금'}/>
                            <ProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'토'}/>
                            <ProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'일'}/>
				        </View> 
                        <View style={styles.circle}>
                            <View style={styles.perCircle}>
                                <Text>오늘의 목표</Text>
                                <CircleProgressBar today={data.todayMinutes} total={userData.targetMinutes} str={'분'}/>
                            </View>
                            <View style={styles.perCircle}>
                                <Text>이번 주 목표</Text>
                                <CircleProgressBar today={data.currentDays} total={userData.targetDaysPerWeek} str={'일'}/>
                            </View>
                            <View style={styles.perCircle}>
                                <Text>이번 달의 목표</Text>
                                <CircleProgressBar today={data.currentDays} total={userData.targetDaysPerMonth} str={'일'}/>
                            </View>
                        </View>
                        <View style={styles.btn}>
                        <TouchableOpacity><Text style={{fontWeight:'bold',textAlign:'center',fontSize:20}}>시작하기</Text></TouchableOpacity>
                        </View>
                        </View>
            )
        }
        else{
            return(
                <View>
                    
                     <View style={[css`
                            flex: 0.3;
                            flex-direction: row;
                            justify-content: flex-end;
                            // background-color: red;
                            // height:"100%";
                        `]}>
                            
                            
                            {/* <MBText>{JSON.stringify(greetings.data)}</MBText> */}
                            {/* Enter statistics */}
                            <SmallProgressBar totalMin={userData.targetMinutes} todayMin={20} week={'월'}/>
                            <SmallProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'화'}/>
                            <SmallProgressBar totalMin={userData.targetMinutes} todayMin={20} week={'수'}/>
                            <SmallProgressBar totalMin={userData.targetMinutes} todayMin={data.todayMinutes} week={'목'}/>
                            <SmallProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'금'}/>
                            <SmallProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'토'}/>
                            <SmallProgressBar totalMin={userData.targetMinutes} todayMin={0} week={'일'}/>
                            
				        </View> 

                        
                        <TouchableOpacity style={styles.btn2}><Text style={{fontWeight:'bold',textAlign:'center',fontSize:20}}>시작하기</Text></TouchableOpacity>
                        
			
		</View>
            )
        }
    }

	return (
		
		<View
			style={css`
				flex: 1;
				background: #000; 
			`}
		>
			<SwipeablePanel {...panelProps} isActive={isPanelActive}>
                    <View style={[css`
                        padding: 24px;
                        padding-bottom: 50px;
                        padding-top: 30px;
                        flex-direction: column;
                    `, { height: panelHeight  }]}>
                        <Progress/>
                    </View>
                    
                   
                </SwipeablePanel> 
			
			
		</View>

	)
}

export default HomeScreen

const styles=StyleSheet.create({
    date:{
        flex:1,
        position:'relative',
        right:30,
        top:100,
        height:"100%"
        // flexDirection:'row',

        
    },
    btn:{
        backgroundColor:'#61E294',
        // width:"100%",
        height:50,
        justifyContent:"center",
        alignContent:'center',
        borderRadius:8
    },
    circle:{
        marginTop:170,
        marginBottom:30,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    perCircle:{
        height:95,
        justifyContent:"space-between"
    },
    btn2:{
        position:'absolute',
        top:60,
        // left:"50%",
        width:'100%',
        backgroundColor:'#61E294',
        // width:"100%",
        height:50,
        justifyContent:"center",
        alignContent:'center',
        borderRadius:8

    }
})
