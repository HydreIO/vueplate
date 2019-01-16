const path = require('path')
require('toml-require').install()
const config = require('./hydre.toml')

const aliases = {
	cmp: 'src/comps',
	stl: 'src/styles',
	v: 'src/views',
	core: 'src/core',
	rs: 'src/assets/resources',
	svg: 'src/assets/svg',
	root: './'
}

const registerAliases = (a, config) => Object.entries(a).forEach(([k, v]) => config.resolve.alias.set('@' + k, path.join(__dirname, v)))

const loadToml = config => {
	const rule = config.module.rule('toml')
	rule.uses.clear()
	rule
		.test(/\.toml$/)
		.use('toml')
		.loader('toml-loader')
		.end()
}

const loadSvg = config => {
	const rule = config.module.rule('svg')
	rule.uses.clear()
	rule
		.test(/\.svg$/)
		.use('svg')
		.loader('vue-svg-loader')
		.end()
}

const loadI18n = config => {
	const rule = config.module.rule('i18n')
	rule
		.resourceQuery(/blockType=i18n/)
		.type('javascript/auto')
		.use('i18n')
		.loader('@kazupon/vue-i18n-loader')
		.end()
		.use('yaml')
		.loader('yaml-loader')
		.end()
}

module.exports = {
	chainWebpack: config => {
		registerAliases(aliases, config)
		loadI18n(config)
		loadToml(config)
		loadSvg(config)
	},
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/sw.js'
		},
		themeColor: config.themeColor,
		appleMobileWebAppCapable: 'yes',
		iconPaths: {
			favicon32: 'img/icons/favicon-32x32.png',
			favicon16: 'img/icons/favicon-16x16.png',
			appleTouchIcon: 'img/icons/apple-touch-icon.png',
			maskIcon: 'img/icons/safari-pinned-tab.svg',
			msTileImage: '/img/icons/mstile-150x150.png'
		}
	},
	devServer: {
		disableHostCheck: true
	}
}
