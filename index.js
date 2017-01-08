'use strict'


module.exports = function BEMClasses(node, isMix){
	if(!validateNode(node)){ return '' }

	const entity = node.block + (node.elem? ('__' + node.elem) : '');
	let classes = entity;
	let modValue = '';

	if(node.mods){
		for(let modName in node.mods){
			if(!validateMod(node.mods[modName])) return ''
			
			classes += ' ' + entity + '_' + modName  + ((node.mods[modName] === true)? '' : ('_' + node.mods[modName]));
		} 
	}

	if(node.mix && !isMix){
		let mix;

		if(Array.isArray(node.mix)){
			for (let i = 0; i < node.mix.length; i++) {
				mix = BEMClasses(node.mix[i], true);
				classes += mix? ' ' + mix : '';
			}
		} else if (typeof node.mix === 'object' && node.mix !== null){
			mix = BEMClasses(node.mix, true);
			classes += mix? ' ' + mix : '';
		} 
		
	}

	return classes; 
};	

function validateMod(mod){ return typeof mod === 'string' || typeof mod === 'boolean' }

function validateNode(node){
	if(typeof node !== 'object' || Array.isArray(node) || node === null) return false
	if(!node.block || typeof node.block !== 'string') return false 
	if(node.elem && typeof node.elem !== 'string') return false 
	if((node.mods && (typeof node.mods !== 'object' || Array.isArray(node.mods) || node.mods === null)) || node.mods === '' ) return false 
	if((node.mix && (typeof node.mix !== 'object' || node.mix === null)) || node.mix === '' ) return false
		
	return true	
}





