import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mundodedocesdagg.app',
  appName: 'Mundo de Doces da GG',
  webDir: 'dist',

  // Configuração dos recursos gráficos (ícone + splash screen)
  assets: {
    icon: {
      sources: ['resources/icon.png'],
    },
    splash: {
      sources: ['resources/splash.svg'],
      splashDelay: 3000,
      backgroundColor: '#e8456b',
    },
  },

  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#e8456b',
      showSpinner: true,
      androidSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#e8456b',
      overlaysWebView: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#e8456b',
    },
  },
};

export default config;
