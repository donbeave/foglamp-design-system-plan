// Deterministic input timestamps, installed before lazy story/fixture modules.
export function installWallClock(timestamp:number){
 const NativeDate=Date;
 // Same explicit randomness input for original and extracted snapshot fixtures.
 Math.random=()=>0.5;
 class SnapshotDate extends NativeDate{
  constructor(...args:unknown[]){if(args.length===0)super(timestamp);else if(args.length===1)super(args[0]);else super(...args)}
  static now(){return timestamp}
 }
 globalThis.Date=SnapshotDate;
}
