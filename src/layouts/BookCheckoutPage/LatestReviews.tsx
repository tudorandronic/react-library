import React from "react";
import ReviewModel from "../../models/ReviewModel";
import { Link } from "react-router-dom";
import { Review } from "../utils/Review";

export const LatestReviews: React.FC<{
    reviews: ReviewModel[];
    bookId: number | undefined;
    mobile: boolean;
}> = (props) => {
    return (
        <div className={props.mobile ? "mt-3" : "row mt-5"}>
            <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
                <h2>Latest reviews:</h2>
            </div>
            <div className={props.mobile ? "" : "col-sm-10 col-md-10"}>
                {props.reviews.length > 0 ? 
                    <>
                        {props.reviews.slice(0,3).map(eachReview => (
                            <Review review={eachReview} key={eachReview.id}/>
                        ))}
                    
                        <div className="m-3">
                            <Link type="button" className="btn main-color btn-md text-white" to="#">
                                See all reviews
                            </Link>
                        </div>
                    </>
                    :
                    <div className="m-3">
                        <p>No reviews yet.</p>
                    </div>
                }
            </div>
        </div>
    );
}