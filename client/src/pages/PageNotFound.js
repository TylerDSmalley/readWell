import React from "react";
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';

function PageNotFound() {
    return (
        <div className="vh-100">
            <Container sx={{ py: 8, my: 5, minHeight: "25vh" }} maxWidth="md" className='contentBox rounded-3'>
                <h1>Page Not Found :/</h1>
                <h3>
                    Go to the Home Page: <Link to="/"> Home Page</Link>
                </h3>
            </Container>
        </div>
    );
}

export default PageNotFound;