import { Product, ProductsResponse } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

export interface FetchProductsParams {
  category?: string;
  search?: string;
  limit?: number;
  skip?: number;
  simulateError?: boolean;
}

/**
 * Service to interact with the DummyJSON Products Public API.
 * Free, fast, reliable, zero authentication required.
 */
export const ProductApi = {
  /**
   * Fetches products with optional category, search filter, and error simulation.
   */
  async getProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
    const { category, search, limit = 30, skip = 0, simulateError = false } = params;

    if (simulateError) {
      // Artificial delay to simulate real network request
      await new Promise((resolve) => setTimeout(resolve, 600));
      throw new Error('Simulated network error: Failed to connect to server. Please retry.');
    }

    let url = `${BASE_URL}/products`;

    if (search && search.trim().length > 0) {
      url = `${BASE_URL}/products/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`;
    } else if (category && category !== 'all') {
      url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    } else {
      url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }
      const data: ProductsResponse = await response.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('An unexpected error occurred while fetching products.');
    }
  },

  /**
   * Fetches full detail for a single product by ID.
   */
  async getProductById(id: number | string, simulateError: boolean = false): Promise<Product> {
    if (simulateError) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      throw new Error('Simulated network error: Could not fetch product details.');
    }

    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to load product (HTTP ${response.status})`);
      }
      const data: Product = await response.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('An unexpected error occurred while fetching product details.');
    }
  },

  /**
   * Fetches the list of product categories for filtering.
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/category-list`);
      if (!response.ok) {
        return [];
      }
      const categories: string[] = await response.json();
      return categories;
    } catch {
      // Return empty array on failure without throwing
      return [];
    }
  },
};
