class SearchSuggestionSystem {
    constructor(products) {
        this.products = products.sort(); 
    }

    getSuggestions(searchWord) {
        const results = [];
        let prefix = "";

        for (let i = 0; i < searchWord.length; i++) {
            prefix += searchWord[i];
            const suggestions = this.getTopMatches(prefix);
            results.push(suggestions);
        }

        return results;
    }

    getTopMatches(prefix) {
        const res = [];
        const products = this.products;
        let left = this.lowerBound(products, prefix);  

        for (let i = left; i < products.length && res.length < 3; i++) {
            if (products[i].startsWith(prefix)) {
                res.push(products[i]);
            } else {
                break;
            }
        }

        return res;
    }


    lowerBound(products, prefix) {
        let low = 0, high = products.length;
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            if (products[mid] < prefix) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}
