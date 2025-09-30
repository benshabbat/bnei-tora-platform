'use client'

import React, { useState } from 'react'
import { Event } from '@/types'
import { formatHebrewDate, getPrayerTimes } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Star, Users, Bell, BookOpen } from 'lucide-react'

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'ראש השנה',
    date: new Date(2024, 8, 16), // September 16, 2024
    time: '19:00',
    type: 'holiday',
    description: 'תפילות ראש השנה - שחרית ומוסף. כניסת החג ותפילת ערבית',
    location: 'בית הכנסת הראשי',
    hebrewDate: 'א\' תשרי'
  },
  {
    id: '2',
    title: 'יום כיפור',
    date: new Date(2024, 8, 25), // September 25, 2024
    time: 'כל היום',
    type: 'holiday',
    description: 'תפילות יום כיפור - כל נכס וכויד. התחלה מתפילת כל נכסיים',
    location: 'בית הכנסת הראשי',
    hebrewDate: 'י\' תשרי'
  },
  {
    id: '3',
    title: 'סוכות',
    date: new Date(2024, 8, 30), // September 30, 2024
    time: '18:30',
    type: 'holiday',
    description: 'חג הסוכות - ימי שמחה ושמחת הריגל. ברכת לולב ואתרוג',
    location: 'בית הכנסת וחצר הסוכה',
    hebrewDate: 'ט&quot;ו תשרי'
  },
  {
    id: '4',
    title: 'שמחת תורה',
    date: new Date(2024, 9, 8), // October 8, 2024
    time: '20:00',
    type: 'holiday',
    description: 'שמחת תורה - חגיגות סיום התורה ותחילת מחזור חדש',
    location: 'בית הכנסת הראשי',
    hebrewDate: 'כ&quot;ג תשרי'
  },
  {
    id: '5',
    title: 'שיעור מיוחד - הרב שטיינמן',
    date: new Date(2024, 9, 15), // October 15, 2024
    time: '20:00',
    type: 'special',
    description: 'שיעור מיוחד בהלכות חג הסוכות עם הרב שטיינמן שליט&quot;א',
    location: 'אולם הרצאות'
  },
  {
    id: '6',
    title: 'מעמד בר מצווה',
    date: new Date(2024, 9, 20), // October 20, 2024
    time: '09:00',
    type: 'special',
    description: 'חגיגת בר מצווה של משפחת כהן - קריאה בתורה וקידוש',
    location: 'בית הכנסת הראשי'
  },
  {
    id: '7',
    title: 'ליל שבת מברכים',
    date: new Date(2024, 9, 25), // October 25, 2024
    time: '18:00',
    type: 'regular',
    description: 'שבת מברכים מרחשון - תפילת מנחה מוקדמת וקבלת שבת',
    location: 'בית הכנסת הראשי'
  },
  {
    id: '8',
    title: 'עצרת התפילה',
    date: new Date(2024, 10, 5), // November 5, 2024
    time: '19:30',
    type: 'special',
    description: 'עצרת תפילה לרפואה ולשלום - השתתפות כל הקהילה',
    location: 'בית הכנסת הראשי'
  }
]

export default function EventCalendar() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'holiday' | 'special' | 'regular'>('all')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [reminders, setReminders] = useState<string[]>([])
  
  const today = new Date()
  const prayerTimes = getPrayerTimes(today)

  const toggleReminder = (eventId: string) => {
    if (reminders.includes(eventId)) {
      setReminders(prev => prev.filter(id => id !== eventId))
    } else {
      setReminders(prev => [...prev, eventId])
    }
  }

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'holiday': return 'bg-red-100 border-red-300 text-red-800'
      case 'special': return 'bg-blue-100 border-blue-300 text-blue-800'
      default: return 'bg-green-100 border-green-300 text-green-800'
    }
  }

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'holiday': return '🕊️'
      case 'special': return '⭐'
      default: return '📅'
    }
  }

  const filteredEvents = mockEvents.filter(event => {
    if (selectedFilter === 'all') return true
    return event.type === selectedFilter
  })

  const upcomingEvents = filteredEvents
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 8)

  const isEventSoon = (eventDate: Date) => {
    const timeDiff = eventDate.getTime() - today.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return daysDiff <= 7
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Calendar className="text-blue-600" />
        לוח שנה ואירועים - בית הכנסת בני תורה
      </h2>
      
      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {[
          { key: 'all', label: 'הכל', icon: '📅' },
          { key: 'holiday', label: 'חגים', icon: '🕊️' },
          { key: 'special', label: 'מיוחדים', icon: '⭐' },
          { key: 'regular', label: 'קבועים', icon: '📆' }
        ].map(({ key, label, icon }) => (
          <Button
            key={key}
            variant={selectedFilter === key ? 'default' : 'outline'}
            onClick={() => setSelectedFilter(key as 'all' | 'holiday' | 'special' | 'regular')}
            size="sm"
            className="flex items-center gap-1"
          >
            <span>{icon}</span>
            {label}
          </Button>
        ))}
      </div>

      {/* Prayer Times for Today */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <Clock className="text-blue-600" size={18} />
          זמני תפילה - {formatHebrewDate(today)}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          <div className="text-center p-2 bg-white rounded border">
            <div className="font-medium text-gray-700">שחרית</div>
            <div className="text-blue-600 font-bold text-lg">{prayerTimes.shacharit}</div>
          </div>
          <div className="text-center p-2 bg-white rounded border">
            <div className="font-medium text-gray-700">מנחה</div>
            <div className="text-blue-600 font-bold text-lg">{prayerTimes.mincha}</div>
          </div>
          <div className="text-center p-2 bg-white rounded border">
            <div className="font-medium text-gray-700">מעריב</div>
            <div className="text-blue-600 font-bold text-lg">{prayerTimes.maariv}</div>
          </div>
          <div className="text-center p-2 bg-white rounded border">
            <div className="font-medium text-gray-700">זריחה</div>
            <div className="text-orange-500 font-bold text-lg">{prayerTimes.sunrise}</div>
          </div>
          <div className="text-center p-2 bg-white rounded border">
            <div className="font-medium text-gray-700">שקיעה</div>
            <div className="text-orange-600 font-bold text-lg">{prayerTimes.sunset}</div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="text-yellow-500" />
            אירועים קרובים ({upcomingEvents.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {upcomingEvents.map((event) => {
              const isEventUpcoming = isEventSoon(event.date)
              const hasReminder = reminders.includes(event.id)
              
              return (
                <div 
                  key={event.id} 
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                    getEventTypeColor(event.type)
                  } ${isEventUpcoming ? 'ring-2 ring-yellow-400' : ''}`}
                  onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                      <h4 className="font-bold text-lg">{event.title}</h4>
                      {isEventUpcoming && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">קרוב!</span>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleReminder(event.id)
                      }}
                      className={`p-1 ${hasReminder ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                      <Bell size={16} className={hasReminder ? 'fill-current' : ''} />
                    </Button>
                  </div>
                  
                  <p className="text-sm mb-3 leading-relaxed">{event.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatHebrewDate(event.date)}</span>
                    </div>
                    {event.hebrewDate && (
                      <div className="flex items-center gap-1">
                        <span>🗓️</span>
                        <span>{event.hebrewDate}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {selectedEvent?.id === event.id && (
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          הוסף ליומן
                        </Button>
                        <Button variant="outline" size="sm">
                          שתף
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleReminder(event.id)
                          }}
                        >
                          {hasReminder ? 'בטל תזכורת' : 'הוסף תזכורת'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            
            {upcomingEvents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto mb-2 text-gray-300" size={48} />
                <p>אין אירועים {selectedFilter === 'all' ? '' : `מסוג "${selectedFilter}"`} בתקופה הקרובה</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Overview & Statistics */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="text-green-600" />
              סקירה חודשית
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  🍂 חודש תשרי
                </h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    ראש השנה - ט&quot;ו-ט&quot;ז בספטמבר
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    יום כיפור - כ&quot;ה בספטמבר
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    סוכות - מתחיל ל&apos; בספטמבר
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    שמחת תורה - ח&apos; באוקטובר
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  📚 שיעורים מיוחדים החודש
                </h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <BookOpen size={14} />
                    הלכות ראש השנה - הרב כהן
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen size={14} />
                    הלכות יום כיפור - הרב לוי
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen size={14} />
                    הלכות סוכות - הרב גולדברג
                  </li>
                </ul>
              </div>

              {/* Event Statistics */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3">סטטיסטיקות</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {mockEvents.filter(e => e.type === 'holiday').length}
                    </div>
                    <div className="text-red-600">חגים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockEvents.filter(e => e.type === 'special').length}
                    </div>
                    <div className="text-blue-600">אירועים מיוחדים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mockEvents.filter(e => e.type === 'regular').length}
                    </div>
                    <div className="text-green-600">אירועים קבועים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {reminders.length}
                    </div>
                    <div className="text-yellow-600">תזכורות פעילות</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}