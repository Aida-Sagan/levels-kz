import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Option 1', 'Option 2', 'Option 3'];

export default function AutocompleteSearch() {
    return (
        <Autocomplete
            options={options}
            renderInput={(params) => (
                <TextField {...params}  variant="outlined" />
            )}
        />
    );
}
