import React from "react";
import ReviewModel from "../../models/ReviewModel";
import { StarReview } from "./StarReview";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {
    const date = new Date(props.review.date);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return (
        <div>
            <div className="col-sm-8 col-md-8">
                <h5>{props.review.userEmail}</h5>
                <div className="row">
                    <div className="col">
                        {formattedDate}
                    </div>
                    <div className="col">
                        <StarReview rating={props.review.rating} size={16} />
                    </div>
                </div>
                <div className="mt-2">
                    <p> {props.review.reviewDescription} </p>
                </div>
                <div />
            </div>
            <hr />
        </div>
    );
}