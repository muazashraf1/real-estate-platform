import { Children, createContext, useState } from "react";
import { getFilteredProperties, getProperties, getPropertyDetail } from "../api/property";

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [propertyDetail, setPropertyDetail] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // landing page properties and 6 items 
    const fetchHomeProperties = async () => {
        try {
            setLoading(true)
            const res = await getProperties()

            setProperties(res.results.slice(0, 6));
        } catch (err) {
            setError("Failed to fetch the properties")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // listing page properties

    const fetchFilteredProperties = async (params) => {
        try {
            setLoading(true)
            const res = await getFilteredProperties(params)
            setProperties(res.results)

            return {
                count: res.count,
                page: res.page,
                limit: res.limit
            };
        } catch (err) {
            setError("Failed to fetch filtered properties");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    //property detail

    const fetchPropertyDetail = async (slug) => {
        try {
            setLoading(true);

            const res = await getPropertyDetail(slug);
            setPropertyDetail(res);
        } catch (err) {
            setError("Failed to fetch property detail");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <PropertyContext.Provider value={{properties, propertyDetail, loading, error, fetchHomeProperties, fetchFilteredProperties,fetchPropertyDetail}}>
            {children}
        </PropertyContext.Provider>
    )

}