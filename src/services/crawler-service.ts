import axios from 'axios';
import cheerio from 'cheerio';
import cache from 'memory-cache';

interface WebPage {
	title: string;
	link: string;
}

interface Query {
	unit: string;
	trend: 'gain' | 'lose' | 'maintain';
}

export class CrawlerService {
	private readonly BASE_GOOGLE_LINK = 'https://www.google.com/search?q=';

	async searchForWebLinks(query: Query) {
		const cacheResult = cache.get(query);
		if (cacheResult != null) {
			return cache.get(query);
		}
		const queryString = `How to ${query.trend} ${query.unit} healthy`;
		const body = await this.retrieveWebPages(queryString);
		if (!body) {
			console.error('Unable to retrieve search body');
			return null;
		}
		const result = await this.scrapeTitleAndLinks(body);
		if (result.length > 0) {
			cache.put(query, result, 600_000); //10 minutes
		}
		return result;
	}

	private async retrieveWebPages(query: string) {
		if (query == null) {
			return null;
		}
		const searchQuery = encodeURI(this.BASE_GOOGLE_LINK + query);
		const response = await axios.get(searchQuery, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0'
			}
		});
		return response.data;
	}

	private async scrapeTitleAndLinks(body: string): Promise<WebPage[]> {
		const data: WebPage[] = [];
		const $ = cheerio.load(body);
		$('.S3Uucc').each((i, elem) => {
			const title = $(elem).text();
			data.push({ title, link: '' });
		});
		$('.r').each((i, elem) => {
			const link = $(elem)
				.find('a')
				.attr('href');
			if (link != undefined) {
				data[i].link = link;
			}
		});
		return data.filter(page => page.link != '');
	}
}
