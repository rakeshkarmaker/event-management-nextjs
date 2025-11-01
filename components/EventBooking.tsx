'use client';

import React from 'react'

export default function EventBooking() {
    const [email, setEmail] = React.useState(''); // here, we can manage email state for booking form submission
    const [submitted, setSubmitted] = React.useState(false); // state to track form submission status 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 500); // Simulate a network request delay
    };

  return (
    <div id="book-event">
        {submitted ? (
            <p className="text-green-500">Thank you for booking! We have received your request.</p>
        ) : ( 
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-light-100">Email Address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
                </div> 
                <button type="submit" className="button-submit hover:bg-primary/90 transition">Book Now</button>  
            </form>
         )}
    </div>
  )
}