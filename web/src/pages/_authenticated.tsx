// src/pages/_authenticated.tsx (exemplo)
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const ok = await context.auth.ensureAuth()
    if (!ok) {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />,
})