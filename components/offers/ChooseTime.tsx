import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'
import { withDecay } from 'react-native-reanimated'
import { FontFamily } from '@/constants/Typography'
import { Radius } from '@/constants/Radius'

const Divider = () => {
    return (
        <View style={{ width: 2, height: 120, backgroundColor: "rgba(255, 255, 255, 0.08)" }} />
    )
}
const ChooseTime = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.button, {width: "50%"}]}>
            <Text style={styles.buttonText}>12</Text>
        </TouchableOpacity>
        <Divider/>
        <TouchableOpacity style={[styles.button, {width: "50%"}]}>
            <Text style={[styles.buttonText, {color: "rgba(255, 255, 255, 0.67)"}]}>00</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ChooseTime

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors["light"].background.secondary,
        paddingVertical: Spacing.xl,
        borderRadius: Radius.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors["light"].text.primary,
        fontSize: 60,
        fontFamily: FontFamily.gantari.regular,
    }
})