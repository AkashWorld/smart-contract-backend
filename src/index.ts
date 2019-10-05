import express,{Request,Response,Next} from "express";
import {router} from "./router"

export function helloWorld() {
	return 'Hello, ' + 'World';
}

const app = express();
	/* *Routes will be used to navigate through webapp, based on the url entry at the endpoint
		 *LogIn is for the login page and its operations
		 *EntryForm is the page where users will enter their data and a form will accept them
	*/
app.use('/',router);
app.use('/LogIn',router);
app.use('/EntryForm',router);




//export this module to be used in making
export default app;
