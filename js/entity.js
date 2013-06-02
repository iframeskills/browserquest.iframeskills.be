define(function(){var a=Class.extend({init:function(a,b){var c=this;this.id=a,this.kind=b,this.sprite=null,this.flipSpriteX=!1,this.flipSpriteY=!1,this.animations=null,this.currentAnimation=null,this.shadowOffsetY=0,this.setGridPosition(0,0),this.isLoaded=!1,this.isHighlighted=!1,this.visible=!0,this.isFading=!1,this.setDirty()},setName:function(a){this.name=a},setPosition:function(a,b){this.x=a,this.y=b},setGridPosition:function(a,b){this.gridX=a,this.gridY=b,this.setPosition(a*16,b*16)},setSprite:function(a){if(!a){log.error(this.id+" : sprite is null",!0);throw"Error"}if(!this.sprite||this.sprite.name!==a.name){this.sprite=a,this.normalSprite=this.sprite;if(Types.isMob(this.kind)||Types.isPlayer(this.kind))this.hurtSprite=a.getHurtSprite();this.animations=a.createAnimations(),this.isLoaded=!0,this.ready_func&&this.ready_func()}},getSprite:function(){return this.sprite},getSpriteName:function(){return Types.getKindAsString(this.kind)},getAnimationByName:function(a){var b=null;a in this.animations?b=this.animations[a]:log.error("No animation called "+a);return b},setAnimation:function(a,b,c,d){var e=this;if(this.isLoaded){if(this.currentAnimation&&this.currentAnimation.name===a)return;var f=this.sprite,g=this.getAnimationByName(a);g&&(this.currentAnimation=g,a.substr(0,3)==="atk"&&this.currentAnimation.reset(),this.currentAnimation.setSpeed(b),this.currentAnimation.setCount(c?c:0,d||function(){e.idle()}))}else this.log_error("Not ready for animation")},hasShadow:function(){return!1},ready:function(a){this.ready_func=a},clean:function(){this.stopBlinking()},log_info:function(a){log.info("["+this.id+"] "+a)},log_error:function(a){log.error("["+this.id+"] "+a)},setHighlight:function(a){a===!0?(this.sprite=this.sprite.silhouetteSprite,this.isHighlighted=!0):(this.sprite=this.normalSprite,this.isHighlighted=!1)},setVisible:function(a){this.visible=a},isVisible:function(){return this.visible},toggleVisibility:function(){this.visible?this.setVisible(!1):this.setVisible(!0)},getDistanceToEntity:function(a){var b=Math.abs(a.gridX-this.gridX),c=Math.abs(a.gridY-this.gridY);return b>c?b:c},isCloseTo:function(a){var b,c,d,e=!1;a&&(b=Math.abs(a.gridX-this.gridX),c=Math.abs(a.gridY-this.gridY),b<30&&c<14&&(e=!0));return e},isAdjacent:function(a){var b=!1;a&&(b=this.getDistanceToEntity(a)>1?!1:!0);return b},isAdjacentNonDiagonal:function(a){var b=!1;this.isAdjacent(a)&&(this.gridX===a.gridX||this.gridY===a.gridY)&&(b=!0);return b},isDiagonallyAdjacent:function(a){return this.isAdjacent(a)&&!this.isAdjacentNonDiagonal(a)},forEachAdjacentNonDiagonalPosition:function(a){a(this.gridX-1,this.gridY,Types.Orientations.LEFT),a(this.gridX,this.gridY-1,Types.Orientations.UP),a(this.gridX+1,this.gridY,Types.Orientations.RIGHT),a(this.gridX,this.gridY+1,Types.Orientations.DOWN)},fadeIn:function(a){this.isFading=!0,this.startFadingTime=a},blink:function(a,b){var c=this;this.blinking=setInterval(function(){c.toggleVisibility()},a)},stopBlinking:function(){this.blinking&&clearInterval(this.blinking),this.setVisible(!0)},setDirty:function(){this.isDirty=!0,this.dirty_callback&&this.dirty_callback(this)},onDirty:function(a){this.dirty_callback=a}});return a})