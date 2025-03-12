import React from "react";
import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { title } from "process";
import { error } from "console";
import { SpinnerLoading } from "../utils/SpinnerLoading";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = "http://localhost:8080/api/books";
            const url = `${baseUrl}?page=0&size=5`;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Shit happened");
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            for(let book of responseData){
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
        <div>
            
        </div>
    );

}