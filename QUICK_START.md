# Quick Start - 3 Steps to Stream

Get your React Native playground streaming in under 5 minutes!

## Prerequisites

✅ Node.js 18+ installed  
✅ ffmpeg installed (`brew install ffmpeg` on macOS)  
✅ Expo Go app on your phone (optional)

## Step 1: Start Backend (Terminal 1)

```bash
cd react_native_playground_backend
npm install
npm run dev
```

**Expected:** Server running on http://localhost:3000

## Step 2: Start Mobile App (Terminal 2)

```bash
cd expo-stream-app
npm install

# Find your computer's IP
ifconfig | grep "inet " | grep -v 127.0.0.1
# Example output: inet 192.168.1.100

# Edit app/index.tsx line 9 with your IP, then:
npx expo start
```

**Then:**
- Press `i` for iOS simulator, or
- Press `a` for Android emulator, or  
- Scan QR with Expo Go app

**In the app:**
1. Enter your server IP (e.g., 192.168.1.100)
2. Tap "Start Streaming"

## Step 3: View Stream (Terminal 3)

```bash
cd react-native-playground-frontend
npm install
npm run dev
```

**Open:** http://localhost:3000

You should see the live stream in the Preview panel! 🎉

## Quick Test

**Option A - View in Browser:**
Navigate to: `http://localhost:3000`

**Option B - View in VLC:**
1. Open VLC
2. Media → Open Network Stream
3. Enter: `http://localhost:3000/stream.mjpeg`

## Troubleshooting

**Can't connect from mobile?**
- Ensure mobile and computer are on same WiFi
- Check firewall allows ports 3000 and 3001
- Verify IP address is correct

**No stream in browser?**
- Check mobile app shows "🟢 Streaming Active"
- Visit http://localhost:3000/status (should show `ffmpegRunning: true`)

**ffmpeg error?**
```bash
# Verify ffmpeg is installed
ffmpeg -version

# If not installed:
brew install ffmpeg  # macOS
```

## What's Happening?

1. **Mobile App** captures view at 10 FPS → sends via WebSocket
2. **Backend** receives frames → pipes to ffmpeg → outputs MJPEG
3. **Frontend** displays MJPEG stream in browser

## Next Steps

- Read [README.md](README.md) for full documentation
- See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- Check [expo-stream-app/README.md](expo-stream-app/README.md) for mobile app customization

---

**Happy Streaming! 🚀**
