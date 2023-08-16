// BookDetails.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Button, Container, Grid, Paper, TextField, Typography, Card, CardContent, Box, Rating } from '@mui/material';

const BookDetails = ({ postReview }) => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [newReviewer, setNewReviewer] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newRating, setNewRating] = useState(1);
    const [book, setBook] = useState([])
    const [reviews, setReviews] = useState([])
    const [nameColor, setNameColor] = useState('');
    const [descColor, setDescColor] = useState('');
    const [ratingColor, setRatingColor] = useState('');
    const [errorMessages, setErrorMessages] = useState({});


    axios.defaults.withCredentials = true;

    const baseURL = "http://localhost:3080";

    useEffect(() => {
        getBook();
        getReviews();
        createError();
    }, [])

    const createError = () => {
        const errors = {
            name: 'This field is required',
            desc: 'Description is over than 200 chars',
            ratings: 'Rating is out of range 0-5',
        }
        setErrorMessages(errors);
    }

    const handleSubmit = (e) => {
        postReview(bookId, newReviewer, newContent, newRating);
        getReviews();
    }

    const handleValidation = (e) => {
        newContent.length > 200 ? alert("Content cannot exceed 200 chars") :
            newRating > 5 || newRating < 0 ? alert("Rating is in range 0 - 5") :
                handleSubmit(e);
    }

    const handleName = (e) => {
        const curr_name = e.target.value;
        curr_name.length === 0 ? setNameColor('red') : setNameColor('');
        setNewReviewer(curr_name);
    }
    const handleDesc = (e) => {
        const curr_desc = e.target.value;
        curr_desc.length > 200 ? setDescColor('red') : setDescColor('');
        setNewContent(curr_desc);
    }
    const handleRating = (e) => {
        const curr_rating = e.target.value;
        curr_rating < 0 || curr_rating > 5 ? setRatingColor('red') : setRatingColor('');
        setNewRating(curr_rating);
    }


    const getBook = () => {
        axios.get(`${baseURL}/books/${bookId}`)
            .then((response) => setBook(response.data.book))
            .catch((error) => console.error(error));
    }

    const getReviews = () => {
        axios.get(`${baseURL}/reviews/${bookId}`)
            .then((response) => {
                console.log(response.data.reviews)
                setReviews([...response.data.reviews])
            })
            .catch((error) => console.error(error));
    }

    const onBookListBtn = () => {
        navigate('/')
    }

    const renderReview = () =>
        reviews.map((review) => {
            return (
                <Card key={review.id}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {review.name}
                        </Typography>
                        <Box display="flex" alignItems="center" mb={2} data-testid={'review-rating'}>
                            <Rating value={review.rate} readOnly />
                        </Box>
                        <Typography variant="body2" component="p">
                            {review.content}
                        </Typography>
                    </CardContent>
                </Card>
            )
        })



    return (
        <Container maxWidth="sm">
            <br />
            <Typography variant="h4" align="center" gutterBottom data-testid='bookDetails-title'>
                Book Details
            </Typography>
            {book ? (
                <Paper sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" data-testid={`bookDetails-title-${book.id}`}>Title:</Typography>
                            <Typography variant="body1"
                                data-testid={`bookDetails-titleContent-${book.id}`}>{book.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" data-testid={`bookDetails-author-${book.id}`}>Author:</Typography>
                            <Typography variant="body1"
                                data-testid={`bookDetails-authorContent-${book.id}`}>{book.author}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" data-testid={`bookDetails-publicationYear-${book.id}`}>Publication
                                Year:</Typography>
                            <Typography variant="body1"
                                data-testid={`bookDetails-publicationYearContent-${book.id}`}>{book.publicationYear}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                data-testid={`bookDetails-description-${book.id}`}>Description:</Typography>
                            <Typography variant="body1"
                                data-testid={`bookDetails-descriptionContent-${book.id}`}>{book.description}</Typography>
                        </Grid>
                        <Grid item xs={12} data-testid={`bookDetails-reviews`}>
                            <Typography variant="h6" >Reviews:</Typography>
                            {
                                // get reviews here
                                renderReview()
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" data-testid={`bookDetails-addReview-${book.id}`}>Add
                                Review</Typography>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                style={{ borderColor: nameColor }}
                                onChange={(event) => {
                                    handleName(event);
                                }}
                                data-testid={`bookDetails-reviewNameField-${book.id}`} />
                            {nameColor === 'red' && (
                                <div style={{ color: 'red' }}>{errorMessages.name}</div>)}
                            <TextField
                                label="Review"
                                fullWidth
                                margin="normal"
                                multiline
                                style={{ color: descColor }}
                                onChange={(event) => {
                                    handleDesc(event);
                                }}
                                data-testid={`bookDetails-reviewContentField-${book.id}`} />
                            {descColor === 'red' && (
                                <div style={{ color: 'red' }}>{errorMessages.desc}</div>)}
                            <TextField
                                label="Rating"
                                fullWidth
                                margin="normal"
                                type="number"
                                style={{ color: ratingColor }}
                                onChange={(event) => {
                                    handleRating(event);

                                }}
                                inputProps={{ min: 1, max: 5 }}
                                data-testid={`bookDetails-reviewRatingField-${book.id}`}
                            />
                            {ratingColor === 'red' && (
                                <div style={{ color: 'red' }}>{errorMessages.ratings}</div>)}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    handleValidation(e);
                                }}
                                data-testid={`bookDetails-submitReviewBtn-${book.id}`}>
                                Submit Review
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <Typography variant="body1" align="center">
                    Loading book details...
                </Typography>
            )}
            <br />
            <Button variant="contained" color="primary" onClick={onBookListBtn} data-testid='filters-bookListBtn'>
                Book Listing
            </Button>
        </Container>
    );
};

export default BookDetails;

