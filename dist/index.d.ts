import { LoadToPageTranslator } from '@writetome51/load-to-page-translator';


/******************************
 This is intended to be used by a paginator.
 Its methods return a load (array) of data from a larger set that is too big to be
 loaded all at once.  Each load can contain multiple pages of data.
 ******************************/

export declare class PageLoadAccess {

	private __dataSource;
	private __loadInfo;
	private __load2pgTranslator;
	private __currentLoad;


	constructor(
		__dataSource: {
			getLoad: (
				loadNumber: number, itemsPerLoad: number, isLastLoad: boolean
			) => Promise<any[]>;
		},
		__loadInfo: {
			getCurrentLoadNumber: () => number;
			setCurrentLoadNumber: (num: number) => void;
			getItemsPerLoad: () => number;
			currentLoadIsLast: () => boolean;
		},
		__load2pgTranslator: LoadToPageTranslator
	);


	getLoadContainingPage(pageNumber: number): Promise<any[]>;


	getRefreshedLoadContainingPage(pageNumber: number): Promise<any[]>;
}
