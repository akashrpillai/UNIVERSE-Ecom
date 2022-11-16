class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
        // console.log("constructor query: ",query,'and querystr: ',queryStr)
    }

    // Search By Names of Products
    search() {
        // console.log('search querystr: ',this.queryStr.keyword)
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {}

        // console.log("search: ", keyword)
        this.query = this.query.find({ ...keyword })
        return this

    }
    
    // Search Filters For Category , price and Ratings 
    filter() {
        const querycopy = { ...this.queryStr }
        // console.log('before removing fields', querycopy)
        const removefields = ["keyword", "page", "limit"]
        removefields.forEach((key) => {
            delete querycopy[key]
        })
        // console.log('after removing fields', querycopy)

        // Filter for price and Ratings
        // price: { gt: '100', lt: '100000' } ==> to Add dolor sign in front of it
        let queryStr = JSON.stringify(querycopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        // this.query = this.query.find(querycopy) // For Only Category
        this.query = this.query.find(JSON.parse(queryStr))
        // console.log('after adding $', queryStr)
        return this
    }
    // Pgenation
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip)
        return this

    }
}

module.exports = ApiFeatures