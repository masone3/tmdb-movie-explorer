import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback, hasMore, isLoading) => {
    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !isLoading) {
                callback();
            }
        },
        { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
        observer.observe(currentTarget);
    }

    return () => {
        if (currentTarget) {
            observer.unobserve(currentTarget);
        }
    };
}, [callback, hasMore, isLoading]);

return observerTarget;
};