import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import {useNavigate} from "react-router";

export default function AutocompleteSearch() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigateTo = useNavigate();

    useEffect(() => {
        axios.get('https://onelab-levels-api.vercel.app/api/companies', {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4M2NhMzRlNTUzZWU' +
                    '3ZDcyNzg4MjciLCJpYXQiOjE3MTEwMjcyOTksImV4cCI6MTcxMTAzMDg5OX0.V9nNcv9xp_Tegp6bTrNF-9-R69aTXB1p9H6_KULbchw'
            }
        })
            .then(response => {
                const modifiedCompanies = response.data.map(company => ({ label: company.name, value: company._id }));
                setCompanies(modifiedCompanies);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
                setLoading(false);
            });

    }, []);

    return (
        <Autocomplete
            options={companies}
            loading={loading}
            getOptionLabel={(option) => option.label} // Используем название компании в качестве метки в выпадающем списке
            renderInput={(params) => (
                <TextField {...params} label="Найти компанию" variant="outlined" />
            )}
            onChange={(event, value) => {
                if (value) {
                    navigateTo(`/company/${value.value}`); // Переходим по ссылке с выбранным _id
                }
            }}
        />
    );
}

