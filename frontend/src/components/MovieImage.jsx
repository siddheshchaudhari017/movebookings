import React, { useState, useEffect } from 'react';

const MovieImage = ({ src, alt, className, posterPath }) => {
    // Fallback image URL
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";

    const getSource = (s, p) => {
        if (!s && !p) return FALLBACK_IMAGE;
        if (p) return `https://image.tmdb.org/t/p/w500/${p.replace(/^\//, '')}`;
        if (s && typeof s === 'string' && s.startsWith('/')) {
            return `https://image.tmdb.org/t/p/w500/${s.replace(/^\//, '')}`;
        }
        return s || FALLBACK_IMAGE;
    };

    const [imgSrc, setImgSrc] = useState(() => getSource(src, posterPath));

    useEffect(() => {
        setImgSrc(getSource(src, posterPath));
    }, [src, posterPath]);

    const handleError = () => {
        if (imgSrc !== FALLBACK_IMAGE) {
            setImgSrc(FALLBACK_IMAGE);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`${className} object-cover`}
            onError={handleError}
            referrerPolicy="no-referrer"
        />
    );
};

export default MovieImage;
