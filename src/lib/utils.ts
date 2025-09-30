import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hebrew date utilities
export function formatHebrewDate(date: Date): string {
  return new Intl.DateTimeFormat('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Prayer times utilities (placeholder - would need actual calculation library)
export function getPrayerTimes(date: Date) {
  return {
    shacharit: '06:30',
    mincha: '17:45',
    maariv: '19:30',
    sunrise: '06:15',
    sunset: '18:00'
  }
}

// Generate seat grid
export function generateSeatGrid(rows: number, seatsPerRow: number) {
  const seats = []
  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      seats.push({
        id: `${row}-${seat}`,
        row,
        seat,
        isOccupied: Math.random() > 0.7, // Random occupation for demo
        reservedBy: Math.random() > 0.8 ? 'יוסי כהן' : null
      })
    }
  }
  return seats
}