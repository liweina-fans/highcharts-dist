/*
 Highstock JS v8.0.0 (2020-02-08)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/apo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,f))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
g,h,d,m){if(a)return d?d(a):!0;b(m||this.generateMessage(h,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/apo.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,f){var g=b.error,h=a.seriesTypes.ema;a.seriesType("apo","ema",{params:{periods:[10,20]}},{nameBase:"APO",nameComponents:["periods"],
init:function(){var a=arguments,b=this;f.isParentLoaded(h,"ema",b.type,function(d){d.prototype.init.apply(b,a)})},getValues:function(a,b){var c=b.periods,k=b.index;b=[];var d=[],f=[],e;if(2!==c.length||c[1]<=c[0])g('Error: "APO requires two periods. Notice, first period should be lower than the second one."');else{var l=h.prototype.getValues.call(this,a,{index:k,period:c[0]});a=h.prototype.getValues.call(this,a,{index:k,period:c[1]});if(l&&a){c=c[1]-c[0];for(e=0;e<a.yData.length;e++)k=l.yData[e+c]-
a.yData[e],b.push([a.xData[e],k]),d.push(a.xData[e]),f.push(k);return{values:b,xData:d,yData:f}}}}});""});b(a,"masters/indicators/apo.src.js",[],function(){})});
//# sourceMappingURL=apo.js.map