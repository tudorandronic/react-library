import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className="card mt-3 shadow bg-body rounded mb-3 p-3">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.book.img ?
                            <img src={props.book.img} width="123" height="196" />
                            :
                            <img src="./../../../BooksImages/book-luv2code-1000.png" />
                        }
                    </div>
                    <div className="d-lg-none">
                        {props.book.img ?
                            <img src={props.book.img} width="123" height="196" />
                            :
                            <img src="./../../../BooksImages/book-luv2code-1000.png" />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{props.book.author}</h5>
                        <h4>{props.book.title}</h4>
                        <p className="card-text">{props.book.description}</p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <Link to={`/checkout/${props.book.id}`} className="btn main-color text-white">
                        More info
                    </Link>
                </div>
            </div>
        </div>
    );
}