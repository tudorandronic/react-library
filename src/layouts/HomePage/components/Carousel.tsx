import { ReturnBook } from "./ReturnBook";
import BookModel from "../../../models/BookModel";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../../utils/SpinnerLoading";

export const Carousel = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [books, setBooks] = useState<BookModel[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl:string = "http://localhost:8080/api/books";
            const url:string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);
            if(!response.ok)
                throw new Error("Something has not run ok");
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            const books:BookModel[] = [];
            for(var book of responseData){
                books.push({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    copies: book.copies,
                    copiesAvailable: book.copiesAvailable,
                    category: book.category,
                    img: book.img
                })
            }

            setIsLoading(false);
            setBooks(books);
        };

        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }, []);

    if(isLoading){
        return (
            <SpinnerLoading/>
        );
    }

    if(httpError){
        return (
            <div className="container mt-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5" style={{height: 550}}>
            <div className="homepage-carousel-title">
                Find your next "I stayed up too late" book.
            </div>
            <div id="carouselBookId" className="carousel carousel-dark mt-5 slide d-none d-lg-block" 
                data-bs-interval = "false">
                    {/* Desktop */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-intems-center">
                            {books.slice(0,3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-intems-center">
                            {books.slice(3,6).map(book => {
                              return <ReturnBook book={book} key={book.id} />
                            })}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-intems-center">
                            {books.slice(6,9).map(book => {
                              return <ReturnBook book={book} key={book.id} />
                            })}
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselBookId" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselBookId" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBook  book={books[7]} key={books[7].id}/>
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <a className="btn btn-outline-secondary btn-lg" href="#">View more</a>
            </div>

        </div>
    );
}