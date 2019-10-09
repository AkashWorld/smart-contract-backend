/*
   This file will be used to setup the network, port, and etc.
   It will import the express app from server.ts and then use it for the
   website
*/

import { app } from './server';

const port = 8080;
app.listen(port, function() {
	console.log(`Express server intialized on port ${port}`);
});
