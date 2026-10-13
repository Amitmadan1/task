import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductDetail } from '@/hooks/use-product-detail';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { ErrorView } from '@/components/ui/error-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id, title: initialTitle } = useLocalSearchParams<{ id: string; title?: string }>();
  const isDark = useColorScheme() === 'dark';

  const {
    product,
    loading,
    refreshing,
    error,
    simulateError,
    toggleSimulateError,
    onRefresh,
    retry,
  } = useProductDetail(id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    Haptics.selectionAsync().catch(() => {});
    setIsFavorite((prev) => !prev);
  };

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    Alert.alert(
      'Added to Cart!',
      `"${product?.title}" was added to your cart.`,
      [{ text: 'Continue Shopping' }]
    );
  };

  const originalPrice =
    product && product.discountPercentage > 0
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: product?.title || initialTitle || 'Product Details',
          headerBackTitle: 'Back',
          headerTintColor: isDark ? '#f8fafc' : '#0f172a',
          headerStyle: {
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
          },
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity
                onPress={toggleSimulateError}
                style={[
                  styles.headerSimButton,
                  simulateError && styles.headerSimButtonActive,
                ]}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons
                  name={simulateError ? 'bug' : 'bug-outline'}
                  size={18}
                  color={simulateError ? '#ffffff' : isDark ? '#94a3b8' : '#64748b'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleToggleFavorite}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? '#ef4444' : isDark ? '#cbd5e1' : '#475569'}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <SafeAreaView
        edges={['bottom']}
        style={[styles.container, isDark && styles.containerDark]}>
        {loading && !refreshing ? (
          <LoadingIndicator message="Loading product details..." />
        ) : error && !refreshing ? (
          <ErrorView
            error={error}
            onRetry={retry}
            isSimulated={simulateError}
            onResetSimulation={simulateError ? toggleSimulateError : undefined}
          />
        ) : product ? (
          <View style={styles.contentWrapper}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={isDark ? '#60a5fa' : '#2563eb'}
                  colors={['#2563eb', '#3b82f6']}
                />
              }>
              {/* Product Gallery Carousel */}
              <View style={[styles.galleryContainer, isDark && styles.galleryContainerDark]}>
                <Image
                  source={{
                    uri:
                      product.images && product.images.length > 0
                        ? product.images[activeImageIndex] || product.thumbnail
                        : product.thumbnail,
                  }}
                  style={styles.heroImage}
                  contentFit="contain"
                  transition={300}
                />

                {product.images && product.images.length > 1 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.thumbnailsList}>
                    {product.images.map((imgUrl, index) => (
                      <TouchableOpacity
                        key={imgUrl + index}
                        onPress={() => {
                          Haptics.selectionAsync().catch(() => {});
                          setActiveImageIndex(index);
                        }}
                        style={[
                          styles.thumbnailWrapper,
                          isDark && styles.thumbnailWrapperDark,
                          activeImageIndex === index && styles.thumbnailActive,
                        ]}>
                        <Image
                          source={{ uri: imgUrl }}
                          style={styles.thumbImage}
                          contentFit="contain"
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              {/* Main Product Details Card */}
              <View style={[styles.card, isDark && styles.cardDark]}>
                {/* Category & Stock Pills */}
                <View style={styles.badgeRow}>
                  <View style={[styles.categoryBadge, isDark && styles.categoryBadgeDark]}>
                    <Text style={[styles.categoryText, isDark && styles.categoryTextDark]}>
                      {product.category}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.stockBadge,
                      product.stock > 10 ? styles.stockIn : styles.stockLow,
                    ]}>
                    <Ionicons
                      name={product.stock > 0 ? 'checkmark-circle' : 'close-circle'}
                      size={14}
                      color={product.stock > 10 ? '#15803d' : '#b45309'}
                    />
                    <Text
                      style={[
                        styles.stockText,
                        product.stock > 10 ? styles.stockTextIn : styles.stockTextLow,
                      ]}>
                      {product.availabilityStatus || `${product.stock} in stock`}
                    </Text>
                  </View>
                </View>

                {/* Title & Brand */}
                <Text style={[styles.title, isDark && styles.titleDark]}>{product.title}</Text>
                {product.brand ? (
                  <Text style={[styles.brand, isDark && styles.brandDark]}>
                    Brand: <Text style={styles.brandName}>{product.brand}</Text>
                  </Text>
                ) : null}

                {/* Rating & Reviews Bar */}
                <View style={styles.ratingRow}>
                  <View style={styles.starsWrapper}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={
                          star <= Math.round(product.rating)
                            ? 'star'
                            : star - 0.5 <= product.rating
                            ? 'star-half'
                            : 'star-outline'
                        }
                        size={18}
                        color="#f59e0b"
                      />
                    ))}
                  </View>
                  <Text style={[styles.ratingScore, isDark && styles.ratingScoreDark]}>
                    {product.rating.toFixed(1)} / 5.0
                  </Text>
                  {product.reviews && (
                    <Text style={styles.reviewCount}>
                      ({product.reviews.length} reviews)
                    </Text>
                  )}
                </View>

                {/* Price Section */}
                <View style={[styles.priceBox, isDark && styles.priceBoxDark]}>
                  <View>
                    <Text style={styles.priceLabel}>Current Price</Text>
                    <View style={styles.priceWrap}>
                      <Text style={[styles.priceValue, isDark && styles.priceValueDark]}>
                        ${product.price.toFixed(2)}
                      </Text>
                      {originalPrice && (
                        <Text style={styles.originalPriceValue}>${originalPrice}</Text>
                      )}
                    </View>
                  </View>

                  {product.discountPercentage > 0 && (
                    <View style={styles.discountPill}>
                      <Text style={styles.discountPillText}>
                        Save {Math.round(product.discountPercentage)}%
                      </Text>
                    </View>
                  )}
                </View>

                {/* Description */}
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
                    About this item
                  </Text>
                  <Text style={[styles.description, isDark && styles.descriptionDark]}>
                    {product.description}
                  </Text>
                </View>

                {/* Specifications & Highlights */}
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
                    Specifications
                  </Text>
                  <View style={[styles.specGrid, isDark && styles.specGridDark]}>
                    <View style={styles.specItem}>
                      <Ionicons name="barcode-outline" size={16} color="#64748b" />
                      <Text style={styles.specLabel}>SKU</Text>
                      <Text style={[styles.specValue, isDark && styles.specValueDark]}>
                        {product.sku || 'N/A'}
                      </Text>
                    </View>

                    <View style={styles.specItem}>
                      <Ionicons name="shield-checkmark-outline" size={16} color="#64748b" />
                      <Text style={styles.specLabel}>Warranty</Text>
                      <Text style={[styles.specValue, isDark && styles.specValueDark]}>
                        {product.warrantyInformation || 'Standard'}
                      </Text>
                    </View>

                    <View style={styles.specItem}>
                      <Ionicons name="airplane-outline" size={16} color="#64748b" />
                      <Text style={styles.specLabel}>Shipping</Text>
                      <Text style={[styles.specValue, isDark && styles.specValueDark]}>
                        {product.shippingInformation || 'Fast Delivery'}
                      </Text>
                    </View>

                    <View style={styles.specItem}>
                      <Ionicons name="refresh-outline" size={16} color="#64748b" />
                      <Text style={styles.specLabel}>Return Policy</Text>
                      <Text style={[styles.specValue, isDark && styles.specValueDark]}>
                        {product.returnPolicy || '30 Days'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Customer Reviews */}
                {product.reviews && product.reviews.length > 0 && (
                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
                      Customer Reviews ({product.reviews.length})
                    </Text>
                    <View style={styles.reviewsList}>
                      {product.reviews.map((rev, idx) => (
                        <View
                          key={idx}
                          style={[styles.reviewCard, isDark && styles.reviewCardDark]}>
                          <View style={styles.reviewHeader}>
                            <Text
                              style={[
                                styles.reviewerName,
                                isDark && styles.reviewerNameDark,
                              ]}>
                              {rev.reviewerName}
                            </Text>
                            <View style={styles.reviewStars}>
                              <Ionicons name="star" size={13} color="#f59e0b" />
                              <Text style={styles.reviewStarScore}>{rev.rating}</Text>
                            </View>
                          </View>
                          <Text
                            style={[
                              styles.reviewComment,
                              isDark && styles.reviewCommentDark,
                            ]}>
                            {`"${rev.comment}"`}
                          </Text>
                          <Text style={styles.reviewDate}>
                            {new Date(rev.date).toLocaleDateString()}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Bottom Action Footer */}
            <View style={[styles.footer, isDark && styles.footerDark]}>
              <View>
                <Text style={styles.footerPriceLabel}>Total Price</Text>
                <Text style={[styles.footerPrice, isDark && styles.footerPriceDark]}>
                  ${product.price.toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.cartButton}
                activeOpacity={0.8}
                onPress={handleAddToCart}>
                <Ionicons name="cart" size={20} color="#ffffff" style={styles.cartIcon} />
                <Text style={styles.cartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerSimButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  headerSimButtonActive: {
    backgroundColor: '#ef4444',
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  galleryContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  galleryContainerDark: {
    backgroundColor: '#1e293b',
    borderBottomColor: '#334155',
  },
  heroImage: {
    width: SCREEN_WIDTH - 32,
    height: 280,
  },
  thumbnailsList: {
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 12,
  },
  thumbnailWrapper: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  thumbnailWrapperDark: {
    borderColor: '#334155',
    backgroundColor: '#0f172a',
  },
  thumbnailActive: {
    borderColor: '#2563eb',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 12,
    borderRadius: 20,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeDark: {
    backgroundColor: '#1e3a8a',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'capitalize',
  },
  categoryTextDark: {
    color: '#93c5fd',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockIn: {
    backgroundColor: '#f0fdf4',
  },
  stockLow: {
    backgroundColor: '#fffbeb',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stockTextIn: {
    color: '#15803d',
  },
  stockTextLow: {
    color: '#b45309',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 28,
  },
  titleDark: {
    color: '#f8fafc',
  },
  brand: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  brandDark: {
    color: '#94a3b8',
  },
  brandName: {
    fontWeight: '600',
    color: '#2563eb',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  starsWrapper: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  ratingScoreDark: {
    color: '#f8fafc',
  },
  reviewCount: {
    fontSize: 13,
    color: '#64748b',
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  priceBoxDark: {
    backgroundColor: '#0f172a',
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 2,
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  priceValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },
  priceValueDark: {
    color: '#f8fafc',
  },
  originalPriceValue: {
    fontSize: 15,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  discountPill: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  discountPillText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  sectionTitleDark: {
    color: '#f8fafc',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  descriptionDark: {
    color: '#cbd5e1',
  },
  specGrid: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  specGridDark: {
    backgroundColor: '#0f172a',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specLabel: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#64748b',
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  specValueDark: {
    color: '#f8fafc',
  },
  reviewsList: {
    gap: 10,
  },
  reviewCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  reviewCardDark: {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  reviewerNameDark: {
    color: '#f8fafc',
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  reviewStarScore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#b45309',
  },
  reviewComment: {
    fontSize: 13,
    color: '#475569',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  reviewCommentDark: {
    color: '#cbd5e1',
  },
  reviewDate: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerDark: {
    backgroundColor: '#1e293b',
    borderTopColor: '#334155',
  },
  footerPriceLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  footerPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  footerPriceDark: {
    color: '#f8fafc',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  cartIcon: {
    marginRight: 8,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
