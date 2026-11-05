JSON.stringify((()=>{
 const selectors=new URLSearchParams(location.search).get('view')==='workflow' ? ['svg.tabler-icon-coin-filled','svg.tabler-icon-ghost'] : ['svg.tabler-icon-coin-filled'];
 const results=[];
 for(const selector of selectors){
  for(const element of document.querySelectorAll(selector)){
   const snapshot=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),style={};for(const key of s)style[key]=s.getPropertyValue(key);return {outerHTML:e.outerHTML,rect:[r.x,r.y,r.width,r.height],style};};
   const before=snapshot(element),copy=element.cloneNode(true);element.replaceWith(copy);const after=snapshot(copy);
   results.push({selector,outerHTMLEqual:before.outerHTML===after.outerHTML,rectEqual:JSON.stringify(before.rect)===JSON.stringify(after.rect),styleEqual:JSON.stringify(before.style)===JSON.stringify(after.style),before,after});
  }
 }
 return results;
})())
