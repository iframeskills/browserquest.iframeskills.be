define(function(){var a=Class.extend({}),b=a.extend({init:function(a,b,c,d){this.startId=a,this.id=a,this.length=b,this.speed=c,this.index=d,this.lastTime=0},tick:function(){this.id-this.startId<this.length-1?this.id+=1:this.id=this.startId},animate:function(a){if(a-this.lastTime>this.speed){this.tick(),this.lastTime=a;return!0}return!1}});return b})