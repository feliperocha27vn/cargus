import { getProfile } from '@/api/get-profile'
import { type SignInRequest, signIn as signInApi } from '@/api/sign-in'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { toast } from 'sonner'

interface AuthContextType {
    signIn: (data: SignInRequest) => Promise<void>
    isAuthenticated: boolean
    email: string
    name: string
    ensureAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient()

    // React Query busca o profile; usamos isso como fonte da verdade
    const { data: userProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        // Ajustes recomendados para este tipo de query de sessão:
        staleTime: 1000 * 60 * 5, // 5 min
        retry: false,
        refetchOnWindowFocus: false,
    })

    // Mutação de login: ao ter sucesso, revalida o profile
    const { mutateAsync: signInMut } = useMutation({
        mutationFn: signInApi,
        onSuccess: async () => {
            // Revalida profile após autenticação
            await queryClient.invalidateQueries({ queryKey: ['profile'] })
            toast.success('Login realizado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao fazer login. Verifique suas credenciais.')
        },
    })

    // Função que rotas podem chamar para garantir que o profile foi verificado
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

    async function signIn(data: SignInRequest) {
        // delega para a mutação que cuidará de revalidar o profile
        await signInMut(data)
    }

    const isAuthenticated = !!userProfile
    const email = userProfile?.email ?? ''
    const name = userProfile?.name ?? ''

    return (
        <AuthContext.Provider
            value={{ signIn, isAuthenticated, email, name, ensureAuth }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro do AuthProvider')
    }
    return context
}
