import Login from '@/app/login/components/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex justify-start pr-50 items-center w-screen h-screen'> <Login/></div>
}
