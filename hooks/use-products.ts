import { useCallback, useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { ProductApi } from '@/services/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<boolean>(false);

  // Load available categories once on mount
  useEffect(() => {
    let isMounted = true;
    ProductApi.getCategories()
      .then((cats) => {
        if (isMounted && cats.length > 0) {
          setCategories(['all', ...cats]);
        }
      })
      .catch(() => {
        // Non-blocking
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const loadProducts = useCallback(
    async (isRefresh = false, forceError = simulateError) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const response = await ProductApi.getProducts({
          category: selectedCategory,
          search: searchQuery,
          limit: 30,
          simulateError: forceError,
        });
        setProducts(response.products);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch products. Please try again.');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedCategory, searchQuery, simulateError]
  );

  // Re-fetch when category, search query, or simulateError changes
  useEffect(() => {
    loadProducts(false);
  }, [loadProducts]);

  const onRefresh = useCallback(() => {
    loadProducts(true);
  }, [loadProducts]);

  const retry = useCallback(() => {
    loadProducts(false, false);
    if (simulateError) {
      setSimulateError(false);
    }
  }, [loadProducts, simulateError]);

  const toggleSimulateError = useCallback(() => {
    setSimulateError((prev) => !prev);
  }, []);

  return {
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
  };
}
