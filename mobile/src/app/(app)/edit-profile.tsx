import BackgroundRadial from '@/components/gradient-backgroud'
import { useAuth } from 'contexts/auth-context'
import { Mail, UserCircle } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function EditProfile() {
  const { name, email } = useAuth()

  const { control } = useForm({
    defaultValues: {
      name: name,
      email: email,
    },
  })

  return (
    <BackgroundRadial>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center' }}
        behavior="padding"
      >
        <View style={{ padding: 20 }}>
          <Image
            source={require('@/assets/cargus-logo.png')}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
          <View>
            <Text
              style={{
                color: '#fafafa',
                fontSize: 36,
                fontWeight: 'bold',
                marginTop: 12,
              }}
            >
              Atualizar seus dados
            </Text>
          </View>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fafafa',
              paddingHorizontal: 15,
              borderRadius: 8,
              height: 45,
            }}
          >
            <UserCircle color="#09090b" size={24} />
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="default"
                  placeholder="Nome"
                  placeholderTextColor="#09090b"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    marginLeft: 12,
                    height: 45,
                    width: '100%',
                  }}
                />
              )}
            />
          </View>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fafafa',
              paddingHorizontal: 15,
              borderRadius: 8,
              height: 45,
            }}
          >
            <Mail color="#09090b" size={24} />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="email-address"
                  placeholder="Email"
                  placeholderTextColor="#09090b"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    marginLeft: 12,
                    height: 45,
                    width: '100%',
                  }}
                />
              )}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </BackgroundRadial>
  )
}
