import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';

const initialState = { firstName: '', lastName: '', age: '', sex: '' };

const EmployeeForm = ({ employee, onSuccess }) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (employee) setFormData(employee);
    }, [employee]);

    const validate = () => {
        const errs = {};
        if (!formData.firstName) errs.firstName = 'First name is required';
        if (!formData.lastName) errs.lastName = 'Last name is required';
        if (!formData.sex) errs.sex = 'Gender is required';
        const age = parseInt(formData.age);
        if (isNaN(age) || age < 18 || age > 100)
            errs.age = 'Age must be between 18 and 100';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (employee?.id) {
            await EmployeeService.updateEmployee(employee.id, formData);
        } else {
            await EmployeeService.createEmployee(formData);
        }
        setFormData(initialState);
        onSuccess();
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <form onSubmit={handleSubmit}>
            <h3>{employee ? 'Edit Employee' : 'Add Employee'}</h3>
            <div>
                <input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
            </div>
            <div>
                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
            </div>
            <div>
                <input
                    name="age"
                    placeholder="Age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                />
                {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
            </div>
            <div>
                <select name="sex" value={formData.sex} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.sex && <div style={{ color: 'red' }}>{errors.sex}</div>}
            </div>
            <button type="submit">{employee ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default EmployeeForm;
