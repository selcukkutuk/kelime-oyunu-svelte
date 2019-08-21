import "@babel/polyfill";

import App from './App.svelte';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const app = new App({
	target: document.body,
	props: {
		name: 'world2'
	}
});

window.app = app;

export default app;