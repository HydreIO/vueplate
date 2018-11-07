function supportsWebp() {
	let result
	return async () => {
		if (result) return result
		if (!self.createImageBitmap) return 'nowebp'
		const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
		const blob = await fetch(webpData).then(r => r.blob())
		return (result = await createImageBitmap(blob).then(() => 'webp', () => 'nowebp'))
	}
}

const cachedSupport = supportsWebp()

export default {
	bind: async (el, binding, vnode) => el.classList.add(await cachedSupport()),
}
