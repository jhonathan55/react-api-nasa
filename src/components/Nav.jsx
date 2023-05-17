import React from "react";

const Nav = ({ onSearchChange }) => {

    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
      };
    return (
        <nav class="navbar bg-body-tertiary bg-dark">
            <p class="text-white bg-dark display-6 mx-3" >JFGS</p>
            <span className="spacer"></span>
            <form class="d-flex mx-4" role="search">
                <input class="form-control mx-2" type="search" placeholder="Search" aria-label="Search"onChange={handleSearchChange} />
                    <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </nav>
    )
}

export default Nav;