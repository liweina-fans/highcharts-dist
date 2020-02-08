/*
 Highcharts JS v8.0.0 (2020-02-08)

 (c) 2014-2019 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define("highcharts/modules/treemap",["highcharts"],function(p){c(p);c.Highcharts=p;return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){function p(c,f,v,h){c.hasOwnProperty(f)||(c[f]=h.apply(null,v))}c=c?c._modules:{};p(c,"mixins/tree-series.js",[c["parts/Color.js"],c["parts/Utilities.js"]],function(c,f){var v=f.extend,h=f.isArray,k=f.isNumber,t=f.isObject,
r=f.merge,A=f.pick;return{getColor:function(d,g){var f=g.index,k=g.mapOptionsToLevel,h=g.parentColor,t=g.parentColorIndex,r=g.series,w=g.colors,y=g.siblings,n=r.points,q=r.chart.options.chart,x;if(d){n=n[d.i];d=k[d.level]||{};if(k=n&&d.colorByPoint){var v=n.index%(w?w.length:q.colorCount);var p=w&&w[v]}if(!r.chart.styledMode){w=n&&n.options.color;q=d&&d.color;if(x=h)x=(x=d&&d.colorVariation)&&"brightness"===x.key?c.parse(h).brighten(f/y*x.to).get():h;x=A(w,q,p,x,r.color)}var K=A(n&&n.options.colorIndex,
d&&d.colorIndex,v,t,g.colorIndex)}return{color:x,colorIndex:K}},getLevelOptions:function(d){var g=null;if(t(d)){g={};var f=k(d.from)?d.from:1;var c=d.levels;var C={};var p=t(d.defaults)?d.defaults:{};h(c)&&(C=c.reduce(function(g,d){if(t(d)&&k(d.level)){var c=r({},d);var B="boolean"===typeof c.levelIsConstant?c.levelIsConstant:p.levelIsConstant;delete c.levelIsConstant;delete c.level;d=d.level+(B?0:f-1);t(g[d])?v(g[d],c):g[d]=c}return g},{}));c=k(d.to)?d.to:1;for(d=0;d<=c;d++)g[d]=r({},p,t(C[d])?C[d]:
{})}return g},setTreeValues:function F(g,c){var f=c.before,k=c.idRoot,r=c.mapIdToNode[k],h=c.points[g.i],t=h&&h.options||{},n=0,q=[];v(g,{levelDynamic:g.level-(("boolean"===typeof c.levelIsConstant?c.levelIsConstant:1)?0:r.level),name:A(h&&h.name,""),visible:k===g.id||("boolean"===typeof c.visible?c.visible:!1)});"function"===typeof f&&(g=f(g,c));g.children.forEach(function(f,k){var h=v({},c);v(h,{index:k,siblings:g.children.length,visible:g.visible});f=F(f,h);q.push(f);f.visible&&(n+=f.val)});g.visible=
0<n||g.visible;f=A(t.value,n);v(g,{children:q,childrenTotal:n,isLeaf:g.visible&&!n,val:f});return g},updateRootId:function(c){if(t(c)){var f=t(c.options)?c.options:{};f=A(c.rootNode,f.rootId,"");t(c.userOptions)&&(c.userOptions.rootId=f);c.rootNode=f}return f}}});p(c,"mixins/draw-point.js",[],function(){var c=function(c){var f=this,h=f.graphic,k=c.animatableAttribs,r=c.onComplete,p=c.css,A=c.renderer;if(f.shouldDraw())h||(f.graphic=h=A[c.shapeType](c.shapeArgs).add(c.group)),h.css(p).attr(c.attribs).animate(k,
c.isNew?!1:void 0,r);else if(h){var d=function(){f.graphic=h=h.destroy();"function"===typeof r&&r()};Object.keys(k).length?h.animate(k,void 0,function(){d()}):d()}};return function(f){(f.attribs=f.attribs||{})["class"]=this.getClassName();c.call(this,f)}});p(c,"modules/treemap.src.js",[c["parts/Globals.js"],c["mixins/tree-series.js"],c["mixins/draw-point.js"],c["parts/Color.js"],c["parts/Utilities.js"]],function(c,f,p,h,k){var t=h.parse,r=k.addEvent,v=k.correctFloat,d=k.defined,g=k.error,B=k.extend,
F=k.fireEvent,C=k.isArray,J=k.isNumber,L=k.isObject,w=k.isString,y=k.merge,n=k.objectEach,q=k.pick,x=k.stableSort;h=c.seriesType;var G=c.seriesTypes;k=c.noop;var M=f.getColor,N=f.getLevelOptions,D=c.Series,O=function(a,b,e){e=e||this;n(a,function(c,l){b.call(e,c,l,a)})},E=function(a,b,e){e=e||this;a=b.call(e,a);!1!==a&&E(a,b,e)},P=f.updateRootId,H=!1;h("treemap","scatter",{allowTraversingTree:!1,animationLimit:250,showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var a=
this&&this.point?this.point:{};return w(a.name)?a.name:""},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,colorKey:"colorValue",opacity:.15,states:{hover:{borderColor:"#999999",
brightness:G.heatmap?0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:k,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,b){a=C(a)?a:[];var e=C(b)?b:[];b=a.reduce(function(a,b,e){b=q(b.parent,"");"undefined"===typeof a[b]&&(a[b]=[]);a[b].push(e);return a},{"":[]});O(b,function(a,b,c){""!==b&&-1===e.indexOf(b)&&(a.forEach(function(a){c[""].push(a)}),
delete c[b])});return b},getTree:function(){var a=this.data.map(function(a){return a.id});a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},hasData:function(){return!!this.processedXData.length},init:function(a,b){var e=c.colorMapSeriesMixin;e&&(this.colorAttribs=e.colorAttribs);this.eventsToUnbind.push(r(this,"setOptions",function(a){a=a.userOptions;d(a.allowDrillToNode)&&!d(a.allowTraversingTree)&&(a.allowTraversingTree=a.allowDrillToNode,delete a.allowDrillToNode);
d(a.drillUpButton)&&!d(a.traverseUpButton)&&(a.traverseUpButton=a.drillUpButton,delete a.drillUpButton)}));D.prototype.init.call(this,a,b);this.options.allowTraversingTree&&this.eventsToUnbind.push(r(this,"click",this.onClickDrillToNode))},buildNode:function(a,b,e,c,l){var z=this,m=[],u=z.points[b],d=0,I;(c[a]||[]).forEach(function(b){I=z.buildNode(z.points[b].id,b,e+1,c,a);d=Math.max(I.height+1,d);m.push(I)});b={id:a,i:b,children:m,height:d,level:e,parent:l,visible:!1};z.nodeMap[b.id]=b;u&&(u.node=
b);return b},setTreeValues:function(a){var b=this,e=b.options,c=b.nodeMap[b.rootNode];e="boolean"===typeof e.levelIsConstant?e.levelIsConstant:!0;var l=0,z=[],m=b.points[a.i];a.children.forEach(function(a){a=b.setTreeValues(a);z.push(a);a.ignore||(l+=a.val)});x(z,function(a,b){return a.sortIndex-b.sortIndex});var d=q(m&&m.options.value,l);m&&(m.value=d);B(a,{children:z,childrenTotal:l,ignore:!(q(m&&m.visible,!0)&&0<d),isLeaf:a.visible&&!l,levelDynamic:a.level-(e?0:c.level),name:q(m&&m.name,""),sortIndex:q(m&&
m.sortIndex,-d),val:d});return a},calculateChildrenAreas:function(a,b){var e=this,c=e.options,l=e.mapOptionsToLevel[a.level+1],d=q(e[l&&l.layoutAlgorithm]&&l.layoutAlgorithm,c.layoutAlgorithm),m=c.alternateStartingDirection,f=[];a=a.children.filter(function(a){return!a.ignore});l&&l.layoutStartingDirection&&(b.direction="vertical"===l.layoutStartingDirection?0:1);f=e[d](b,a);a.forEach(function(a,c){c=f[c];a.values=y(c,{val:a.childrenTotal,direction:m?1-b.direction:b.direction});a.pointValues=y(c,
{x:c.x/e.axisRatio,y:100-c.y-c.height,width:c.width/e.axisRatio});a.children.length&&e.calculateChildrenAreas(a,a.values)})},setPointValues:function(){var a=this,b=a.xAxis,e=a.yAxis,c=a.chart.styledMode;a.points.forEach(function(l){var d=l.node,m=d.pointValues;d=d.visible;if(m&&d){d=m.height;var f=m.width,u=m.x,g=m.y,k=c?0:(a.pointAttribs(l)["stroke-width"]||0)%2/2;m=Math.round(b.toPixels(u,!0))-k;f=Math.round(b.toPixels(u+f,!0))-k;u=Math.round(e.toPixels(g,!0))-k;d=Math.round(e.toPixels(g+d,!0))-
k;l.shapeArgs={x:Math.min(m,f),y:Math.min(u,d),width:Math.abs(f-m),height:Math.abs(d-u)};l.plotX=l.shapeArgs.x+l.shapeArgs.width/2;l.plotY=l.shapeArgs.y+l.shapeArgs.height/2}else delete l.plotX,delete l.plotY})},setColorRecursive:function(a,b,e,c,l){var d=this,m=d&&d.chart;m=m&&m.options&&m.options.colors;if(a){var f=M(a,{colors:m,index:c,mapOptionsToLevel:d.mapOptionsToLevel,parentColor:b,parentColorIndex:e,series:d,siblings:l});if(b=d.points[a.i])b.color=f.color,b.colorIndex=f.colorIndex;(a.children||
[]).forEach(function(b,e){d.setColorRecursive(b,f.color,f.colorIndex,e,a.children.length)})}},algorithmGroup:function(a,b,e,c){this.height=a;this.width=b;this.plot=c;this.startDirection=this.direction=e;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,b){return Math.max(a/b,b/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/
this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,
b,e,c){var l,d,f,u,k=e.lW,g=e.lH,h=e.plot,q=0,r=e.elArr.length-1;if(b)k=e.nW,g=e.nH;else var p=e.elArr[e.elArr.length-1];e.elArr.forEach(function(a){if(b||q<r)0===e.direction?(l=h.x,d=h.y,f=k,u=a/f):(l=h.x,d=h.y,u=g,f=a/u),c.push({x:l,y:d,width:f,height:v(u)}),0===e.direction?h.y+=u:h.x+=f;q+=1});e.reset();0===e.direction?e.width-=k:e.height-=g;h.y=h.parent.y+(h.parent.height-e.height);h.x=h.parent.x+(h.parent.width-e.width);a&&(e.direction=1-e.direction);b||e.addElement(p)},algorithmLowAspectRatio:function(a,
b,e){var c=[],l=this,d,f={x:b.x,y:b.y,parent:b},h=0,k=e.length-1,g=new this.algorithmGroup(b.height,b.width,b.direction,f);e.forEach(function(e){d=e.val/b.val*b.height*b.width;g.addElement(d);g.lP.nR>g.lP.lR&&l.algorithmCalcPoints(a,!1,g,c,f);h===k&&l.algorithmCalcPoints(a,!0,g,c,f);h+=1});return c},algorithmFill:function(a,b,e){var c=[],l,d=b.direction,f=b.x,g=b.y,h=b.width,k=b.height,q,r,p,n;e.forEach(function(e){l=e.val/b.val*b.height*b.width;q=f;r=g;0===d?(n=k,p=l/n,h-=p,f+=p):(p=h,n=l/p,k-=n,
g+=n);c.push({x:q,y:r,width:p,height:n});a&&(d=1-d)});return c},strip:function(a,b){return this.algorithmLowAspectRatio(!1,a,b)},squarified:function(a,b){return this.algorithmLowAspectRatio(!0,a,b)},sliceAndDice:function(a,b){return this.algorithmFill(!0,a,b)},stripes:function(a,b){return this.algorithmFill(!1,a,b)},translate:function(){var a=this,b=a.options,c=P(a);D.prototype.translate.call(a);var d=a.tree=a.getTree();var l=a.nodeMap[c];a.renderTraverseUpButton(c);a.mapOptionsToLevel=N({from:l.level+
1,levels:b.levels,to:d.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:b.colorByPoint}});""===c||l&&l.children.length||(a.setRootNode("",!1),c=a.rootNode,l=a.nodeMap[c]);E(a.nodeMap[a.rootNode],function(b){var c=!1,e=b.parent;b.visible=!0;if(e||""===e)c=a.nodeMap[e];return c});E(a.nodeMap[a.rootNode].children,function(a){var b=!1;a.forEach(function(a){a.visible=!0;a.children.length&&(b=(b||[]).concat(a.children))});return b});a.setTreeValues(d);a.axisRatio=a.xAxis.len/a.yAxis.len;
a.nodeMap[""].pointValues=c={x:0,y:0,width:100,height:100};a.nodeMap[""].values=c=y(c,{width:c.width*a.axisRatio,direction:"vertical"===b.layoutStartingDirection?0:1,val:d.val});a.calculateChildrenAreas(d,c);a.colorAxis||b.colorByPoint||a.setColorRecursive(a.tree);b.allowTraversingTree&&(b=l.pointValues,a.xAxis.setExtremes(b.x,b.x+b.width,!1),a.yAxis.setExtremes(b.y,b.y+b.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,b=a.mapOptionsToLevel,
c,d;a.points.filter(function(a){return a.node.visible}).forEach(function(e){d=b[e.node.level];c={style:{}};e.node.isLeaf||(c.enabled=!1);d&&d.dataLabels&&(c=y(c,d.dataLabels),a._hasPointLabels=!0);e.shapeArgs&&(c.style.width=e.shapeArgs.width,e.dataLabel&&e.dataLabel.css({width:e.shapeArgs.width+"px"}));e.dlOptions=y(c,e.options.dataLabels)});D.prototype.drawDataLabels.call(this)},alignDataLabel:function(a,b,c){var e=c.style;!d(e.textOverflow)&&b.text&&b.getBBox().width>b.text.textWidth&&b.css({textOverflow:"ellipsis",
width:e.width+="px"});G.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1})},pointAttribs:function(a,b){var c=L(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},d=a&&c[a.node.level]||{};c=this.options;var f=b&&c.states[b]||{},g=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||d.borderColor||f.borderColor||c.borderColor,"stroke-width":q(a&&a.borderWidth,d.borderWidth,f.borderWidth,c.borderWidth),dashstyle:a&&a.borderDashStyle||d.borderDashStyle||
f.borderDashStyle||c.borderDashStyle,fill:a&&a.color||this.color};-1!==g.indexOf("highcharts-above-level")?(a.fill="none",a["stroke-width"]=0):-1!==g.indexOf("highcharts-internal-node-interactive")?(b=q(f.opacity,c.opacity),a.fill=t(a.fill).setOpacity(b).get(),a.cursor="pointer"):-1!==g.indexOf("highcharts-internal-node")?a.fill="none":b&&(a.fill=t(a.fill).brighten(f.brightness).get());return a},drawPoints:function(){var a=this,b=a.chart,c=b.renderer,d=b.styledMode,f=a.options,g=d?{}:f.shadow,h=f.borderRadius,
k=b.pointCount<f.animationLimit,p=f.allowTraversingTree;a.points.forEach(function(b){var e=b.node.levelDynamic,l={},m={},q={},n="level-group-"+e,r=!!b.graphic,u=k&&r,t=b.shapeArgs;b.shouldDraw()&&(h&&(m.r=h),y(!0,u?l:m,r?t:{},d?{}:a.pointAttribs(b,b.selected&&"select")),a.colorAttribs&&d&&B(q,a.colorAttribs(b)),a[n]||(a[n]=c.g(n).attr({zIndex:1E3-e}).add(a.group),a[n].survive=!0));b.draw({animatableAttribs:l,attribs:m,css:q,group:a[n],renderer:c,shadow:g,shapeArgs:t,shapeType:"rect"});p&&b.graphic&&
(b.drillId=f.interactByLeaf?a.drillToByLeaf(b):a.drillToByGroup(b))})},onClickDrillToNode:function(a){var b=(a=a.point)&&a.drillId;w(b)&&(a.setState(""),this.setRootNode(b,!0,{trigger:"click"}))},drillToByGroup:function(a){var b=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(b=a.id);return b},drillToByLeaf:function(a){var b=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!b;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(b=a.id);return b},drillUp:function(){var a=
this.nodeMap[this.rootNode];a&&w(a.parent)&&this.setRootNode(a.parent,!0,{trigger:"traverseUpButton"})},drillToNode:function(a,b){g("WARNING: treemap.drillToNode has been renamed to treemap.setRootNode, and will be removed in the next major version.");this.setRootNode(a,b)},setRootNode:function(a,b,c){a=B({newRootId:a,previousRootId:this.rootNode,redraw:q(b,!0),series:this},c);F(this,"setRootNode",a,function(a){var b=a.series;b.idPreviousRoot=a.previousRootId;b.rootNode=a.newRootId;b.isDirty=!0;a.redraw&&
b.chart.redraw()})},renderTraverseUpButton:function(a){var b=this,c=b.options.traverseUpButton,d=q(c.text,b.nodeMap[a].name,"< Back");if(""===a)b.drillUpButton&&(b.drillUpButton=b.drillUpButton.destroy());else if(this.drillUpButton)this.drillUpButton.placed=!1,this.drillUpButton.attr({text:d}).align();else{var f=(a=c.theme)&&a.states;this.drillUpButton=this.chart.renderer.button(d,null,null,function(){b.drillUp()},a,f&&f.hover,f&&f.select).addClass("highcharts-drillup-button").attr({align:c.position.align,
zIndex:7}).add().align(c.position,!1,c.relativeTo||"plotBox")}},buildKDTree:k,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,getExtremes:function(){D.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;D.prototype.getExtremes.call(this)},getExtremesFromAll:!0,setState:function(a){this.options.inactiveOtherPoints=!0;D.prototype.setState.call(this,a,!1);this.options.inactiveOtherPoints=!1},utils:{recursive:E}},{draw:p,setVisible:G.pie.prototype.pointClass.prototype.setVisible,
getClassName:function(){var a=c.Point.prototype.getClassName.call(this),b=this.series,d=b.options;this.node.level<=b.nodeMap[b.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||q(d.interactByLeaf,!d.allowTraversingTree)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||J(this.value)},setState:function(a){c.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:
0})},shouldDraw:function(){return J(this.plotY)&&null!==this.y}});r(c.Series,"afterBindAxes",function(){var a=this.xAxis,b=this.yAxis;if(a&&b)if(this.is("treemap")){var c={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};B(b.options,c);B(a.options,c);H=!0}else H&&(b.setOptions(b.userOptions),a.setOptions(a.userOptions),H=!1)});""});p(c,"masters/modules/treemap.src.js",[],function(){})});
//# sourceMappingURL=treemap.js.map