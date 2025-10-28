import type { SignInRequest } from '@/api/sign-in'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface AuthContextType {
    signIn: (data: SignInRequest) => Promise<void>
    isAuthenticated: boolean
    email: string
    name: string
    // Função que garante que o backend confirmou a sessão. Usada em beforeLoad.
    ensureAuth: () => Promise<boolean>
}

interface MyRouterContext {
    auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => <Outlet />,
})
