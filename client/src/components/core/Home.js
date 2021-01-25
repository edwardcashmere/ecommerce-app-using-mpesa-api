import React from 'react';
import Layout from "./Layout";

const Home = () => {
    return (
        <Layout title="Home" description="E-commerce App Nairobi">
            {process.env.REACT_APP_API_URL}
        </Layout>
    )
}

export default Home
