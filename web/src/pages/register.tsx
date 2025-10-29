import { type SignUpRequest, signUp } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Lock, Mail, UserCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import cargusLogo from '../assets/cargus-logo.png'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpRequest>()
  const navigate = useNavigate()

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

      toast.success('Cadastro realizado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate({ to: `/?email=${data.email}` }),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar. Tente novamente.')
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen w-full bg-stone-900 relative flex flex-col justify-center items-center overflow-hidden px-5">
        {/* Rich Burgundy Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(220, 38, 38, 0.2) 0%, 
          rgba(220, 38, 38, 0.12) 25%, 
          rgba(220, 38, 38, 0.06) 35%, 
          transparent 50%
        )
      `,
            backgroundSize: '100% 100%',
          }}
        />
        <div className="space-y-6 flex flex-col items-center text-zinc-50 relative z-10 w-full">
          <div className="w-full">
            <img
              src={cargusLogo}
              alt="Cargus Logo"
              className="size-[60px] rounded-lg mb-3"
            />
            <div className="flex flex-col gap-y-0.5">
              <span className="text-4xl font-bold">Cadastrar</span>
            </div>
          </div>
          <form
            className="space-y-4 w-full"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Nome"
                className=" bg-zinc-50 text-zinc-800 peer ps-12"
                {...register('name')}
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <UserCircle size={24} aria-hidden="true" />
              </div>
            </div>
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail"
                className=" bg-zinc-50 text-zinc-800 peer ps-12"
                {...register('email')}
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Mail size={24} aria-hidden="true" />
              </div>
            </div>
            <div className="relative">
              <Input
                placeholder="Senha"
                type="password"
                className="p-5 bg-zinc-50 text-zinc-800 peer ps-12"
                {...register('password')}
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Lock size={24} aria-hidden="true" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-lg p-6"
              disabled={isSubmitting}
            >
              Cadastrar-se
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
