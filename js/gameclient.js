define(["player","entityfactory","lib/bison"],function(a,b,c){var d=Class.extend({init:function(a,b){this.connection=null,this.host=a,this.port=b,this.connected_callback=null,this.spawn_callback=null,this.movement_callback=null,this.handlers=[],this.handlers[Types.Messages.WELCOME]=this.receiveWelcome,this.handlers[Types.Messages.MOVE]=this.receiveMove,this.handlers[Types.Messages.LOOTMOVE]=this.receiveLootMove,this.handlers[Types.Messages.ATTACK]=this.receiveAttack,this.handlers[Types.Messages.SPAWN]=this.receiveSpawn,this.handlers[Types.Messages.DESPAWN]=this.receiveDespawn,this.handlers[Types.Messages.SPAWN_BATCH]=this.receiveSpawnBatch,this.handlers[Types.Messages.HEALTH]=this.receiveHealth,this.handlers[Types.Messages.CHAT]=this.receiveChat,this.handlers[Types.Messages.EQUIP]=this.receiveEquipItem,this.handlers[Types.Messages.DROP]=this.receiveDrop,this.handlers[Types.Messages.TELEPORT]=this.receiveTeleport,this.handlers[Types.Messages.DAMAGE]=this.receiveDamage,this.handlers[Types.Messages.POPULATION]=this.receivePopulation,this.handlers[Types.Messages.LIST]=this.receiveList,this.handlers[Types.Messages.DESTROY]=this.receiveDestroy,this.handlers[Types.Messages.KILL]=this.receiveKill,this.handlers[Types.Messages.HP]=this.receiveHitPoints,this.handlers[Types.Messages.BLINK]=this.receiveBlink,this.useBison=!1,this.enable()},enable:function(){this.isListening=!0},disable:function(){this.isListening=!1},connect:function(a){var b="ws://"+this.host+":"+this.port+"/",c=this;log.info("Trying to connect to server : "+b),window.MozWebSocket?this.connection=new MozWebSocket(b):this.connection=new WebSocket(b),a?this.connection.onmessage=function(a){var b=JSON.parse(a.data);b.status==="OK"?c.dispatched_callback(b.host,b.port):b.status==="FULL"?alert("BrowserQuest is currently at maximum player population. Please retry later."):alert("Unknown error while connecting to BrowserQuest.")}:(this.connection.onopen=function(a){log.info("Connected to server "+c.host+":"+c.port)},this.connection.onmessage=function(a){if(a.data==="go")c.connected_callback&&c.connected_callback();else{if(a.data==="timeout"){c.isTimeout=!0;return}c.receiveMessage(a.data)}},this.connection.onerror=function(a){log.error(a,!0)},this.connection.onclose=function(){log.debug("Connection closed"),$("#container").addClass("error"),c.disconnected_callback&&(c.isTimeout?c.disconnected_callback("You have been disconnected for being inactive for too long"):c.disconnected_callback("The connection to BrowserQuest has been lost"))})},sendMessage:function(a){var b;this.connection.readyState===1&&(this.useBison?b=c.encode(a):b=JSON.stringify(a),this.connection.send(b))},receiveMessage:function(a){var b,d;this.isListening&&(this.useBison?b=c.decode(a):b=JSON.parse(a),log.debug("data: "+a),b instanceof Array&&(b[0]instanceof Array?this.receiveActionBatch(b):this.receiveAction(b)))},receiveAction:function(a){var b=a[0];this.handlers[b]&&_.isFunction(this.handlers[b])?this.handlers[b].call(this,a):log.error("Unknown action : "+b)},receiveActionBatch:function(a){var b=this;_.each(a,function(a){b.receiveAction(a)})},receiveWelcome:function(a){var b=a[1],c=a[2],d=a[3],e=a[4],f=a[5];this.welcome_callback&&this.welcome_callback(b,c,d,e,f)},receiveMove:function(a){var b=a[1],c=a[2],d=a[3];this.move_callback&&this.move_callback(b,c,d)},receiveLootMove:function(a){var b=a[1],c=a[2];this.lootmove_callback&&this.lootmove_callback(b,c)},receiveAttack:function(a){var b=a[1],c=a[2];this.attack_callback&&this.attack_callback(b,c)},receiveSpawn:function(c){var d=c[1],e=c[2],f=c[3],g=c[4];if(Types.isItem(e)){var h=b.createEntity(e,d);this.spawn_item_callback&&this.spawn_item_callback(h,f,g)}else if(Types.isChest(e)){var h=b.createEntity(e,d);this.spawn_chest_callback&&this.spawn_chest_callback(h,f,g)}else{var i,j,k,l,m;Types.isPlayer(e)?(i=c[5],j=c[6],m=c[7],l=c[8],c.length>9&&(k=c[9])):Types.isMob(e)&&(j=c[5],c.length>6&&(k=c[6]));var n=b.createEntity(e,d,i);n instanceof a&&(n.weaponName=Types.getKindAsString(l),n.spriteName=Types.getKindAsString(m)),this.spawn_character_callback&&this.spawn_character_callback(n,f,g,j,k)}},receiveDespawn:function(a){var b=a[1];this.despawn_callback&&this.despawn_callback(b)},receiveHealth:function(a){var b=a[1],c=!1;a[2]&&(c=!0),this.health_callback&&this.health_callback(b,c)},receiveChat:function(a){var b=a[1],c=a[2];this.chat_callback&&this.chat_callback(b,c)},receiveEquipItem:function(a){var b=a[1],c=a[2];this.equip_callback&&this.equip_callback(b,c)},receiveDrop:function(a){var c=a[1],d=a[2],e=a[3],f=b.createEntity(e,d);f.wasDropped=!0,f.playersInvolved=a[4],this.drop_callback&&this.drop_callback(f,c)},receiveTeleport:function(a){var b=a[1],c=a[2],d=a[3];this.teleport_callback&&this.teleport_callback(b,c,d)},receiveDamage:function(a){var b=a[1],c=a[2];this.dmg_callback&&this.dmg_callback(b,c)},receivePopulation:function(a){var b=a[1],c=a[2];this.population_callback&&this.population_callback(b,c)},receiveKill:function(a){var b=a[1];this.kill_callback&&this.kill_callback(b)},receiveList:function(a){a.shift(),this.list_callback&&this.list_callback(a)},receiveDestroy:function(a){var b=a[1];this.destroy_callback&&this.destroy_callback(b)},receiveHitPoints:function(a){var b=a[1];this.hp_callback&&this.hp_callback(b)},receiveBlink:function(a){var b=a[1];this.blink_callback&&this.blink_callback(b)},onDispatched:function(a){this.dispatched_callback=a},onConnected:function(a){this.connected_callback=a},onDisconnected:function(a){this.disconnected_callback=a},onWelcome:function(a){this.welcome_callback=a},onSpawnCharacter:function(a){this.spawn_character_callback=a},onSpawnItem:function(a){this.spawn_item_callback=a},onSpawnChest:function(a){this.spawn_chest_callback=a},onDespawnEntity:function(a){this.despawn_callback=a},onEntityMove:function(a){this.move_callback=a},onEntityAttack:function(a){this.attack_callback=a},onPlayerChangeHealth:function(a){this.health_callback=a},onPlayerEquipItem:function(a){this.equip_callback=a},onPlayerMoveToItem:function(a){this.lootmove_callback=a},onPlayerTeleport:function(a){this.teleport_callback=a},onChatMessage:function(a){this.chat_callback=a},onDropItem:function(a){this.drop_callback=a},onPlayerDamageMob:function(a){this.dmg_callback=a},onPlayerKillMob:function(a){this.kill_callback=a},onPopulationChange:function(a){this.population_callback=a},onEntityList:function(a){this.list_callback=a},onEntityDestroy:function(a){this.destroy_callback=a},onPlayerChangeMaxHitPoints:function(a){this.hp_callback=a},onItemBlink:function(a){this.blink_callback=a},sendHello:function(a){this.sendMessage([Types.Messages.HELLO,a.name,Types.getKindFromString(a.getSpriteName()),Types.getKindFromString(a.getWeaponName())])},sendMove:function(a,b){this.sendMessage([Types.Messages.MOVE,a,b])},sendLootMove:function(a,b,c){this.sendMessage([Types.Messages.LOOTMOVE,b,c,a.id])},sendAggro:function(a){this.sendMessage([Types.Messages.AGGRO,a.id])},sendAttack:function(a){this.sendMessage([Types.Messages.ATTACK,a.id])},sendHit:function(a){this.sendMessage([Types.Messages.HIT,a.id])},sendHurt:function(a){this.sendMessage([Types.Messages.HURT,a.id])},sendChat:function(a){this.sendMessage([Types.Messages.CHAT,a])},sendLoot:function(a){this.sendMessage([Types.Messages.LOOT,a.id])},sendTeleport:function(a,b){this.sendMessage([Types.Messages.TELEPORT,a,b])},sendWho:function(a){a.unshift(Types.Messages.WHO),this.sendMessage(a)},sendZone:function(){this.sendMessage([Types.Messages.ZONE])},sendOpen:function(a){this.sendMessage([Types.Messages.OPEN,a.id])},sendCheck:function(a){this.sendMessage([Types.Messages.CHECK,a])}});return d})