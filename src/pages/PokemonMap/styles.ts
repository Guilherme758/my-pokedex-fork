import { StyleSheet } from 'react-native';
import type { Theme } from '../../global/themes';
 
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container:      { flex: 1, backgroundColor: theme.colors.background },
    map:            { flex: 1 },
    center:         { flex: 1, justifyContent: 'center',
                      alignItems: 'center', padding: 24 },
    text:           { color: theme.colors.text, marginBottom: 12,
                      textAlign: 'center' },
    actionButton:   { backgroundColor: theme.colors.primary,
                      paddingHorizontal: 18, paddingVertical: 12,
                      borderRadius: 999 },
    actionText:     { color: '#fff', fontWeight: '700' },
    panel:          { position: 'absolute', left: 16, right: 16,
                      bottom: 24, padding: 14, borderRadius: 16,
                      backgroundColor: theme.colors.surface },
    title:          { color: theme.colors.text, fontWeight: '700',
                      fontSize: 16 },
    subtitle:       { color: theme.colors.textSecondary, fontSize: 13 },
    coords:         { fontFamily: 'monospace', fontSize: 12,
                      color: theme.colors.text },
    row:            { flexDirection: 'row', gap: 10 },
    secondaryButton:{ flex: 1, backgroundColor: theme.colors.accent,
                      paddingVertical: 12, borderRadius: 12,
                      alignItems: 'center' },
    secondaryButtonText: { color: '#111', fontWeight: '700', fontSize: 13 },
  });
