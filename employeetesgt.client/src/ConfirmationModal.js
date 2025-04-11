import React from 'react';

function ConfirmationModal({ show, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                background: '#fff', padding: '20px', borderRadius: '10px',
                width: '300px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this employee?</p>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={onConfirm} style={{ marginRight: '10px' }}>Yes, Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
