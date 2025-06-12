import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { cancelAnimation, Easing, useAnimatedProps, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

const AnimatedRadialGradient = Animated.createAnimatedComponent(RadialGradient);

const RadialGradientBackground = ({ refreshing }: { refreshing: boolean }) => {
    const angle = useSharedValue(0);

    useEffect(() => {
        if (refreshing) {
            angle.value = withRepeat(
                withTiming(Math.PI * 2, {
                    duration: 3000,
                    easing: Easing.sin,
                }),
                -1,
                false
            );
        } else {
            cancelAnimation(angle);
            angle.value = 0;
        }
    }, [refreshing]);
    
    const radius = 0.2;
    const baseX = 0.3;
    const baseY = 0;
  
    const animatedProps1 = useAnimatedProps(() => {
        const cx = baseX
            + radius * Math.cos(angle.value)
            + 0.05 * Math.sin(3 * angle.value + 0.7);

        if (cx > 1) console.warn(cx)
        return {
            cx: `${cx}`,
            cy: `${baseY + 0.05 * Math.sin(2 * angle.value + 0.5)}`,
            r: `${0.6 + 0.05 * Math.sin(4 * angle.value)}`
        };
        });

    const animatedProps2 = useAnimatedProps(() => {
        const cx = baseX
            - radius * Math.cos(angle.value)
            + 0.07 * Math.sin(2 * angle.value + 1.5);

        if (cx > 1) console.warn(cx)
        return {
            cx: `${cx}`,
            cy: `${baseY + 0.05 * Math.sin(2 * angle.value + 0.5)}`,
            r: `${0.6 + 0.05 * Math.sin(4 * angle.value)}`
        };
    });

    const animatedProps3 = useAnimatedProps(() => {
        const cx =
        baseX +
        radius * Math.cos(angle.value + Math.PI / 3) +
        0.06 * Math.sin(2 * angle.value + 2.2);

        return {
        cx: `${cx}`,
        cy: `${baseY + 0.03 * Math.sin(3 * angle.value + 1.3)}`,
        r: `${0.5 + 0.04 * Math.sin(5 * angle.value)}`,
        };
    });

    if (!refreshing) return null;
    return (
        <View style={StyleSheet.absoluteFill}>
            <Svg
                height="100%"
                width="100%"
                style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
            >
                <Defs>
                    <AnimatedRadialGradient
                        id="radialGradient"
                        gradientUnits="objectBoundingBox"
                        r="1"
                        animatedProps={animatedProps1}
                    >
                        <Stop offset="0" stopColor="#0037FF" stopOpacity={0.7} />
                        <Stop offset="0.6" stopColor="#0037FF" stopOpacity={0} />
                    </AnimatedRadialGradient>
                    <AnimatedRadialGradient
                        id="circle2"
                        gradientUnits="objectBoundingBox"
                        r="0.8"
                        animatedProps={animatedProps2}
                    >
                        <Stop offset="0" stopColor="#00FFA6" stopOpacity={0.7} />
                        <Stop offset="1" stopColor="#00FFA6" stopOpacity={0} />
                    </AnimatedRadialGradient>
                    <AnimatedRadialGradient
                        id="circle3"
                        gradientUnits="objectBoundingBox"
                        r="0.8"
                        animatedProps={animatedProps3}
                    >
                        <Stop offset="0" stopColor="#A633FF" stopOpacity={0.6} />
                        <Stop offset="1" stopColor="#A633FF" stopOpacity={0} />
                    </AnimatedRadialGradient>
                </Defs>
                <Rect

                    width="600"
                    height="600"
                    fill="url(#radialGradient)"
                />
                <Rect
                    width="500"
                    height="500"
                    fill="url(#circle2)"
                    fillOpacity={0.6}
                />
                <Rect width="500" height="500" fill="url(#circle3)" fillOpacity={0.7} />
            </Svg>
        </View>
    );
};

export default RadialGradientBackground;