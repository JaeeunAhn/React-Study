import React from 'react';
import './Form.css' ;

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className="form">
            <input value={value} onChange={onChange}></input>
            <div className="create-button" onClcik={onCreate}>
                등록
            </div>
         </div>
     );
};

export default Form;