const baseUrl = {
    client: "http://localhost:3000",
    server: "http://localhost:3080"
};

const MAX_YEAR = 2023;
const MIN_YEAR = 1900;


const bookReviewsFormat = () => {
    return {
        scores: {
            reviewsNum: "0",
            score: "0",
        },

        reviews: []
    }
}

const reviewFormat = () => {
    return {
        userId: "",
        name: "", //user name
        content: "", //review content 
        rate: ""    //review rating 
    }
}

const userFormat = () => {
    return {
        userName: "",
        reviewsNumber: "",
        userBooks: []
    }
}

const keyWordsSearch = (content, keyWord) => {
    const regex = new RegExp(keyWord, 'i');
    return regex.test(content);
}


module.exports = {
    baseUrl, MAX_YEAR, MIN_YEAR,
    bookReviewsFormat, reviewFormat,
    userFormat, keyWordsSearch
};