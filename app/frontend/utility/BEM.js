/**
 *
 * Simple utility for easy creating elements and modificators names in block namespace
 * @param  {string} blockName : block nsme
 * @return {Block}
 *
 *
 * (b) Block(blockName) : {
 *         toString(): return block name,
 *         m(modificatorName): Modificator constructor,
 *         e(elementName): Element constructor,
 * }
 *
 * (e) Element(elementName) : {
 *         toString(): return elementName,
 *         m(modificatorName): Modificator constructor,
 * }
 *
 * (m) Modificator(modificatorName) : {
 *         toString(): return modificator name in parent namespace,
 *         v(value): modificator value constructor return string,
 * }
 *
 *
 *
 * example of usage:
 *
 * import bem from "../utils/BEM.js"
 *
 * const b = bem('my-block')
 * const bmv = b.m('some-mod').v((isSome)?'some': 'no-some')
 * const be = b.e('some-element')
 * const bem1 = be.m('some-mod-1')
 * const bem2 = be.m('some-mod-2')
 *
 * <div className={[b,bmv].join(' ')}>
 * 	<div className={[be,bem1, bem2].join(' ')}>
 *  </div>
 * 	<div className={b.e('some-other-element')}>
 *  </div>
 * 	<div
 *        className={[
 *             b.e('some-other-element'),
 *             b.e('some-other-element').m('some-mod'),
 *             b.e('some-other-element').m('some-mod-valued').v((isSome)?'some': 'no-some')
 *             ].join(' ')}>
 *  </div>
 * </div>
 *
 */

class Named{
	constructor(name){
		this.name = name
	}
	toString(){
		return this.name;
	}
}

class Value extends Named {
	constructor(name){
		super(name)
	}
}

class Modificator extends Named{
	constructor(name){
		super(name)
	}

	v(value){
		return new Value([this, '--', value].join(''))
	}
}

class Element extends Named{
	constructor(name){
		super(name)
	}

	m(modificatorName){
		return new Modificator([this, '--', modificatorName].join(''))
	}
}



class Block extends Named{
	constructor(blockName){
		super(blockName)
	}

	e(elementName){
		return new Element([this, '__', elementName].join(''))
	}

	m(modificatorName){
		return new Modificator([this, '--', modificatorName].join(''))
	}

}

export default function b(blockName){
	return new Block(blockName)
}
