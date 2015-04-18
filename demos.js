//self, player.getCardinalDirection()
//SOUTH 0, WEST 1, NORTH 2, EAST 3

var directions = {
	'N': {'Id': 0, 'OppositeId': 2}, 
	'S': {'Id': 2, 'OppositeId': 0}, 
	'E': {'Id': 1, 'OppositeId': 3}, 
	'W': {'Id': 3, 'OppositeId': 1}
}

exports.suitup = function( player ) {
	var ItemType = Packages.net.canarymod.api.inventory.ItemType;
	var Canary = Packages.net.canarymod.Canary;
	var itemFactory = Canary.factory().itemFactory;
	var EnchantmentType = Packages.net.canarymod.api.inventory.Enchantment.Type;

	//create items 
	var itemType = "newItem(net.canarymod.api.inventory.ItemType)";
	var helmet = itemFactory[itemType](ItemType["DiamondHelmet"]);
	var armor = itemFactory[itemType](ItemType["DiamondChestplate"]);
	var leggings = itemFactory[itemType](ItemType["DiamondLeggings"]);
	var boots = itemFactory[itemType](ItemType["DiamondBoots"]);
	var sword = itemFactory[itemType](ItemType["DiamondSword"]);
	var bow = itemFactory[itemType](ItemType["Bow"]);
	var arrow = itemFactory[itemType](ItemType["Arrow"]);
	
	//add enchantments
	//var e = itemFactory.newEnchantment(1, 1);
	var protection4 = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Protection, 4)
	var fireProtection4 = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.FireProtection, 4)
	var projectileProtection4 = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.ProjectileProtection, 4)
	var thorns = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Thorns,3);
	var featherFall = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.FeatherFalling,3);
	var depthStrider = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.DepthStrider,3);
	helmet.addEnchantments([protection4, fireProtection4, projectileProtection4]);
	armor.addEnchantments([protection4, fireProtection4, thorns, projectileProtection4]);
	leggings.addEnchantments([depthStrider, protection4]);
	boots.addEnchantments([featherFall]);

	//Do you like my sword??!!!??
	var unbreaking = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Unbreaking,3);
	var sharpness = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Sharpness,5);
	var smite = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Smite,5);
	var fireAspect = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.FireAspect,5);
	var infinity = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Infinity,1);
	var power = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Power,5);
	var flame = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Flame,1);
	var knockback = itemFactory.newEnchantment(Packages.net.canarymod.api.inventory.Enchantment.Type.Knockback,2);
	
	//add to inventory
	player.getInventory().setHelmetSlot(helmet);
	player.getInventory().setChestPlateSlot(armor);
	player.getInventory().setLeggingsSlot(leggings);
	player.getInventory().setBootsSlot(boots);
	//player.getInventory().setSlot(0, sword);
	player.getInventory().addItem(sword.getId());
	player.getInventory().addItem(bow.getId());
	player.getInventory().addItem(arrow.getId());
	//
	//add weapons enchantments later??
	sword = player.getInventory().getItem(sword.getId());
	sword.addEnchantments([unbreaking, sharpness, smite, fireAspect, knockback]);
	bow = player.getInventory().getItem(bow.getId());
	bow.addEnchantments([power, infinity, flame, smite]);
}

exports.cannon = function(direction) {
	//up(1).box(1).up(1).box('69:5'); lever??
	var repeaterDir = direction | directions[self.getCardinalDirection().toString().charAt(0)]['Id'];
	echo(repeaterDir);

 	var base = up(1).box0(1,3,1,9) //make u shaped base
 		.fwd(8).right(1).box(44) //place slab to fill in U shape
 		.back(7).up(1).box(1) //upper box for lever
 		.down(1).box(8) // put water in base of cannon
 		.left(1).up(1).fwd(6).box(1).fwd(1).box(1) //upper barrel of cannon
 		.back(8).right(1).box('69:5)') //lever as trigger
		.left(1).box(55) //redstone wire
		.fwd(1).box('93:'+repeaterDir).fwd(1).box('93:'+repeaterDir).fwd(1).box('93:'+repeaterDir).fwd(1).box('93:'+repeaterDir) //repeaters/diode
		.fwd(1).box(55).fwd(1).box(55).up(1).fwd(1).box(55).fwd(1).box(55) //finish redstone
		.right(2).down(1).back(8).box0(55,1,1,8) //redstone down right side
		.left(1).fwd(2).down(1).box0(46,1,1,6); //load up chamber
} 

var store = persist('lostandfound',{ players: { } });
exports.lostAndFound = function(player) {
	if (store.players[player.name]) {
		echo('here you go');
		player.getInventory().setContents(store.players[player.name]);
	}
}

events.playerDeath( function( evt, cancel ) { 
	store.players[evt.player.name] = evt.player.getInventory().getContents();
} );

exports.boxloop = function(size, times) {
	var colors = [1,2,3,4,5,6,7,8,9,10]
	var index = 0;
	for (var i = 0; i < times; i++) {
		if (index > 9) {
			index =0;
		}
		//var j = '35:' + colors[index];
		//var j = i % 2 == 0 ? 86 : 91;
		j = 57;
		box(j,size).right(size).box(j,1,size).up(size).left(size).box(j,size + 1).down(size).box(j,1,size);
		index++;
	}
}

exports.pumpkinbox = function(size, times, direction) {
	var facing = direction | directions[self.getCardinalDirection().toString().charAt(0)]['Id']; 
	echo(facing);
	for (var i = 0; i < times; i++) {
		var j = i % 2 == 0 ? '86:' + facing : '91:' + facing; 
		box(j,size).right(size).box(j,1,size).up(size).left(size).box(j,size + 1).down(size).box(j,1,size);
	}
}

var _myLine = 'myLine'; 
exports.lineStart = function() {
	_myLine = 'myLine' + Math.random();
	return this;
}

exports.lineR = function(block, num) {
	move(_myLine).box(block,num).right(num-1).chkpt(_myLine);
	return this;
}

exports.lineU = function(block, num) {
	move(_myLine).box(block,1,num).up(num-1).chkpt(_myLine);
	return this;
}

exports.lineD = function(block, num) {
	move(_myLine).down(num).box(block,1,num).chkpt(_myLine);
	return this;
}

exports.lineL = function(block, num) {
	move(_myLine).left(num).box(block,num).chkpt(_myLine);
	return this;
}



