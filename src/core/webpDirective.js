async function supportsWebp() {
	if (!self.createImageBitmap) return 'nowebp'
	const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
	const blob = await fetch(webpData).then(r => r.blob())
	return createImageBitmap(blob).then(() => 'webp', () => 'nowebp')
}

const cachedSupport = supportsWebp()
export default async el => el.classList.add(await cachedSupport)
