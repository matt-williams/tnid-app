# TNID App

This is a [React Native](https://reactnative.dev/) app to access the [TNID API](https://docs.tnid.com/), developed as part of [TADHack Global 2024](https://tadhack.com/2024/).

It currently supports
*   requesting an OTP token to log in as a user
*   retrieving the list of other users (as a company).

It *should* be deployable natively on Android and iOS, although it's so far only been tested in a web browser.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Auto-generate GraphQL code

   ```bash
   npm run relay
   ```

2. Start the app

   ```bash
    npm run web
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
