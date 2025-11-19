import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';

interface MovieCardProps {
  id: string;
  title: string;
  poster_url: string;
  genres: string[];
  certificate: string;
  language: string;
  rating?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster_url,
  genres,
  certificate,
  language,
  rating
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movie/${id}`)}
      className="mr-4 mb-4"
      activeOpacity={0.8}
    >
      <View className="w-40">
        <Image
          source={{ uri: poster_url }}
          className="w-full h-56 rounded-lg bg-background-card"
          resizeMode="cover"
        />
        <View className="mt-2">
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
            {title}
          </Text>
          <View className="flex-row items-center mt-1">
            <View className="bg-background-card px-2 py-0.5 rounded">
              <Text className="text-text-secondary text-xs">{certificate}</Text>
            </View>
            <Text className="text-text-secondary text-xs ml-2">{language}</Text>
          </View>
          <Text className="text-text-secondary text-xs mt-1" numberOfLines={1}>
            {genres.join(', ')}
          </Text>
          {rating && rating > 0 && (
            <View className="flex-row items-center mt-1">
              <Text className="text-accent-gold text-xs">★</Text>
              <Text className="text-text-secondary text-xs ml-1">
                {rating.toFixed(1)}/10
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
