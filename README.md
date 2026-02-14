# Pokemon Card - Interactive Holo Card

An interactive holographic Pokemon card with tilt effects and shining animations.

## Running the Project

### Option 1: Using the Python Server (Recommended)

1. **Run the server script:**
   ```bash
   python3 server.py
   ```
   
   Or on macOS/Linux, make it executable and run:
   ```bash
   chmod +x run.sh
   ./run.sh
   ```

2. The server will automatically open your browser at `http://localhost:8000`

3. Press `Ctrl+C` to stop the server when done.

### Option 2: Using Python's Built-in Server

If the server script doesn't work, you can use Python's built-in HTTP server directly:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js (if you have it installed)

```bash
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Features

- Interactive tilt effects (click and drag or touch and drag)
- Holographic foil effects that respond to mouse movement
- Animated starburst effects
- Smooth parallax effects
- Touch support for mobile devices

## Files

- `index.html` - Main HTML file with all the card effects
- `valentine.png` - The card image
- `server.py` - Python server script
- `run.sh` - Shell script to run the server
