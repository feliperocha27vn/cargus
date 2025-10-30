import { getProfile } from '@/api/get-profile'
import { type SignInRequest, signIn } from '@/api/sign-in'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import {
  createContext,
  useContext,
  useEffect,
  useState, // Precisamos do useEffect e useState
} from 'react'
import { Toast } from 'toastify-react-native'

// Recomendo ter um componente de tela de carregamento (Splash Screen)
// import { LoadingScreen } from '@/components/loading-screen'

interface AuthContextType {
  signIn: (data: SignInRequest) => Promise<void>
  ensureAuth: () => Promise<boolean>
  email: string
  name: string
  isAuthenticated: boolean
  initialLoading: boolean // Expondo o estado de carregamento inicial
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado para controlar o carregamento inicial do token (essencial)
  const [initialLoading, setInitialLoading] = useState(true)

  // useQuery para o perfil. Ele lerá do cache se o useEffect popular primeiro.
  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false,
    refetchOnWindowFocus: false,
  })

  // useMutation para o login (seu código original)
  const { mutateAsync: signInMut } = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      Toast.success('Login realizado com sucesso!')
    },
    onError: () => {
      Toast.error('Erro ao fazer login. Verifique suas credenciais.')
    },
  })

  // 💡 APRIMORAMENTO CRÍTICO: Carregar o token na inicialização
  useEffect(() => {
    async function loadTokenAndProfile() {
      try {
        // 1. Tenta pegar o token do armazenamento seguro
        const storedToken = await SecureStore.getItemAsync('token')

        if (storedToken) {
          // 2. APLICA O TOKEN AO AXIOS (passo que faltava)
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`

          // 3. Força a busca do perfil para popular o cache do TanStack Query
          await queryClient.fetchQuery({
            queryKey: ['profile'],
            queryFn: getProfile,
          })
          console.log('Token persistido carregado e perfil buscado. ✅')
        }
      } catch (error) {
        // Se a busca do perfil falhar, o token é inválido ou expirou
        console.error(
          'Falha ao carregar perfil (token expirado?). Limpando.',
          error
        )
        // Limpa o token inválido
        await SecureStore.deleteItemAsync('token')
        api.defaults.headers.common['Authorization'] = ''
        // Limpa o cache do perfil que falhou
        queryClient.removeQueries({ queryKey: ['profile'] })
      } finally {
        // 4. Indica que a checagem inicial terminou
        setInitialLoading(false)
      }
    }

    loadTokenAndProfile()
  }, []) // O array vazio [] garante que isso rode APENAS UMA VEZ na montagem

  // 💡 APRIMORAMENTO PÓS-LOGIN: Invalidar o cache do perfil
  async function signInFn(data: SignInRequest) {
    // 1. Realiza o login
    const { token } = await signInMut({
      email: data.email,
      password: data.password,
    })

    // 2. Salva o token e configura o Axios
    await SecureStore.setItemAsync('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // 3. INFORMA O TANSTACK QUERY PARA BUSCAR O NOVO PERFIL
    // O useQuery('profile') irá automaticamente refazer a busca
    await queryClient.invalidateQueries({ queryKey: ['profile'] })

    console.log('Autenticado 🔒 e perfil invalidado para nova busca.')
  }

  // Função para checagem sob demanda (seu código original, está ótimo)
  async function ensureAuth(): Promise<boolean> {
    try {
      // fetchQuery força a busca se não houver cache válido
      await queryClient.fetchQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
      })
      return true
    } catch {
      return false
    }
  }

  // Estados derivados (seu código original)
  const isAuthenticated = !!userProfile
  const email = userProfile?.user?.email ?? ''
  const name = userProfile?.user?.name ?? ''

  // Fornece o contexto para o restante da aplicação
  return (
    <AuthContext.Provider
      value={{
        signIn: signInFn,
        ensureAuth,
        email,
        name,
        isAuthenticated,
        initialLoading, // Disponibiliza o estado de carregamento
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook de consumo (seu código original)
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider')
  }
  return context
}
