# Complete Setup Guide

Step-by-step guide to get the React Native Playground with live streaming up and running.

## Prerequisites Installation

### 1. Install Node.js

Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version  # Should be v18 or higher
npm --version
```

### 2. Install ffmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
1. Download from [ffmpeg.org](https://ffmpeg.org/download.html)
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to PATH environment variable

Verify installation:
```bash
ffmpeg -version
```

### 3. Install Expo CLI (Optional)

```bash
npm install -g expo-cli
```

### 4. Install Expo Go App

- **iOS:** Download from App Store
- **Android:** Download from Google Play Store

## Project Setup

### Step 1: Backend Server

```bash
# Navigate to backend directory
cd react_native_playground_backend

# Install dependencies
npm install

# The following packages will be installed:
# - express: HTTP server
# - ws: WebSocket server
# - cors: CORS support
# - @types/express, @types/ws, @types/cors: TypeScript types

# Start the server
npm run dev
```

**Expected Output:**
```
WebSocket server listening on ws://0.0.0.0:3001
HTTP server listening on http://0.0.0.0:3000
MJPEG stream available at http://0.0.0.0:3000/stream.mjpeg
```

**Verify Server:**
```bash
# In a new terminal
curl http://localhost:3000
# Should return: {"status":"ok","message":"React Native Playground Backend",...}

curl http://localhost:3000/status
# Should return: {"ffmpegRunning":false,"httpClients":0,"wsConnections":0}
```

### Step 2: Expo Mobile App

```bash
# Navigate to Expo app directory
cd expo-stream-app

# Install dependencies
npm install

# The following packages will be installed:
# - expo: Expo framework
# - react-native-view-shot: View capture
# - expo-router: Navigation
# - expo-status-bar: Status bar component
```

**Configure Server IP:**

1. Find your computer's IP address:

   **macOS/Linux:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   # Look for something like: inet 192.168.1.100
   ```

   **Windows:**
   ```bash
   ipconfig
   # Look for IPv4 Address under your active network adapter
   ```

2. Edit `app/index.tsx` and update line 9:
   ```typescript
   const [serverIP, setServerIP] = useState("192.168.1.100"); // Your IP here
   ```

**Start the App:**
```bash
npx expo start
```

**Run on Device/Simulator:**

- **iOS Simulator:** Press `i` (requires Xcode on macOS)
- **Android Emulator:** Press `a` (requires Android Studio)
- **Physical Device:** 
  1. Open Expo Go app
  2. Scan the QR code displayed in terminal
  3. Make sure device is on same WiFi network as your computer

### Step 3: Frontend Web UI

```bash
# Navigate to frontend directory
cd react-native-playground-frontend

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.5.3
- Local:        http://localhost:3000
- Ready in 2.5s
```

Open http://localhost:3000 in your browser.

## Testing the Complete Flow

### 1. Start All Services

**Terminal 1 - Backend:**
```bash
cd react_native_playground_backend
npm run dev
```

**Terminal 2 - Mobile App:**
```bash
cd expo-stream-app
npx expo start
```

**Terminal 3 - Frontend:**
```bash
cd react-native-playground-frontend
npm run dev
```

### 2. Start Streaming from Mobile

1. Open the Expo app on your device/simulator
2. You should see a screen with:
   - Server IP input field
   - "Start Streaming" button
   - A preview area with colorful content

3. Verify the server IP is correct
4. Tap "Start Streaming"
5. You should see "🟢 Streaming Active"

### 3. View Stream in Browser

1. Open http://localhost:3000 in your browser
2. Look at the right panel (Preview section)
3. You should see:
   - "Connected" status with green WiFi icon
   - Live stream from your mobile app in a device frame
   - The stream updating at ~10 FPS

### 4. Verify Stream Quality

**Backend Terminal** should show:
```
Mobile client connected via WebSocket
Starting ffmpeg process...
ffmpeg started successfully
HTTP client connected to stream
```

**Browser** should display:
- Live updating view from mobile app
- Connection status: "Connected"
- Stream URL displayed at bottom

## Troubleshooting

### Issue: "Cannot connect to server" on Mobile

**Solution:**
1. Verify backend is running:
   ```bash
   curl http://YOUR_IP:3000/status
   ```

2. Check firewall:
   ```bash
   # macOS - Allow ports 3000 and 3001
   # Windows - Add firewall rules for Node.js
   ```

3. Ensure same network:
   - Mobile device and computer must be on same WiFi
   - Corporate networks may block WebSocket connections

### Issue: "Stream not available" in Browser

**Solution:**
1. Check if mobile app is streaming (green indicator)
2. Verify ffmpeg is running:
   ```bash
   curl http://localhost:3000/status
   # Should show: "ffmpegRunning": true
   ```

3. Test stream directly:
   ```bash
   curl http://localhost:3000/stream.mjpeg
   # Should output binary data
   ```

### Issue: ffmpeg not found

**Solution:**
1. Verify installation:
   ```bash
   which ffmpeg  # macOS/Linux
   where ffmpeg  # Windows
   ```

2. If not found, reinstall ffmpeg
3. Restart terminal after installation

### Issue: Low frame rate or choppy stream

**Solution:**
1. Reduce image quality in mobile app:
   ```typescript
   quality: 0.5,  // Lower quality
   ```

2. Reduce resolution in backend:
   ```typescript
   "-vf", "scale=480:-2",  // Smaller size
   ```

3. Check network speed:
   ```bash
   # Test network latency
   ping YOUR_SERVER_IP
   ```

### Issue: TypeScript errors in IDE

**Solution:**
These are expected before running `npm install`. After installing dependencies:

```bash
# Backend
cd react_native_playground_backend
npm install

# Expo app
cd expo-stream-app
npm install

# Frontend
cd react-native-playground-frontend
npm install
```

## Network Configuration

### Finding Your IP Address

**macOS:**
```bash
ifconfig en0 | grep "inet " | awk '{print $2}'
```

**Linux:**
```bash
hostname -I | awk '{print $1}'
```

**Windows (PowerShell):**
```powershell
(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi").IPAddress
```

### Firewall Configuration

**macOS:**
```bash
# Allow incoming connections on ports 3000 and 3001
# System Preferences → Security & Privacy → Firewall → Firewall Options
# Allow Node.js to accept incoming connections
```

**Windows:**
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Node.js Server" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3000,3001
```

**Linux (ufw):**
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
```

## Performance Tuning

### For Best Quality

**Mobile App (`expo-stream-app/app/index.tsx`):**
```typescript
quality: 0.9,
const intervalMs = 66;  // 15 FPS
```

**Backend (`react_native_playground_backend/server.ts`):**
```typescript
"-r", "15",
"-q:v", "2",
"-vf", "scale=720:-2",
```

### For Best Performance

**Mobile App:**
```typescript
quality: 0.5,
const intervalMs = 200;  // 5 FPS
```

**Backend:**
```typescript
"-r", "5",
"-q:v", "8",
"-vf", "scale=480:-2",
```

## Next Steps

1. **Customize the Mobile App** - Edit `expo-stream-app/app/index.tsx` to change what's being streamed
2. **Integrate with Playground** - Use the stream viewer to show live React Native code execution
3. **Add Recording** - Extend backend to save streams to video files
4. **Deploy** - Host backend on a server for remote access

## Useful Commands

```bash
# Check if ports are in use
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process on port
kill -9 $(lsof -t -i:3000)  # macOS/Linux

# View backend logs
cd react_native_playground_backend
npm run dev 2>&1 | tee server.log

# Clear Expo cache
cd expo-stream-app
npx expo start -c

# Build frontend for production
cd react-native-playground-frontend
npm run build
npm start
```

## Support

If you encounter issues:

1. Check the main README.md for architecture overview
2. Review individual component READMEs
3. Verify all prerequisites are installed
4. Check firewall and network settings
5. Test each component independently

---

**You're all set! Start streaming! 🚀**
