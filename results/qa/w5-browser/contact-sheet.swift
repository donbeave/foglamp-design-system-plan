import AppKit
import Foundation
let dir = "results/qa/w5-browser/screenshots"
let fm = FileManager.default
let files = (try fm.contentsOfDirectory(atPath: dir)).filter { $0.hasPrefix("family-") && $0.hasSuffix(".png") }
for size in ["desktop", "mobile"] {
  for theme in ["light", "dark"] {
    let names = files.filter { $0.hasPrefix("family-\(size)-\(theme)-") }.sorted()
    guard !names.isEmpty else { continue }
    let w = 480, h = 330, cols = 2, rows = (names.count + 1) / 2
    let sheet = NSImage(size: NSSize(width: w * cols, height: h * rows))
    sheet.lockFocus()
    NSColor.white.setFill(); NSRect(x: 0, y: 0, width: w * cols, height: h * rows).fill()
    for (i, name) in names.enumerated() {
      guard let image = NSImage(contentsOfFile: "\(dir)/\(name)") else { continue }
      let x = (i % cols) * w, y = (rows - 1 - i / cols) * h
      let ratio = min(CGFloat(w) / image.size.width, CGFloat(h - 30) / image.size.height)
      image.draw(in: NSRect(x: CGFloat(x), y: CGFloat(y + 25), width: image.size.width * ratio, height: image.size.height * ratio))
      (name as NSString).draw(at: NSPoint(x: x + 4, y: y + 4), withAttributes: [.font: NSFont.systemFont(ofSize: 10)])
    }
    sheet.unlockFocus()
    if let data = sheet.tiffRepresentation, let bitmap = NSBitmapImageRep(data: data), let png = bitmap.representation(using: .png, properties: [:]) { try png.write(to: URL(fileURLWithPath: "\(dir)/contact-\(size)-\(theme).png")) }
  }
}
