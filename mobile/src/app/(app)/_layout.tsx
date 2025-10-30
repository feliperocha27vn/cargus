import BackgroundRadial from '@/components/gradient-backgroud'
import Menu from '@/components/menu'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { useEffect } from 'react'

export default function AuthLayout() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      onlineManager.setOnline(!!state.isConnected)
    })
    return () => unsubscribe()
  }, [])

  return (
    <BackgroundRadial>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="profile" />
      </Stack>
      <Menu />
    </BackgroundRadial>
  )
}
