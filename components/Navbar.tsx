import React from "react";

interface Props {}

function Navbar(props: Props) {
    return (
        <nav className="nav">
            <style jsx>{`
                .nav {
                    position: sticky;
                    height: 4em;
                    background: purple;
                }    
            `}</style>
        </nav>
    )
}

export default Navbar;