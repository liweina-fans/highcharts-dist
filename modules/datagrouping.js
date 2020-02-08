/*
 Highstock JS v8.0.0 (2020-02-08)

 Data grouping module

 (c) 2010-2019 Torstein Hnsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define("highcharts/modules/datagrouping",["highcharts"],function(f){d(f);d.Highcharts=f;return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){function f(d,h,J,f){d.hasOwnProperty(h)||(d[h]=f.apply(null,J))}d=d?d._modules:{};f(d,"parts/DataGrouping.js",[d["parts/Globals.js"],d["parts/Utilities.js"]],function(d,h){var f=h.addEvent,B=h.arrayMax,K=h.arrayMin,
L=h.correctFloat,C=h.defined,M=h.error,N=h.extend,O=h.format,w=h.isNumber,D=h.merge,z=h.pick,x=d.Axis,P=d.defaultPlotOptions;h=d.Point;var E=d.Series,Q=d.Tooltip,g=d.approximations={sum:function(a){var c=a.length;if(!c&&a.hasNulls)var b=null;else if(c)for(b=0;c--;)b+=a[c];return b},average:function(a){var c=a.length;a=g.sum(a);w(a)&&c&&(a=L(a/c));return a},averages:function(){var a=[];[].forEach.call(arguments,function(c){a.push(g.average(c))});return"undefined"===typeof a[0]?void 0:a},open:function(a){return a.length?
a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?B(a):a.hasNulls?null:void 0},low:function(a){return a.length?K(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,c,b,v){a=g.open(a);c=g.high(c);b=g.low(b);v=g.close(v);if(w(a)||w(c)||w(b)||w(v))return[a,c,b,v]},range:function(a,c){a=g.low(a);c=g.high(c);if(w(a)||w(c))return[a,c];if(null===a&&null===c)return null}},G=function(a,c,b,v){var e=this,d=e.data,u=e.options&&e.options.data,
F=[],m=[],h=[],n=a.length,q=!!c,r=[],k=e.pointArrayMap,f=k&&k.length,p=["x"].concat(k||["y"]),x=0,y=0,t;v="function"===typeof v?v:g[v]?g[v]:g[e.getDGApproximation&&e.getDGApproximation()||"average"];f?k.forEach(function(){r.push([])}):r.push([]);var B=f||1;for(t=0;t<=n&&!(a[t]>=b[0]);t++);for(t;t<=n;t++){for(;"undefined"!==typeof b[x+1]&&a[t]>=b[x+1]||t===n;){var l=b[x];e.dataGroupInfo={start:e.cropStart+y,length:r[0].length};var A=v.apply(e,r);e.pointClass&&!C(e.dataGroupInfo.options)&&(e.dataGroupInfo.options=
D(e.pointClass.prototype.optionsToObject.call({series:e},e.options.data[e.cropStart+y])),p.forEach(function(a){delete e.dataGroupInfo.options[a]}));"undefined"!==typeof A&&(F.push(l),m.push(A),h.push(e.dataGroupInfo));y=t;for(l=0;l<B;l++)r[l].length=0,r[l].hasNulls=!1;x+=1;if(t===n)break}if(t===n)break;if(k)for(l=e.cropStart+t,A=d&&d[l]||e.pointClass.prototype.applyOptions.apply({series:e},[u[l]]),l=0;l<f;l++){var z=A[k[l]];w(z)?r[l].push(z):null===z&&(r[l].hasNulls=!0)}else l=q?c[t]:null,w(l)?r[0].push(l):
null===l&&(r[0].hasNulls=!0)}return{groupedXData:F,groupedYData:m,groupMap:h}},H={approximations:g,groupData:G},p=E.prototype,R=p.processData,S=p.generatePoints,y={groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],
week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},I={line:{},spline:{},area:{},areaspline:{},arearange:{},column:{groupPixelWidth:10},columnrange:{groupPixelWidth:10},candlestick:{groupPixelWidth:10},ohlc:{groupPixelWidth:5}},T=d.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",
null]];p.getDGApproximation=function(){return this.is("arearange")?"range":this.is("ohlc")?"ohlc":this.is("column")?"sum":"average"};p.groupData=G;p.processData=function(){var a=this.chart,c=this.options.dataGrouping,b=!1!==this.allowDG&&c&&z(c.enabled,a.options.isStock),d=this.visible||!a.options.chart.ignoreHiddenSeries,e,h=this.currentDataGrouping,u=!1;this.forceCrop=b;this.groupPixelWidth=null;this.hasProcessed=!0;b&&!this.requireSorting&&(this.requireSorting=u=!0);b=!1===R.apply(this,arguments)||
!b;u&&(this.requireSorting=!1);if(!b){this.destroyGroupedData();b=c.groupAll?this.xData:this.processedXData;var f=c.groupAll?this.yData:this.processedYData,m=a.plotSizeX;a=this.xAxis;var g=a.options.ordinal,n=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(n){this.isDirty=e=!0;this.points=null;u=a.getExtremes();var q=u.min;u=u.max;g=g&&a.getGroupIntervalFactor(q,u,this)||1;n=n*(u-q)/m*g;m=a.getTimeTicks(a.normalizeTimeTickInterval(n,c.units||T),Math.min(q,b[0]),Math.max(u,b[b.length-
1]),a.options.startOfWeek,b,this.closestPointRange);f=p.groupData.apply(this,[b,f,m,c.approximation]);b=f.groupedXData;g=f.groupedYData;var r=0;if(c.smoothed&&b.length){var k=b.length-1;for(b[k]=Math.min(b[k],u);k--&&0<k;)b[k]+=n/2;b[0]=Math.max(b[0],q)}for(k=1;k<m.length;k++)m.info.segmentStarts&&-1!==m.info.segmentStarts.indexOf(k)||(r=Math.max(m[k]-m[k-1],r));q=m.info;q.gapSize=r;this.closestPointRange=m.info.totalRange;this.groupMap=f.groupMap;if(C(b[0])&&b[0]<a.min&&d){if(!C(a.options.min)&&
a.min<=a.dataMin||a.min===a.dataMin)a.min=Math.min(b[0],a.min);a.dataMin=Math.min(b[0],a.dataMin)}c.groupAll&&(c=this.cropData(b,g,a.min,a.max,1),b=c.xData,g=c.yData);this.processedXData=b;this.processedYData=g}else this.groupMap=null;this.hasGroupedData=e;this.currentDataGrouping=q;this.preventGraphAnimation=(h&&h.totalRange)!==(q&&q.totalRange)}};p.destroyGroupedData=function(){this.groupedData&&(this.groupedData.forEach(function(a,c){a&&(this.groupedData[c]=a.destroy?a.destroy():null)},this),this.groupedData.length=
0)};p.generatePoints=function(){S.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};f(h,"update",function(){if(this.dataGroup)return M(24,!1,this.series.chart),!1});f(Q,"headerFormatter",function(a){var c=this.chart,b=c.time,d=a.labelConfig,e=d.series,f=e.tooltipOptions,h=e.options.dataGrouping,g=f.xDateFormat,m=e.xAxis,p=f[(a.isFooter?"footer":"header")+"Format"];if(m&&"datetime"===m.options.type&&h&&w(d.key)){var n=e.currentDataGrouping;h=h.dateTimeLabelFormats||
y.dateTimeLabelFormats;if(n)if(f=h[n.unitName],1===n.count)g=f[0];else{g=f[1];var q=f[2]}else!g&&h&&(g=this.getXDateFormat(d,f,m));g=b.dateFormat(g,d.key);q&&(g+=b.dateFormat(q,d.key+n.totalRange-1));e.chart.styledMode&&(p=this.styledModeFormat(p));a.text=O(p,{point:N(d.point,{key:g}),series:e},c);a.preventDefault()}});f(E,"destroy",p.destroyGroupedData);f(E,"afterSetOptions",function(a){a=a.options;var c=this.type,b=this.chart.options.plotOptions,d=P[c].dataGrouping,e=this.useCommonDataGrouping&&
y;if(I[c]||e)d||(d=D(y,I[c])),a.dataGrouping=D(e,d,b.series&&b.series.dataGrouping,b[c].dataGrouping,this.userOptions.dataGrouping)});f(x,"afterSetScale",function(){this.series.forEach(function(a){a.hasProcessed=!1})});x.prototype.getGroupPixelWidth=function(){var a=this.series,c=a.length,b,d=0,e=!1,f;for(b=c;b--;)(f=a[b].options.dataGrouping)&&(d=Math.max(d,z(f.groupPixelWidth,y.groupPixelWidth)));for(b=c;b--;)(f=a[b].options.dataGrouping)&&a[b].hasProcessed&&(c=(a[b].processedXData||a[b].data).length,
a[b].groupPixelWidth||c>this.chart.plotSizeX/d||c&&f.forced)&&(e=!0);return e?d:0};x.prototype.setDataGrouping=function(a,c){var b;c=z(c,!0);a||(a={forced:!1,units:null});if(this instanceof x)for(b=this.series.length;b--;)this.series[b].update({dataGrouping:a},!1);else this.chart.options.series.forEach(function(b){b.dataGrouping=a},!1);this.ordinalSlope=null;c&&this.chart.redraw()};d.dataGrouping=H;"";return H});f(d,"masters/modules/datagrouping.src.js",[d["parts/DataGrouping.js"]],function(d){return d})});
//# sourceMappingURL=datagrouping.js.map