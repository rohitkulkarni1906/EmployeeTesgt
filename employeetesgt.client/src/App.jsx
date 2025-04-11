import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch("https://localhost:7077/api/Employee/")
            .then(res => res.json())
            .then(setEmployees)
            .catch(() => setError("Failed to load employees."));
    }, []);

    const handleAdd = async () => {
        if (!firstName || !lastName || !sex) {
            setError("First name, last name, and gender are required.");
            return;
        }
        if (+age < 18 || +age > 100) {
            setError("Age must be between 18 and 100.");
            return;
        }

        const res = await fetch("https://localhost:7077/api/Employee/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, age: +age, sex })
        });

        if (res.ok) {
            const newEmp = await res.json();
            setEmployees([...employees, newEmp]);
            setFirstName(''); setLastName(''); setAge(''); setSex('');
            setError('');
        } else {
            setError("Failed to add employee.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this employee?")) return;
        const res = await fetch(`https://localhost:7077/api/Employee/${id}`, { method: "DELETE" });
        if (res.ok) {
            setEmployees(employees.filter(e => e.id !== id));
        } else {
            setError("Delete failed.");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Employee Management</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: 15 }}>
                <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                <input placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} />
                <select value={sex} onChange={e => setSex(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <button onClick={handleAdd}>Add</button>
            </div>

            {employees.length === 0 ? (
                <div>No employees found.</div>
            ) : (
                <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc' }}>
                    {employees.map((e, i) => (
                        <div key={e.id} style={{
                            backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#e0e0e0',
                            padding: 10,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>{e.firstName} {e.lastName}</span>
                            <span>{e.age} years</span>
                            <span>{e.sex}</span>
                            <button onClick={() => handleDelete(e.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
