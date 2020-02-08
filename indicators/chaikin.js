/*
 Highstock JS v8.0.0 (2020-02-08)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/chaikin",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,c,m,l){a.hasOwnProperty(c)||(a[c]=l.apply(null,m))}a=a?a._modules:{};e(a,"indicators/accumulation-distribution.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,
c){var m=c.error;a=a.seriesType;a("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(a,c){var f=c.period,e=a.xData,h=a.yData,b=c.volumeSeriesID,d=a.chart.get(b);c=d&&d.yData;var l=h?h.length:0,p=[],k=[],n=[];if(!(e.length<=f&&l&&4!==h[0].length)){if(d){for(;f<l;f++){a=p.length;b=h[f][1];d=h[f][2];var g=h[f][3],q=c[f];b=[e[f],g===b&&g===d||b===d?0:(2*g-d-b)/(b-d)*q];0<a&&(b[1]+=p[a-1][1]);p.push(b);k.push(b[0]);n.push(b[1])}return{values:p,
xData:k,yData:n}}m("Series "+b+" not found! Check `volumeSeriesID`.",!0,a.chart)}}});""});e(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var c=a.error;return{isParentLoaded:function(a,e,k,f,r){if(a)return f?f(a):!0;c(r||this.generateMessage(k,e));return!1},generateMessage:function(a,c){return'Error: "'+a+'" indicator type requires "'+c+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});e(a,"indicators/chaikin.src.js",[a["parts/Globals.js"],
a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,c,e){var l=c.correctFloat,k=c.error,f=a.seriesTypes.ema,m=a.seriesTypes.ad;a.seriesType("chaikin","ema",{params:{volumeSeriesID:"volume",periods:[3,10]}},{nameBase:"Chaikin Osc",nameComponents:["periods"],init:function(){var a=arguments,b=this;e.isParentLoaded(f,"ema",b.type,function(d){d.prototype.init.apply(b,a)})},getValues:function(a,b){var d=b.periods,c=b.period,e=[],h=[],n=[],g;if(2!==d.length||d[1]<=d[0])k('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."');
else if(b=m.prototype.getValues.call(this,a,{volumeSeriesID:b.volumeSeriesID,period:c}))if(a=f.prototype.getValues.call(this,b,{period:d[0]}),b=f.prototype.getValues.call(this,b,{period:d[1]}),a&&b){d=d[1]-d[0];for(g=0;g<b.yData.length;g++)c=l(a.yData[g+d]-b.yData[g]),e.push([b.xData[g],c]),h.push(b.xData[g]),n.push(c);return{values:e,xData:h,yData:n}}}});""});e(a,"masters/indicators/chaikin.src.js",[],function(){})});
//# sourceMappingURL=chaikin.js.map