// tf-idf inspired by yesbabyyes

function tokenize(doc) {
    return doc.split(/[\s_():.!?,;]+/);
}

function parse(el) {
	return el.innerText;
}

function normalize(word) {
    return word.toLowerCase().replace(/[^\w]/g, "");
}

function filter(word) {
	return word.length > 2;
}

function reduce(previous, current, index, array) {
    if(!(current in previous)) {
        previous[current] = 1 / array.length;
    } else {
        previous[current] += 1 / array.length;
    }
    return previous;
};

function tf(doc) {
    return doc 
        .map(normalize)
        .filter(filter)
        .reduce(reduce, {});
}

function idf(termD, totalD) {
	return Math.log(totalD/termD);
}

freqs = Array.from($('p')).map(parse).map(tokenize).map(tf)
termD = {}
for (freq in freqs) {
	for (term in freqs[freq]) {
		if(!(term in termD)) {
			termD[term] = 1
		} else {
			termD[term] += 1
		}
	}
}
tfidfs = []
for (freq in freqs) {
	var tfidf = {}
	for (term in freqs[freq]) {
		tfidf[term] = freqs[freq][term]*idf(termD[term],freqs.length);
	}
	tfidfs.push(tfidf)
}
console.log(tfidfs)

