import {createNewAccount} from '../../services/login/createAccount';
import {createAcc} from '../../services/login/createAccountAlt';


const resolver = {
  Query: {
    createNewAccount: () =>{
      let newAccountPrivateKey = createNewAccount();
      return{
        newKey : newAccountPrivateKey
      };
    }
  }
}

export default resolver;
