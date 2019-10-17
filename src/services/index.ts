import { UserDescriptorService } from './user-descriptor-service';

interface IServiceMap {
	userDescriptorService: UserDescriptorService;
}

const serviceMap: IServiceMap = {
	userDescriptorService: new UserDescriptorService()
};

export default serviceMap;
