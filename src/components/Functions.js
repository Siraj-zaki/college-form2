import React from 'react';

export const cnicHandler = (prevState,cnic) => {

    if (prevState.length - 1 === cnic.length) {
        cnic = cnic.slice(0, cnic.length)
    }
    else if (cnic.length === 5 || cnic.length === 13) {
        cnic += '-'
    }
    else if (cnic.length > 15) {
        return
    }


    return cnic;

}