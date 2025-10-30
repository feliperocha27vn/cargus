import { queryClient } from '@/lib/react-query'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'contexts/auth-context'
import { Stack } from 'expo-router'
import { useEffect } from 'react'

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      onlineManager.setOnline(!!state.isConnected)
    })
    return () => unsubscribe()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  )
}
