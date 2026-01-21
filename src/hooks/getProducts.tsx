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

        let isMounted = true;

        async function fetchData() {
            try {
                const res = await fetch(url);
    
                if(!res.ok) throw new Error(`Http error! status: ${res.status}`)
            
                const json = await res.json();
    
                if(isMounted) setData(json);
            } catch (error) {
                if(isMounted) setError(error as Error);
            } finally {
                if(isMounted) setLoading(false);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        }
    }, [url]);

    return {data, loading, error};
}
