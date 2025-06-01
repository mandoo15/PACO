
import React from 'react';
import Header from './header'; 

function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Header /> 
            <main>
                {children} 
            </main>
        </div>

        
    );
}

export default MainLayout;
