import React from "react";
import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { title } from "process";
import { error } from "console";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../utils/Pagination";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = "http://localhost:8080/api/books";
            const url = `${baseUrl}?page=${currentPage-1}&size=${booksPerPage}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Shit happened");
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            const loadedBooks: BookModel[] = [];
            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
            for (let book of responseData) {
                loadedBooks.push({
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
            setBooks(loadedBooks);
        }

        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error);
        });

        window.scroll(0,0);
    }, [currentPage]);

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

    const indexOfLastBook:number = currentPage*booksPerPage;
    const indexOfFirstBook:number = indexOfLastBook-booksPerPage;
    let lastItem:number = booksPerPage <= totalAmountOfBooks ? booksPerPage*currentPage : totalAmountOfBooks;
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

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
                        Number of results: ({totalAmountOfBooks})
                    </div>
                    <p className="mt-3">
                        {indexOfFirstBook+1} to {lastItem} of ({totalAmountOfBooks}) items:
                        {books.map(book => (
                            <SearchBook book={book} key={book.id} />
                        ))}
                        {
                            totalPages > 1 ? 
                                <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate}/>
                                :
                                <></>
                        }
                    </p>
                </div>
            </div>
        </div>
    );

}