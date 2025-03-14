import React from "react";
import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { title } from "process";
import { error } from "console";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = "http://localhost:8080/api/books";
            const url = `${baseUrl}?page=0&size=5`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Shit happened");
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            for (let book of responseData) {
                books.push({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    copies: book.copies,
                    copiesAvailable: book.copiesAvailable,
                    category: book.category,
                    img: book.img
                });
            }
            setIsLoading(false);
            setBooks(books);
        }

        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error);
        });

    }, []);

    if (isLoading) {
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
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex me-5">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-labelledby="Search" />
                                <button className="btn btn-outline-success">
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle main-color" id="myDropdownToggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Cathegory
                                </button>
                                <ul className="dropdown-menu" data-bs-toggle="${myDropdownToggle}" aria-expanded="false">
                                    <li>
                                        <a className="dropdown-item" href="#">All</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Front End</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Back End</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Devops</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Data</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        Number of results: (22)
                    </div>
                    <p className="mt-3">
                        1 to 5 of 22 items:
                        {books.map(book => (
                            <SearchBook book={book} key={book.id} />
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );

}