/*
 Highcharts JS v8.0.0 (2020-02-08)

 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define("highcharts/modules/export-data",["highcharts","highcharts/modules/exporting"],function(f){c(f);c.Highcharts=f;return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){function f(b,a,c,r){b.hasOwnProperty(a)||(b[a]=r.apply(null,c))}c=c?c._modules:{};f(c,"mixins/ajax.js",[c["parts/Globals.js"],c["parts/Utilities.js"]],function(b,a){var c=a.merge,
r=a.objectEach;b.ajax=function(b){var a=c(!0,{url:!1,type:"get",dataType:"json",success:!1,error:!1,data:!1,headers:{}},b);b={json:"application/json",xml:"application/xml",text:"text/plain",octet:"application/octet-stream"};var e=new XMLHttpRequest;if(!a.url)return!1;e.open(a.type.toUpperCase(),a.url,!0);a.headers["Content-Type"]||e.setRequestHeader("Content-Type",b[a.dataType]||b.text);r(a.headers,function(a,b){e.setRequestHeader(b,a)});e.onreadystatechange=function(){if(4===e.readyState){if(200===
e.status){var b=e.responseText;if("json"===a.dataType)try{b=JSON.parse(b)}catch(h){a.error&&a.error(e,h);return}return a.success&&a.success(b)}a.error&&a.error(e,e.responseText)}};try{a.data=JSON.stringify(a.data)}catch(l){}e.send(a.data||!0)};b.getJSON=function(a,c){b.ajax({url:a,success:c,dataType:"json",headers:{"Content-Type":"text/plain"}})}});f(c,"mixins/download-url.js",[c["parts/Globals.js"]],function(b){var a=b.win,c=a.navigator,r=a.document,f=a.URL||a.webkitURL||a,A=/Edge\/\d+/.test(c.userAgent);
b.dataURLtoBlob=function(b){if((b=b.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/))&&3<b.length&&a.atob&&a.ArrayBuffer&&a.Uint8Array&&a.Blob&&f.createObjectURL){var c=a.atob(b[3]),e=new a.ArrayBuffer(c.length);e=new a.Uint8Array(e);for(var d=0;d<e.length;++d)e[d]=c.charCodeAt(d);b=new a.Blob([e],{type:b[1]});return f.createObjectURL(b)}};b.downloadURL=function(e,l){var h=r.createElement("a");if("string"===typeof e||e instanceof String||!c.msSaveOrOpenBlob){if(A||2E6<e.length)if(e=b.dataURLtoBlob(e),
!e)throw Error("Failed to convert to blob");if("undefined"!==typeof h.download)h.href=e,h.download=l,r.body.appendChild(h),h.click(),r.body.removeChild(h);else try{var d=a.open(e,"chart");if("undefined"===typeof d||null===d)throw Error("Failed to open window");}catch(B){a.location.href=e}}else c.msSaveOrOpenBlob(e,l)}});f(c,"modules/export-data.src.js",[c["parts/Globals.js"],c["parts/Utilities.js"]],function(b,a){function c(b,a){var c=l.navigator,e=-1<c.userAgent.indexOf("WebKit")&&0>c.userAgent.indexOf("Chrome"),
t=l.URL||l.webkitURL||l;try{if(c.msSaveOrOpenBlob&&l.MSBlobBuilder){var y=new l.MSBlobBuilder;y.append(b);return y.getBlob("image/svg+xml")}if(!e)return t.createObjectURL(new l.Blob(["\ufeff"+b],{type:a}))}catch(I){}}var f=a.defined,G=a.extend,A=a.isObject,e=a.pick,l=b.win,h=l.document,d=b.seriesTypes,B=b.downloadURL,C=b.fireEvent;b.setOptions({exporting:{csv:{columnHeaderFormatter:null,dateFormat:"%Y-%m-%d %H:%M:%S",decimalPoint:null,itemDelimiter:null,lineDelimiter:"\n"},showTable:!1,useMultiLevelHeaders:!0,
useRowspanHeaders:!0},lang:{downloadCSV:"Download CSV",downloadXLS:"Download XLS",openInCloud:"Open in Highcharts Cloud",viewData:"View data table"}});b.addEvent(b.Chart,"render",function(){this.options&&this.options.exporting&&this.options.exporting.showTable&&!this.options.chart.forExport&&this.viewData()});b.Chart.prototype.setUpKeyToAxis=function(){d.arearange&&(d.arearange.prototype.keyToAxis={low:"y",high:"y"});d.gantt&&(d.gantt.prototype.keyToAxis={start:"x",end:"x"})};b.Chart.prototype.getDataRows=
function(a){var c=this.hasParallelCoordinates,t=this.time,z=this.options.exporting&&this.options.exporting.csv||{},m=this.xAxis,d={},h=[],l=[],u=[],p,D=function(k,c,e){if(z.columnHeaderFormatter){var g=z.columnHeaderFormatter(k,c,e);if(!1!==g)return g}return k?k instanceof b.Axis?k.options.title&&k.options.title.text||(k.isDatetimeAxis?"DateTime":"Category"):a?{columnTitle:1<e?c:k.name,topLevelColumnTitle:k.name}:k.name+(1<e?" ("+c+")":""):"Category"},E=function(a,c,e){var k={},g={};c.forEach(function(c){var d=
(a.keyToAxis&&a.keyToAxis[c]||c)+"Axis";d=b.isNumber(e)?a.chart[d][e]:a[d];k[c]=d&&d.categories||[];g[c]=d&&d.isDatetimeAxis});return{categoryMap:k,dateTimeValueAxisMap:g}},g=[];var v=0;this.setUpKeyToAxis();this.series.forEach(function(k){var q=k.options.keys||k.pointArrayMap||["y"],y=q.length,n=!k.requireSorting&&{},w=m.indexOf(k.xAxis),h=E(k,q),f;if(!1!==k.options.includeInDataExport&&!k.options.isInternal&&!1!==k.visible){b.find(g,function(a){return a[0]===w})||g.push([w,v]);for(f=0;f<y;)p=D(k,
q[f],q.length),u.push(p.columnTitle||p),a&&l.push(p.topLevelColumnTitle||p),f++;var H={chart:k.chart,autoIncrement:k.autoIncrement,options:k.options,pointArrayMap:k.pointArrayMap};k.options.data.forEach(function(a,b){c&&(h=E(k,q,b));var g={series:H};k.pointClass.prototype.applyOptions.apply(g,[a]);a=g.x;var m=k.data[b]&&k.data[b].name;f=0;k.xAxis&&"name"!==k.exportKey||(a=m);n&&(n[a]&&(a+="|"+b),n[a]=!0);d[a]||(d[a]=[],d[a].xValues=[]);d[a].x=g.x;d[a].name=m;for(d[a].xValues[w]=g.x;f<y;)b=q[f],m=
g[b],d[a][v+f]=e(h.categoryMap[b][m],h.dateTimeValueAxisMap[b]?t.dateFormat(z.dateFormat,m):null,m),f++});v+=f}});for(n in d)Object.hasOwnProperty.call(d,n)&&h.push(d[n]);var n=a?[l,u]:[u];for(v=g.length;v--;){var q=g[v][0];var w=g[v][1];var x=m[q];h.sort(function(a,b){return a.xValues[q]-b.xValues[q]});var F=D(x);n[0].splice(w,0,F);a&&n[1]&&n[1].splice(w,0,F);h.forEach(function(a){var b=a.name;x&&!f(b)&&(x.isDatetimeAxis?(a.x instanceof Date&&(a.x=a.x.getTime()),b=t.dateFormat(z.dateFormat,a.x)):
b=x.categories?e(x.names[a.x],x.categories[a.x],a.x):a.x);a.splice(w,0,b)})}n=n.concat(h);C(this,"exportData",{dataRows:n});return n};b.Chart.prototype.getCSV=function(a){var b="",c=this.getDataRows(),d=this.options.exporting.csv,m=e(d.decimalPoint,","!==d.itemDelimiter&&a?(1.1).toLocaleString()[1]:"."),t=e(d.itemDelimiter,","===m?";":","),f=d.lineDelimiter;c.forEach(function(a,e){for(var d,h=a.length;h--;)d=a[h],"string"===typeof d&&(d='"'+d+'"'),"number"===typeof d&&"."!==m&&(d=d.toString().replace(".",
m)),a[h]=d;b+=a.join(t);e<c.length-1&&(b+=f)});return b};b.Chart.prototype.getTable=function(a){var b='<table id="highcharts-data-table-'+this.index+'">',c=this.options,d=a?(1.1).toLocaleString()[1]:".",h=e(c.exporting.useMultiLevelHeaders,!0);a=this.getDataRows(h);var f=0,l=h?a.shift():null,t=a.shift(),u=function(a,b,c,h){var g=e(h,"");b="text"+(b?" "+b:"");"number"===typeof g?(g=g.toString(),","===d&&(g=g.replace(".",d)),b="number"):h||(b="empty");return"<"+a+(c?" "+c:"")+' class="'+b+'">'+g+"</"+
a+">"};!1!==c.exporting.tableCaption&&(b+='<caption class="highcharts-table-caption">'+e(c.exporting.tableCaption,c.title.text?c.title.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):"Chart")+"</caption>");for(var p=0,r=a.length;p<r;++p)a[p].length>f&&(f=a[p].length);b+=function(a,b,d){var e="<thead>",f=0;d=d||b&&b.length;var g,m=0;if(g=h&&a&&b){a:if(g=a.length,b.length===g){for(;g--;)if(a[g]!==b[g]){g=!1;break a}g=
!0}else g=!1;g=!g}if(g){for(e+="<tr>";f<d;++f){g=a[f];var l=a[f+1];g===l?++m:m?(e+=u("th","highcharts-table-topheading",'scope="col" colspan="'+(m+1)+'"',g),m=0):(g===b[f]?c.exporting.useRowspanHeaders?(l=2,delete b[f]):(l=1,b[f]=""):l=1,e+=u("th","highcharts-table-topheading",'scope="col"'+(1<l?' valign="top" rowspan="'+l+'"':""),g))}e+="</tr>"}if(b){e+="<tr>";f=0;for(d=b.length;f<d;++f)"undefined"!==typeof b[f]&&(e+=u("th",null,'scope="col"',b[f]));e+="</tr>"}return e+"</thead>"}(l,t,Math.max(f,
t.length));b+="<tbody>";a.forEach(function(a){b+="<tr>";for(var c=0;c<f;c++)b+=u(c?"td":"th",null,c?"":'scope="row"',a[c]);b+="</tr>"});b+="</tbody></table>";a={html:b};C(this,"afterGetTable",a);return a.html};b.Chart.prototype.downloadCSV=function(){var a=this.getCSV(!0);B(c(a,"text/csv")||"data:text/csv,\ufeff"+encodeURIComponent(a),this.getFilename()+".csv")};b.Chart.prototype.downloadXLS=function(){var a='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>'+
this.getTable(!0)+"</body></html>";B(c(a,"application/vnd.ms-excel")||"data:application/vnd.ms-excel;base64,"+l.btoa(unescape(encodeURIComponent(a))),this.getFilename()+".xls")};b.Chart.prototype.viewData=function(){this.dataTableDiv||(this.dataTableDiv=h.createElement("div"),this.dataTableDiv.className="highcharts-data-table",this.renderTo.parentNode.insertBefore(this.dataTableDiv,this.renderTo.nextSibling));this.dataTableDiv.innerHTML=this.getTable();C(this,"afterViewData",this.dataTableDiv)};b.Chart.prototype.openInCloud=
function(){function a(b){Object.keys(b).forEach(function(c){"function"===typeof b[c]&&delete b[c];A(b[c])&&a(b[c])})}var c=b.merge(this.userOptions);a(c);c={name:c.title&&c.title.text||"Chart title",options:c,settings:{constructor:"Chart",dataProvider:{csv:this.getCSV()}}};var d=JSON.stringify(c);(function(){var a=h.createElement("form");h.body.appendChild(a);a.method="post";a.action="https://cloud-api.highcharts.com/openincloud";a.target="_blank";var b=h.createElement("input");b.type="hidden";b.name=
"chart";b.value=d;a.appendChild(b);a.submit();h.body.removeChild(a)})()};if(a=b.getOptions().exporting)G(a.menuItemDefinitions,{downloadCSV:{textKey:"downloadCSV",onclick:function(){this.downloadCSV()}},downloadXLS:{textKey:"downloadXLS",onclick:function(){this.downloadXLS()}},viewData:{textKey:"viewData",onclick:function(){this.viewData()}},openInCloud:{textKey:"openInCloud",onclick:function(){this.openInCloud()}}}),a.buttons&&a.buttons.contextButton.menuItems.push("separator","downloadCSV","downloadXLS",
"viewData","openInCloud");d.map&&(d.map.prototype.exportKey="name");d.mapbubble&&(d.mapbubble.prototype.exportKey="name");d.treemap&&(d.treemap.prototype.exportKey="name")});f(c,"masters/modules/export-data.src.js",[],function(){})});
//# sourceMappingURL=export-data.js.map