#!/usr/bin/env python3
"""
Simple HTTP server for the Pokemon card project.
Run this script and open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

def main():
    # Change to the directory where this script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    Handler = MyHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Server running at http://localhost:{PORT}/")
            print(f"Serving directory: {os.getcwd()}")
            print("Press Ctrl+C to stop the server")
            
            # Automatically open browser
            webbrowser.open(f'http://localhost:{PORT}/')
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"Port {PORT} is already in use. Try a different port or stop the other server.")
        else:
            print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
