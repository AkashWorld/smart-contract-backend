/* keeps track of each page and navigations
	 - gets express from express and router from ./router/router
	 - will have all of the app functions such as app.use for loading pages or...
	 	 ... app.post/app.get for working with front-end forms
	 */

import {express} from "express";
import {router} from "./router/router";

export function helloWorld() {
	return 'Hello, ' + 'World';
}

export const app = express();
	/* *Routes will be used to navigate through webapp, based on the url entry at the endpoint
		 *LogIn is for the login page and its operations
		 *EntryForm is the page where users will enter their data and a form will accept them
	*/
app.use('/',router);
app.use('/LogIn',router);
app.use('/EntryForm',router);
