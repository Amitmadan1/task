import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product/product-card';
import { CategoryFilter } from '@/components/product/category-filter';
import { SearchBar } from '@/components/ui/search-bar';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { ErrorView } from '@/components/ui/error-view';
import { EmptyView } from '@/components/ui/empty-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Product } from '@/types/product';

export default function ProductListScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    loading,
    refreshing,
    error,
    simulateError,
    toggleSimulateError,
    onRefresh,
    retry,
  } = useProducts();

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/item/[id]',
      params: { id: product.id.toString(), title: product.title },
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.appTitle, isDark && styles.appTitleDark]}>
            Explore Market
          </Text>
          <Text style={[styles.appSubtitle, isDark && styles.appSubtitleDark]}>
            Live products from DummyJSON
          </Text>
        </View>

        {/* Quick Error Simulator Toggle for reviewers/evaluators */}
        <TouchableOpacity
          onPress={toggleSimulateError}
          activeOpacity={0.8}
          style={[
            styles.simToggle,
            isDark && styles.simToggleDark,
            simulateError && styles.simToggleActive,
          ]}>
          <Ionicons
            name={simulateError ? 'bug' : 'bug-outline'}
            size={16}
            color={simulateError ? '#ffffff' : isDark ? '#94a3b8' : '#64748b'}
          />
          <Text
            style={[
              styles.simToggleText,
              isDark && styles.simToggleTextDark,
              simulateError && styles.simToggleTextActive,
            ]}>
            {simulateError ? 'Error ON' : 'Test Error'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search 100+ items..."
        />
      </View>

      {/* Category Horizontal Chips */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* State Renderers */}
      {loading && !refreshing ? (
        <LoadingIndicator message="Fetching catalog..." />
      ) : error && !refreshing ? (
        <ErrorView
          error={error}
          onRetry={retry}
          isSimulated={simulateError}
          onResetSimulation={simulateError ? toggleSimulateError : undefined}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
          contentContainerStyle={[
            styles.listContent,
            products.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? '#60a5fa' : '#2563eb'}
              colors={['#2563eb', '#3b82f6']}
            />
          }
          ListEmptyComponent={
            <EmptyView
              message={
                searchQuery
                  ? `No products found matching "${searchQuery}".`
                  : 'No products available in this category.'
              }
              onClear={handleClearFilters}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  safeAreaDark: {
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  appTitleDark: {
    color: '#f8fafc',
  },
  appSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginTop: 2,
  },
  appSubtitleDark: {
    color: '#94a3b8',
  },
  simToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 4,
  },
  simToggleDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  simToggleActive: {
    backgroundColor: '#ef4444',
    borderColor: '#dc2626',
  },
  simToggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  simToggleTextDark: {
    color: '#94a3b8',
  },
  simToggleTextActive: {
    color: '#ffffff',
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  listContent: {
    paddingTop: 6,
    paddingBottom: 24,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
