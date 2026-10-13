const fs = require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync(__dirname+'/../assets/hero-motion.js','utf8');
function setup({reduce=false,saveData=false}={}){
 const listeners={},events={},attrs={},classes=new Set();let intersection;let resolves=[];let plays=0;
 const video={paused:true,ended:false,dataset:{src:'film.mp4'},parentElement:{classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)}},getAttribute:x=>attrs[x],set src(x){attrs.src=x},removeAttribute:x=>delete attrs[x],load(){},closest(){return{}},addEventListener(n,f){events[n]=f},pause(){this.paused=true;events.pause?.()},play(){plays++;return new Promise((resolve,reject)=>resolves.push({resolve:()=>{video.paused=false;events.playing?.();resolve()},reject}))}};
 const button={dataset:{},setAttribute(n,v){this[n]=v},addEventListener(n,f){this[n]=f}};
 const pref={matches:reduce,addEventListener(n,f){this.change=f}};const conn={saveData,addEventListener(n,f){this.change=f}};
 const doc={hidden:false,querySelector:s=>s==='#hero-video'?video:button,addEventListener(n,f){listeners[n]=f}};
 const IO=function(f){intersection=f;this.observe=()=>{}};
 vm.runInNewContext(src,{document:doc,window:{matchMedia:()=>pref,IntersectionObserver:IO},navigator:{connection:conn},IntersectionObserver:IO,Promise});
 return {video,button,pref,conn,doc,classes,attrs,events,plays:()=>plays,view(v){intersection([{isIntersecting:v}])},settle(){resolves.shift()?.resolve()},reject(name){resolves.shift()?.reject({name})},hide(v){doc.hidden=v;listeners.visibilitychange()}};
}
const tick=()=>new Promise(r=>setImmediate(r));
(async()=>{
 let t=setup();assert.equal(t.plays(),0);t.view(true);assert.equal(t.plays(),1);t.view(true);assert.equal(t.plays(),1);t.button.click();t.settle();await tick();assert(t.video.paused);assert.equal(t.button['aria-pressed'],'false');
 t.button.click();t.settle();await tick();assert(!t.video.paused);t.hide(true);assert(t.video.paused);t.hide(false);t.settle();await tick();assert(!t.video.paused);
 t.button.click();t.view(false);t.view(true);assert(t.video.paused);assert.equal(t.plays(),3);
 t=setup({reduce:true});t.view(true);assert.equal(t.plays(),0);assert(!t.attrs.src);t.button.click();t.settle();await tick();assert(!t.video.paused);t.pref.change();assert(t.video.paused);assert(!t.attrs.src);
 t=setup({saveData:true});t.view(true);assert.equal(t.plays(),0);
 t=setup();t.view(true);t.reject('NotAllowedError');await tick();assert(t.video.paused);assert(!t.classes.has('motion-ready'));t.button.click();t.settle();await tick();assert(!t.video.paused);
 t=setup();t.view(true);t.view(false);t.view(true);t.reject('AbortError');await tick();assert.equal(t.plays(),2);t.settle();await tick();assert(!t.video.paused);
 t=setup();t.view(true);t.events.error();t.settle();await tick();assert(t.video.paused);assert(!t.classes.has('motion-ready'));t.button.click();t.settle();await tick();assert(!t.video.paused);
 console.log('PASS: motion initial visibility, repeated observer, pending pause, late play, hidden tab, explicit pause, reduced motion, data saver, autoplay rejection/retry, interrupted play, media error/retry');
})();
