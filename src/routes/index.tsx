import CustomButton from '@/components/form/CustomButton'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex items-center justify-center p-20">
      
      <CustomButton size="xl"><Link to='/dashboard'> Login</Link></CustomButton>
    </div>
  )
}