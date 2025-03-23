import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = ({ loadData }) => {
    const { id } = useParams(); // получение id из URL
    const navigate = useNavigate(); // для навигации 
    //ссылки бренда и модели
    const brandRef = useRef(null);
    const modelRef = useRef(null);
    let currentData = {}; // для сохранения данных

    useEffect(() => { // получение данных объекта и их сохранение
        axios.get(`http://localhost:5000/cars/${id}`).then(response => {
            currentData = response.data; // cохраняем текущие данные
            if (brandRef.current) brandRef.current.value = currentData.brand;
            if (modelRef.current) modelRef.current.value = currentData.model;
        }).catch(error => console.error("Ошибка загрузки:", error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedData = {
            brand: brandRef.current.value,
            model: modelRef.current.value,
            fuel: currentData.fuel,
            brakes: currentData.brakes,
            pressure: currentData.pressure,
            lock: currentData.lock
        };
    
        try {
            // put объекта
            await axios.put(`http://localhost:5000/cars/${id}`, updatedData, {
                headers: { "Content-Type": "application/json" }
            });
    
            loadData(); // обновление главной стр
            navigate('/'); // перенаправление на главную стр
        } catch (error) {
            console.error("Ошибка обновления объекта:", error);
        }
    };

    return (
        <div style={styles.detailContainer}>
            <h1 style={styles.title}>Редактирование автомобиля</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    type="text" 
                    ref={brandRef} 
                    placeholder="Бренд" 
                    required 
                    style={styles.input}
                /><br/>
                <input 
                    type="text" 
                    ref={modelRef} 
                    placeholder="Модель" 
                    required 
                    style={styles.input}
                /><br/>
                <button type="submit" style={styles.submitButton}>Сохранить</button>
            </form>
        </div>
    );
};

const styles = {
    detailContainer: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginTop: '20px',
        backgroundColor: '#f9f9f9',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default Detail;