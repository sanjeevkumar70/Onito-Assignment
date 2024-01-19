import React from 'react';
import * as yup from 'yup';
import './personal-detail.css';
import { useDispatch } from 'react-redux';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface FormValues {
    name: string;
    age: number;
    gender: string;
    mobile: string;
    govIdType: string;
    govtId: string;
}

const validationSchema: any = yup.object({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    age: yup.number().required('Age is required').positive('Age must be a positive number'),
    gender: yup.string().required('Gender is required').oneOf(['Male', 'Female'], 'Invalid Gender name'),
    mobile: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid Indian Mobile Number'),
    govIdType: yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid Govt ID Type'),
    govtId: yup.string().when('govIdType', ([govIdType], schema) => {
        if (govIdType === 'Aadhar') {
            return schema.matches(/^[2-9]\d{11}$/, 'It should have 12 numeric digits and should not start with 0 and 1')
        } else {
            return schema
        }
    })
});
interface Step1Props {
    onNext: () => void;
}
const PersonalDetail: React.FC<Step1Props> = ({ onNext }) => {
    const dispatch = useDispatch();

    const { control, handleSubmit } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data, 'data>>>>>>>>>>>>>')
        dispatch({ type: 'USER_PERSONAL_DATA', payload: data })
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-box'>
            <h3>Personal Details</h3>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Name"
                                fullWidth
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                margin="normal"
                            />
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <Controller
                        name="age"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                margin="normal"
                            />
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal">
                                <InputLabel style={{background:"#f8f6f6", padding:"0 10px"}}>Sex</InputLabel>
                                <Select {...field}
                                    variant='outlined'
                                    error={!!fieldState.error}
                                    style={{ outline: "none" }}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <Controller
                        name="mobile"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Mobile"
                                fullWidth
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                margin="normal"
                            />
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <Controller
                        name="govIdType"
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal">
                                <InputLabel  style={{background:"#f8f6f6", padding:"0 10px"}} >Govt ID Type</InputLabel>
                                <Select {...field} error={!!fieldState.error}>
                                    <MenuItem value="Aadhar">Aadhar</MenuItem>
                                    <MenuItem value="PAN">PAN</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <Controller
                        name="govtId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Govt ID"
                                fullWidth
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                margin="normal"
                            />
                        )}
                    />
                </div>
                <div className='col-md-12 col-sm-12 personal-form-btn'>
                    <Button type="submit" variant="contained" color="primary">
                        Next
                    </Button>
                </div>
            </div>

        </form>
    );
};

export default PersonalDetail;
