import React, { useState } from 'react';
import loading from '../images/loading.png';

const Image = ({ src, alt, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);

    const changeVisibility = () => {
        setIsVisible(true);
    };

    return (
        <React.Fragment>
            <img
                src={loading}
                alt={alt}
                width="100"
                height={100}
                style={{ display: isVisible ? 'none' : 'inline' }}
                {...props}
            />
            <img
                src={src}
                alt={alt}
                width="100"
                height={100}
                onLoad={changeVisibility}
                style={{ display: isVisible ? 'inline' : 'none' }}
                {...props}
            />
        </React.Fragment>
    );
};

export default Image;
