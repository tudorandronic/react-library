import React from "react"

export const SpinnerLoading = () => {
    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}