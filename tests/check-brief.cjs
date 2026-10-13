const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync(__dirname+'/../assets/customer-experience.js','utf8');
const el=()=>({value:'',textContent:'',hidden:true,events:{},addEventListener(n,f){this.events[n]=f}});
const form=el();form.elements={service:el(),vehicle:el(),area:el(),priorities:el()};form.elements.service.value='Interior cleaning';
const output=el(),link=el(),copy=el(),status=el(),actions=el();let copied,deny=false,selected=false;
const serviceLink=el();serviceLink.dataset={service:'Exterior detailing'};
const nodes={'#detail-brief':form,'#brief-message':output,'#text-brief':link,'#copy-brief':copy,'#brief-status':status,'.brief-actions':actions};
const doc={querySelector:s=>nodes[s],querySelectorAll:()=>[serviceLink],createRange:()=>({selectNodeContents(){selected=true}})};
vm.runInNewContext(src,{document:doc,window:{getSelection:()=>({removeAllRanges(){},addRange(){}})},navigator:{clipboard:{async writeText(v){if(deny)throw Error();copied=v}}},encodeURIComponent,Map});
(async()=>{
 assert(!actions.hidden);assert(link.href.startsWith('sms:+15125532552?body='));assert(output.textContent.includes('interior cleaning'));
 form.elements.vehicle.value='  2024   Test & <car>  ';form.elements.area.value='Austin';form.elements.priorities.value='Pet hair';form.events.input();assert(output.textContent.includes('2024 Test & <car>'));assert.equal(decodeURIComponent(link.href.split('body=')[1]),output.textContent);
 serviceLink.events.click();assert(output.textContent.includes('exterior detailing'));
 await copy.events.click();assert.equal(copied,output.textContent);assert(status.textContent.includes('Message copied'));
 deny=true;await copy.events.click();assert(selected);assert(status.textContent.includes('Select and copy'));
 let prevented=false;form.events.submit({preventDefault(){prevented=true}});assert(prevented);
 link.events.click();assert(status.textContent.includes('Review and send'));
 console.log('PASS: brief generation, service preselection, whitespace, safe text, encoded SMS destination, copy success/failure, no form submit, honest text-app handoff');
})();
