
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [loadingRelatedProduct, setLoadingRelatedProduct] = useState(true);

    const loadSingleProduct = productId => {
        setLoadingRelatedProduct(true)
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setLoadingRelatedProduct(false)
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                        setLoadingRelatedProduct(false)
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {loadingRelatedProduct ? <h6>Loading..</h6> : ` ${relatedProduct.length} Related Product`}

                    {error === false ? relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    )) : ' '}
                </div>
            </div>
        </Layout>
    );
};

export default Product;