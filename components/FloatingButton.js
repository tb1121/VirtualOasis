import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react95';

const FloatingButton = () => {
    const buttonRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [position, setPosition] = useState({ x: Math.random() * (window.innerWidth - 100), y: Math.random() * (window.innerHeight - 50) });
    const speed = 200; // Adjust the speed as needed
    const angle = Math.PI / 4; // Adjust the angle as needed
    const [velocity, setVelocity] = useState({ x: Math.cos(angle) * speed, y: Math.sin(angle) * speed });
    const [prevPositions, setPrevPositions] = useState([]);

    useEffect(() => {
        let lastFrameTime = performance.now();
        const smoothness = 0.0001; // Adjust smoothness value as needed
        const trailLength = 30; // Adjust the length of the trail as needed

        const animate = () => {
            if (isVisible) {
                const button = buttonRef.current;
                if (!button) return; // Check if buttonRef.current is null

                const { x, y } = position;

                // Calculate time elapsed since the last frame
                const currentTime = performance.now();
                const deltaTime = currentTime - lastFrameTime;
                lastFrameTime = currentTime;

                // Update position based on velocity and deltaTime
                const newX = x + velocity.x * (deltaTime / 1000);
                const newY = y + velocity.y * (deltaTime / 1000);

                // Check if the button reaches the boundaries of the visible area
                if (newX <= 0) {
                    setVelocity(prevVelocity => ({ ...prevVelocity, x: Math.abs(prevVelocity.x) }));
                } else if (newX >= window.innerWidth - button.offsetWidth) {
                    setVelocity(prevVelocity => ({ ...prevVelocity, x: -Math.abs(prevVelocity.x) }));
                }
                if (newY <= 0) {
                    setVelocity(prevVelocity => ({ ...prevVelocity, y: Math.abs(prevVelocity.y) }));
                } else if (newY >= window.innerHeight - button.offsetHeight) {
                    setVelocity(prevVelocity => ({ ...prevVelocity, y: -Math.abs(prevVelocity.y) }));
                }

                // Add current position to the list of previous positions
                setPrevPositions(prevPositions => {
                    const updatedPositions = [...prevPositions, { x, y }];
                    // Ensure that the trail length does not exceed the maximum specified length
                    if (updatedPositions.length > trailLength) {
                        return updatedPositions.slice(updatedPositions.length - trailLength);
                    }
                    return updatedPositions;
                });

                // Update button position using smooth interpolation
                button.style.left = `${interpolate(x, newX, smoothness)}px`;
                button.style.top = `${interpolate(y, newY, smoothness)}px`;

                // Update position
                setPosition({ x: newX, y: newY });

                // Request next frame
                requestAnimationFrame(animate);
            }
        };

        const animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isVisible, position, velocity]);

    // Function to interpolate between two values smoothly
    const interpolate = (start, end, smoothness) => {
        return start + (end - start) * smoothness;
    };

    // Function to handle click event
    const handleClick = () => {
        // Hide the button
        setIsVisible(false);
    };

    // If the button is not visible, render null (i.e., don't render anything)
    if (!isVisible) {
        return null;
    }

    return (
        <>
            {prevPositions.map(({ x, y }, index) => (
                <Button
                    key={index}
                    style={{
                        zIndex: 10000 - index,
                        position: 'absolute',
                        cursor: 'pointer',
                        left: `${x}px`,
                        top: `${y}px`,
                        opacity: index / prevPositions.length, // Adjust opacity calculation as needed
                    }}
                >
                    Read Me
                </Button>
            ))}
            <Button
                ref={buttonRef}
                style={{
                    zIndex: 10000,
                    position: 'absolute',
                    cursor: 'pointer',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transition: 'transform 0.2s ease',
                    // margin: '0.5vw'
                }}
                onClick={handleClick}
            >
                Read Me
            </Button>
        </>
    );
};

export default FloatingButton;
