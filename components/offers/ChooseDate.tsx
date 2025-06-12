import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'
import { withDecay } from 'react-native-reanimated'
import { FontFamily } from '@/constants/Typography'
import { Radius } from '@/constants/Radius'

const Divider = () => {
    return (
        <View style={{ width: 2, height: "100%", backgroundColor: "rgba(255, 255, 255, 0.08)" }} />
    )
}
const ChooseDate = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.button, {width: "25%"}]}>
            <Text style={styles.buttonText}>02</Text>
        </TouchableOpacity>
        <Divider/>
        <TouchableOpacity style={[styles.button, {width: "47%"}]}>
            <Text style={styles.buttonText}>August</Text>
        </TouchableOpacity>
        <Divider/>
        <TouchableOpacity style={[styles.button, {width: "25%"}]}>
            <Text style={styles.buttonText}>2025</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ChooseDate

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors["light"].background.secondary,
        padding: Spacing.sm,
        borderRadius: Radius.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors["light"].text.primary,
        fontSize: 18,
        fontFamily: FontFamily.gantari.regular,
    }
})