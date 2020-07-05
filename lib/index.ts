import { LoadToPageTranslator } from '@writetome51/load-to-page-translator';


/******************************
 This is intended to be used by a paginator.
 Its methods return a load (array) of data from a larger set that is too big to be
 loaded all at once.  Each load can contain multiple pages of data.
 ******************************/

export class PageLoadAccess {


	private __currentLoad: any[];


	constructor(
		private __dataSource: {

			// The number of items `getLoad()` returns must match `itemsPerLoad`.  If `isLastLoad`
			// is true, it must only return the remaining items in the dataset and ignore itemsPerLoad.

			getLoad: (
				loadNumber: number, itemsPerLoad: number, isLastLoad: boolean
			) => Promise<any[]>;
		},

		private __loadInfo: {
			getCurrentLoadNumber: () => number, setCurrentLoadNumber: (num: number) => void,
			getItemsPerLoad: () => number, currentLoadIsLast: () => boolean
		},

		private __load2pgTranslator: LoadToPageTranslator
	) {
	}


	async getLoadContainingPage(pageNumber): Promise<any[]> {
		if (this.__load2pgTranslator.loadContainsPage(
			pageNumber, this.__loadInfo.getCurrentLoadNumber()
		)) {
			return this.__currentLoad;
		}
		else return await this.getRefreshedLoadContainingPage(pageNumber);
	}


	async getRefreshedLoadContainingPage(pageNumber): Promise<any[]> {
		this.__loadInfo.setCurrentLoadNumber(
			this.__load2pgTranslator.getLoadNumberContainingPage(pageNumber)
		);

		this.__currentLoad = await this.__dataSource.getLoad(
			this.__loadInfo.getCurrentLoadNumber(),
			this.__loadInfo.getItemsPerLoad(),
			this.__loadInfo.currentLoadIsLast()
		);
		return this.__currentLoad;
	}


}
