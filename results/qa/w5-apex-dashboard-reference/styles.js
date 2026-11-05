JSON.stringify([...document.querySelectorAll('#root *')].map(e => {
  const r=e.getBoundingClientRect(), s=getComputedStyle(e);
  return {tag:e.tagName, text:(e.childNodes.length===1 && e.firstChild.nodeType===3 ? e.textContent : '').trim(),
    rect:[r.x,r.y,r.width,r.height], display:s.display, font:s.font, color:s.color, background:s.backgroundColor,
    border:s.borderColor, radius:s.borderRadius, shadow:s.boxShadow, margin:s.margin, padding:s.padding, opacity:s.opacity, visibility:s.visibility, transform:s.transform, fill:s.fill, stroke:s.stroke, clipPath:s.clipPath, mask:s.mask, animationName:s.animationName, animationDuration:s.animationDuration};
}))
