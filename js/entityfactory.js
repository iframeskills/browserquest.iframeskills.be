define(["mobs","items","npcs","warrior","chest"],function(a,b,c,d,e){var f={};f.createEntity=function(a,b,c){if(!a)log.error("kind is undefined",!0);else{if(!_.isFunction(f.builders[a]))throw Error(a+" is not a valid Entity type");return f.builders[a](b,c)}},f.builders=[],f.builders[Types.Entities.WARRIOR]=function(a,b){return new d(a,b)},f.builders[Types.Entities.RAT]=function(b){return new a.Rat(b)},f.builders[Types.Entities.SKELETON]=function(b){return new a.Skeleton(b)},f.builders[Types.Entities.SKELETON2]=function(b){return new a.Skeleton2(b)},f.builders[Types.Entities.SPECTRE]=function(b){return new a.Spectre(b)},f.builders[Types.Entities.DEATHKNIGHT]=function(b){return new a.Deathknight(b)},f.builders[Types.Entities.GOBLIN]=function(b){return new a.Goblin(b)},f.builders[Types.Entities.OGRE]=function(b){return new a.Ogre(b)},f.builders[Types.Entities.CRAB]=function(b){return new a.Crab(b)},f.builders[Types.Entities.SNAKE]=function(b){return new a.Snake(b)},f.builders[Types.Entities.EYE]=function(b){return new a.Eye(b)},f.builders[Types.Entities.BAT]=function(b){return new a.Bat(b)},f.builders[Types.Entities.WIZARD]=function(b){return new a.Wizard(b)},f.builders[Types.Entities.BOSS]=function(b){return new a.Boss(b)},f.builders[Types.Entities.SWORD2]=function(a){return new b.Sword2(a)},f.builders[Types.Entities.AXE]=function(a){return new b.Axe(a)},f.builders[Types.Entities.REDSWORD]=function(a){return new b.RedSword(a)},f.builders[Types.Entities.BLUESWORD]=function(a){return new b.BlueSword(a)},f.builders[Types.Entities.GOLDENSWORD]=function(a){return new b.GoldenSword(a)},f.builders[Types.Entities.MORNINGSTAR]=function(a){return new b.MorningStar(a)},f.builders[Types.Entities.MAILARMOR]=function(a){return new b.MailArmor(a)},f.builders[Types.Entities.LEATHERARMOR]=function(a){return new b.LeatherArmor(a)},f.builders[Types.Entities.PLATEARMOR]=function(a){return new b.PlateArmor(a)},f.builders[Types.Entities.REDARMOR]=function(a){return new b.RedArmor(a)},f.builders[Types.Entities.GOLDENARMOR]=function(a){return new b.GoldenArmor(a)},f.builders[Types.Entities.FLASK]=function(a){return new b.Flask(a)},f.builders[Types.Entities.FIREPOTION]=function(a){return new b.FirePotion(a)},f.builders[Types.Entities.BURGER]=function(a){return new b.Burger(a)},f.builders[Types.Entities.CAKE]=function(a){return new b.Cake(a)},f.builders[Types.Entities.CHEST]=function(a){return new e(a)},f.builders[Types.Entities.GUARD]=function(a){return new c.Guard(a)},f.builders[Types.Entities.KING]=function(a){return new c.King(a)},f.builders[Types.Entities.VILLAGEGIRL]=function(a){return new c.VillageGirl(a)},f.builders[Types.Entities.VILLAGER]=function(a){return new c.Villager(a)},f.builders[Types.Entities.CODER]=function(a){return new c.Coder(a)},f.builders[Types.Entities.AGENT]=function(a){return new c.Agent(a)},f.builders[Types.Entities.RICK]=function(a){return new c.Rick(a)},f.builders[Types.Entities.SCIENTIST]=function(a){return new c.Scientist(a)},f.builders[Types.Entities.NYAN]=function(a){return new c.Nyan(a)},f.builders[Types.Entities.PRIEST]=function(a){return new c.Priest(a)},f.builders[Types.Entities.SORCERER]=function(a){return new c.Sorcerer(a)},f.builders[Types.Entities.OCTOCAT]=function(a){return new c.Octocat(a)},f.builders[Types.Entities.BEACHNPC]=function(a){return new c.BeachNpc(a)},f.builders[Types.Entities.FORESTNPC]=function(a){return new c.ForestNpc(a)},f.builders[Types.Entities.DESERTNPC]=function(a){return new c.DesertNpc(a)},f.builders[Types.Entities.LAVANPC]=function(a){return new c.LavaNpc(a)};return f})