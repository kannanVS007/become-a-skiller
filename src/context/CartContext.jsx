import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error('Error parsing cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (course, pricingMode = 'lifetime') => {
        setCartItems((prev) => {
            const courseId = course._id || course.id;
            const existingItemIndex = prev.findIndex((item) => (item._id || item.id) === courseId);

            const price = pricingMode === 'subscription' ? course.subscriptionPrice : course.price;
            const itemToAdd = {
                ...course,
                id: courseId,
                pricingMode,
                price
            };

            if (existingItemIndex > -1) {
                // Update existing item with new mode/price
                const newCart = [...prev];
                newCart[existingItemIndex] = itemToAdd;
                return newCart;
            }

            return [...prev, itemToAdd];
        });
    };

    const removeFromCart = (courseId) => {
        setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== courseId));
    };

    const clearCart = () => {
        setCartItems([]);
        setCouponCode('');
        setDiscount(0);
    };

    const applyCoupon = (code) => {
        // Mock coupon validation
        const coupons = {
            'SAVE10': 10,
            'SAVE20': 20,
            'WELCOME50': 50,
        };

        if (coupons[code]) {
            setCouponCode(code);
            setDiscount(coupons[code]);
            return { success: true, discount: coupons[code] };
        }
        return { success: false, message: 'Invalid coupon code' };
    };

    const removeCoupon = () => {
        setCouponCode('');
        setDiscount(0);
    };

    const getSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price, 0);
    };

    const getDiscountAmount = () => {
        return (getSubtotal() * discount) / 100;
    };

    const getTotal = () => {
        return getSubtotal() - getDiscountAmount();
    };

    const value = {
        cartItems,
        couponCode,
        discount,
        addToCart,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getDiscountAmount,
        getTotal,
        itemCount: cartItems.length,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
