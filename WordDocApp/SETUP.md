# Word Doc Mobile App - Setup Guide

## Quick Start

This guide will help you set up and run the Word Doc Mobile App on your development machine.

## Prerequisites

### Required Software

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify npm: `npm --version`
   - Or install yarn: `npm install -g yarn`

3. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

### Platform-Specific Requirements

#### For Android Development

1. **Java Development Kit (JDK 11)**
   - Download from: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
   - Set JAVA_HOME environment variable

2. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK
   - Install Android SDK Platform 31 or higher
   - Install Android Virtual Device (AVD)

3. **Environment Variables**
   Add to your `.bashrc`, `.zshrc`, or system environment:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
   # or
   export ANDROID_HOME=$HOME/Android/Sdk          # Linux
   # or
   set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk  # Windows
   
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

#### For iOS Development (macOS only)

1. **Xcode** (version 12 or higher)
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

2. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

3. **iOS Simulator**
   - Installed with Xcode
   - Launch from Xcode menu: Xcode → Open Developer Tool → Simulator

## Installation Steps

### Step 1: Clone or Navigate to the Project

```bash
cd /path/to/Datascience/WordDocApp
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required dependencies listed in `package.json`.

### Step 3: Platform-Specific Setup

#### For iOS (macOS only)

```bash
cd ios
pod install
cd ..
```

This installs native iOS dependencies using CocoaPods.

#### For Android

No additional setup needed. Dependencies are handled by Gradle.

## Running the App

### Option 1: Start Metro Bundler First (Recommended)

1. **Start Metro Bundler** in a terminal:
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android** in another terminal:
   ```bash
   npm run android
   # or
   yarn android
   ```

3. **Run on iOS** in another terminal (macOS only):
   ```bash
   npm run ios
   # or
   yarn ios
   ```

### Option 2: Direct Run

The app will automatically start Metro Bundler:

```bash
# For Android
npm run android

# For iOS (macOS only)
npm run ios
```

### Running on Physical Devices

#### Android Physical Device

1. Enable Developer Options on your device
2. Enable USB Debugging
3. Connect device via USB
4. Run: `adb devices` to verify connection
5. Run: `npm run android`

#### iOS Physical Device (macOS only)

1. Open `ios/WordDocApp.xcworkspace` in Xcode
2. Select your device from the device dropdown
3. Configure signing with your Apple Developer account
4. Click the Run button or press Cmd+R

## Troubleshooting

### Common Issues

#### Metro Bundler Cache Issues

```bash
npm start -- --reset-cache
# or
yarn start --reset-cache
```

#### Android Build Failures

```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### iOS Build Failures

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

#### Permission Errors (macOS/Linux)

```bash
sudo chown -R $USER:$USER node_modules
```

#### Port Already in Use

If port 8081 is in use:
```bash
# Find process using port 8081
lsof -i :8081

# Kill the process
kill -9 <PID>
```

### Android Emulator Issues

#### Emulator Won't Start

1. Open Android Studio
2. Go to AVD Manager
3. Create a new virtual device
4. Start the emulator from AVD Manager
5. Run `npm run android`

#### Emulator Performance

- Enable hardware acceleration (Intel HAXM or AMD Hypervisor)
- Allocate more RAM to the emulator
- Use x86 images instead of ARM

### iOS Simulator Issues

#### Simulator Not Launching

```bash
# Kill all simulator processes
killall -9 "Simulator"

# Start fresh
npm run ios
```

#### Specific Simulator

```bash
npm run ios -- --simulator="iPhone 14 Pro"
```

### Dependency Issues

#### Node Modules Issues

```bash
rm -rf node_modules
rm package-lock.json  # or yarn.lock
npm install           # or yarn install
```

#### Watchman Issues (macOS/Linux)

```bash
brew install watchman  # macOS
# or
sudo apt-get install watchman  # Linux
```

## Development Tools

### React Native Debugger

1. **Install React Native Debugger**
   - Download from: https://github.com/jhen0409/react-native-debugger/releases

2. **Enable Debug Mode**
   - Android: Shake device or press Cmd+M (macOS) / Ctrl+M (Windows)
   - iOS: Shake device or press Cmd+D
   - Select "Debug"

### Flipper (Meta's debugging tool)

Already included with React Native 0.72. Launch Flipper and it will automatically connect to your app.

### Hot Reloading

- **Fast Refresh**: Enabled by default (automatically reloads on save)
- **Manual Reload**: 
  - Android: Double tap R or Cmd+M → Reload
  - iOS: Cmd+R in simulator

## Testing

### Run Unit Tests

```bash
npm test
# or
yarn test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
# or
yarn test --watch
```

### Test Coverage

```bash
npm test -- --coverage
# or
yarn test --coverage
```

## Building for Production

### Android APK

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Android AAB (for Play Store)

```bash
cd android
./gradlew bundleRelease
```

AAB location: `android/app/build/outputs/bundle/release/app-release.aab`

### iOS Archive (for App Store)

1. Open `ios/WordDocApp.xcworkspace` in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Follow the upload process to App Store Connect

## Environment Configuration

### Development vs Production

Create `.env` files for different environments:

```bash
# .env.development
API_URL=http://localhost:3000

# .env.production
API_URL=https://api.production.com
```

## Code Quality

### Linting

```bash
npm run lint
# or
npx eslint .
```

### Formatting

```bash
npx prettier --write "**/*.{js,jsx,json,md}"
```

## Performance Optimization

### Enable Hermes (Android)

Already enabled in `android/app/build.gradle`:
```gradle
project.ext.react = [
    enableHermes: true
]
```

### Profiling

1. Enable performance monitor: Dev Menu → Show Perf Monitor
2. Use React DevTools Profiler
3. Use Flipper's Performance plugin

## Useful Commands

```bash
# Clear all caches
npm start -- --reset-cache
watchman watch-del-all
rm -rf node_modules
npm install

# Check React Native environment
npx react-native doctor

# List available iOS simulators
xcrun simctl list devices

# List connected Android devices
adb devices

# View Android logs
adb logcat *:S ReactNative:V ReactNativeJS:V

# View iOS logs
react-native log-ios
```

## Getting Help

### Official Resources

- React Native Docs: https://reactnative.dev/docs/getting-started
- React Navigation: https://reactnavigation.org/docs/getting-started
- Stack Overflow: Tag with `react-native`

### Debug Menu

Access with:
- Android: Shake device or Cmd+M (Mac) / Ctrl+M (Windows/Linux)
- iOS: Shake device or Cmd+D (Mac)

Options:
- Reload
- Debug
- Show Inspector
- Show Perf Monitor
- Toggle Element Inspector

## Next Steps

After successful setup:

1. ✅ Verify the app runs on your device/simulator
2. ✅ Explore the codebase in `src/`
3. ✅ Read the USER_GUIDE.md
4. ✅ Review the ARCHITECTURE.md
5. ✅ Start building features!

## Updates

Keep dependencies up to date:

```bash
npm outdated           # Check for updates
npm update            # Update to latest compatible versions
npm install <package>@latest  # Update specific package
```

## Support

For issues:
1. Check this setup guide
2. Review troubleshooting section
3. Search existing GitHub issues
4. Create a new issue with:
   - Error messages
   - Steps to reproduce
   - Environment details (`react-native info`)

Happy coding! 🚀
