import * as yup from 'yup';
import './address-detail.css';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { tablePattern } from '../../../route';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface FormValues {
    address?: string;
    state?: string;
    city?: string;
    country?: any;
    pincode?: string;
}

const validationSchema: any = yup.object({
    address: yup.string().required('Address is required').min(3, 'Address must be at least 3 characters'),
    state: yup.string().required('State is required').min(3, 'State must be at least 3 characters'),
    city: yup.string().required('City is required').min(3, 'City must be at least 3 characters'),
    pincode: yup.string().required('City is required').matches(/^[1-9]\d{5}$/, 'Enter 6 charaters pincode'),
});
interface Step2Props {
    onNext: () => void;
}

const AddressDetail: React.FC<Step2Props> = ({ onNext }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [countryOptions, setCountryOptions] = useState<string[]>([]);

    const { control, handleSubmit, setValue } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        let userAddress = `${data.address}, ${data.state}  ${data.city}  ${data.country} (${data.pincode})`;
        console.log('submitted:>>>>>>', data);
        dispatch({ type: 'USER_ADDRESS_DATA', payload: { userAddress } })
        navigate(tablePattern)

    };


    useEffect(() => {
        const fetchCountryOptions = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const countryOption = data.map((country: any) => country.name.common);
                setCountryOptions(countryOption);

            } catch (error) {
                console.error('Error fetching country options:', error);
            }
        };
        fetchCountryOptions();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-box'>
            <h3>Address Detail</h3>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <Controller
                        name="address"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Address"
                                fullWidth
                                {...field}
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <Controller
                        name="state"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="State"
                                fullWidth
                                {...field}
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <Controller
                        name="city"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="City"
                                fullWidth
                                {...field}
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                id="country"
                                onChange={(_, value) => { setValue('country', value) }}
                                options={countryOptions}
                                renderInput={(params) =>
                                    <TextField {...params} label="Country" fullWidth margin="normal" />}
                            />
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <Controller
                        name="pincode"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Pincode"
                                fullWidth
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                margin="normal"
                            />
                        )}
                    />
                </div>
                <div className='col-md-12 col-sm-12 address-form-btn'>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AddressDetail;
