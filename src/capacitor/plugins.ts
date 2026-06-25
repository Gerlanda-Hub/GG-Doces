// ============================================
// Plugins nativos do Capacitor
// Todos os plugins são carregados apenas quando disponíveis (só no APK)
// No navegador web, as funções retornam valores simulados / fallback
// ============================================

import { Capacitor } from '@capacitor/core';

// Detecta se está a correr no APK nativo
export const isNative = () => Capacitor.isNativePlatform();

// ===== CÂMARA =====
let cameraPlugin: any = null;
async function getCameraPlugin() {
  if (!cameraPlugin && Capacitor.isNativePlatform()) {
    const { Camera } = await import('@capacitor/camera');
    cameraPlugin = Camera;
  }
  return cameraPlugin;
}

export async function takePhoto(): Promise<string | null> {
  const Camera = await getCameraPlugin();
  if (!Camera) {
    console.warn('Câmara não disponível (navegador). Use o input de ficheiro normal.');
    return null;
  }
  try {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: 'dataUrl',
    });
    return image.dataUrl || null;
  } catch (err) {
    console.warn('Erro ao tirar foto:', err);
    return null;
  }
}

// ===== SHARE NATIVO =====
export async function shareProduct(title: string, text: string, url?: string) {
  if (!Capacitor.isNativePlatform()) {
    // Web fallback: copia para a área de transferência
    try {
      await navigator.clipboard.writeText(`${title}: ${text} ${url || ''}`);
      alert(`Link copiado! Partilha manualmente no WhatsApp ou redes sociais:\n\n${title}: ${text}`);
    } catch {
      alert(`Partilha manual:\n\n${title}: ${text} ${url || ''}`);
    }
    return;
  }
  try {
    const { Share } = await import('@capacitor/share');
    await Share.share({ title, text, url: url || window.location.href });
  } catch (err) {
    console.warn('Erro ao partilhar:', err);
  }
}

// ===== GPS / LOCALIZAÇÃO =====
let geolocationPlugin: any = null;
async function getGeolocationPlugin() {
  if (!geolocationPlugin && Capacitor.isNativePlatform()) {
    const { Geolocation } = await import('@capacitor/geolocation');
    geolocationPlugin = Geolocation;
  }
  return geolocationPlugin;
}

export async function getCurrentAddress(): Promise<string | null> {
  const Geolocation = await getGeolocationPlugin();
  if (!Geolocation) {
    console.warn('GPS não disponível (navegador).');
    return null;
  }
  try {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });
    const { latitude, longitude } = position.coords;
    // Reverse geocoding via OpenStreetMap (gratuito, sem API key)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );
    if (!res.ok) return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    const data = await res.json();
    const addr = data.address;
    const parts = [
      addr.road || '',
      addr.city || addr.town || addr.village || '',
      addr.state || '',
      addr.country || '',
    ].filter(Boolean);
    return parts.join(', ') || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  } catch (err) {
    console.warn('Erro ao obter localização:', err);
    return null;
  }
}

// ===== MODO OFFLINE =====
export function setupNetworkListener(callback: (online: boolean) => void) {
  const handler = () => callback(navigator.onLine);
  window.addEventListener('online', handler);
  window.addEventListener('offline', handler);
  // Retorna função para remover listener
  return () => {
    window.removeEventListener('online', handler);
    window.removeEventListener('offline', handler);
  };
}

// ===== NOTIFICAÇÕES PUSH =====
export async function requestPushPermission(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    const result = await PushNotifications.requestPermissions();
    return result.receive === 'granted';
  } catch {
    return false;
  }
}

export async function sendLocalNotification(title: string, body: string) {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.schedule({
      notifications: [{
        id: Date.now(),
        title,
        body,
        schedule: { at: new Date(Date.now() + 500) },
        sound: 'beep.wav',
      }],
    });
  } catch (err) {
    console.warn('Erro ao enviar notificação local:', err);
  }
}
