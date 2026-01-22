import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if(!url) {
            setLoading(false);
            setData(null);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        async function fetchData() {
            try {
                const res = await fetch(url);
    
                if(!res.ok) throw new Error(`Http error! status: ${res.status}`)
            
                const json = await res.json();
    
                setData(json);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return {data, loading, error};
}
