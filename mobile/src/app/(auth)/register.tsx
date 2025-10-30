import { type SignUpRequest, signUp } from '@/api/sign-up'
import BackgroundRadial from '@/components/gradient-backgroud'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Lock, Mail, UserCircle } from 'lucide-react-native'
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

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpRequest>()
  const router = useRouter()

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpRequest) {
    try {
      await signUpFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      Toast.success(
        'Cadastro realizado com sucesso! Você será redirecionado para o login.'
      )

      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch {
      Toast.error('Falha ao fazer cadastro. Verifique suas credenciais.')
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
              Cadastrar
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
            onPress={handleSubmit(handleSignUp)}
          >
            <Text
              style={{ color: '#fafafa', fontWeight: 'bold', fontSize: 16 }}
            >
              Cadastrar-se
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <ToastManager />
    </BackgroundRadial>
  )
}
