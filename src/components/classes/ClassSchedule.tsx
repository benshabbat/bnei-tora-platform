'use client'

import React from 'react'
import { Class } from '@/types'
import { Button } from '@/components/ui/button'

const mockClasses: Class[] = [
  {
    id: '1',
    title: 'גמרא - מסכת ברכות',
    instructor: 'הרב יוסף כהן',
    time: '08:00',
    duration: 60,
    day: 'ראשון',
    description: 'שיעור בגמרא מסכת ברכות, דף כ"ח',
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
    description: 'הלכות תפילה ובירכת המזון',
    maxParticipants: 30,
    currentParticipants: 22,
    location: 'בית המדרש הקטן'
  },
  {
    id: '3',
    title: 'פרשת השבוע',
    instructor: 'הרב משה גולדברג',
    time: '20:15',
    duration: 45,
    day: 'רביעי',
    description: 'עיונים בפרשת השבוע עם פירוש רש"י ורמב"ן',
    maxParticipants: 40,
    currentParticipants: 35,
    location: 'אולם הרצאות'
  },
  {
    id: '4',
    title: 'מוסר ומחשבה',
    instructor: 'הרב אברהם שמידט',
    time: '21:00',
    duration: 30,
    day: 'חמישי',
    description: 'שיעורי מוסר ומחשבה מתוך ספרי המוסר הקלסיים',
    maxParticipants: 20,
    currentParticipants: 15,
    location: 'בית המדרש הגדול'
  }
]

export default function ClassSchedule() {
  const handleRegister = (classId: string) => {
    alert(`נרשמת לשיעור ${classId}`)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">לוח שיעורים - בית הכנסת בני תורה</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {mockClasses.map((cls) => (
          <div key={cls.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">{cls.title}</h3>
                <p className="text-gray-600">מרצה: {cls.instructor}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">יום {cls.day}</p>
                <p className="font-medium">{cls.time}</p>
                <p className="text-sm text-gray-500">{cls.duration} דקות</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">{cls.description}</p>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">מקום: {cls.location}</span>
              <span className="text-sm text-gray-600">
                משתתפים: {cls.currentParticipants}/{cls.maxParticipants}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 ml-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(cls.currentParticipants / cls.maxParticipants) * 100}%` }}
                ></div>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleRegister(cls.id)}
                disabled={cls.currentParticipants >= cls.maxParticipants}
              >
                {cls.currentParticipants >= cls.maxParticipants ? 'מלא' : 'הרשמה'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">הודעות חשובות</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• השבוע - שיעור נוסף בהלכה ביום שישי בשעה 10:00</li>
          <li>• זכרו להירשם מראש לשיעורים עם מקומות מוגבלים</li>
          <li>• ספרים זמינים להשאלה בספרייה</li>
        </ul>
      </div>
    </div>
  )
}