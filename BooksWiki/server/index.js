const express = require('express');
const { Books } = require("./model/Books");
const { Reviews } = require("./model/Reviews");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
const cors = require('cors');
const { baseUrl } = require('../constants');
const { UsersData } = require('./model/UsersData');
const { MAX_YEAR, MIN_YEAR, bookReviewsFormat, reviewFormat, userFormat, keyWordsSearch } = require("../constants")

const port = 3080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const corsOptions = {
    origin: `${baseUrl.client}`,
    credentials: true
}

app.get("/", cors(corsOptions), (req, res) => {
    res.send("Welcome to your Wix Enter exam!");
});

app.get("/user", cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId || uuidv4();
    res.cookie("userId", userId).send({ id: userId });
});



app.get('/books', cors(corsOptions), (req, res) => {
    let booksToReturn = Books;
    const { after, before, rating, search } = req.query;

    if (after || before || rating) {
        booksToReturn = booksToReturn.filter((book) => (after || MIN_YEAR) <= book.publicationYear &&
            book.publicationYear <= (before || MAX_YEAR) &&
            (rating ? Reviews[book.id]?.scores.averageScore >= rating : true))
    }

    if (search && search != '') {
        keyWords = search.toLowerCase().split(/ \s+ /).filter(word => word != ' ');
        booksToReturn = booksToReturn.filter(book => keyWords.some(word => keyWordsSearch(book.description + book.title + book.author, word)))
    }

    res.send({ Books: booksToReturn });
});




app.post('/books', cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId;
    if (!userId) {
        res.status(403).end();
        return;
    }

    const { book } = req.body;
    if (!book) {
        res.status(400).json({ message: 'Book is missing' }).end();
        return;
    }

    const { title, author, publicationYear, description } = book;
    if (!(title && author && publicationYear && description)) {
        res.status(400).json({ message: 'Bad request' }).end();
        return;
    }

    const newBook = {
        title, author, publicationYear, description, id: uuidv4()
    }
    Books.push(newBook);
    res.send({ book: newBook }).status(200).end()
});

app.get('/books/:bookId', cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId;
    if (!userId) {
        res.status(403).end();
        return;
    }

    const { bookId } = req.params
    const book = Books.find((book) => book.id === bookId)
    if (!book) {
        res.status(400).json({ message: 'Book not found' }).end();
        return;
    }

    res.send({ book });
});


//################################ Reviews ###########################
app.get('/reviews', cors(corsOptions), (req, res) => {
    res.send({ Reviews: Reviews });
});

app.get('/reviews/:bookId', cors(corsOptions), (req, res) => {
    const { bookId } = req.params
    const currentBookReviews = Reviews[bookId]
    if (!currentBookReviews) {
        res.status(400).json({ message: 'reviews not found for this book' }).end();
        return;
    }

    res.send({ reviews: currentBookReviews.reviews });
});


app.post('/reviews', cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId;
    if (!userId) {
        res.status(403).end();
        return;
    }

    //get the book id for adding a review
    const { review } = req.body;
    if (!review) {
        res.status(400).json({ message: 'review is missing' }).end();
        return;
    }


    const { bookId, userName, userContent, userRating } = review


    //In case one of the fields is missing 
    //!should not happen due to check on the frontend point
    if (!bookId || !userName || !userContent || !userRating) {
        res.status(400).json({ message: 'Bad request' }).end();
        return;

    }
    //create new review instance for user
    const newReview = reviewFormat();
    newReview.userId = userId;
    newReview.name = userName;
    newReview.content = userContent;
    newReview.rate = userRating;



    //search if this book already been reviewed 
    const currentBookReviews = Reviews[bookId]

    //If this book never been reviewed before
    if (!currentBookReviews) {
        //Create new review instance for the book
        const newBookReview = bookReviewsFormat();
        //Initailzie it 
        newBookReview.scores.averageScore = userRating;
        newBookReview.scores.reviewsNum = 1;
        newBookReview.reviews.push(newReview);

        //Add to data base
        Reviews[bookId] = newBookReview;
    }

    //Book already been reviewd 
    else {
        Reviews[bookId].reviews.push(newReview);

        //get current state 
        const currentScore = JSON.parse(Reviews[bookId].scores.averageScore);
        const currentReviewsNum = JSON.parse(Reviews[bookId].scores.reviewsNum);
        const newAverage = (currentScore * currentReviewsNum + JSON.parse(userRating)) / (currentReviewsNum + 1);

        //update to new values
        Reviews[bookId].scores.averageScore = JSON.stringify(newAverage);
        Reviews[bookId].scores.reviewsNum = JSON.stringify(currentReviewsNum + 1);
    }

    //Also update the users reviewCount
    const cuurentUserReviews = UsersData[userId]

    //First time this user upload review
    if (!cuurentUserReviews) {
        //create new instance of userReview
        const newUser = userFormat();
        newUser.reviewsNumber = "1";
        newUser.userBooks.push(bookId);

        UsersData[userId] = newUser;

    }
    //Not the first time this user review
    else {
        //never reviewd this book
        if (cuurentUserReviews.userBooks.filter(id => id === bookId).length === 0) {
            let currentNum = JSON.parse(UsersData[userId].reviewsNumber);
            currentNum++;
            UsersData[userId].reviewsNumber = JSON.stringify(currentNum);
            UsersData[userId].userBooks.push(bookId);
        }
    }

    res.send({ Reviews: Reviews }).status(200).end()

});



//############################# UsersData#############################
app.get("/usersData", cors(corsOptions), (req, res) => {
    res.send({ UsersData: UsersData }).status(200).end();
});













app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
