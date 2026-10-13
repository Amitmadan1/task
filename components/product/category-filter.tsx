import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: Props) {
  const isDark = useColorScheme() === 'dark';

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const label = cat === 'all' ? 'All Products' : cat.replace(/-/g, ' ');

          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelectCategory(cat)}
              activeOpacity={0.7}
              style={[
                styles.chip,
                isDark && styles.chipDark,
                isSelected && styles.chipSelected,
                isSelected && isDark && styles.chipSelectedDark,
              ]}>
              <Text
                style={[
                  styles.chipText,
                  isDark && styles.chipTextDark,
                  isSelected && styles.chipTextSelected,
                ]}>
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chipDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  chipSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  chipSelectedDark: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
    textTransform: 'capitalize',
  },
  chipTextDark: {
    color: '#cbd5e1',
  },
  chipTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
