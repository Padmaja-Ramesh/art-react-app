import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CollectionDetail = () => {
    const [artworks, setArtworks] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { title } = useParams();
    const [image_url, setImage_url] = useState("");

    useEffect(() => {
        const fetchCollectionDetails = async () => {
            try {
                setLoading(true);
                const detailResponse = await fetch(`https://api.artic.edu/api/v1/artworks/${title}`);
                if (!detailResponse.ok) throw new Error("Failed to fetch collection details");
    
                const resp = await detailResponse.json();
                setArtworks(resp);
    
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCollectionDetails();
    }, [title]);

    useEffect(() => {

        const formImageURL = () => {
            if (artworks)
                setImage_url(`${artworks?.config?.iiif_url}/${artworks?.data?.image_id}/full/843,/0/default.jpg`);
            console.log(image_url, 'test')
        }
        formImageURL();
    }, [artworks, image_url]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="card">
            <h3>{artworks?.data?.title}</h3>
            <img src={image_url} alt={artworks?.data?.thumbnail?.alt_text} width="50%" height="50%" />
            <p>{artworks?.data?.artist_display}</p>
        </div>
    );
};

export default CollectionDetail;
