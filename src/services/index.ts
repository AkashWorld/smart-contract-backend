import { GlobalDescriptorService } from './global-descriptor-service';
import { UserDescriptorService } from './user-descriptor-service';

interface IServiceMap {
	lobalDescriptorService: GlobalDescriptorService;
	userDescriptorService: UserDescriptorService;
}

const serviceMap: IServiceMap = {
	lobalDescriptorService: new GlobalDescriptorService(),
	userDescriptorService: new UserDescriptorService()
};

export default serviceMap;
