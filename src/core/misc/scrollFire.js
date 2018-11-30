import { once } from '@core/misc/decorators'

export const directions = {
	ABOVE: val => val < window.scrollY,
	BELOW: val => val >= window.scrollY,
	BETWEEN: (min, max) => directions.ABOVE(min) && directions.BELOW(max),
}

export function above(threshold) {
	return withPredicate(() => directions.ABOVE(threshold))
}

export function below(threshold) {
	return withPredicate(() => directions.BELOW(threshold))
}

export function between(min, max) {
	return withPredicate(() => directions.BETWEEN(min, max))
}

export function onScroll(t, n, d) {
	withPredicate(() => true)(t, n, d)
}

// prettier-ignore
function withPredicate(predicate) {
	return (...a) => {
		const [{constructor: { name }}, fName, { value }] = a
		const key = `${name}_${fName}`

		mounted(a,function(){
			ScrollFire.self().at(predicate, value, this, key)
		})

		beforeDestroy(a,function(){
			ScrollFire.self().destroy(key)
		})
	}
}

function mounted(a, callback) {
	const mtd = a[0].mounted
	const origin = mtd instanceof Array ? mtd : mtd ? [mtd] : []
	a[0].mounted = [callback, ...origin]
}

function beforeDestroy(a, callback) {
	const dst = a[0].beforeDestroy
	const origin = dst instanceof Array ? dst : dst ? [dst] : []
	a[0].beforeDestroy = [callback, ...origin]
}

class ScrollFire {
	saved = new Map()

	constructor() {
		this.update()
		window.addEventListener('scroll', ::this.update,{passive: true})
	}

	update(e) {
		;[...this.saved.values()].filter(o => o.predicate())?.forEach(o => o.self::o.callback())
	}

	/**
	 *
	 * @param {Function} predicate Detection predicate
	 * @param {Function} callback
	 * @param {String} key unique identifier to register the callback
	 * @param {Promise} self the object to call the function on
	 */
	async at(predicate, callback, self, key) {
		this.saved.set(key, {
			predicate,
			callback,
			self,
		})
	}

	destroy(key) {
		this.saved.delete(key)
	}

	@once
	static self() {
		return new ScrollFire()
	}
}
export default ScrollFire.self()
