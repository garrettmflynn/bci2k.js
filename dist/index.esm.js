var U=Object.create;var F=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var G=Object.getOwnPropertyNames;var R=Object.getPrototypeOf,M=Object.prototype.hasOwnProperty;var w=(l,e)=>()=>(e||l((e={exports:{}}).exports,e),e.exports);var $=(l,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of G(e))!M.call(l,r)&&r!==t&&F(l,r,{get:()=>e[r],enumerable:!(i=B(e,r))||i.enumerable});return l};var T=(l,e,t)=>(t=l!=null?U(R(l)):{},$(e||!l||!l.__esModule?F(t,"default",{value:l,enumerable:!0}):t,l));var h=(l,e,t)=>new Promise((i,r)=>{var s=c=>{try{a(t.next(c))}catch(o){r(o)}},n=c=>{try{a(t.throw(c))}catch(o){r(o)}},a=c=>c.done?i(c.value):Promise.resolve(c.value).then(s,n);a((t=t.apply(l,e)).next())});var N=w((Z,O)=>{var I=function(){if(typeof self=="object"&&self)return self;if(typeof window=="object"&&window)return window;throw new Error("Unable to resolve global `this`")};O.exports=function(){if(this)return this;if(typeof globalThis=="object"&&globalThis)return globalThis;try{Object.defineProperty(Object.prototype,"__global__",{get:function(){return this},configurable:!0})}catch{return I()}try{return __global__||I()}finally{delete Object.prototype.__global__}}()});var C=w((H,q)=>{q.exports={name:"websocket",description:"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",keywords:["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],author:"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",contributors:["I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],version:"1.0.34",repository:{type:"git",url:"https://github.com/theturtle32/WebSocket-Node.git"},homepage:"https://github.com/theturtle32/WebSocket-Node",engines:{node:">=4.0.0"},dependencies:{bufferutil:"^4.0.1",debug:"^2.2.0","es5-ext":"^0.10.50","typedarray-to-buffer":"^3.1.5","utf-8-validate":"^5.0.2",yaeti:"^0.0.6"},devDependencies:{"buffer-equal":"^1.0.0",gulp:"^4.0.2","gulp-jshint":"^2.0.4","jshint-stylish":"^2.2.1",jshint:"^2.0.0",tape:"^4.9.1"},config:{verbose:!1},scripts:{test:"tape test/unit/*.js",gulp:"gulp"},main:"index",directories:{lib:"./lib"},browser:"lib/browser.js",license:"Apache-2.0"}});var L=w((K,E)=>{E.exports=C().version});var v=w((Y,W)=>{var m;if(typeof globalThis=="object")m=globalThis;else try{m=N()}catch{}finally{if(!m&&typeof window<"u"&&(m=window),!m)throw new Error("Could not determine global this")}var b=m.WebSocket||m.MozWebSocket,z=L();function j(l,e){var t;return e?t=new b(l,e):t=new b(l),t}b&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach(function(l){Object.defineProperty(j,l,{get:function(){return b[l]}})});W.exports={w3cwebsocket:b?j:null,version:z}});var x=T(v(),1),_=class{constructor(e){this.ondisconnect=()=>{},this.onStateChange=t=>{},this.websocket=null,this.state="",this.address=e||void 0,this.latestIncomingData="",this.msgID=0,this.newData=()=>{},this.responseBuffer=[]}connect(e){return new Promise((t,i)=>{this.address===void 0&&(this.address=e||"ws://127.0.0.1:80"),this.websocket=new x.w3cwebsocket(this.address),this.websocket.onerror=r=>i(`Error connecting to BCI2000 at ${this.address}`),this.websocket.onclose=()=>{console.log("Connection closed"),this.ondisconnect()},this.websocket.onopen=()=>t(),this.websocket.onmessage=r=>{let{opcode:s,id:n,response:a}=JSON.parse(r.data);switch(s){case"O":this.responseBuffer.push({id:n,response:a}),this.newData(a);break;default:break}}})}disconnect(){this.websocket.close()}connected(){return this.websocket!==null&&this.websocket.readyState===x.w3cwebsocket.OPEN}execute(e){return this.connected()?new Promise((t,i)=>{this.msgID=this.msgID+1,this.websocket.send(JSON.stringify({opcode:"E",id:this.msgID,contents:e})),this.newData=r=>t(r)}):Promise.reject("Cannot execute instruction: not connected to BCI2000")}getVersion(){return h(this,null,function*(){return(yield this.execute("Version")).split("\r")[0]})}showWindow(){return h(this,null,function*(){yield this.execute("Show Window")})}hideWindow(){return h(this,null,function*(){yield this.execute("Hide Window")})}startExecutable(e){return h(this,null,function*(){yield this.execute(`Start executable ${e}`)})}startDummyRun(){return h(this,null,function*(){yield this.startExecutable("SignalGenerator"),yield this.startExecutable("DummySignalProcessing"),yield this.startExecutable("DummyApplication")})}setWatch(e,t,i){return h(this,null,function*(){yield this.execute("Add watch "+e+" at "+t+":"+i)})}resetSystem(){return h(this,null,function*(){yield this.execute("Reset System")})}setConfig(){return h(this,null,function*(){yield this.execute("Set Config")})}start(){return h(this,null,function*(){yield this.execute("Start")})}stop(){return h(this,null,function*(){yield this.execute("Stop")})}kill(){return h(this,null,function*(){yield this.execute("Exit")})}stateListen(){setInterval(()=>h(this,null,function*(){let e=yield this.execute("GET SYSTEM STATE");e.trim()!=this.state&&this.onStateChange(e.trim())}),1e3)}getSubjectName(){return h(this,null,function*(){return yield this.execute("Get Parameter SubjectName")})}getTaskName(){return h(this,null,function*(){return yield this.execute("Get Parameter DataFile")})}setParameter(e){return h(this,null,function*(){yield this.execute(`Set paramater ${e}`)})}setState(e){return h(this,null,function*(){yield this.execute(`Set state ${e}`)})}getParameters(){return h(this,null,function*(){let t=(yield this.execute("List Parameters")).split(`
`),i={},r;return t.forEach(s=>{let n=s.split("=")[0],a=n.split(" ")[1],c=n.split(" ")[2],o=n.split(" ")[0].split(":");o.forEach((f,u)=>{switch(u){case 0:{i[o[0]]==null&&(i[o[0]]={}),r=i[o[0]];break}case 1:{i[o[0]][o[1]]==null&&(i[o[0]][o[1]]={}),r=i[o[0]][o[1]];break}case 2:{i[o[0]][o[1]][o[2]]==null&&(i[o[0]][o[1]][o[2]]={}),r=i[o[0]][o[1]][o[2]];break}default:}}),a!="matrix"?s.split("=")[1].split("//")[0].trim().split(" ").length==4?r[c]={dataType:a,value:{value:s.split("=")[1].split("//")[0].trim().split(" ")[0],defaultValue:s.split("=")[1].split("//")[0].trim().split(" ")[1],low:s.split("=")[1].split("//")[0].trim().split(" ")[2],high:s.split("=")[1].split("//")[0].trim().split(" ")[3]},comment:s.split("=")[1].split("//")[1]}:r[c]={dataType:a,value:s.split("=")[1].split("//")[0].trim(),comment:s.split("=")[1].split("//")[1]}:r[c]={dataType:a,value:s.split("=")[1].split("//")[0].trim(),comment:s.split("=")[1].split("//")[1]}}),i})}};var V=T(v(),1),D=class{constructor(e){this._socket=null,this.onconnect=()=>{},this.onGenericSignal=t=>{},this.onStateVector=t=>{},this.onSignalProperties=t=>{},this.onStateFormat=t=>{},this.ondisconnect=()=>{},this.onReceiveBlock=()=>{},this.callingFrom="",this.states={},this.signal=null,this.signalProperties=null,this.stateFormat=null,this.stateVecOrder=null,this.SignalType={INT16:0,FLOAT24:1,FLOAT32:2,INT32:3},this.address=e}getNullTermString(e){var t="";let i=0;for(;i<e.byteLength;){var r=e.getUint8(i);if(i++,r==0)break;t+=String.fromCharCode(r)}return t}connect(e,t){let i=this;return i.address===void 0&&(i.address=e),this.callingFrom=t,new Promise((r,s)=>{i._socket=new V.w3cwebsocket(i.address),i._socket.binaryType="arraybuffer",i._socket.onerror=()=>{s("Error connecting to data source at "+i.address)},i._socket.onopen=()=>{i.onconnect(),r()},i._socket.onclose=()=>{i.ondisconnect(),setTimeout(()=>{console.log("Disconnected"),this.connect("")},1e3)},i._socket.onmessage=n=>{i._decodeMessage(n.data)}})}connected(){return this._socket!=null&&this._socket.readyState===V.w3cwebsocket.OPEN}_decodeMessage(e){let t=new DataView(e,0,1).getUint8(0);switch(t){case 3:let i=new DataView(e,1,e.byteLength-1);this._decodeStateFormat(i);break;case 4:let r=new DataView(e,1,2).getUint8(0);switch(r){case 1:let n=new DataView(e,2,e.byteLength-2);this._decodeGenericSignal(n);break;case 3:let a=new DataView(e,2,e.byteLength-2);this._decodeSignalProperties(a);break;default:console.error("Unsupported Supplement: "+r.toString());break}this.onReceiveBlock();break;case 5:let s=new DataView(e,1,e.byteLength-1);this._decodeStateVector(s);break;default:console.error("Unsupported Descriptor: "+t.toString());break}}_decodePhysicalUnits(e){let t;t={};let i=e.split(" "),r=0;return t.offset=Number(i[r++]),t.gain=Number(i[r++]),t.symbol=i[r++],t.vmin=Number(i[r++]),t.vmax=Number(i[r++]),t}_decodeSignalProperties(e){let t=this.getNullTermString(e);t=t.replace(/{/g," { "),t=t.replace(/}/g," } "),this.signalProperties={};let i=t.split(" "),r=[];for(let n=0;n<i.length;n++)i[n].trim()!==""&&r.push(i[n]);let s=0;if(this.signalProperties.name=r[s++],this.signalProperties.channels=[],r[s]==="{"){for(;r[++s]!=="}";)this.signalProperties.channels.push(r[s]);s++}else{let n=parseInt(r[s++]);for(let a=0;a<n;a++)this.signalProperties.channels.push((a+1).toString())}if(this.signalProperties.elements=[],r[s]==="{"){for(;r[++s]!=="}";)this.signalProperties.elements.push(r[s]);s++}else{let n=parseInt(r[s++]);for(let a=0;a<n;a++)this.signalProperties.elements.push((a+1).toString())}this.signalProperties.numelements=this.signalProperties.elements.length,this.signalProperties.signaltype=r[s++],this.signalProperties.channelunit=this._decodePhysicalUnits(r.slice(s,s+=5).join(" ")),this.signalProperties.elementunit=this._decodePhysicalUnits(r.slice(s,s+=5).join(" ")),s++,this.signalProperties.valueunits=[];for(let n=0;n<this.signalProperties.channels.length;n++)this.signalProperties.valueunits.push(this._decodePhysicalUnits(r.slice(s,s+=5).join(" ")));s++,this.onSignalProperties(this.signalProperties)}_decodeStateFormat(e){this.stateFormat={};let i=this.getNullTermString(e).split(`
`);for(let s=0;s<i.length;s++){if(i[s].trim().length===0)continue;let n=i[s].split(" "),a=n[0];this.stateFormat[a]={},this.stateFormat[a].bitWidth=parseInt(n[1]),this.stateFormat[a].defaultValue=parseInt(n[2]),this.stateFormat[a].byteLocation=parseInt(n[3]),this.stateFormat[a].bitLocation=parseInt(n[4])}let r=[];for(let s in this.stateFormat){let n=this.stateFormat[s].byteLocation*8;n+=this.stateFormat[s].bitLocation,r.push([s,n])}r.sort((s,n)=>s[1]<n[1]?-1:s[1]>n[1]?1:0),this.stateVecOrder=[];for(let s=0;s<r.length;s++){let n=r[s][0];this.stateVecOrder.push([n,this.stateFormat[n].bitWidth])}this.onStateFormat(this.stateFormat)}_decodeGenericSignal(e){let t=0,i=e.getUint8(t);t=t+1;let r=e.getUint16(t,!0);t=t+2;let s=e.getUint16(t,!0);t=t+2,t=t+e.byteOffset;let n=new DataView(e.buffer,t),a=[];for(let c=0;c<r;++c){a.push([]);for(let o=0;o<s;++o)switch(i){case this.SignalType.INT16:a[c].push(n.getInt16((s*c+o)*2,!0));break;case this.SignalType.FLOAT32:a[c].push(n.getFloat32((s*c+o)*4,!0));break;case this.SignalType.INT32:a[c].push(n.getInt32((s*c+o)*4,!0));break;case this.SignalType.FLOAT24:a[c].push(0);break;default:break}}this.signal=a,this.onGenericSignal(a)}_decodeStateVector(e){if(this.stateVecOrder==null)return;let t=new Int8Array(e.buffer),i=t.indexOf(0),r=t.indexOf(0,i+1),s=new TextDecoder,n=parseInt(s.decode(t.slice(1,i))),a=parseInt(s.decode(t.slice(i+1,r))),c=r+1,o=new DataView(e.buffer,c),f={};for(let u in this.stateFormat)f[u]=Array(a).fill(this.stateFormat[u].defaultValue);for(let u=0;u<a;u++){let d=new Uint8Array(o.buffer,o.byteOffset+u*n,n),g=[];for(let p=0;p<d.length;p++)g.push((d[p]&1)!==0?1:0),g.push((d[p]&2)!==0?1:0),g.push((d[p]&4)!==0?1:0),g.push((d[p]&8)!==0?1:0),g.push((d[p]&16)!==0?1:0),g.push((d[p]&32)!==0?1:0),g.push((d[p]&64)!==0?1:0),g.push((d[p]&128)!==0?1:0);for(let p=0;p<this.stateVecOrder.length;p++){let y=this.stateFormat[this.stateVecOrder[p][0]],A=y.byteLocation*8+y.bitLocation,S=0,k=1;for(let P=0;P<y.bitWidth;P++)g[A+P]&&(S=(S|k)>>>0),k=k<<1>>>0;f[this.stateVecOrder[p][0]][u]=S}}this.onStateVector(f),this.states=f}};export{D as BCI2K_DataConnection,_ as BCI2K_OperatorConnection};
//# sourceMappingURL=index.esm.js.map
