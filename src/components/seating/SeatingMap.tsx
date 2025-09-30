'use client'

import React, { useState } from 'react'
import { Seat } from '@/types'
import { generateSeatGrid } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SeatingMapProps {
  rows?: number
  seatsPerRow?: number
}

export default function SeatingMap({ rows = 12, seatsPerRow = 10 }: SeatingMapProps) {
  const [seats, setSeats] = useState<Seat[]>(() => generateSeatGrid(rows, seatsPerRow))
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

      {/* Bimah (Reading Platform) */}
      <div className="w-32 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg mx-auto mb-6 flex items-center justify-center border-2 border-amber-300 shadow-sm">
        <span className="text-sm font-bold text-amber-800">בימה</span>
      </div>

      {/* Main Prayer Hall Layout */}
      {viewMode === 'main' && (
        <>
          {/* Seating Grid */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-center">מקומות ישיבה ראשיים</h3>
            <div className="grid gap-1 justify-center" style={{ gridTemplateColumns: `repeat(${seatsPerRow}, 1fr)` }}>
              {seats.slice(0, Math.floor(seats.length * 0.7)).map((seat) => (
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
                      : `מקום ${seat.row}-${seat.seat}`
                  }
                >
                  {seat.seat}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* VIP/Honorary Seats */}
            <div className="text-center">
              <h4 className="font-semibold mb-2">מקומות כבוד</h4>
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-10 bg-purple-400 border-2 border-purple-600 rounded text-xs font-bold flex items-center justify-center">
                    כ{i}
                  </div>
                ))}
              </div>
            </div>

            {/* Kohen/Levi Seats */}
            <div className="text-center">
              <h4 className="font-semibold mb-2">מקומות כהנים ולויים</h4>
              <div className="flex justify-center gap-2">
                {['כהן', 'לוי'].map(type => (
                  <div key={type} className="w-12 h-10 bg-blue-300 border-2 border-blue-500 rounded text-xs font-bold flex items-center justify-center">
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Women's Section */}
      {viewMode === 'women' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">עזרת נשים</h3>
          <div className="grid gap-1 justify-center" style={{ gridTemplateColumns: `repeat(${Math.floor(seatsPerRow * 0.8)}, 1fr)` }}>
            {seats.slice(Math.floor(seats.length * 0.7)).map((seat) => (
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
                    : `מקום ${seat.row}-${seat.seat}`
                }
              >
                {seat.seat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">מבט כללי על בית הכנסת</h3>
          <div className="grid grid-cols-2 gap-8">
            {/* Main Hall */}
            <div className="border-2 border-blue-300 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-center">אולם ראשי</h4>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.floor(seatsPerRow/2)}, 1fr)` }}>
                {seats.slice(0, 20).map((seat) => (
                  <div key={seat.id} className={`w-4 h-4 rounded ${getSeatColor(seat)} border`}></div>
                ))}
              </div>
            </div>
            
            {/* Women's Section */}
            <div className="border-2 border-pink-300 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-center">עזרת נשים</h4>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.floor(seatsPerRow/2)}, 1fr)` }}>
                {seats.slice(20, 35).map((seat) => (
                  <div key={seat.id} className={`w-4 h-4 rounded ${getSeatColor(seat)} border`}></div>
                ))}
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
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-400 border border-purple-600 rounded"></div>
          <span>מקום כבוד</span>
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

      {/* Management Actions (Admin only - could be conditional) */}
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