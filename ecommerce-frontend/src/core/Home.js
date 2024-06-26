import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadProductsBySell = () => {
        setLoading(true);
        getProducts('sold').then(data => {
            if (data?.error) {
                setError(data?.error);
            } else {
                setLoading(false)
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        setLoading(true);
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data?.error) {
                setError(data?.error);
            } else {
                setLoading(false);
                setProductsByArrival(data);
            }
        });
    };
    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="FullStack React Node MongoDB Ecommerce App"
            description="Node React E-commerce App"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            {loading ? <h5>loading...</h5> : <h5>Found {productsByArrival.length} Product</h5>}
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-md-4 col-sm-12 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            {loading ? <h5>loading...</h5> : <h5>Found {productsBySell.length} Product</h5>}
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-md-4 col-sm-12 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;