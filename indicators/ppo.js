/*
 Highstock JS v8.0.0 (2020-02-08)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ppo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,f,k){a.hasOwnProperty(e)||(a[e]=k.apply(null,f))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var e=a.error;return{isParentLoaded:function(a,
k,b,g,h){if(a)return g?g(a):!0;e(h||this.generateMessage(b,k));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/ppo.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,f){var k=b.correctFloat,e=b.error,g=a.seriesTypes.ema;a.seriesType("ppo","ema",{params:{periods:[12,26]}},{nameBase:"PPO",
nameComponents:["periods"],init:function(){var a=arguments,b=this;f.isParentLoaded(g,"ema",b.type,function(h){h.prototype.init.apply(b,a)})},getValues:function(a,b){var c=b.periods,l=b.index;b=[];var f=[],h=[],d;if(2!==c.length||c[1]<=c[0])e('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');else{var m=g.prototype.getValues.call(this,a,{index:l,period:c[0]});a=g.prototype.getValues.call(this,a,{index:l,period:c[1]});if(m&&a){c=c[1]-c[0];for(d=0;d<a.yData.length;d++)l=
k((m.yData[d+c]-a.yData[d])/a.yData[d]*100),b.push([a.xData[d],l]),f.push(a.xData[d]),h.push(l);return{values:b,xData:f,yData:h}}}}});""});b(a,"masters/indicators/ppo.src.js",[],function(){})});
//# sourceMappingURL=ppo.js.map