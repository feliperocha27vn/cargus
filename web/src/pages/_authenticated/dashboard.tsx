import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Helmet title='Dashboard' />
      <div>Hello "/_authenticated/dashboard"!</div>
    </>
  )
}
