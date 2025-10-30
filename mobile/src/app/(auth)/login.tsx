import type { SignInRequest } from '@/api/sign-in'
import BackgroundRadial from '@/components/gradient-backgroud'
import { useAuth } from 'contexts/auth-context'
import { Link, useRouter } from 'expo-router'
import { Lock, Mail } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import ToastManager, { Toast } from 'toastify-react-native'

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInRequest>()
  const router = useRouter()
  const { signIn } = useAuth()

  async function handleSignIn(data: SignInRequest) {
    try {
      await signIn(data)

      router.push('/dashboard')
    } catch {
      Toast.error('Falha ao fazer login. Verifique suas credenciais.')
    }
  }

  return (
    <BackgroundRadial>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center' }}
        behavior="padding"
      >
        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
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
              Login
            </Text>
            <Text style={{ color: '#fafafa', fontSize: 16, marginTop: 2 }}>
              Por favor faça login na sua conta
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
            <Lock color="#09090b" size={24} />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Senha"
                  placeholderTextColor="#09090b"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    marginLeft: 12,
                    height: 45,
                    width: '100%',
                  }}
                  secureTextEntry={true}
                />
              )}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 40,
              alignItems: 'center',
              backgroundColor: '#B91C1C',
              opacity: isSubmitting ? 0.5 : 1,
              height: 45,
              justifyContent: 'center',
              borderRadius: 8,
            }}
            disabled={isSubmitting}
            onPress={handleSubmit(handleSignIn)}
          >
            <Text
              style={{ color: '#fafafa', fontWeight: 'bold', fontSize: 16 }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 30, color: '#fafafa' }}>
            Não tem uma conta?{' '}
            <Link href={'/register'}>
              <Text style={{ fontWeight: 'bold' }}>Cadastre-se</Text>
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
      <ToastManager />
    </BackgroundRadial>
  )
}
