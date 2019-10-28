/*  Resolver obtains the unsigned_address from the query request
    then it calls the loginDataInput to obtained the singed_address
    which then is returned as query.

*/


import {loginDataInput} from '../../services/login/loginpost'


const resolver = {
  Query: {
    login:(_:any,args:{unsigned_address:string},context:any) => {
<<<<<<< HEAD
      let signedAddress = loginDataInput(args.unsigned_address);
=======
      var signedAddress = loginDataInput(args.unsigned_address);
>>>>>>> e58ccbe151bc454b65dc7a87c3704e094b3f6782
      return{
        signed_address: signedAddress
      };
    }
  }
};

export default resolver;
