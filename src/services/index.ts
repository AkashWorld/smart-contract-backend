import { GlobalDescriptorService } from './global-descriptor-service';
import { UserDescriptorService } from './user-descriptor-service';

interface IServiceMap {
	globalDescriptorService: GlobalDescriptorService;
	userDescriptorService: UserDescriptorService;
}

const serviceMap: IServiceMap = {
	globalDescriptorService: new GlobalDescriptorService(),
	userDescriptorService: new UserDescriptorService()
};

export default serviceMap;
