import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  error: string;
  onRetry: () => void;
  onResetSimulation?: () => void;
  isSimulated?: boolean;
}

export function ErrorView({ error, onRetry, onResetSimulation, isSimulated }: Props) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <View style={styles.iconCircle}>
          <Ionicons name="alert-circle" size={48} color="#ef4444" />
        </View>

        <Text style={[styles.title, isDark && styles.titleDark]}>Connection Error</Text>

        <Text style={[styles.message, isDark && styles.messageDark]}>{error}</Text>

        {isSimulated && (
          <View style={styles.badgeSimulated}>
            <Text style={styles.badgeText}>Simulated Error Mode is Active</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.retryButton}
          activeOpacity={0.8}
          onPress={onRetry}>
          <Ionicons name="refresh" size={18} color="#ffffff" style={styles.retryIcon} />
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>

        {isSimulated && onResetSimulation && (
          <TouchableOpacity
            style={styles.resetButton}
            activeOpacity={0.8}
            onPress={onResetSimulation}>
            <Text style={[styles.resetButtonText, isDark && styles.resetButtonTextDark]}>
              Turn Off Simulation & Reload
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: '#7f1d1d',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleDark: {
    color: '#f8fafc',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageDark: {
    color: '#94a3b8',
  },
  badgeSimulated: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#b45309',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
  },
  retryIcon: {
    marginRight: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  resetButtonText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '500',
  },
  resetButtonTextDark: {
    color: '#94a3b8',
  },
});
