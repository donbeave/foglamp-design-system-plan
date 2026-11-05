(() => {
 const images=[...document.images].map(i=>({src:i.src,complete:i.complete,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight}));
 const requests=performance.getEntriesByType('resource').map(r=>({name:r.name,status:r.responseStatus}));
 const apiRequests=requests.filter(r=>new URL(r.name).pathname.startsWith('/api/'));
 return {url:location.href,images,apiRequests,failedSameOriginRequests:requests.filter(r=>new URL(r.name).origin===location.origin && r.status>=400),activeErrorOverlay:!!document.querySelector('vite-error-overlay'),body:document.body.innerText};
})()
