'use client'

import React from 'react'
import { Event } from '@/types'
import { formatHebrewDate, getPrayerTimes } from '@/lib/utils'

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'ראש השנה',
    date: new Date(2024, 8, 16), // September 16, 2024
    time: '19:00',
    type: 'holiday',
    description: 'תפילות ראש השנה - שחרית ומוסף',
    location: 'בית הכנסת הראשי',
    hebrewDate: 'א\' תשרי'
  },
  {
    id: '2',
    title: 'יום כיפור',
    date: new Date(2024, 8, 25), // September 25, 2024
    time: 'כל היום',
    type: 'holiday',
    description: 'תפילות יום כיפור - כל נכס וכוליר',
    location: 'בית הכנסת הראשי',
    hebrewDate: 'י\' תשרי'
  },
  {
    id: '3',
    title: 'שיעור מיוחד - הרב שטיינמן',
    date: new Date(2024, 9, 15), // October 15, 2024
    time: '20:00',
    type: 'special',
    description: 'שיעור מיוחד בהלכה עם הרב שטיינמן מי"ם',
    location: 'אולם הרצאות'
  },
  {
    id: '4',
    title: 'מעמד בר מצווה',
    date: new Date(2024, 9, 20), // October 20, 2024
    time: '09:00',
    type: 'special',
    description: 'חגיגת בר מצווה של משפחת כהן',
    location: 'בית הכנסת הראשי'
  }
]

export default function EventCalendar() {
  const today = new Date()
  const prayerTimes = getPrayerTimes(today)

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'holiday': return 'bg-red-100 border-red-300 text-red-800'
      case 'special': return 'bg-blue-100 border-blue-300 text-blue-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const upcomingEvents = mockEvents
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">לוח שנה ואירועים - בית הכנסת בני תורה</h2>
      
      {/* Prayer Times for Today */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">זמני תפילה - {formatHebrewDate(today)}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          <div className="text-center">
            <div className="font-medium text-gray-700">שחרית</div>
            <div className="text-blue-600 font-bold">{prayerTimes.shacharit}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-700">מנחה</div>
            <div className="text-blue-600 font-bold">{prayerTimes.mincha}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-700">מעריב</div>
            <div className="text-blue-600 font-bold">{prayerTimes.maariv}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-700">זריחה</div>
            <div className="text-orange-500 font-bold">{prayerTimes.sunrise}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-700">שקיעה</div>
            <div className="text-orange-600 font-bold">{prayerTimes.sunset}</div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">אירועים קרובים</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <span className="text-xs bg-white px-2 py-1 rounded">
                    {event.type === 'holiday' ? 'חג' : 'מיוחד'}
                  </span>
                </div>
                <p className="text-sm mb-1">{event.description}</p>
                <div className="text-xs space-y-1">
                  <div>📅 {formatHebrewDate(event.date)}</div>
                  {event.hebrewDate && <div>🗓️ {event.hebrewDate}</div>}
                  <div>🕐 {event.time}</div>
                  {event.location && <div>📍 {event.location}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">סקירה חודשית</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">חודש תשרי</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• ראש השנה - ט&quot;ו-ט&quot;ז בספטמבר</li>
                <li>• יום כיפור - כ&quot;ה בספטמבר</li>
                <li>• סוכות - מתחיל ל&apos; בספטמבר</li>
                <li>• שמחת תורה - ח&apos; באוקטובר</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">שיעורים מיוחדים החודש</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• הלכות ראש השנה - הרב כהן</li>
                <li>• הלכות יום כיפור - הרב לוי</li>
                <li>• הלכות סוכות - הרב גולדברג</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}