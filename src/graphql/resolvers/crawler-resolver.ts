import { IContext } from '../context';
import { CrawlerService } from '../../services/crawler-service';

interface SuggestionArgs {
	unitName: string;
	trend: 'gain' | 'lose' | 'maintain';
	amount?: number;
}

const crawlerService = new CrawlerService();

const resolver = {
	Query: {
		async getWebsiteSuggestions(
			_: any,
			args: SuggestionArgs,
			context: IContext
		) {
			if (context == null) {
				console.error('Context not found');
				return null;
			}
			let data = await crawlerService.searchForWebLinks({
				unit: args.unitName,
				trend: args.trend
			});
			if (args.amount && data && data.length >= args.amount) {
				data = data.slice(0, args.amount);
			}
			return data;
		}
	}
};

export default resolver;
