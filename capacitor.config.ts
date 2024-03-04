import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'muzei_front',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
