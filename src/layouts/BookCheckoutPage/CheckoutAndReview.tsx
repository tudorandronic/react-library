import { Link } from "react-router";
import BookModel from "../../models/BookModel";

export const CheckoutAndReview: React.FC<{ book: BookModel | undefined, mobile: boolean }> = (props) => {
    return (
        <div className={props.mobile ? "card d-flex mt-5" : "col-3 card d-flex container mt-3 mb-5"}>
            <div className="card-body container">
                <p>
                    <b>0/5</b> books checked out
                </p>
                <hr />

                {
                    props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className="text-success">Available</h4>
                        :
                        <h4 className="text-danger">Not available</h4>
                }

                <div className="row">
                    <p className="col-6 lead">
                        <b>{props.book?.copies}</b> copies
                    </p>
                    <p className="col-6 lead">
                        <b>{props.book?.copiesAvailable}</b> available
                    </p>
                </div>

                <Link to="/#" className="btn btn-success btn-lg"> Sign in </Link>
                <hr />

                <p> This number can change until placing an order has been complete</p>
                <p> Sign in to be able to leave a review </p>
            </div>
        </div>
    );
}