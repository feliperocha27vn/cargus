/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */

import BackgroundRadial from '@/components/gradient-backgroud'
import { useAuth } from 'contexts/auth-context'
import { Link, router } from 'expo-router'
import { useEffect } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const { isAuthenticated, initialLoading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <BackgroundRadial>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../../assets/images/splash-icon.png')}
          style={{ width: 700, height: 700 }}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 40,
          alignItems: 'center',
          backgroundColor: '#B91C1C',
          height: 45,
          justifyContent: 'center',
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginBottom: 40,
          display: initialLoading ? 'flex' : 'none',
        }}
      >
        <Link href="/login">
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Ir para o login
          </Text>
        </Link>
      </TouchableOpacity>
    </BackgroundRadial>
  )
}
