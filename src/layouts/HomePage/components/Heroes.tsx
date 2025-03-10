import React from "react";

export const Heroes = () => {
    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className='ml-2'>
                            <h1>What have you been reading ?</h1>
                            <p className="lead">This team is dedicated to your reading pleasures.</p>
                            <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-1">
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className='mr-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className="lead">Try to check in daily to see the new titles.</p>
                            <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="d-lg-none">
                <div className="container">
                    <div className="mt-2">
                        <div className="col-image-left"></div>
                        <h1>What have you been reading ?</h1>
                        <p className="lead">This team is dedicated to your reading pleasures.</p>
                        <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                    </div>
                </div>
                <div className="container">
                    <div className="mt-2">
                        <div className="col-image-right"></div>
                        <h1>Our collection is always changing!</h1>
                        <p className="lead">Try to check in daily to see the new titles</p>
                        <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};