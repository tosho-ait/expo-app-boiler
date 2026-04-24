import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const supported = Platform.OS === 'ios' || Platform.OS === 'android';

export function hapticLight() {
    if (!supported) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

export function hapticMedium() {
    if (!supported) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
}

export function hapticSuccess() {
    if (!supported) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

export function hapticWarning() {
    if (!supported) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
}

export function fireHaptic(kind) {
    if (kind === 'light') hapticLight();
    else if (kind === 'medium') hapticMedium();
    else if (kind === 'success') hapticSuccess();
    else if (kind === 'warning') hapticWarning();
}
