import React from 'react';

const ButtonPrimary = ({ children }) => {
    return (
        <div>
            <button
                className="btn btn-secondary bg-gradient-to-r from-secondary to-primary text-white">
                {children}
            </button>
        </div>
    );
};

export default ButtonPrimary;