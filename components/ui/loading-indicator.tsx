import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  message?: string;
}

export function LoadingIndicator({ message = 'Loading products...' }: Props) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <ActivityIndicator size="large" color={isDark ? '#60a5fa' : '#2563eb'} />
        <Text style={[styles.text, isDark && styles.textDark]}>{message}</Text>
      </View>

      {/* Placeholder Skeleton Cards */}
      <View style={styles.skeletonContainer}>
        {[1, 2, 3].map((key) => (
          <View
            key={key}
            style={[styles.skeletonCard, isDark && styles.skeletonCardDark]}>
            <View style={[styles.skeletonThumb, isDark && styles.skeletonThumbDark]} />
            <View style={styles.skeletonContent}>
              <View style={[styles.skeletonLineShort, isDark && styles.skeletonLineDark]} />
              <View style={[styles.skeletonLineLong, isDark && styles.skeletonLineDark]} />
              <View style={[styles.skeletonLineTiny, isDark && styles.skeletonLineDark]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  card: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  cardDark: {},
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#64748b',
  },
  textDark: {
    color: '#94a3b8',
  },
  skeletonContainer: {
    gap: 12,
    marginTop: 8,
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  skeletonCardDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  skeletonThumb: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
  },
  skeletonThumbDark: {
    backgroundColor: '#334155',
  },
  skeletonContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  skeletonLineShort: {
    height: 14,
    width: '45%',
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
  },
  skeletonLineLong: {
    height: 16,
    width: '85%',
    borderRadius: 6,
    backgroundColor: '#cbd5e1',
  },
  skeletonLineTiny: {
    height: 12,
    width: '30%',
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
  },
  skeletonLineDark: {
    backgroundColor: '#334155',
  },
});
