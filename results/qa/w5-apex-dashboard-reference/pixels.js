(async()=>{
  const root='/@fs/Users/donbeave/Projects/donbeave/foglamp-design-system-plan/results/qa/w5-apex-dashboard-reference/';
  const load=async name=>{const img=new Image();img.src=root+name;await img.decode();const canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);return {width:img.width,height:img.height,data:ctx.getImageData(0,0,img.width,img.height).data};};
  const result={};
  for(const view of ['overview','traces','trace','agent','workflow','session','eval','shell']){
    result[view]={};
    for(const state of ['default','loading','empty','selection']){
      if(state==='selection' && !['overview','traces','trace','agent','workflow','session','eval','shell'].includes(view))continue;
      result[view][state]={};
      for(const theme of ['light','dark']){
        const suffix=state==='default'?'':'-'+state;
        const a=await load(`${view}-source-${theme}${suffix}.png`),b=await load(`${view}-target-${theme}${suffix}.png`);
        let different=0,total=0,max=0;
        for(let i=0;i<a.data.length;i+=4){const d=Math.abs(a.data[i]-b.data[i])+Math.abs(a.data[i+1]-b.data[i+1])+Math.abs(a.data[i+2]-b.data[i+2]);if(d)different++;total+=d;max=Math.max(max,d);}
        result[view][state][theme]={width:a.width,height:a.height,differentPixels:different,meanAbsoluteChannelDelta:total/(a.width*a.height*3),maxSummedChannelDelta:max,status:'unverified'};
      }
    }
  }
  return JSON.stringify(result);
})()
