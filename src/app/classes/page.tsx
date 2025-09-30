import Navigation from '@/components/Navigation'
import ClassSchedule from '@/components/classes/ClassSchedule'

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ClassSchedule />
      </main>
    </div>
  )
}