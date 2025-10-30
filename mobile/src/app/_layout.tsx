import { queryClient } from '@/lib/react-query'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { useEffect } from 'react'

export default function Layout() {
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            onlineManager.setOnline(!!state.isConnected)
        })
        return () => unsubscribe()
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </QueryClientProvider>
    )
}
