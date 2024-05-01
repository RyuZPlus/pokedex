
import { useState, useEffect } from "react";

export function UseFetch(url){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data.results))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { data, loading, error }

}