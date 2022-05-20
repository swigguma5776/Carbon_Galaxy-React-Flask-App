import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api'; 

export const useGetData = () => {
    const [carbonData, setData] = useState<any>([]);

    const handleDataFetch = async () => {
        const result = await serverCalls.get();
        setData(result)
    }

    // using the useEffect hook (only happen if value in data changes)
    useEffect( () => {
        handleDataFetch();
    }, [] ) // if anything besides an empty list [] do effect

    return { carbonData, getData:handleDataFetch }
}