export default loader => [
	{
		path: '/',
		name: 'home',
		component: () => loader('home'),
	},
	{
		path: '*',
		name: '404',
		component: () => loader('misc/404'),
	},
]
