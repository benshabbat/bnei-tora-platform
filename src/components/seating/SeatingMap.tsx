'use client'

import React, { useState } from 'react'
import { Seat } from '@/types'
import { generateSeatGrid } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SeatingMapProps {
  rows?: number
  seatsPerRow?: number
}

export default function SeatingMap({ rows = 10, seatsPerRow = 8 }: SeatingMapProps) {
  const [seats, setSeats] = useState<Seat[]>(() => generateSeatGrid(rows, seatsPerRow))
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)

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

  const getSeatColor = (seat: Seat) => {
    if (seat.reservedBy) return 'bg-yellow-400'
    if (seat.isOccupied) return 'bg-red-400'
    if (selectedSeat === seat.id) return 'bg-blue-500'
    return 'bg-green-400 hover:bg-green-500'
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">מפת מקומות ישיבה - בית הכנסת בני תורה</h2>
      
      {/* Torah Ark representation */}
      <div className="w-full h-16 bg-gradient-to-b from-amber-200 to-amber-300 rounded-lg mb-8 flex items-center justify-center border-2 border-amber-400">
        <span className="text-lg font-bold text-amber-800">ארון הקודש</span>
      </div>

      {/* Seating Grid */}
      <div className="grid gap-2 mb-6" style={{ gridTemplateColumns: `repeat(${seatsPerRow}, 1fr)` }}>
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            disabled={seat.isOccupied || !!seat.reservedBy}
            className={`
              w-8 h-8 rounded transition-colors duration-200 text-xs font-medium
              ${getSeatColor(seat)}
              ${(seat.isOccupied || seat.reservedBy) ? 'cursor-not-allowed' : 'cursor-pointer'}
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

      {/* Legend */}
      <div className="flex justify-center gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span>פנוי</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded"></div>
          <span>תפוס</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span>שמור</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>נבחר</span>
        </div>
      </div>

      {/* Reservation Button */}
      {selectedSeat && (
        <div className="text-center">
          <p className="mb-4">מקום נבחר: {selectedSeat}</p>
          <Button onClick={reserveSeat}>
            שמור מקום
          </Button>
        </div>
      )}
    </div>
  )
}