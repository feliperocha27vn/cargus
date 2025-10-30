import BackgroundRadial from '@/components/gradient-backgroud'
import { useAuth } from 'contexts/auth-context'
import { Image, Text, View } from 'react-native'

export default function Dashboard() {
  const { name } = useAuth()

  return (
    <BackgroundRadial>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingLeft: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <Image
            source={{
              uri: 'https://ih1.redbubble.net/image.2498083453.3872/flat,750x,075,f-pad,750x1000,f8f8f8.webp',
            }}
            style={{ width: 70, height: 70, borderRadius: 100 }}
          />
          <View style={{ rowGap: 8 }}>
            <Text style={{ color: '#fafafa', fontWeight: 'light' }}>
              ☠️ Welcome back,
            </Text>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: '#fafafa' }}
            >
              {name}
            </Text>
          </View>
        </View>
      </View>
    </BackgroundRadial>
  )
}
