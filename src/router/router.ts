import express,{Request,Response,Next,Router} from "express";
var router : Router;

//for now just making the paths so that when the different pages set up we can fill in

/* *The routes will change the webpage based on the input url ending
   * Any functions or tasks that will be required when loading a page will go where
   * For ex: if loading a graph page, function to load the data will go where
*/

router.get('/',function(req:Request,res:Response,next:Next){

});

router.get('/LogIn',function(req:Request,res:Response,next:Next){

});

router.get('/EntryForm',function(req:Request,res:Response,next:Next){

});

router.get('/SubmitLabe',function(req:Request,res:Response,next:next){
  
});

export default router;
