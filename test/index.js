'use strict'

const expect = require('chai').expect;
const BEMClasses = require('../index');


describe('BEMClasses', () => {

	describe('Должен возвращать строку с корректными БЭМ-классами', () => {
		
		it('Если указано только поле block', () => {
		    run({ 
				input: { block: 'button' },
				output: 'button'
			})
		})

		it('Если указаны поля block и elem', () => {
		    run({ 
				input: { block: 'button', elem: 'icon' },
				output: 'button__icon'
			})
		})

		it('Если указаны поля block и mods', () => {
		    run({ 
				input: { block: 'button', mods: { theme: 'base', size: 's' } },
				output: 'button button_theme_base button_size_s'
			})
		})

		it('Если указаны поля block и mods и модификатор булева типа', () => {
		    run({ 
				input: { block: 'button', mods: { hover: true } },
				output: 'button button_hover'
			})
		})
		
		it('Если указаны поля block, elem и mods', () => {
		    run({ 
				input: { block: 'button', elem: 'icon', mods: { size: 's' } },
				output: 'button__icon button__icon_size_s'
			})
		})

		describe('Если указаны поля block и mix', () => {

			it('Если в mix указано только поле block', () => {
			    run({ 
					input: { block: 'button', mix: { block: 'form' } },
					output: 'button form'
				})
			})

			it('Если в mix указаны поля block и elem', () => {
			    run({ 
					input: { block: 'button', mix: { block: 'form', elem: 'button' } },
					output: 'button form__button'
				})
			})

			it('Если в mix указаны поля block и mods', () => {
			    run({ 
					input: { block: 'button', mix: { block: 'form', mods: { size: 's' } } },
					output: 'button form form_size_s'
				})
			})

			it('Если в mix указаны поля block, elem и mods', () => {
			    run({ 
					input: { block: 'button', mix: { block: 'form', elem: 'button', mods: { size: 's' } } },
					output: 'button form__button form__button_size_s'
				})
			})

			it('Если mix массив объектов должен обработать каждый', () => {
				run({ 
					input: { block: 'button', mix: [{ block: 'form' }, { block: 'icon' }] },
					output: 'button form icon'
				})
			})

		})

	})

	describe('Должен возвращать пустую строку:', () => {

		it('Если не указано поле block', () => {
		    run({ 
				input: { elem: 'icon' },
				output: ''
			})
		})

		it('Если поле block не строка', () => {
		    run({ 
				input: { block: {}, elem: 'icon' },
				output: ''
			});
		})

		it('Если поле elem не строка', () => {
		    run({ 
				input: { block: 'button', elem: [] },
				output: ''
			});
		})

		it('Если поле mix не массив и не объект', () => {
		    run({ 
				input: { block: 'button', mix: '' },
				output: ''
			});
		})

		it('Если поле mods не объект', () => {
		    run({ 
				input: { block: 'button', mods: '' },
				output: ''
			});
		})

		it('Если модификатор не строка', () => {
		    run({
				input: { block: 'button', mods: { size: [] } },
				output: ''
			});
		})
		
	})

	describe('Должен игнорировать:', () => {

		it('Если в поле mix не указано поле block должен игнорировать весь mix', () => {
		    run({ 
				input: { block: 'button', mix: { elem: 'icon' } },
				output: 'button'
			})
		})

		it('Если в поле mix указано поле mix должен игнорировать это поле', () => {
		    run({ 
				input: { block: 'button', mix: { block: 'icon', mix: { block: 'form' } } },
				output: 'button icon'
			})
		})

		it('Если указаны любые другие поля', () => {
		    run({ 
				input: { block: 'button', color: 'red', someProp: 'someVal' },
				output: 'button'
			})
		})
	
	})

})




function run(obj) {
    return expect(BEMClasses(obj.input)).to.equal(obj.output);
}