// ============================================
// Notificações Push via Capacitor + Firebase
// ============================================
import { Capacitor } from '@capacitor/core';

// Guarda o token FCM para envio de notificações push reais
let fcmToken: string | null = null;

export function getFcmToken(): string | null {
  return fcmToken;
}

export async function setupPushNotifications() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');

    // Solicitar permissão
    const permResult = await PushNotifications.requestPermissions();
    if (permResult.receive !== 'granted') {
      console.warn('Permissão de notificações negada pelo utilizador');
      return;
    }

    // Registar para notificações
    await PushNotifications.register();

    // Obter token FCM
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM Token:', token.value);
      fcmToken = token.value;
      // Enviar token para o servidor para envio futuro
      localStorage.setItem('mundodedoces_fcm_token', token.value);
    });

    // Lidar com erros
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Erro ao registar push notifications:', error);
    });

    // Lidar com notificações recebidas quando a app está aberta
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notificação recebida:', notification);
    });

    // Lidar com clique na notificação
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Ação na notificação:', notification);
    });

  } catch (err) {
    console.warn('Erro ao configurar push notifications:', err);
  }
}

// Notificação local (funciona mesmo sem FCM)
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
        smallIcon: 'ic_stat_icon',
        iconColor: '#e8456b',
      }],
    });
  } catch (err) {
    console.warn('Erro ao enviar notificação local:', err);
  }
}
