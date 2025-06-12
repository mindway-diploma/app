import GamingSessionIcon from '@/assets/svg/GamingSessionIcon'
import PartnerDrillsIcon from '@/assets/svg/PartnerDrillsIcon'
import React, { useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { ThemedText } from '../ThemedText'
import * as Haptics from 'expo-haptics';

const SWITCH_WIDTH = 180
const SWITCH_HEIGHT = 60
const BUTTON_WIDTH = SWITCH_WIDTH / 2

const GameTypeSwitch = () => {
  const [selected, setSelected] = useState<'partner_drills' | 'gaming_session'>('partner_drills')
  const anim = useRef(new Animated.Value(0)).current

  const triggerHapticFeedback = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  const handleSwitch = (type: 'partner_drills' | 'gaming_session') => {
    setSelected(type)
    Animated.timing(anim, {
      toValue: type === 'partner_drills' ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start()
  }

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BUTTON_WIDTH],
  })

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.switch}
        onPressIn={e => {
            triggerHapticFeedback();
            handleSwitch(
                selected === 'partner_drills' ? 'gaming_session' : 'partner_drills',
            )
        }}
      >
        <Animated.View
          style={[
            styles.animatedBg,
            {
              transform: [{ translateX }],
              backgroundColor: selected === 'partner_drills' ? '#5C9E57' : '#9E5757',
            },
          ]}
        />
        <View style={styles.button}>
          <PartnerDrillsIcon color={selected === 'partner_drills' ? '#fff' : '#888'} />
        </View>
        <View style={styles.button}>
          <GamingSessionIcon color={selected === 'gaming_session' ? '#fff' : '#888'} />
        </View>
      </Pressable>

      <ThemedText style={{
        marginTop: 8,
        color: selected === 'partner_drills' ? '#75DA6D' : '#FF4949',
      }}>
        {
            selected === 'partner_drills'
                ? 'Partner Drills'
                : 'Gaming Session'
        }
      </ThemedText>
    </View>
  )
}

export default GameTypeSwitch

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: "#171C2B",
    borderRadius: SWITCH_HEIGHT / 2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  animatedBg: {
    position: 'absolute',
    width: BUTTON_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    zIndex: 0,
  },
  button: {
    width: BUTTON_WIDTH,
    height: SWITCH_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
})