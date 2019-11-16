import { IResolvers } from 'graphql-tools';
import services from '../../services';
import { IContext } from '../context';
import { PubSub } from 'graphql-subscriptions';
import { GlobalDescriptorService } from '../../services/global-descriptor-service';
/*
interface IServiceMap {
	userDescriptorService: UserDescriptorService;
}

const serviceMap: IServiceMap = {
	userDescriptorService: new UserDescriptorService()
};
*/