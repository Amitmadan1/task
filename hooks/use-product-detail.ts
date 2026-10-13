import { useCallback, useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { ProductApi } from '@/services/api';

export function useProductDetail(id: number | string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<boolean>(false);

  const loadDetail = useCallback(
    async (isRefresh = false, forceError = simulateError) => {
      if (!id) return;

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const data = await ProductApi.getProductById(id, forceError);
        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load product details. Please try again.');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id, simulateError]
  );

  useEffect(() => {
    loadDetail(false);
  }, [loadDetail]);

  const onRefresh = useCallback(() => {
    loadDetail(true);
  }, [loadDetail]);

  const retry = useCallback(() => {
    if (simulateError) {
      setSimulateError(false);
    }
    loadDetail(false, false);
  }, [loadDetail, simulateError]);

  const toggleSimulateError = useCallback(() => {
    setSimulateError((prev) => !prev);
  }, []);

  return {
    product,
    loading,
    refreshing,
    error,
    simulateError,
    toggleSimulateError,
    onRefresh,
    retry,
  };
}
