import BackgroundRadial from '@/components/gradient-backgroud'
import { useAuth } from 'contexts/auth-context'
import { Link } from 'expo-router'
import { ArrowRightCircle } from 'lucide-react-native'
import { Image, Text, View } from 'react-native'

export default function Profile() {
  const { email, name } = useAuth()

  return (
    <BackgroundRadial>
      <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start' }}>
        <View
          style={{ backgroundColor: '#27272A', padding: 20, borderRadius: 30 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <Image
              source={{
                uri: 'https://ih1.redbubble.net/image.2498083453.3872/flat,750x,075,f-pad,750x1000,f8f8f8.webp',
              }}
              style={{ width: 100, height: 100, borderRadius: 20 }}
            />
            <View style={{ rowGap: 6 }}>
              <Text
                style={{
                  color: '#fafafa',
                  fontSize: 18,
                  fontWeight: 'semibold',
                }}
              >
                {name}
              </Text>
              <Text style={{ color: '#fafafa', fontSize: 14 }}>{email}</Text>
            </View>
          </View>
          <Link href="/edit-profile" style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text
                style={{
                  color: '#fafafa',
                  fontSize: 18,
                  fontWeight: 'semibold',
                }}
              >
                Editar dados
              </Text>
              <ArrowRightCircle size={24} color="#fafafa" />
            </View>
          </Link>
        </View>
      </View>
    </BackgroundRadial>
  )
}
