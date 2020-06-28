const general = require('./general.json')
const steps = require('./steps.json')
const things = require('./things.json')
const unique = require('./unique.json')
module.exports.getGeneral = (id) => {
    return general.data.find(r=> r['RECIPE_ID'] == id)
}

module.exports.getSteps = (id) => {
    return steps.data.filter(r=> r['RECIPE_ID'] == id).sort((a,b,)=> a['IRDNT_SN'] - b['IRDNT_SN'])
}

module.exports.getThings = (id) => {
    return things.data.filter(r=> r['RECIPE_ID'] == id)
}

module.exports.getInfo = (id) => {
    const general = this.getGeneral(id)
    if(!general) return undefined

    return { general, steps: this.getSteps(id), things: this.getThings(id) }
}

module.exports.getByName = (query) => {
    return general.data.find(r=> r['RECIPE_NM_KO'] === query)
}

module.exports.search = (query) => {
    return general.data.filter(r=> r['RECIPE_NM_KO'].includes(query)).map(r=> { return { id: r['RECIPE_ID'], key: r['RECIPE_ID'], title: r['RECIPE_NM_KO'], description: r['SUMRY'], price: r['COOKING_TIME']} })
}

module.exports.searchObj = () => {
    return general.data.map(r=> { return { id: r['RECIPE_ID'], key: r['RECIPE_ID'], title: r['RECIPE_NM_KO'], description: r['SUMRY'], price: r['COOKING_TIME']} })
}

module.exports.unique = () => {
    return unique.map(r=> { return { key: r, value: r, text: r } })
}

module.exports.searchMatching = ( query ) => {
    console.log(query)
    return general.data.map(el=> {
        el.matched = this.getThings([el['RECIPE_ID']]).map(r=> query.includes(r['IRDNT_NM'])).filter(r=> r === true).length
        return el
    }).filter(r=> r.matched !== 0).sort((a, b) => b.matched - a.matched).slice(0, 10).map(r=> {
        r.needs = this.getThings(r['RECIPE_ID'])
        return r
    })
}
module.exports.getRandom = (n) => {
    return getRandom(general.data, n)
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}