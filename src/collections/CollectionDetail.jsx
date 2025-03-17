import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const CollectionDetail = () => {
    const { title } = useParams(); 
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollectionDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://api.artic.edu/api/v1/artworks?fields=id,title"); 
                if (!response.ok) throw new Error("Failed to fetch collections list");
                console.log(response);

                const collections = await response.json();
                console.log(collections.data, title)
                const matchedCollection = collections.data.find(col => col.title.toLowerCase() === title.toLowerCase());
                console.log(matchedCollection)

                if (!matchedCollection) {
                    throw new Error("Collection not found");
                }

                // Step 2: Fetch full details using the found ID
                const detailResponse = await fetch(`https://api.artic.edu/api/v1/artworks/${matchedCollection.id}`);
                console.log(detailResponse)
                if (!detailResponse.ok) throw new Error("Failed to fetch collection details");

                const resp = await detailResponse.json();
                console.log(resp.data)
                setCollection(resp.data); // Store data in state

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionDetails();
    }, [title]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <div>
            <h1>Collection Detail</h1>
            <p>Selected Collection: {title}</p>
            <img src={collection?.imgUrl} alt={collection?.title} width="50%" height="50%" />
            <p>{collection?.description}</p>
        </div>
    );
};

export default CollectionDetail;
