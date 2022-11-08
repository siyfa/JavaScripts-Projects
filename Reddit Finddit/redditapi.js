export default {
    search: async function(searchTerm, searchLimit,sortBy){
        try {
            const res = await fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
            const data = await res.json()
            return data.data.children.map(data_1 => data_1.data)
        } catch (e) {
            return console.log(e)
        }
    }
}