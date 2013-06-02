function printStackTrace(a){var b=a&&a.e?a.e:null,c=a?!!a.guess:!0,d=new printStackTrace.implementation,e=d.run(b);return c?d.guessFunctions(e):e}printStackTrace.implementation=function(){},printStackTrace.implementation.prototype={run:function(a){var b=this._mode||this.mode();if(b==="other")return this.other(arguments.callee);a=a||function(){try{var a=__undef__<<1}catch(b){return b}}();return this[b](a)},mode:function(){try{var a=__undef__<<1}catch(b){if(b.arguments)return this._mode="chrome";if(window.opera&&b.stacktrace)return this._mode="opera10";if(b.stack)return this._mode="firefox";if(window.opera&&!("stacktrace"in b))return this._mode="opera"}return this._mode="other"},instrumentFunction:function(a,b,c){a=a||window,a["_old"+b]=a[b],a[b]=function(){c.call(this,printStackTrace());return a["_old"+b].apply(this,arguments)},a[b]._instrumented=!0},deinstrumentFunction:function(a,b){a[b].constructor===Function&&a[b]._instrumented&&a["_old"+b].constructor===Function&&(a[b]=a["_old"+b])},chrome:function(a){return a.stack.replace(/^[^\n]*\n/,"").replace(/^[^\n]*\n/,"").replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@").split("\n")},firefox:function(a){return a.stack.replace(/^[^\n]*\n/,"").replace(/(?:\n@:0)?\s+$/m,"").replace(/^\(/gm,"{anonymous}(").split("\n")},opera10:function(a){var b=a.stacktrace,c=b.split("\n"),d="{anonymous}",e=/.*line (\d+), column (\d+) in ((<anonymous function\:?\s*(\S+))|([^\(]+)\([^\)]*\))(?: in )?(.*)\s*$/i,f,g,h;for(f=2,g=0,h=c.length;f<h-2;f++)if(e.test(c[f])){var i=RegExp.$6+":"+RegExp.$1+":"+RegExp.$2,j=RegExp.$3;j=j.replace(/<anonymous function\s?(\S+)?>/g,d),c[g++]=j+"@"+i}c.splice(g,c.length-g);return c},opera:function(a){var b=a.message.split("\n"),c="{anonymous}",d=/Line\s+(\d+).*script\s+(http\S+)(?:.*in\s+function\s+(\S+))?/i,e,f,g;for(e=4,f=0,g=b.length;e<g;e+=2)d.test(b[e])&&(b[f++]=(RegExp.$3?RegExp.$3+"()@"+RegExp.$2+RegExp.$1:c+"()@"+RegExp.$2+":"+RegExp.$1)+" -- "+b[e+1].replace(/^\s+/,""));b.splice(f,b.length-f);return b},other:function(a){var b="{anonymous}",c=/function\s*([\w\-$]+)?\s*\(/i,d=[],e=0,f,g,h=10;while(a&&d.length<h)f=c.test(a.toString())?RegExp.$1||b:b,g=Array.prototype.slice.call(a.arguments),d[e++]=f+"("+this.stringifyArguments(g)+")",a=a.caller;return d},stringifyArguments:function(a){for(var b=0;b<a.length;++b){var c=a[b];c===undefined?a[b]="undefined":c===null?a[b]="null":c.constructor&&(c.constructor===Array?c.length<3?a[b]="["+this.stringifyArguments(c)+"]":a[b]="["+this.stringifyArguments(Array.prototype.slice.call(c,0,1))+"..."+this.stringifyArguments(Array.prototype.slice.call(c,-1))+"]":c.constructor===Object?a[b]="#object":c.constructor===Function?a[b]="#function":c.constructor===String&&(a[b]='"'+c+'"'))}return a.join(",")},sourceCache:{},ajax:function(a){var b=this.createXMLHTTPObject();if(!!b){b.open("GET",a,!1),b.setRequestHeader("User-Agent","XMLHTTP/1.0"),b.send("");return b.responseText}},createXMLHTTPObject:function(){var a,b=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var c=0;c<b.length;c++)try{a=b[c](),this.createXMLHTTPObject=b[c];return a}catch(d){}},isSameDomain:function(a){return a.indexOf(location.hostname)!==-1},getSource:function(a){a in this.sourceCache||(this.sourceCache[a]=this.ajax(a).split("\n"));return this.sourceCache[a]},guessFunctions:function(a){for(var b=0;b<a.length;++b){var c=/\{anonymous\}\(.*\)@(\w+:\/\/([\-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/,d=a[b],e=c.exec(d);if(e){var f=e[1],g=e[4];if(f&&this.isSameDomain(f)&&g){var h=this.guessFunctionName(f,g);a[b]=d.replace("{anonymous}",h)}}}return a},guessFunctionName:function(a,b){try{return this.guessFunctionNameFromLines(b,this.getSource(a))}catch(c){return"getSource failed with url: "+a+", exception: "+c.toString()}},guessFunctionNameFromLines:function(a,b){var c=/function ([^(]*)\(([^)]*)\)/,d=/['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,e="",f=10;for(var g=0;g<f;++g){e=b[a-g]+e;if(e!==undefined){var h=d.exec(e);if(h&&h[1])return h[1];h=c.exec(e);if(h&&h[1])return h[1]}}return"(?)"}}