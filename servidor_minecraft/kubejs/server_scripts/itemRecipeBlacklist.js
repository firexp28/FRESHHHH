global.itemAsOutputRecipeBlacklist = [
    "the_deep_void:void_cloak_chestplate",
    "the_deep_void:void_core",
    "the_deep_void:rotten_dart",
    "the_deep_void:stalker_treat",
    "the_deep_void:void_dagger",
    "the_deep_void:void_pendant",
    "the_deep_void:licker_hook",
    "the_deep_void:grim_scythe",
    "the_deep_void:voidrium_boots",
    "the_deep_void:voidrium_leggings",
    "the_deep_void:voidrium_chestplate",
    "the_deep_void:voidrium_helmet",
    "the_deep_void:forbidden_tome",
    "alexsmobs:transmutation_table",
    "alexsmobs:shattered_dimensional_carver",
    "alexsmobs:dimensional_carver",
    "alexsmobs:shield_of_the_deep",
    "alexsmobs:stink_ray",
    "minecraft:wither_skeleton_skull",
    "minecraft:phantom_membrane",
    "k_turrets:raw_titanium",
    "the_deep_void:voidrium",
    "the_deep_void:refined_bismuth",
];
global.itemAsInputRecipeBlacklist =
[
    "create_netherless:netherite_fragment"
];
ServerEvents.tags('item',event=>{
    // //removes k_turret's titanium ingot from the titanium tags for the purpose of removing it from recipes that use any titanium. this is needed because simply doing "event.remove({input: k_turret:titanium_ingot})" would unfortunately delete the entirety of any recipe that includes it
    event.remove('forge:ingots/titanium','k_turrets:titanium_ingot')
    event.remove('forge:titanium','k_turrets:titanium_ingot')
})
ServerEvents.recipes(event=>{
    global.itemAsOutputRecipeBlacklist.forEach(element => 
        {
            event.remove({output: element})  //removes recipes in which create the element
        }
    );
    global.itemAsInputRecipeBlacklist.forEach(element => 
        {
            event.remove({input: element}) //removes recipes in which the element is used as an ingredient of the created item
        }
    );
    //specific cases that dont fit in the forEach loop.
    event.remove([{ type: 'minecraft:smelting', output: 'k_turrets:titanium_ingot' }, { type: 'minecraft:blasting', output: 'k_turrets:titanium_ingot' }])
    //following two event.remove functions will 1) delete the blackstone crushing recipe 2) replace it with a duplicate that doesnt have netherite fragment in it. now JEI properly reflects the results!
    event.remove('create_netherless:netherite_fragment_by_crushing')
    event.custom({
        "type": "create:crushing",
        "ingredients": [
          {
            "item": "minecraft:blackstone"
          }
        ],
        "results": [
          {
            "item": "coal",
            "count": 1,
            "chance": 0.5
          }
        ],
        "processingTime": 250
      })
})

//For all code related to k_turret titanium in this script: even though the ore is disabled from generation if disabledOres.js is running, it still needs to be removed from JEI menus as well to prevent confusion among new players