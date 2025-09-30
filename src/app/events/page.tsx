import Navigation from '@/components/Navigation'
import EventCalendar from '@/components/calendar/EventCalendar'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventCalendar />
      </main>
    </div>
  )
}