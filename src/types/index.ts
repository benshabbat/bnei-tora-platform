// Seat types
export interface Seat {
  id: string
  row: number
  seat: number
  isOccupied: boolean
  reservedBy: string | null
  isSelected?: boolean
}

// Class types
export interface Class {
  id: string
  title: string
  instructor: string
  time: string
  duration: number // in minutes
  day: string
  description: string
  maxParticipants: number
  currentParticipants: number
  location: string
}

// Event types
export interface Event {
  id: string
  title: string
  date: Date
  time: string
  type: 'holiday' | 'special' | 'regular'
  description: string
  location?: string
  hebrewDate?: string
}

// Prayer times
export interface PrayerTimes {
  shacharit: string
  mincha: string
  maariv: string
  sunrise: string
  sunset: string
}