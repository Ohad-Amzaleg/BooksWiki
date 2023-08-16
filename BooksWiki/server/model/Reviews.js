// Important! - This is just a naive implementation for example. You can modify all of the implementation in this file.

//show book reviews =Reviews[bookId] -> 


const Reviews = {
    "2": {
        scores: {
            reviewsNum: "1",
            averageScore: "3",
        },

        reviews:
            [
                {
                    userId: "12",
                    name: "david", //user name
                    content: "some content..", //review content 
                    rate: "3"    //review rating 
                }
            ]
    },

    "1": {
        scores: {
            reviewsNum: "3",
            averageScore: "3"
        },

        reviews:
            [
                {
                    userId: "94d0dc2d-c0c2-4c03-a6ab-2a05a3cea97e",
                    name: "Ohad", //user name
                    content: "some content ohad ..", //review content 
                    rate: "2"    //review rating 
                },
                {
                    userId: "4",
                    name: "inbal", //user name
                    content: "some content inbal ..", //review content 
                    rate: "2"    //review rating 
                },
                {
                    userId: "5",
                    name: "Yoni", //user name
                    content: "some content yoni ..", //review content 
                    rate: "5"    //review rating 
                }
            ]
    },
}

module.exports = { Reviews };