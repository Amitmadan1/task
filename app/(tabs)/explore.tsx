import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AboutScreen() {
  const isDark = useColorScheme() === 'dark';

  const openApiDocs = () => {
    Linking.openURL('https://dummyjson.com/docs/products').catch(() => {});
  };

  const openExpoDocs = () => {
    Linking.openURL('https://docs.expo.dev/').catch(() => {});
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.titleDark]}>About This App</Text>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            React Native & Expo Take-Home Project
          </Text>
        </View>

        {/* Requirements Status */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>
            Implemented Requirements
          </Text>

          <View style={styles.reqItem}>
            <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
            <View style={styles.reqTextContainer}>
              <Text style={[styles.reqHeading, isDark && styles.reqHeadingDark]}>
                1. Public API List Screen
              </Text>
              <Text style={[styles.reqDesc, isDark && styles.reqDescDark]}>
                Live catalog fetched from DummyJSON Products API. Includes keyword search, category filter pills, price discounts, and ratings.
              </Text>
            </View>
          </View>

          <View style={styles.reqItem}>
            <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
            <View style={styles.reqTextContainer}>
              <Text style={[styles.reqHeading, isDark && styles.reqHeadingDark]}>
                2. Detail Screen on Tap
              </Text>
              <Text style={[styles.reqDesc, isDark && styles.reqDescDark]}>
                Tapping any product card navigates to full detail view with hero image gallery, stock status, specs, ratings, and customer reviews.
              </Text>
            </View>
          </View>

          <View style={styles.reqItem}>
            <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
            <View style={styles.reqTextContainer}>
              <Text style={[styles.reqHeading, isDark && styles.reqHeadingDark]}>
                3. Loading, Error States & Pull-to-Refresh
              </Text>
              <Text style={[styles.reqDesc, isDark && styles.reqDescDark]}>
                {`Both screens implement pull-to-refresh (RefreshControl), activity loading states with skeleton placeholders, and error views with "Try Again" retry logic. Includes a "Test Error" button to simulate network failures on demand.`}
              </Text>
            </View>
          </View>

          <View style={styles.reqItem}>
            <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
            <View style={styles.reqTextContainer}>
              <Text style={[styles.reqHeading, isDark && styles.reqHeadingDark]}>
                4. Comprehensive README
              </Text>
              <Text style={[styles.reqDesc, isDark && styles.reqDescDark]}>
                Full instructions on how to run on iOS, Android, and Web, including architecture overview and troubleshooting tips.
              </Text>
            </View>
          </View>
        </View>

        {/* Tech Stack */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>
            Tech Stack
          </Text>
          <View style={styles.tagGrid}>
            {[
              'React Native',
              'Expo SDK 54 / 57',
              'Expo Router v4',
              'TypeScript',
              'expo-image',
              'expo-haptics',
              'DummyJSON API',
              'Safe Area Context',
            ].map((tag) => (
              <View
                key={tag}
                style={[styles.tag, isDark && styles.tagDark]}>
                <Text style={[styles.tagText, isDark && styles.tagTextDark]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>
            External Resources
          </Text>

          <TouchableOpacity
            style={[styles.linkRow, isDark && styles.linkRowDark]}
            onPress={openApiDocs}>
            <View style={styles.linkLeft}>
              <Ionicons name="cloud-outline" size={20} color="#2563eb" />
              <Text style={[styles.linkText, isDark && styles.linkTextDark]}>
                DummyJSON API Documentation
              </Text>
            </View>
            <Ionicons name="open-outline" size={16} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkRow, isDark && styles.linkRowDark]}
            onPress={openExpoDocs}>
            <View style={styles.linkLeft}>
              <Ionicons name="book-outline" size={20} color="#2563eb" />
              <Text style={[styles.linkText, isDark && styles.linkTextDark]}>
                Expo Documentation
              </Text>
            </View>
            <Ionicons name="open-outline" size={16} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  titleDark: {
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  subtitleDark: {
    color: '#94a3b8',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },
  cardTitleDark: {
    color: '#f8fafc',
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  reqTextContainer: {
    flex: 1,
  },
  reqHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  reqHeadingDark: {
    color: '#f8fafc',
  },
  reqDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 18,
  },
  reqDescDark: {
    color: '#94a3b8',
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagDark: {
    backgroundColor: '#1e3a8a',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  tagTextDark: {
    color: '#93c5fd',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  linkRowDark: {
    borderBottomColor: '#334155',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  linkTextDark: {
    color: '#f8fafc',
  },
});
