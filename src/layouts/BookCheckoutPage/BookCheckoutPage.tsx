import { get } from "http";
import { title } from "process";
import React, { use, useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { ReturnBook } from "../HomePage/components/ReturnBook";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { StarReview } from "../utils/StarReview";
import { CheckoutAndReview } from "./CheckoutAndReview";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const bookId = (window.location.pathname).split("/")[2];

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [totalStars, setTotalStars] = useState(0);
    

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
            const response = await fetch(baseUrl);
            if (!response.ok)
                throw new Error("Something has not run ok");
            const responseJson = await response.json();
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };

            setIsLoading(false);
            setBook(loadedBook);
        };

        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const reviewResponse = await fetch(reviewUrl);
            if (!reviewResponse.ok) {
                 throw new Error("Something has not run ok");
            }
            const responseJson = await reviewResponse.json();
            const loadedReviews: ReviewModel[] = responseJson._embedded.reviews.map((review: any) => {
                return new ReviewModel(review.id, review.userEmail, review.date, review.rating, review.bookId, review.reviewDescription);
            });
            setReviews(loadedReviews);
            
            let weightedReviews = 0;
            reviews.forEach((review: ReviewModel) => {
                weightedReviews += review.rating;
            });

            let numberOfReviews = loadedReviews.length;
            let totalStars = (Math.round((weightedReviews / numberOfReviews) * 2) / 2).toFixed(1);
            console.log("totalStars: " + totalStars);
            setTotalStars(Number(totalStars));
            setIsLoadingReviews(false);
        }
        
        fetchReviews().catch((error: any) => {
            setIsLoadingReviews(false);
            setHttpError(error.message);
        });

    }, []);


    if (isLoading || isLoadingReviews) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container mt-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                            <img className="mt-5" src={book.img} width="226" height="349" alt="book" />
                            :
                            <img className="mt-5" src={require("./../../images/BooksImages/book-luv2code-1000.png")} width="226" height="349" alt="book" />
                        }
                    </div>
                    <div className="col-sm-4 col-md-4 ml-2 container mt-5">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p>{book?.description}</p>
                        <StarReview rating={totalStars} size={32} />
                    </div>
                    <CheckoutAndReview book={book} mobile={false} />
                    <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
                </div>
                <hr />
            </div>
            <div className="container d-lg-none">
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <div>
                        {book?.img ?
                            <img className="mt-5" src={book.img} width="226" height="349" alt="book" />
                            :
                            <img className="mt-5" src={require("./../../images/BooksImages/book-luv2code-1000.png")} width="226" height="349" alt="book" />
                        }
                    </div>
                </div>
                <div className="mt-2">
                    <h2>{book?.title}</h2>
                    <h5 className="text-primary">{book?.author}</h5>
                    <p>{book?.description}</p>
                    <StarReview rating={totalStars} size={32} />
                </div>
                <CheckoutAndReview book={book} mobile={true} />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
                <hr />
            </div>

        </div>
    );
}