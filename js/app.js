define(["jquery","storage"],function(a,b){var c=Class.extend({init:function(){this.currentPage=1,this.blinkInterval=null,this.previousState=null,this.isParchmentReady=!0,this.ready=!1,this.storage=new b,this.watchNameInputInterval=setInterval(this.toggleButton.bind(this),100),this.$playButton=a(".play"),this.$playDiv=a(".play div")},setGame:function(a){this.game=a,this.isMobile=this.game.renderer.mobile,this.isTablet=this.game.renderer.tablet,this.isDesktop=!this.isMobile&&!this.isTablet,this.supportsWorkers=!!window.Worker,this.ready=!0},center:function(){window.scrollTo(0,1)},canStartGame:function(){return this.isDesktop?this.game&&this.game.map&&this.game.map.isLoaded:this.game},tryStartingGame:function(a,b){var c=this,d=this.$playButton;if(a!=="")if(!this.ready||!this.canStartGame()){this.isMobile||d.addClass("loading"),this.$playDiv.unbind("click");var e=setInterval(function(){log.debug("waiting..."),c.canStartGame()&&(setTimeout(function(){c.isMobile||d.removeClass("loading")},1500),clearInterval(e),c.startGame(a,b))},100)}else this.$playDiv.unbind("click"),this.startGame(a,b)},startGame:function(a,b){var c=this;b&&b(),this.hideIntro(function(){c.isDesktop||c.game.loadMap(),c.start(a)})},start:function(b){var c=this,d=!c.storage.hasAlreadyPlayed();if(b&&!this.game.started){var e=!1,f=this.config;e||(log.debug("Starting game with build config."),this.game.setServerOptions(f.build.host,f.build.port,b)),this.center(),this.game.run(function(){a("body").addClass("started"),d&&c.toggleInstructions()})}},setMouseCoordinates:function(b){var c=a("#container").offset(),d=this.game.renderer.getScaleFactor(),e=this.game.renderer.getWidth(),f=this.game.renderer.getHeight(),g=this.game.mouse;g.x=b.pageX-c.left-(this.isMobile?0:5*d),g.y=b.pageY-c.top-(this.isMobile?0:7*d),g.x<=0?g.x=0:g.x>=e&&(g.x=e-1),g.y<=0?g.y=0:g.y>=f&&(g.y=f-1)},initHealthBar:function(){var b=this.game.renderer.getScaleFactor(),c=a("#healthbar").width()-12*b;this.game.onPlayerHealthChange(function(b,d){var e=Math.round(c/d*(b>0?b:0));a("#hitpoints").css("width",e+"px")}),this.game.onPlayerHurt(this.blinkHealthBar.bind(this))},blinkHealthBar:function(){var b=a("#hitpoints");b.addClass("white"),setTimeout(function(){b.removeClass("white")},500)},toggleButton:function(){var b=a("#parchment input").val(),c=a("#createcharacter .play");b&&b.length>0?(c.removeClass("disabled"),a("#character").removeClass("disabled")):(c.addClass("disabled"),a("#character").addClass("disabled"))},hideIntro:function(b){clearInterval(this.watchNameInputInterval),a("body").removeClass("intro"),setTimeout(function(){a("body").addClass("game"),b()},1e3)},showChat:function(){this.game.started&&(a("#chatbox").addClass("active"),a("#chatinput").focus(),a("#chatbutton").addClass("active"))},hideChat:function(){this.game.started&&(a("#chatbox").removeClass("active"),a("#chatinput").blur(),a("#chatbutton").removeClass("active"))},toggleInstructions:function(){a("#achievements").hasClass("active")&&(this.toggleAchievements(),a("#achievementsbutton").removeClass("active")),a("#instructions").toggleClass("active")},toggleAchievements:function(){a("#instructions").hasClass("active")&&(this.toggleInstructions(),a("#helpbutton").removeClass("active")),this.resetPage(),a("#achievements").toggleClass("active")},resetPage:function(){var b=this,c=a("#achievements");c.hasClass("active")&&c.bind(TRANSITIONEND,function(){c.removeClass("page"+b.currentPage).addClass("page1"),b.currentPage=1,c.unbind(TRANSITIONEND)})},initEquipmentIcons:function(){var b=this.game.renderer.getScaleFactor(),c=function(a){return"img/"+b+"/item-"+a+".png"},d=this.game.player.getWeaponName(),e=this.game.player.getSpriteName(),f=c(d),g=c(e);a("#weapon").css("background-image",'url("'+f+'")'),e!=="firefox"&&a("#armor").css("background-image",'url("'+g+'")')},hideWindows:function(){a("#achievements").hasClass("active")&&(this.toggleAchievements(),a("#achievementsbutton").removeClass("active")),a("#instructions").hasClass("active")&&(this.toggleInstructions(),a("#helpbutton").removeClass("active")),a("body").hasClass("credits")&&this.closeInGameCredits(),a("body").hasClass("about")&&this.closeInGameAbout()},showAchievementNotification:function(b,c){var d=a("#achievement-notification"),e=d.find(".name"),f=a("#achievementsbutton");d.removeClass().addClass("active achievement"+b),e.text(c),this.game.storage.getAchievementCount()===1&&(this.blinkInterval=setInterval(function(){f.toggleClass("blink")},500)),setTimeout(function(){d.removeClass("active"),f.removeClass("blink")},5e3)},displayUnlockedAchievement:function(b){var c=a("#achievements li.achievement"+b),d=this.game.getAchievementById(b);d&&d.hidden&&this.setAchievementData(c,d.name,d.desc),c.addClass("unlocked")},unlockAchievement:function(b,c){this.showAchievementNotification(b,c),this.displayUnlockedAchievement(b);var d=parseInt(a("#unlocked-achievements").text());a("#unlocked-achievements").text(d+1)},initAchievementList:function(b){var c=this,d=a("#lists"),e=a("#page-tmpl"),f=a("#achievement-tmpl"),g=0,h=0,i=null;_.each(b,function(b){h++;var j=f.clone();j.removeAttr("id"),j.addClass("achievement"+h),b.hidden||c.setAchievementData(j,b.name,b.desc),j.find(".twitter").attr("href","http://twitter.com/share?url=http%3A%2F%2Fbrowserquest.mozilla.org&text=I%20unlocked%20the%20%27"+b.name+"%27%20achievement%20on%20Mozilla%27s%20%23BrowserQuest%21&related=glecollinet:Creators%20of%20BrowserQuest%2Cwhatthefranck"),j.show(),j.find("a").click(function(){var b=a(this).attr("href");c.openPopup("twitter",b);return!1}),(h-1)%4===0&&(g++,i=e.clone(),i.attr("id","page"+g),i.show(),d.append(i)),i.append(j)}),a("#total-achievements").text(a("#achievements").find("li").length)},initUnlockedAchievements:function(b){var c=this;_.each(b,function(a){c.displayUnlockedAchievement(a)}),a("#unlocked-achievements").text(b.length)},setAchievementData:function(a,b,c){a.find(".achievement-name").html(b),a.find(".achievement-description").html(c)},toggleCredits:function(){var b=a("#parchment").attr("class");this.game.started?(a("#parchment").removeClass().addClass("credits"),a("body").toggleClass("credits"),this.game.player||a("body").toggleClass("death"),a("body").hasClass("about")&&(this.closeInGameAbout(),a("#helpbutton").removeClass("active"))):b!=="animate"&&(b==="credits"?this.animateParchment(b,this.previousState):(this.animateParchment(b,"credits"),this.previousState=b))},toggleAbout:function(){var b=a("#parchment").attr("class");this.game.started?(a("#parchment").removeClass().addClass("about"),a("body").toggleClass("about"),this.game.player||a("body").toggleClass("death"),a("body").hasClass("credits")&&this.closeInGameCredits()):b!=="animate"&&(b==="about"?localStorage&&localStorage.data?this.animateParchment(b,"loadcharacter"):this.animateParchment(b,"createcharacter"):(this.animateParchment(b,"about"),this.previousState=b))},closeInGameCredits:function(){a("body").removeClass("credits"),a("#parchment").removeClass("credits"),this.game.player||a("body").addClass("death")},closeInGameAbout:function(){a("body").removeClass("about"),a("#parchment").removeClass("about"),this.game.player||a("body").addClass("death"),a("#helpbutton").removeClass("active")},togglePopulationInfo:function(){a("#population").toggleClass("visible")},openPopup:function(b,c){var d=a(window).height(),e=a(window).width(),f,g,h,i;switch(b){case"twitter":f=450,g=550;break;case"facebook":f=400,g=580}h=d/2-f/2,i=e/2-g/2,newwindow=window.open(c,"name","height="+f+",width="+g+",top="+h+",left="+i),window.focus&&newwindow.focus()},animateParchment:function(b,c){var d=this,e=a("#parchment"),f=1;this.isMobile?e.removeClass(b).addClass(c):this.isParchmentReady&&(this.isTablet&&(f=0),this.isParchmentReady=!this.isParchmentReady,e.toggleClass("animate"),e.removeClass(b),setTimeout(function(){a("#parchment").toggleClass("animate"),e.addClass(c)},f*1e3),setTimeout(function(){d.isParchmentReady=!d.isParchmentReady},f*1e3))},animateMessages:function(){var b=a("#notifications div");b.addClass("top")},resetMessagesPosition:function(){var b=a("#message2").text();a("#notifications div").removeClass("top"),a("#message2").text(""),a("#message1").text(b)},showMessage:function(b){var c=a("#notifications div"),d=a("#notifications #message2");this.animateMessages(),d.text(b),this.messageTimer&&this.resetMessageTimer(),this.messageTimer=setTimeout(function(){c.addClass("top")},5e3)},resetMessageTimer:function(){clearTimeout(this.messageTimer)},resizeUi:function(){if(this.game)if(this.game.started)this.game.resize(),this.initHealthBar(),this.game.updateBars();else{var a=this.game.renderer.getScaleFactor();this.game.renderer.rescale(a)}}});return c})