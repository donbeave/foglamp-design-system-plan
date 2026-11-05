from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import time
class FontHandler(SimpleHTTPRequestHandler):
 def do_GET(self):
  if self.path.endswith('geist-source.woff2'):time.sleep(2)
  super().do_GET()
ThreadingHTTPServer(('127.0.0.1',4204),partial(FontHandler,directory=str(Path(__file__).resolve().parent))).serve_forever()
