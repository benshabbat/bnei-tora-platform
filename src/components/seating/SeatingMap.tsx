'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Seat {
  id: string
  row: number
  seat: number
  section: string
  isOccupied: boolean
  reservedBy: string | null
}

// Generate custom seat grid based on synagogue layout
function generateSynagogueSeatGrid() {
  const seats = []

  // Function to create a seat
  const createSeat = (row: number, seat: number, section: string) => ({
    id: `${section}-${row}-${seat}`,
    row,
    seat,
    section,
    isOccupied: Math.random() > 0.7,
    reservedBy: Math.random() > 0.85 ? 'יוסי כהן' : null
  })

  // צד ימין - 10 שורות של 5 כסאות
  for (let row = 1; row <= 10; row++) {
    for (let seat = 1; seat <= 5; seat++) {
      seats.push(createSeat(row, seat, 'right'))
    }
  }

  // צד שמאל - 10 שורות של 5 כסאות  
  for (let row = 1; row <= 10; row++) {
    for (let seat = 1; seat <= 5; seat++) {
      seats.push(createSeat(row, seat, 'left'))
    }
  }

  // מקדימה - 3 שורות של 8 כסאות (לפני הבימה)
  for (let row = 1; row <= 3; row++) {
    for (let seat = 1; seat <= 8; seat++) {
      seats.push(createSeat(row, seat, 'front'))
    }
  }

  // אחורה - 6 שורות של 10 כסאות (אחרי הבימה)
  for (let row = 1; row <= 6; row++) {
    for (let seat = 1; seat <= 10; seat++) {
      seats.push(createSeat(row, seat, 'back'))
    }
  }

  return seats
}

export default function SeatingMap() {
  const [seats, setSeats] = useState(() => generateSynagogueSeatGrid())
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'main' | 'women' | 'overview'>('main')

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId)
    if (seat && !seat.isOccupied && !seat.reservedBy) {
      setSelectedSeat(selectedSeat === seatId ? null : seatId)
    }
  }

  const reserveSeat = () => {
    if (selectedSeat) {
      setSeats(prev => prev.map(seat => 
        seat.id === selectedSeat 
          ? { ...seat, reservedBy: 'אתה', isOccupied: true }
          : seat
      ))
      setSelectedSeat(null)
    }
  }

  const clearReservation = (seatId: string) => {
    if (seatId === 'all') {
      setSeats(prev => prev.map(seat => ({ ...seat, reservedBy: null })))
    } else {
      setSeats(prev => prev.map(seat => 
        seat.id === seatId 
          ? { ...seat, reservedBy: null, isOccupied: false }
          : seat
      ))
    }
  }

  const getSeatColor = (seat: Seat) => {
    if (seat.reservedBy) return 'bg-yellow-400 border-yellow-600'
    if (seat.isOccupied) return 'bg-red-400 border-red-600'
    if (selectedSeat === seat.id) return 'bg-blue-500 border-blue-700'
    return 'bg-green-400 hover:bg-green-500 border-green-600'
  }

  // Get seats by section
  const rightSeats = seats.filter(s => s.section === 'right')
  const leftSeats = seats.filter(s => s.section === 'left') 
  const frontSeats = seats.filter(s => s.section === 'front')
  const backSeats = seats.filter(s => s.section === 'back')

  const renderSeatSection = (sectionSeats: Seat[], sectionName: string, columns: number) => (
    <div className="mb-6">
      <h4 className="font-semibold mb-2 text-center">{sectionName}</h4>
      <div className="grid gap-1 justify-center" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {sectionSeats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            disabled={seat.isOccupied || !!seat.reservedBy}
            className={`
              w-10 h-10 rounded border-2 transition-all duration-200 text-xs font-medium shadow-sm
              ${getSeatColor(seat)}
              ${(seat.isOccupied || seat.reservedBy) ? 'cursor-not-allowed' : 'cursor-pointer'}
              hover:scale-105 transform
            `}
            title={
              seat.reservedBy 
                ? `שמור עבור ${seat.reservedBy}`
                : seat.isOccupied 
                ? 'תפוס'
                : `מקום ${seat.section}-${seat.row}-${seat.seat}`
            }
          >
            {seat.seat}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">מפת מקומות ישיבה - בית הכנסת בני תורה</h2>
      
      {/* View Mode Selector */}
      <div className="flex justify-center gap-2 mb-6">
        <Button 
          variant={viewMode === 'main' ? 'default' : 'outline'}
          onClick={() => setViewMode('main')}
          className="text-sm"
        >
          מקומות גברים
        </Button>
        <Button 
          variant={viewMode === 'women' ? 'default' : 'outline'}
          onClick={() => setViewMode('women')}
          className="text-sm"
        >
          עזרת נשים
        </Button>
        <Button 
          variant={viewMode === 'overview' ? 'default' : 'outline'}
          onClick={() => setViewMode('overview')}
          className="text-sm"
        >
          מבט כללי
        </Button>
      </div>

      {/* Torah Ark representation */}
      <div className="w-full h-20 bg-gradient-to-b from-amber-200 to-amber-300 rounded-lg mb-8 flex items-center justify-center border-2 border-amber-400 shadow-md">
        <div className="text-center">
          <span className="text-lg font-bold text-amber-800">ארון הקודש</span>
          <div className="text-sm text-amber-700 mt-1">מזרח</div>
        </div>
      </div>

      {/* Main Prayer Hall Layout */}
      {viewMode === 'main' && (
        <>
          {/* Front Section - 3 rows before Bimah */}
          {renderSeatSection(frontSeats, 'מקומות קדמיים (3 שורות × 8)', 8)}

          {/* Bimah (Reading Platform) */}
          <div className="w-48 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg mx-auto mb-6 flex items-center justify-center border-2 border-amber-300 shadow-sm">
            <span className="text-sm font-bold text-amber-800">בימה</span>
          </div>

          {/* Main seating layout - Right and Left sections */}
          <div className="grid grid-cols-3 gap-8 mb-6">
            {/* Right Section */}
            <div>
              {renderSeatSection(rightSeats, 'צד ימין (10 שורות × 5)', 5)}
            </div>

            {/* Center Aisle */}
            <div className="flex items-center justify-center">
              <div className="w-2 h-full bg-gray-200 rounded">
                <div className="text-center text-gray-500 text-xs mt-8 transform rotate-90">מעבר</div>
              </div>
            </div>

            {/* Left Section */}
            <div>
              {renderSeatSection(leftSeats, 'צד שמאל (10 שורות × 5)', 5)}
            </div>
          </div>

          {/* Back Section - 6 rows after everything */}
          {renderSeatSection(backSeats, 'מקומות אחוריים (6 שורות × 10)', 10)}
        </>
      )}

      {/* Women's Section */}
      {viewMode === 'women' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">עזרת נשים</h3>
          <div className="p-4 border-2 border-pink-300 rounded-lg bg-pink-50">
            <p className="text-center text-pink-800">עזרת נשים ממוקמת בקומה השנייה</p>
            <p className="text-center text-pink-600 text-sm mt-2">כניסה נפרדת מצד ימין של הבניין</p>
          </div>
        </div>
      )}

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">מבט כללי על בית הכנסת</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="border-2 border-blue-300 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-center">סך המקומות</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>מקומות קדמיים:</span>
                  <span>{frontSeats.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>צד ימין:</span>
                  <span>{rightSeats.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>צד שמאל:</span>
                  <span>{leftSeats.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>מקומות אחוריים:</span>
                  <span>{backSeats.length}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>סה&quot;כ:</span>
                  <span>{seats.length}</span>
                </div>
              </div>
            </div>
            
            <div className="border-2 border-green-300 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-center">סטטיסטיקות</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>פנויים:</span>
                  <span className="text-green-600">{seats.filter(s => !s.isOccupied && !s.reservedBy).length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>תפוסים:</span>
                  <span className="text-red-600">{seats.filter(s => s.isOccupied).length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>שמורים:</span>
                  <span className="text-yellow-600">{seats.filter(s => s.reservedBy).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center flex-wrap gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 border border-green-600 rounded"></div>
          <span>פנוי</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 border border-red-600 rounded"></div>
          <span>תפוס</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 border border-yellow-600 rounded"></div>
          <span>שמור</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 border border-blue-700 rounded"></div>
          <span>נבחר</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-700">
            {seats.filter(s => !s.isOccupied && !s.reservedBy).length}
          </div>
          <div className="text-sm text-green-600">מקומות פנויים</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-red-700">
            {seats.filter(s => s.isOccupied || s.reservedBy).length}
          </div>
          <div className="text-sm text-red-600">מקומות תפוסים</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">
            {seats.length}
          </div>
          <div className="text-sm text-blue-600">סה&quot;כ מקומות</div>
        </div>
      </div>

      {/* Reservation Actions */}
      {selectedSeat && (
        <div className="text-center bg-blue-50 p-4 rounded-lg">
          <p className="mb-4 font-semibold">מקום נבחר: {selectedSeat}</p>
          <div className="flex justify-center gap-2">
            <Button onClick={reserveSeat} className="bg-blue-600 hover:bg-blue-700">
              שמור מקום
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSelectedSeat(null)}
              className="border-gray-300"
            >
              ביטול
            </Button>
          </div>
        </div>
      )}

      {/* Management Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold mb-3 text-center">פעולות ניהול</h4>
        <div className="flex justify-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setSeats(prev => prev.map(s => ({ ...s, isOccupied: false, reservedBy: null })))}
            className="text-sm"
          >
            איפוס כל המקומות
          </Button>
          <Button 
            variant="outline" 
            onClick={() => clearReservation('all')}
            className="text-sm"
          >
            ביטול כל ההזמנות
          </Button>
        </div>
      </div>
    </div>
  )
}