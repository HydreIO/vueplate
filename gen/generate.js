const fs = require('fs-extra')
const toml = require('toml')

void (async function() {
	const config = toml.parse(await fs.readFile('./hydre.toml', 'utf8'))
	await genFolders()
	await Promise.all([genBrowserConfig(config), genHtml(config), genManifest(config), genRobots()])
	await cleanupIcons()
})()

async function genFolders() {
	await fs.mkdirs('./public/img/og')
}

async function genBrowserConfig(conf) {
	const file = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/img/icons/mstile-150x150.png"/>
            <TileColor>${conf.tileColor}</TileColor>
        </tile>
    </msapplication>
</browserconfig>
`
	await fs.writeFile('./public/browserconfig.xml', file)
}

async function genHtml(conf) {
	const lconf = conf.en
	const file = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />

		<title>${eval(lconf.titleTemplate)(lconf.title)}</title>
		<meta name="description" content="${lconf.description}" />

		<meta name="msapplication-tap-highlight" content="no" />
		<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1" />

		<meta property="og:url" content="<%= BASE_URL %>" />
		<meta property="og:image" content="<%= BASE_URL %>img/og/og-image.jpg" />
		<meta property="og:image:width" content="${conf.og[0].content}" />
		<meta property="og:image:height" content="${conf.og[1].content}" />
		<meta property="og:title" content="${eval(lconf.ogTemplate)(lconf.ogTitle)}" />
		<meta property="og:description" content="${lconf.description}" />

		<meta name="twitter:card" content="${conf.tw[1].content}" />
		<meta name="twitter:site" content="${conf.tw[0].content}" />
		<meta name="twitter:title" content="${eval(lconf.ogTemplate)(lconf.ogTitle)}" />
		<meta name="twitter:description" content="${lconf.description}" />
		<meta name="twitter:image" content="${conf.ogImage}" />
		<meta name="twitter:creator" content="${conf.tw[2].content}" />

		<link rel="icon" href="<%= BASE_URL %>favicon.ico" />
		<link rel="apple-touch-icon" sizes="${
			conf.touchIconSize
		}" href="<%= BASE_URL %>img/icons/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="<%= BASE_URL %>img/icons/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="<%= BASE_URL %>img/icons/favicon-16x16.png" />
		<link rel="manifest" href="<%= BASE_URL %>manifest.json" />
		<link rel="mask-icon" href="<%= BASE_URL %>img/icons/safari-pinned-tab.svg" color="${
			conf.maskIconColor
		}" />
		<link rel="shortcut icon" href="<%= BASE_URL %>favicon.ico" />
		<meta name="msapplication-TileColor" content="${conf.tileColor}" />
		<meta name="msapplication-TileImage" content="<%= BASE_URL %>img/icons/mstile-150x150.png" />
		<meta name="theme-color" content="${conf.themeColor}" />
	</head>
	<body>
		<noscript>
			<strong>This website doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
		</noscript>
		<div id="app"></div>
	</body>
</html>
`
	await fs.writeFile('./public/index.html', file)
}

async function genManifest(conf) {
	const file = `{
	"name": "${conf.app}",
	"short_name": "${conf.app}",
	"icons": [
	  {
		"src": "./img/icons/android-chrome-192x192.png",
		"sizes": "192x192",
		"type": "image/png"
	  },
	  {
		"src": "./img/icons/android-chrome-512x512.png",
		"sizes": "512x512",
		"type": "image/png"
	  }
	],
	  "start_url": "/",
	  "theme_color": "${conf.themeColor}",
	  "background_color": "${conf.themeColor}",
	  "display": "standalone"
}
`
	await fs.writeFile('./public/manifest.json', file)
}

async function genRobots() {
	const file = `User-Agent: *
Disallow: 
`
	await fs.writeFile('./public/robots.txt', file)
}

async function useOG() {
	await fs.copy('./masterpicture.png', './public/img/og/og-image.jpg')
	try {
		await fs.copy('./og-image.jpg', './public/img/og/og-image.jpg')
	} catch (error) {
		console.log(error)
	}
}

async function cleanupIcons() {
	const runs = [
		fs.remove('./public/img/icons/browserconfig.xml'),
		fs.remove('./public/img/icons/site.webmanifest'),
		fs.remove('./faviconData.json'),
		fs.copy('./public/img/icons/favicon.ico', './public/favicon.ico'),
		useOG()
	]
	try {
		await Promise.all(runs)
	} catch (error) {
		console.log('WARN: Icons cleanup failed, if you use custom icons just ignore this message')
	}
	console.log('Done')
}
