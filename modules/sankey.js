/*
 Highcharts JS v8.0.0 (2020-02-08)

 Sankey diagram module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sankey",["highcharts"],function(p){b(p);b.Highcharts=p;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function p(b,n,g,p){b.hasOwnProperty(n)||(b[n]=p.apply(null,g))}b=b?b._modules:{};p(b,"mixins/nodes.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,n){var g=n.defined,r=n.extend,p=n.pick,h=b.Point;b.NodesMixin=
{createNode:function(g){function f(a,d){return b.find(a,function(a){return a.id===d})}var a=f(this.nodes,g),d=this.pointClass;if(!a){var t=this.options.nodes&&f(this.options.nodes,g);a=(new d).init(this,r({className:"highcharts-node",isNode:!0,id:g,y:1},t));a.linksTo=[];a.linksFrom=[];a.formatPrefix="node";a.name=a.name||a.options.id;a.mass=p(a.options.mass,a.options.marker&&a.options.marker.radius,this.options.marker&&this.options.marker.radius,4);a.getSum=function(){var d=0,b=0;a.linksTo.forEach(function(a){d+=
a.weight});a.linksFrom.forEach(function(a){b+=a.weight});return Math.max(d,b)};a.offset=function(d,b){for(var e=0,k=0;k<a[b].length;k++){if(a[b][k]===d)return e;e+=a[b][k].weight}};a.hasShape=function(){var d=0;a.linksTo.forEach(function(a){a.outgoing&&d++});return!a.linksTo.length||d!==a.linksTo.length};this.nodes.push(a)}return a},generatePoints:function(){var h=this.chart,f={};b.Series.prototype.generatePoints.call(this);this.nodes||(this.nodes=[]);this.colorCounter=0;this.nodes.forEach(function(a){a.linksFrom.length=
0;a.linksTo.length=0;a.level=a.options.level});this.points.forEach(function(a){g(a.from)&&(f[a.from]||(f[a.from]=this.createNode(a.from)),f[a.from].linksFrom.push(a),a.fromNode=f[a.from],h.styledMode?a.colorIndex=p(a.options.colorIndex,f[a.from].colorIndex):a.color=a.options.color||f[a.from].color);g(a.to)&&(f[a.to]||(f[a.to]=this.createNode(a.to)),f[a.to].linksTo.push(a),a.toNode=f[a.to]);a.name=a.name||a.id},this);this.nodeLookup=f},setData:function(){this.nodes&&(this.nodes.forEach(function(b){b.destroy()}),
this.nodes.length=0);b.Series.prototype.setData.apply(this,arguments)},destroy:function(){this.data=[].concat(this.points||[],this.nodes);return b.Series.prototype.destroy.apply(this,arguments)},setNodeState:function(b){var f=arguments,a=this.isNode?this.linksTo.concat(this.linksFrom):[this.fromNode,this.toNode];"select"!==b&&a.forEach(function(a){a&&a.series&&(h.prototype.setState.apply(a,f),a.isNode||(a.fromNode.graphic&&h.prototype.setState.apply(a.fromNode,f),a.toNode&&a.toNode.graphic&&h.prototype.setState.apply(a.toNode,
f)))});h.prototype.setState.apply(this,f)}}});p(b,"mixins/tree-series.js",[b["parts/Color.js"],b["parts/Utilities.js"]],function(b,n){var g=n.extend,p=n.isArray,r=n.isNumber,h=n.isObject,v=n.merge,f=n.pick;return{getColor:function(a,d){var t=d.index,g=d.mapOptionsToLevel,h=d.parentColor,e=d.parentColorIndex,k=d.series,c=d.colors,D=d.siblings,q=k.points,y=k.chart.options.chart,l;if(a){q=q[a.i];a=g[a.level]||{};if(g=q&&a.colorByPoint){var m=q.index%(c?c.length:y.colorCount);var I=c&&c[m]}if(!k.chart.styledMode){c=
q&&q.options.color;y=a&&a.color;if(l=h)l=(l=a&&a.colorVariation)&&"brightness"===l.key?b.parse(h).brighten(t/D*l.to).get():h;l=f(c,y,I,l,k.color)}var r=f(q&&q.options.colorIndex,a&&a.colorIndex,m,e,d.colorIndex)}return{color:l,colorIndex:r}},getLevelOptions:function(a){var d=null;if(h(a)){d={};var b=r(a.from)?a.from:1;var f=a.levels;var n={};var e=h(a.defaults)?a.defaults:{};p(f)&&(n=f.reduce(function(a,c){if(h(c)&&r(c.level)){var k=v({},c);var q="boolean"===typeof k.levelIsConstant?k.levelIsConstant:
e.levelIsConstant;delete k.levelIsConstant;delete k.level;c=c.level+(q?0:b-1);h(a[c])?g(a[c],k):a[c]=k}return a},{}));f=r(a.to)?a.to:1;for(a=0;a<=f;a++)d[a]=v({},e,h(n[a])?n[a]:{})}return d},setTreeValues:function w(d,b){var h=b.before,e=b.idRoot,k=b.mapIdToNode[e],c=b.points[d.i],D=c&&c.options||{},q=0,y=[];g(d,{levelDynamic:d.level-(("boolean"===typeof b.levelIsConstant?b.levelIsConstant:1)?0:k.level),name:f(c&&c.name,""),visible:e===d.id||("boolean"===typeof b.visible?b.visible:!1)});"function"===
typeof h&&(d=h(d,b));d.children.forEach(function(c,e){var k=g({},b);g(k,{index:e,siblings:d.children.length,visible:d.visible});c=w(c,k);y.push(c);c.visible&&(q+=c.val)});d.visible=0<q||d.visible;h=f(D.value,q);g(d,{children:y,childrenTotal:q,isLeaf:d.visible&&!q,val:h});return d},updateRootId:function(b){if(h(b)){var d=h(b.options)?b.options:{};d=f(b.rootNode,d.rootId,"");h(b.userOptions)&&(b.userOptions.rootId=d);b.rootNode=d}return d}}});p(b,"modules/sankey.src.js",[b["parts/Globals.js"],b["parts/Color.js"],
b["parts/Utilities.js"],b["mixins/tree-series.js"]],function(b,n,g,p){var r=g.defined,h=g.isObject,v=g.merge,f=g.pick,a=g.relativeLength,d=g.stableSort,t=p.getLevelOptions,w=b.find;g=b.seriesType;var z=b.Point;g("sankey","column",{borderWidth:0,colorByPoint:!0,curveFactor:.33,dataLabels:{enabled:!0,backgroundColor:"none",crop:!1,nodeFormat:void 0,nodeFormatter:function(){return this.point.name},format:void 0,formatter:function(){},inside:!0},inactiveOtherPoints:!0,linkOpacity:.5,minLinkWidth:0,nodeWidth:20,
nodePadding:10,showInLegend:!1,states:{hover:{linkOpacity:1},inactive:{linkOpacity:.1,opacity:.1,animation:{duration:50}}},tooltip:{followPointer:!0,headerFormat:'<span style="font-size: 10px">{series.name}</span><br/>',pointFormat:"{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>",nodeFormat:"{point.name}: <b>{point.sum}</b><br/>"}},{isCartesian:!1,invertable:!0,forceDL:!0,orderNodes:!0,pointArrayMap:["from","to"],createNode:b.NodesMixin.createNode,setData:b.NodesMixin.setData,
destroy:b.NodesMixin.destroy,getNodePadding:function(){return this.options.nodePadding},createNodeColumn:function(){var b=this.chart,k=[],c=this.getNodePadding();k.sum=function(){return this.reduce(function(a,c){return a+c.getSum()},0)};k.offset=function(b,e){for(var q=0,l,m=0;m<k.length;m++){l=(l=k[m].getSum())?l*e+c:0;if(k[m]===b)return{relativeTop:q+a(b.options.offset||0,l)};q+=l}};k.top=function(a){var e=this.reduce(function(b,e){0<b&&(b+=c);return b+=e.getSum()*a},0);return(b.plotSizeY-e)/2};
return k},createNodeColumns:function(){var a=[];this.nodes.forEach(function(c){var b=-1,e;if(!r(c.options.column))if(0===c.linksTo.length)c.column=0;else{for(e=0;e<c.linksTo.length;e++){var k=c.linksTo[0];if(k.fromNode.column>b){var d=k.fromNode;b=d.column}}c.column=b+1;d&&"hanging"===d.options.layout&&(c.hangsFrom=d,e=-1,w(d.linksFrom,function(a,b){(a=a.toNode===c)&&(e=b);return a}),c.column+=e)}a[c.column]||(a[c.column]=this.createNodeColumn());a[c.column].push(c)},this);for(var b=0;b<a.length;b++)"undefined"===
typeof a[b]&&(a[b]=this.createNodeColumn());return a},hasData:function(){return!!this.processedXData.length},pointAttribs:function(a,b){var c=this,e=c.mapOptionsToLevel[(a.isNode?a.level:a.fromNode.level)||0]||{},k=a.options,d=e.states&&e.states[b]||{};b=["colorByPoint","borderColor","borderWidth","linkOpacity"].reduce(function(a,b){a[b]=f(d[b],k[b],e[b],c.options[b]);return a},{});var l=f(d.color,k.color,b.colorByPoint?a.color:e.color);return a.isNode?{fill:l,stroke:b.borderColor,"stroke-width":b.borderWidth}:
{fill:n.parse(l).setOpacity(b.linkOpacity).get()}},generatePoints:function(){function a(b,c){"undefined"===typeof b.level&&(b.level=c,b.linksFrom.forEach(function(b){b.toNode&&a(b.toNode,c+1)}))}b.NodesMixin.generatePoints.apply(this,arguments);this.orderNodes&&(this.nodes.filter(function(a){return 0===a.linksTo.length}).forEach(function(b){a(b,0)}),d(this.nodes,function(a,b){return a.level-b.level}))},translateNode:function(a,b){var c=this.translationFactor,d=this.chart,e=this.options,k=a.getSum(),
l=Math.round(k*c),m=Math.round(e.borderWidth)%2/2,g=b.offset(a,c);b=Math.floor(f(g.absoluteTop,b.top(c)+g.relativeTop))+m;m=Math.floor(this.colDistance*a.column+e.borderWidth/2)+m;m=d.inverted?d.plotSizeX-m:m;c=Math.round(this.nodeWidth);(a.sum=k)?(a.shapeType="rect",a.nodeX=m,a.nodeY=b,a.shapeArgs=d.inverted?{x:m-c,y:d.plotSizeY-b-l,width:a.options.height||e.height||c,height:a.options.width||e.width||l}:{x:m,y:b,width:a.options.width||e.width||c,height:a.options.height||e.height||l},a.shapeArgs.display=
a.hasShape()?"":"none",d=this.mapOptionsToLevel[a.level],e=a.options,e=h(e)?e.dataLabels:{},d=h(d)?d.dataLabels:{},d=v({style:{}},d,e),a.dlOptions=d,a.plotY=1):a.dlOptions={enabled:!1}},translateLink:function(a){var b=a.fromNode,c=a.toNode,d=this.chart,e=this.translationFactor,f=Math.max(a.weight*e,this.options.minLinkWidth),l=this.options,m=b.offset(a,"linksFrom")*e,g=(d.inverted?-this.colDistance:this.colDistance)*l.curveFactor;m=b.nodeY+m;l=b.nodeX;e=this.nodeColumns[c.column].top(e)+c.offset(a,
"linksTo")*e+this.nodeColumns[c.column].offset(c,e).relativeTop;var h=this.nodeWidth;c=c.column*this.colDistance;var n=a.outgoing,p=c>l;d.inverted&&(m=d.plotSizeY-m,e=d.plotSizeY-e,c=d.plotSizeX-c,h=-h,f=-f,p=l>c);a.shapeType="path";a.linkBase=[m,m+f,e,e+f];if(p)a.shapeArgs={d:["M",l+h,m,"C",l+h+g,m,c-g,e,c,e,"L",c+(n?h:0),e+f/2,"L",c,e+f,"C",c-g,e+f,l+h+g,m+f,l+h,m+f,"z"]};else{g=c-20-f;n=c-20;p=c;var r=l+h,x=r+20,t=x+f,v=m,A=m+f,w=A+20;d=w+(d.plotHeight-m-f);var u=d+20,C=u+f,E=e,B=E+f,z=B+20,F=
u+.7*f,G=p-.7*f,H=r+.7*f;a.shapeArgs={d:["M",r,v,"C",H,v,t,A-.7*f,t,w,"L",t,d,"C",t,F,H,C,r,C,"L",p,C,"C",G,C,g,F,g,d,"L",g,z,"C",g,B-.7*f,G,E,p,E,"L",p,B,"C",n,B,n,B,n,z,"L",n,d,"C",n,u,n,u,p,u,"L",r,u,"C",x,u,x,u,x,d,"L",x,w,"C",x,A,x,A,r,A,"z"]}}a.dlBox={x:l+(c-l+h)/2,y:m+(e-m)/2,height:f,width:0};a.y=a.plotY=1;a.color||(a.color=b.color)},translate:function(){this.processedXData||this.processData();this.generatePoints();this.nodeColumns=this.createNodeColumns();this.nodeWidth=a(this.options.nodeWidth,
this.chart.plotSizeX);var b=this,d=this.chart,c=this.options,f=this.nodeWidth,g=this.nodeColumns,h=this.getNodePadding();this.translationFactor=g.reduce(function(a,b){return Math.min(a,(d.plotSizeY-c.borderWidth-(b.length-1)*h)/b.sum())},Infinity);this.colDistance=(d.plotSizeX-f-c.borderWidth)/Math.max(1,g.length-1);b.mapOptionsToLevel=t({from:1,levels:c.levels,to:g.length-1,defaults:{borderColor:c.borderColor,borderRadius:c.borderRadius,borderWidth:c.borderWidth,color:b.color,colorByPoint:c.colorByPoint,
levelIsConstant:!0,linkColor:c.linkColor,linkLineWidth:c.linkLineWidth,linkOpacity:c.linkOpacity,states:c.states}});g.forEach(function(a){a.forEach(function(c){b.translateNode(c,a)})},this);this.nodes.forEach(function(a){a.linksFrom.forEach(function(a){(a.weight||a.isNull)&&a.to&&(b.translateLink(a),a.allowShadow=!1)})})},render:function(){var a=this.points;this.points=this.points.concat(this.nodes||[]);b.seriesTypes.column.prototype.render.call(this);this.points=a},animate:b.Series.prototype.animate},
{applyOptions:function(a,b){z.prototype.applyOptions.call(this,a,b);r(this.options.level)&&(this.options.column=this.column=this.options.level);return this},setState:b.NodesMixin.setNodeState,getClassName:function(){return(this.isNode?"highcharts-node ":"highcharts-link ")+z.prototype.getClassName.call(this)},isValid:function(){return this.isNode||"number"===typeof this.weight}});""});p(b,"masters/modules/sankey.src.js",[],function(){})});
//# sourceMappingURL=sankey.js.map