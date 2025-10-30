import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

interface BackgroundRadialProps {
    children?: React.ReactNode;
}

export default function BackgroundRadial({ children }: BackgroundRadialProps) {
    const gradId = useId();
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#292524',
        }}>
            <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox="0 0 100 100">
                <Defs>
                    <RadialGradient
                        id={gradId}
                        cx="50%" cy="50%" r="50%"
                        fx="50%" fy="50%"
                    >
                        <Stop offset="0%" stopColor="#dc2626" stopOpacity={0.2} />
                        <Stop offset="25%" stopColor="#dc2626" stopOpacity={0.12} />
                        <Stop offset="35%" stopColor="#dc2626" stopOpacity={0.06} />
                        <Stop offset="50%" stopColor="#dc2626" stopOpacity={0} />
                    </RadialGradient>
                </Defs>
                <Rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill={`url(#${gradId})`}
                />
            </Svg>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                {children}
            </SafeAreaView>
        </View>
    );
}
