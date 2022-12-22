import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button 
        className="btn bg-gradient-to-r from-accent to-secondary text-lg text-white capitalize">{children}</button>
    );
};

export default PrimaryButton;