import 'dotenv/config';


export default {

  "expo": {
    "name": "fooDook",
    "slug": "fooDook",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins":["@react-native-google-signin/google-signin"],
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      apiKey2: process.env.API_KEY2,
      authDomain2: process.env.AUTH_DOMAIN2,
      projectId2: process.env.PROJECT_ID2,
      storageBucket2: process.env.STORAGE_BUCKET2,
      messagingSenderId2: process.env.MESSAGING_SENDER_ID2,
      appId2: process.env.APP_ID2,
    }
  }
}
