import Navigation from '@/components/Navigation'
import SeatingMap from '@/components/seating/SeatingMap'
import ClassSchedule from '@/components/classes/ClassSchedule'
import EventCalendar from '@/components/calendar/EventCalendar'
import { getPrayerTimes, formatHebrewDate } from '@/lib/utils'

export default function Home() {
  const today = new Date()
  const prayerTimes = getPrayerTimes(today)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">ברוכים הבאים לבית הכנסת בני תורה</h1>
          <p className="text-xl mb-6">מקום של תורה, תפילה וקהילה</p>
          <p className="text-lg">{formatHebrewDate(today)}</p>
        </div>
      </div>

      {/* Quick Prayer Times */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-sm text-gray-600">שחרית</div>
              <div className="font-bold text-blue-600">{prayerTimes.shacharit}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">מנחה</div>
              <div className="font-bold text-blue-600">{prayerTimes.mincha}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">מעריב</div>
              <div className="font-bold text-blue-600">{prayerTimes.maariv}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Seating Map */}
          <div>
            <SeatingMap rows={8} seatsPerRow={6} />
          </div>
          
          {/* Classes */}
          <div>
            <ClassSchedule />
          </div>
        </div>
        
        {/* Events Calendar */}
        <div className="mt-8">
          <EventCalendar />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">בית הכנסת בני תורה</h3>
              <p className="text-gray-300">מקום של תורה, תפילה וקהילה יהודית חמה ומקבלת</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">פרטי התקשרות</h3>
              <p className="text-gray-300">טלפון: 02-1234567</p>
              <p className="text-gray-300">כתובת: רחוב התורה 123, ירושלים</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">זמני תפילה</h3>
              <p className="text-gray-300">שחרית: {prayerTimes.shacharit}</p>
              <p className="text-gray-300">מנחה: {prayerTimes.mincha}</p>
              <p className="text-gray-300">מעריב: {prayerTimes.maariv}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 בית הכנסת בני תורה. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}