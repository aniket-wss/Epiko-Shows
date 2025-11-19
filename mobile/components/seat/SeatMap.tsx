import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface SeatMapProps {
  layout: {
    rows: Array<{
      row: string;
      seats: number;
      category: string;
      start: number;
    }>;
    aisles: number[];
    booked: string[];
  };
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  priceMap: Record<string, number>;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  layout,
  selectedSeats,
  onSeatSelect,
  priceMap
}) => {
  const getSeatId = (row: string, seatNum: number) => `${row}${seatNum}`;

  const isSeatBooked = (seatId: string) => layout.booked.includes(seatId);
  const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);

  const getSeatColor = (seatId: string) => {
    if (isSeatBooked(seatId)) return 'bg-gray-600';
    if (isSeatSelected(seatId)) return 'bg-accent-success';
    return 'bg-background-card border border-text-secondary';
  };

  const handleSeatPress = (seatId: string, category: string) => {
    if (isSeatBooked(seatId)) return;
    onSeatSelect(seatId);
  };

  const renderRow = (rowData: any) => {
    const seats = [];
    for (let i = rowData.start; i < rowData.start + rowData.seats; i++) {
      const seatId = getSeatId(rowData.row, i);
      seats.push(
        <TouchableOpacity
          key={seatId}
          onPress={() => handleSeatPress(seatId, rowData.category)}
          disabled={isSeatBooked(seatId)}
          className={`w-7 h-7 m-0.5 rounded ${getSeatColor(seatId)} items-center justify-center`}
        >
          <Text className="text-white text-xs">{i}</Text>
        </TouchableOpacity>
      );

      // Add aisle gap
      if (layout.aisles && layout.aisles.includes(i)) {
        seats.push(<View key={`aisle-${i}`} className="w-4" />);
      }
    }

    return (
      <View key={rowData.row} className="mb-2">
        <View className="flex-row items-center">
          <View className="w-8">
            <Text className="text-white font-semibold text-center">{rowData.row}</Text>
          </View>
          <View className="flex-row flex-1 justify-center">{seats}</View>
          <View className="w-8">
            <Text className="text-white font-semibold text-center">{rowData.row}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* Screen */}
      <View className="items-center mb-6">
        <View className="w-3/4 h-1 bg-text-secondary rounded-full mb-2" />
        <Text className="text-text-secondary text-xs">SCREEN</Text>
      </View>

      {/* Seat Map */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {layout.rows.map(row => renderRow(row))}
        </View>
      </ScrollView>

      {/* Legend */}
      <View className="mt-6 flex-row justify-around">
        <View className="flex-row items-center">
          <View className="w-5 h-5 bg-background-card border border-text-secondary rounded mr-2" />
          <Text className="text-text-secondary text-xs">Available</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-5 h-5 bg-accent-success rounded mr-2" />
          <Text className="text-text-secondary text-xs">Selected</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-5 h-5 bg-gray-600 rounded mr-2" />
          <Text className="text-text-secondary text-xs">Booked</Text>
        </View>
      </View>

      {/* Price Categories */}
      <View className="mt-4 bg-background-card p-4 rounded-lg">
        <Text className="text-white font-semibold mb-2">Seat Categories</Text>
        {Object.entries(priceMap).map(([category, price]) => (
          <View key={category} className="flex-row justify-between py-1">
            <Text className="text-text-secondary capitalize">{category}</Text>
            <Text className="text-white">₹{price}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
