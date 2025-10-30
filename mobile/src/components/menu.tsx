import { Link, type LinkProps } from 'expo-router'
import { User } from 'lucide-react-native'
import { Text, View } from 'react-native'

export default function Menu() {
  const itemsAndIcons = [
    {
      name: 'Profile',
      icon: <User color={'#fafafa'} size={30} />,
      link: '/(app)/profile' as LinkProps['href'],
    },
  ]

  return (
    <View
      style={{
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#27272a',
        borderRadius: 40,
        marginHorizontal: 10,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        {itemsAndIcons.map(item => (
          <Link href={item.link} key={item.name}>
            <View
              style={{
                rowGap: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                key={item.name}
                style={{ rowGap: 10, alignItems: 'center' }}
              >
                {item.icon}
                <Text
                  style={{
                    color: '#fafafa',
                    fontWeight: 'light',
                    width: 60,
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          </Link>
        ))}
      </View>
    </View>
  )
}
