//import { GlobalDescriptorService } from './global-descriptor-service';
import { UserDescriptorService } from './user-descriptor-service';

interface IServiceMap {
//	GlobalDescriptorService: GlobalDescriptorService;
	userDescriptorService: UserDescriptorService;
}

const serviceMap: IServiceMap = {
//	GlobalDescriptorService: new GlobalDescriptorService(),
	userDescriptorService: new UserDescriptorService()
};

export default serviceMap;
