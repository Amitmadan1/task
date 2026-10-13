import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { Product } from '@/types/product';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  product: Product;
  onPress: (product: Product) => void;
}

export function ProductCard({ product, onPress }: Props) {
  const isDark = useColorScheme() === 'dark';

  const handlePress = () => {
    // Provide tactile feedback on item tap
    Haptics.selectionAsync().catch(() => {});
    onPress(product);
  };

  const originalPrice = product.discountPercentage > 0
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles.card, isDark && styles.cardDark]}>
      {/* Product Image */}
      <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}%</Text>
          </View>
        )}
      </View>

      {/* Product Details */}
      <View style={styles.infoContainer}>
        {/* Category & Rating */}
        <View style={styles.headerRow}>
          <View style={[styles.categoryBadge, isDark && styles.categoryBadgeDark]}>
            <Text style={[styles.categoryText, isDark && styles.categoryTextDark]}>
              {product.category}
            </Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color="#f59e0b" />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Title */}
        <Text
          numberOfLines={2}
          style={[styles.title, isDark && styles.titleDark]}>
          {product.title}
        </Text>

        {/* Brand */}
        {product.brand ? (
          <Text numberOfLines={1} style={[styles.brand, isDark && styles.brandDark]}>
            by {product.brand}
          </Text>
        ) : null}

        {/* Price & Action Row */}
        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, isDark && styles.priceDark]}>
              ${product.price.toFixed(2)}
            </Text>
            {originalPrice && (
              <Text style={styles.originalPrice}>${originalPrice}</Text>
            )}
          </View>

          <View style={[styles.arrowCircle, isDark && styles.arrowCircleDark]}>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={isDark ? '#cbd5e1' : '#64748b'}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    shadowOpacity: 0.2,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainerDark: {
    backgroundColor: '#0f172a',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryBadgeDark: {
    backgroundColor: '#1e3a8a',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563eb',
    textTransform: 'capitalize',
  },
  categoryTextDark: {
    color: '#93c5fd',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#b45309',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: 20,
  },
  titleDark: {
    color: '#f8fafc',
  },
  brand: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  brandDark: {
    color: '#94a3b8',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  priceDark: {
    color: '#f8fafc',
  },
  originalPrice: {
    fontSize: 12,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleDark: {
    backgroundColor: '#334155',
  },
});
