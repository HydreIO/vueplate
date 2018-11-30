const path = require('path')

const aliases = {
	cmp: 'src/comps',
	stl: 'src/styles',
	v: 'src/views',
	core: 'src/core',
	rs: 'src/assets/resources',
	svg: 'src/assets/svg',
}

const registerAliases = (a, config) => Object.entries(a).forEach(([k, v]) => config.resolve.alias.set('@' + k, path.join(__dirname, v)))
const svgLoader = config => {
	const svgRule = config.module.rule('svg')
	svgRule.uses.clear()
	svgRule.use('vue-svg-loader').loader('vue-svg-loader')
}

module.exports = {
	chainWebpack: config => {
		registerAliases(aliases, config)
		svgLoader(config)
		config.module
			.rule('i18n')
			.resourceQuery(/blockType=i18n/)
			.type('javascript/auto')
			.use('i18n')
			.loader('@kazupon/vue-i18n-loader')
			.end()
			.use('yaml')
			.loader('yaml-loader')
			.end()
	},
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/sw.js',
		},
		themeColor: '#01579B',
		appleMobileWebAppCapable: 'yes',
		iconPaths: {
			favicon32: 'img/icons/favicon-32x32.png',
			favicon16: 'img/icons/favicon-16x16.png',
			appleTouchIcon: 'img/icons/apple-touch-icon.png',
			maskIcon: 'img/icons/safari-pinned-tab.svg',
			msTileImage: '/img/icons/mstile-150x150.png',
		},
	},
	devServer: {
		disableHostCheck: true,
	},
}
