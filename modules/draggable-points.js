/*
 Highcharts JS v8.0.0 (2020-02-08)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/modules/draggable-points",["highcharts"],function(r){e(r);e.Highcharts=r;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function r(e,h,r,z){e.hasOwnProperty(h)||(e[h]=z.apply(null,r))}e=e?e._modules:{};r(e,"modules/draggable-points.src.js",[e["parts/Globals.js"],e["parts/Utilities.js"]],function(e,h){function r(a){return{left:"right",
right:"left",top:"bottom",bottom:"top"}[a]}function z(a){var b=["draggableX","draggableY"],c;p(a.dragDropProps,function(a){a.optionName&&b.push(a.optionName)});for(c=b.length;c--;)if(a.options.dragDrop[b[c]])return!0}function J(a){var b=a.series?a.series.length:0;if(a.hasCartesianSeries&&!a.polar)for(;b--;)if(a.series[b].options.dragDrop&&z(a.series[b]))return!0}function K(a){var b=a.series,c=b.options.dragDrop||{};a=a.options&&a.options.dragDrop;var d,f;p(b.dragDropProps,function(a){"x"===a.axis&&
a.move?d=!0:"y"===a.axis&&a.move&&(f=!0)});return(c.draggableX&&d||c.draggableY&&f)&&!(a&&!1===a.draggableX&&!1===a.draggableY)&&b.yAxis&&b.xAxis}function v(a,b){return"undefined"===typeof a.chartX||"undefined"===typeof a.chartY?b.pointer.normalize(a):a}function w(a,b,c,d){var f=b.map(function(b){return n(a,b,c,d)});return function(){f.forEach(function(a){a()})}}function L(a,b,c){var d=b.dragDropData.origin;b=d.chartX;d=d.chartY;var f=a.chartX;a=a.chartY;return Math.sqrt((f-b)*(f-b)+(a-d)*(a-d))>
c}function M(a,b,c){var d={chartX:a.chartX,chartY:a.chartY,guideBox:c&&{x:c.attr("x"),y:c.attr("y"),width:c.attr("width"),height:c.attr("height")},points:{}};b.forEach(function(b){var c={};p(b.series.dragDropProps,function(d,f){d=b.series[d.axis+"Axis"];c[f]=b[f];c[f+"Offset"]=d.toPixels(b[f])-(d.horiz?a.chartX:a.chartY)});c.point=b;d.points[b.id]=c});return d}function N(a){var b=a.series,c=[],d=b.options.dragDrop.groupBy;b.isSeriesBoosting?b.options.data.forEach(function(a,d){c.push((new b.pointClass).init(b,
a));c[c.length-1].index=d}):c=b.points;return a.options[d]?c.filter(function(b){return b.options[d]===a.options[d]}):[a]}function C(a,b){var c=N(b),d=b.series,f=d.chart,m;u(d.options.dragDrop&&d.options.dragDrop.liveRedraw,!0)||(f.dragGuideBox=m=d.getGuideBox(c),f.setGuideBoxState("default",d.options.dragDrop.guideBox).add(d.group));f.dragDropData={origin:M(a,c,m),point:b,groupedPoints:c,isDragging:!0}}function O(a,b){var c=a.point,d=q(c.series.options.dragDrop,c.options.dragDrop),f={},m=a.updateProp,
e={};p(c.series.dragDropProps,function(a,b){if(!m||m===b&&a.resize&&(!a.optionName||!1!==d[a.optionName]))if(m||a.move&&("x"===a.axis&&d.draggableX||"y"===a.axis&&d.draggableY))f[b]=a});(m?[c]:a.groupedPoints).forEach(function(c){e[c.id]={point:c,newValues:c.getDropValues(a.origin,b,f)}});return e}function D(a,b){var c=a.dragDropData.newPoints;b=!1===b?!1:q({duration:400},a.options.chart.animation);a.isDragDropAnimating=!0;p(c,function(a){a.point.update(a.newValues,!1)});a.redraw(b);setTimeout(function(){delete a.isDragDropAnimating;
a.hoverPoint&&!a.dragHandles&&a.hoverPoint.showDragHandles()},b.duration)}function E(a){var b=a.series&&a.series.chart,c=b&&b.dragDropData;!b||!b.dragHandles||c&&(c.isDragging&&c.draggedPastSensitivity||c.isHoveringHandle===a.id)||b.hideDragHandles()}function F(a){var b=0,c;for(c in a)Object.hasOwnProperty.call(a,c)&&b++;return b}function G(a){for(var b in a)if(Object.hasOwnProperty.call(a,b))return a[b]}function P(a,b){if(!b.zoomOrPanKeyPressed(a)){var c=b.dragDropData;var d=0;if(c&&c.isDragging){var f=
c.point;d=f.series.options.dragDrop;a.preventDefault();c.draggedPastSensitivity||(c.draggedPastSensitivity=L(a,b,u(f.options.dragDrop&&f.options.dragDrop.dragSensitivity,d&&d.dragSensitivity,2)));c.draggedPastSensitivity&&(c.newPoints=O(c,a),b=c.newPoints,d=F(b),b=1===d?G(b):null,f.firePointEvent("drag",{origin:c.origin,newPoints:c.newPoints,newPoint:b&&b.newValues,newPointId:b&&b.point.id,numNewPoints:d,chartX:a.chartX,chartY:a.chartY},function(){var b=f.series,c=b.chart,d=c.dragDropData,e=q(b.options.dragDrop,
f.options.dragDrop),g=e.draggableX,l=e.draggableY;b=d.origin;var k=a.chartX-b.chartX,x=a.chartY-b.chartY,t=k;d=d.updateProp;c.inverted&&(k=-x,x=-t);if(u(e.liveRedraw,!0))D(c,!1),f.showDragHandles();else if(d){g=k;c=x;t=f.series;l=t.chart;d=l.dragDropData;e=t.dragDropProps[d.updateProp];var h=d.newPoints[f.id].newValues;var p="function"===typeof e.resizeSide?e.resizeSide(h,f):e.resizeSide;e.beforeResize&&e.beforeResize(l.dragGuideBox,h,f);l=l.dragGuideBox;t="x"===e.axis&&t.xAxis.reversed||"y"===e.axis&&
t.yAxis.reversed?r(p):p;g="x"===e.axis?g-(d.origin.prevdX||0):0;c="y"===e.axis?c-(d.origin.prevdY||0):0;switch(t){case "left":var n={x:l.attr("x")+g,width:Math.max(1,l.attr("width")-g)};break;case "right":n={width:Math.max(1,l.attr("width")+g)};break;case "top":n={y:l.attr("y")+c,height:Math.max(1,l.attr("height")-c)};break;case "bottom":n={height:Math.max(1,l.attr("height")+c)}}l.attr(n)}else c.dragGuideBox.translate(g?k:0,l?x:0);b.prevdX=k;b.prevdY=x}))}}}function A(a,b){var c=b.dragDropData;if(c&&
c.isDragging&&c.draggedPastSensitivity){var d=c.point,f=c.newPoints,e=F(f),g=1===e?G(f):null;b.dragHandles&&b.hideDragHandles();a.preventDefault();b.cancelClick=!0;d.firePointEvent("drop",{origin:c.origin,chartX:a.chartX,chartY:a.chartY,newPoints:f,numNewPoints:e,newPoint:g&&g.newValues,newPointId:g&&g.point.id},function(){D(b)})}delete b.dragDropData;b.dragGuideBox&&(b.dragGuideBox.destroy(),delete b.dragGuideBox)}function Q(a){var b=a.container,c=e.doc;J(a)&&(w(b,["mousedown","touchstart"],function(b){b=
v(b,a);var c=a.hoverPoint,d=q(c&&c.series.options.dragDrop,c&&c.options.dragDrop),e=d.draggableX||!1;d=d.draggableY||!1;a.cancelClick=!1;!e&&!d||a.zoomOrPanKeyPressed(b)||a.hasDraggedAnnotation||(a.dragDropData&&a.dragDropData.isDragging?A(b,a):c&&K(c)&&(a.mouseIsDown=!1,C(b,c),c.firePointEvent("dragStart",b)))}),w(b,["mousemove","touchmove"],function(b){P(v(b,a),a)}),n(b,"mouseleave",function(b){A(v(b,a),a)}),a.unbindDragDropMouseUp=w(c,["mouseup","touchend"],function(b){A(v(b,a),a)}),a.hasAddedDragDropEvents=
!0,n(a,"destroy",function(){a.unbindDragDropMouseUp&&a.unbindDragDropMouseUp()}))}var n=h.addEvent,R=h.clamp,q=h.merge,p=h.objectEach,u=h.pick,g=e.seriesTypes;h=function(a){a=a.shapeArgs||a.graphic.getBBox();var b=a.r||0,c=a.height/2;return["M",0,b,"L",0,c-5,"A",1,1,0,0,0,0,c+5,"A",1,1,0,0,0,0,c-5,"M",0,c+5,"L",0,a.height-b]};var y=g.line.prototype.dragDropProps={x:{axis:"x",move:!0},y:{axis:"y",move:!0}};g.flags&&(g.flags.prototype.dragDropProps=y);var k=g.column.prototype.dragDropProps={x:{axis:"x",
move:!0},y:{axis:"y",move:!1,resize:!0,beforeResize:function(a,b,c){var d=c.series.translatedThreshold,f=a.attr("y");b.y>=c.series.options.threshold?(b=a.attr("height"),a.attr({height:Math.max(0,Math.round(b+(d?d-(f+b):0)))})):a.attr({y:Math.round(f+(d?d-f:0))})},resizeSide:function(a,b){var c=b.series.chart.dragHandles;a=a.y>=(b.series.options.threshold||0)?"top":"bottom";b=r(a);c[b]&&(c[b].destroy(),delete c[b]);return a},handlePositioner:function(a){var b=a.shapeArgs||a.graphic.getBBox();return{x:b.x,
y:a.y>=(a.series.options.threshold||0)?b.y:b.y+b.height}},handleFormatter:function(a){a=a.shapeArgs;var b=a.r||0,c=a.width/2;return["M",b,0,"L",c-5,0,"A",1,1,0,0,0,c+5,0,"A",1,1,0,0,0,c-5,0,"M",c+5,0,"L",a.width-b,0]}}};g.bullet&&(g.bullet.prototype.dragDropProps={x:k.x,y:k.y,target:{optionName:"draggableTarget",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){var b=a.targetGraphic.getBBox();return{x:a.barX,y:b.y+b.height/2}},handleFormatter:k.y.handleFormatter}});g.columnrange&&
(g.columnrange.prototype.dragDropProps={x:{axis:"x",move:!0},low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x,y:a.y+a.height}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x,y:a.y}},handleFormatter:k.y.handleFormatter,
propValidate:function(a,b){return a>=b.low}}});g.boxplot&&(g.boxplot.prototype.dragDropProps={x:k.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.lowPlot}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.q1}},q1:{optionName:"draggableQ1",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.q1Plot}},handleFormatter:k.y.handleFormatter,
propValidate:function(a,b){return a<=b.median&&a>=b.low}},median:{axis:"y",move:!0},q3:{optionName:"draggableQ3",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.q3Plot}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.median}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.highPlot}},handleFormatter:k.y.handleFormatter,propValidate:function(a,
b){return a>=b.q3}}});g.ohlc&&(g.ohlc.prototype.dragDropProps={x:k.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotLow}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.open&&a<=b.close}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotHigh}},handleFormatter:k.y.handleFormatter,propValidate:function(a,
b){return a>=b.open&&a>=b.close}},open:{optionName:"draggableOpen",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"top":"bottom"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotOpen}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.low}},close:{optionName:"draggableClose",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"bottom":"top"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotClose}},
handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.low}}});if(g.arearange){y=g.columnrange.prototype.dragDropProps;var H=function(a){a=a.graphic?a.graphic.getBBox().width/2+1:4;return["M",0-a,0,"a",a,a,0,1,0,2*a,0,"a",a,a,0,1,0,-2*a,0]};g.arearange.prototype.dragDropProps={x:y.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return(a=a.lowerGraphic&&a.lowerGraphic.getBBox())?{x:a.x+a.width/2,y:a.y+a.height/
2}:{x:-999,y:-999}},handleFormatter:H,propValidate:y.low.propValidate},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return(a=a.upperGraphic&&a.upperGraphic.getBBox())?{x:a.x+a.width/2,y:a.y+a.height/2}:{x:-999,y:-999}},handleFormatter:H,propValidate:y.high.propValidate}}}g.waterfall&&(g.waterfall.prototype.dragDropProps={x:k.x,y:q(k.y,{handleFormatter:function(a){return a.isSum||a.isIntermediateSum?null:k.y.handleFormatter(a)}})});if(g.xrange){var I=
function(a,b){var c=a.series,d=c.xAxis,f=c.yAxis;c=c.chart.inverted;b=d.toPixels(a[b],!0);var e=f.toPixels(a.y,!0);c?(b=d.len-b,e=f.len-e-a.shapeArgs.height/2):e-=a.shapeArgs.height/2;return{x:Math.round(b),y:Math.round(e)}};h=g.xrange.prototype.dragDropProps={y:{axis:"y",move:!0},x:{optionName:"draggableX1",axis:"x",move:!0,resize:!0,resizeSide:"left",handlePositioner:function(a){return I(a,"x")},handleFormatter:h,propValidate:function(a,b){return a<=b.x2}},x2:{optionName:"draggableX2",axis:"x",
move:!0,resize:!0,resizeSide:"right",handlePositioner:function(a){return I(a,"x2")},handleFormatter:h,propValidate:function(a,b){return a>=b.x}}};g.gantt&&(g.gantt.prototype.dragDropProps={y:h.y,start:q(h.x,{optionName:"draggableStart",validateIndividualDrag:function(a){return!a.milestone}}),end:q(h.x2,{optionName:"draggableEnd",validateIndividualDrag:function(a){return!a.milestone}})})}"gauge pie sunburst wordcloud sankey histogram pareto vector windbarb treemap bellcurve sma map mapline".split(" ").forEach(function(a){g[a]&&
(g[a].prototype.dragDropProps=null)});var S={"default":{className:"highcharts-drag-box-default",lineWidth:1,lineColor:"#888",color:"rgba(0, 0, 0, 0.1)",cursor:"move",zIndex:900}},T={className:"highcharts-drag-handle",color:"#fff",lineColor:"rgba(0, 0, 0, 0.6)",lineWidth:1,zIndex:901};e.Chart.prototype.setGuideBoxState=function(a,b){var c=this.dragGuideBox;b=q(S,b);a=q(b["default"],b[a]);return c.attr({className:a.className,stroke:a.lineColor,strokeWidth:a.lineWidth,fill:a.color,cursor:a.cursor,zIndex:a.zIndex}).css({pointerEvents:"none"})};
e.Point.prototype.getDropValues=function(a,b,c){var d=this,e=d.series,g=q(e.options.dragDrop,d.options.dragDrop),k={},B=a.points[d.id],h;for(h in c)if(Object.hasOwnProperty.call(c,h)){if("undefined"!==typeof n){var n=!1;break}n=!0}p(c,function(a,c){var f=B[c],m=e[a.axis+"Axis"];m=m.toValue((m.horiz?b.chartX:b.chartY)+B[c+"Offset"]);var h=a.axis.toUpperCase(),l=e[h.toLowerCase()+"Axis"].categories?1:0;l=u(g["dragPrecision"+h],l);var q=u(g["dragMin"+h],-Infinity);h=u(g["dragMax"+h],Infinity);l&&(m=
Math.round(m/l)*l);m=R(m,q,h);n&&a.propValidate&&!a.propValidate(m,d)||"undefined"===typeof f||(k[c]=m)});return k};e.Series.prototype.getGuideBox=function(a){var b=this.chart,c=Infinity,d=-Infinity,e=Infinity,g=-Infinity,h;a.forEach(function(a){(a=a.graphic&&a.graphic.getBBox()||a.shapeArgs)&&(a.width||a.height||a.x||a.y)&&(h=!0,c=Math.min(a.x,c),d=Math.max(a.x+a.width,d),e=Math.min(a.y,e),g=Math.max(a.y+a.height,g))});return h?b.renderer.rect(c,e,d-c,g-e):b.renderer.g()};e.Point.prototype.showDragHandles=
function(){var a=this,b=a.series,c=b.chart,d=c.renderer,e=q(b.options.dragDrop,a.options.dragDrop);p(b.dragDropProps,function(f,g){var h=q(T,f.handleOptions,e.dragHandle),k={className:h.className,"stroke-width":h.lineWidth,fill:h.color,stroke:h.lineColor},m=h.pathFormatter||f.handleFormatter,l=f.handlePositioner;var p=f.validateIndividualDrag?f.validateIndividualDrag(a):!0;f.resize&&p&&f.resizeSide&&m&&(e["draggable"+f.axis.toUpperCase()]||e[f.optionName])&&!1!==e[f.optionName]&&(c.dragHandles||(c.dragHandles=
{group:d.g("drag-drop-handles").add(b.markerGroup||b.group)}),c.dragHandles.point=a.id,l=l(a),k.d=p=m(a),m="function"===typeof f.resizeSide?f.resizeSide(a.options,a):f.resizeSide,!p||0>l.x||0>l.y||(k.cursor=h.cursor||"x"===f.axis!==!!c.inverted?"ew-resize":"ns-resize",(f=c.dragHandles[m])||(f=c.dragHandles[m]=d.path().add(c.dragHandles.group)),f.translate(l.x,l.y).attr(k),w(f.element,["touchstart","mousedown"],function(b){b=v(b,c);var d=a.series.chart;d.zoomOrPanKeyPressed(b)||(d.mouseIsDown=!1,C(b,
a),d.dragDropData.updateProp=b.updateProp=g,a.firePointEvent("dragStart",b),b.stopPropagation(),b.preventDefault())}),n(c.dragHandles.group.element,"mouseover",function(){c.dragDropData=c.dragDropData||{};c.dragDropData.isHoveringHandle=a.id}),w(c.dragHandles.group.element,["touchend","mouseout"],function(){var b=a.series.chart;b.dragDropData&&a.id===b.dragDropData.isHoveringHandle&&delete b.dragDropData.isHoveringHandle;b.hoverPoint||E(a)})))})};e.Chart.prototype.hideDragHandles=function(){this.dragHandles&&
(p(this.dragHandles,function(a,b){"group"!==b&&a.destroy&&a.destroy()}),this.dragHandles.group&&this.dragHandles.group.destroy&&this.dragHandles.group.destroy(),delete this.dragHandles)};n(e.Point,"mouseOver",function(){var a=this;setTimeout(function(){var b=a.series,c=b&&b.chart,d=c&&c.dragDropData,e=c&&c.is3d&&c.is3d();!c||d&&d.isDragging&&d.draggedPastSensitivity||c.isDragDropAnimating||!b.options.dragDrop||e||(c.dragHandles&&c.hideDragHandles(),a.showDragHandles())},12)});n(e.Point,"mouseOut",
function(){var a=this;setTimeout(function(){a.series&&E(a)},10)});n(e.Point,"remove",function(){var a=this.series.chart,b=a.dragHandles;b&&b.point===this.id&&a.hideDragHandles()});e.Chart.prototype.zoomOrPanKeyPressed=function(a){var b=this.userOptions.chart||{},c=b.panKey&&b.panKey+"Key";return a[b.zoomKey&&b.zoomKey+"Key"]||a[c]};n(e.Chart,"render",function(){this.hasAddedDragDropEvents||Q(this)})});r(e,"masters/modules/draggable-points.src.js",[],function(){})});
//# sourceMappingURL=draggable-points.js.map