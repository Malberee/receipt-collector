<img width="1326" height="336" alt="cover" src="https://github.com/user-attachments/assets/837ab750-a09c-4d4f-bda0-9e8e4c6dfcf6" />

# 🧾 Collect, Scan & Track Your Receipts

**Receipt Collector** is a React Native mobile app that helps you keep track of your shopping receipts. Instead of manually entering the amount and date, simply scan the receipt’s QR code.

<div align="center">
    <img width="200" height="408" alt="home screen" src="https://github.com/user-attachments/assets/1d33d9ad-c47a-4b11-ba11-731d5f398537" />
    <img width="200" height="408" alt="scanner screen" src="https://github.com/user-attachments/assets/051ed3f1-2d8e-432e-90bd-882d71b8e7d8" />
    <img width="200" height="408" alt="details screen" src="https://github.com/user-attachments/assets/074ed1e6-825d-4b94-aa14-8496f63162af" />
</div>

## 🚀 Features

- 📷 QR Code Scanning\
  Automatically extracts the amount and date from the receipt.

- 🛍️ Add Products\
  Add items to your receipt by scanning barcodes or entering them manually.

- 📊 Statistics Dashboard\
  View statistics about your spending over the last week or month.

- 🏷️ Receipt Rarity\
  Each receipt gets a random rarity:
  Common, Rare, Epic, Mythic, Legendary.
  This doesn’t affect functionality — it’s just a fun, gamified feature.

- ✍️ Manual Entry\
  In case scanning is not possible, you can always enter data manually.

## 📱 Tech Stack

- **Core:** [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), [Expo Router](https://expo.github.io/router/)
- **State Management:** [MobX](https://mobx.js.org/), [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)
- **UI & Styling:** [NativeWind](https://www.nativewind.dev/), [Merlo UI](https://github.com/Malberee/merlo-ui)
- **Camera & Scanning:** [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera)
- **Animations:** [Reanimated](https://docs.swmansion.com/react-native-reanimated/)
