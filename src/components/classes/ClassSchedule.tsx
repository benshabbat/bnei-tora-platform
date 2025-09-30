'use client'

import React, { useState } from 'react'
import { Class } from '@/types'
import { Button } from '@/components/ui/button'
import { Clock, Users, MapPin, Calendar, BookOpen, Star } from 'lucide-react'

const mockClasses: Class[] = [
  {
    id: '1',
    title: 'גמרא - מסכת ברכות',
    instructor: 'הרב יוסף כהן',
    time: '08:00',
    duration: 60,
    day: 'ראשון',
    description: 'שיעור בגמרא מסכת ברכות, דף כ"ח. לימוד מעמיק עם פירושי הראשונים והאחרונים',
    maxParticipants: 25,
    currentParticipants: 18,
    location: 'בית המדרש הגדול'
  },
  {
    id: '2',
    title: 'הלכה יומית',
    instructor: 'הרב דוד לוי',
    time: '19:30',
    duration: 45,
    day: 'שני',
    description: 'הלכות תפילה ובירכת המזון - הלכות מעשיות לחיי היום יום',
    maxParticipants: 30,
    currentParticipants: 22,
    location: 'בית המדרש הקטן'
  }
]

const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

export default function ClassSchedule() {
  const [selectedDay, setSelectedDay] = useState<string>('הכל')
  const [registeredClasses, setRegisteredClasses] = useState<string[]>([])
  
  const handleRegister = (classId: string) => {
    if (registeredClasses.includes(classId)) {
      setRegisteredClasses(prev => prev.filter(id => id !== classId))
    } else {
      setRegisteredClasses(prev => [...prev, classId])
    }
  }

  const filteredClasses = selectedDay === 'הכל' 
    ? mockClasses 
    : mockClasses.filter(cls => cls.day === selectedDay)

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <BookOpen className="text-blue-600" />
        לוח שיעורים - בית הכנסת בני תורה
      </h2>
      
      {/* Day Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedDay === 'הכל' ? 'default' : 'outline'}
            onClick={() => setSelectedDay('הכל')}
            size="sm"
          >
            הכל
          </Button>
          {daysOfWeek.map(day => (
            <Button
              key={day}
              variant={selectedDay === day ? 'default' : 'outline'}
              onClick={() => setSelectedDay(day)}
              size="sm"
            >
              {day}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredClasses.map((cls) => {
          const isRegistered = registeredClasses.includes(cls.id)
          const isFull = cls.currentParticipants >= cls.maxParticipants
          
          return (
            <div 
              key={cls.id} 
              className={`border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${
                isRegistered ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{cls.title}</h3>
                    {isRegistered && <Star className="text-blue-500 fill-blue-500" size={16} />}
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Calendar size={14} />
                    <span className="text-sm">יום {cls.day}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-800 font-semibold">
                    <Clock size={14} />
                    <span>{cls.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{cls.duration} דקות</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-700 font-medium">מרצה: {cls.instructor}</p>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{cls.description}</p>
              
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{cls.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{cls.currentParticipants}/{cls.maxParticipants}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleRegister(cls.id)}
                disabled={isFull && !isRegistered}
                className={`w-full ${
                  isRegistered 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRegistered ? 'ביטול הרשמה' : isFull ? 'מלא' : 'הרשמה לשיעור'}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}