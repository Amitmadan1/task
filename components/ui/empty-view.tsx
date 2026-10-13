import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  message?: string;
  onClear?: () => void;
}

export function EmptyView({ message = 'No products found matching your search.', onClear }: Props) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.iconCircle}>
        <Ionicons name="search-outline" size={40} color="#94a3b8" />
      </View>
      <Text style={[styles.title, isDark && styles.titleDark]}>No Items Found</Text>
      <Text style={[styles.message, isDark && styles.messageDark]}>{message}</Text>
      {onClear && (
        <TouchableOpacity style={styles.clearButton} activeOpacity={0.8} onPress={onClear}>
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDark: {},
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  titleDark: {
    color: '#f8fafc',
  },
  message: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 280,
  },
  messageDark: {
    color: '#94a3b8',
  },
  clearButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  clearButtonText: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 14,
  },
});
