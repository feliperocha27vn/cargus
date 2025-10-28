import type { SignInRequest } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/useAuth'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Toaster } from 'sonner'
import backgroundImage from '../assets/background-auth.png'

export const Route = createFileRoute('/')({
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({ to: '/dashboard' })
        }
    },
    component: Index,
})

function Index() {
    const { register, handleSubmit } = useForm<SignInRequest>()
    const { signIn } = useAuth()
    const navigate = useNavigate()

    async function onSubmit(data: SignInRequest) {
        await signIn(data)

        navigate({
            to: '/dashboard',
        })
    }

    return (
        <>
            <Toaster />
            <div className="w-full min-h-screen flex flex-col items-center">
                <img
                    src={backgroundImage}
                    alt="Foto de fundo abstrata"
                    className="object-cover bg-center w-full"
                />
                <div className="mt-6 space-y-6 flex flex-col items-center">
                    <h1 className="text-3xl">Bem vindo de volta</h1>
                    <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            className="p-5"
                            {...register('email')}
                        />
                        <Input
                            placeholder="Senha"
                            type="password"
                            className="p-5"
                            {...register('password')}
                        />
                        <Button type="submit" className="w-full text-lg p-6">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
