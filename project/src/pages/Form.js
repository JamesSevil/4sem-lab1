import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = ({ onAdd }) => {
    // состояния(данные и функции)
    const [brand, setBrand] = useState(''); 
    const [model, setModel] = useState('');
    const navigate = useNavigate(); // переменная для перемещения

    const handleBrandChange = (e) => { // обработчик изменения бренда
        setBrand(e.target.value);
        console.log("Текущее значение brand:", e.target.value);
    };

    const handleModelChange = (e) => { // обработчик изменения модели
        setModel(e.target.value);
        console.log("Текущее значение model:", e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Получаем список автомобилей
            const response = await axios.get("http://localhost:5000/cars");
            const newId = (response.data.length + 1).toString();

            const newItem = {
                id: newId,
                brand: brand,
                model: model,
                fuel: "100",
                brakes: "100",
                pressure: "3.5",
                lock: "close"
            };

            // пост нового объекта
            await axios.post('http://localhost:5000/cars', JSON.stringify(newItem), {
                headers: { "Content-Type": "application/json" }
            });

            onAdd(newItem); // обновление главной стр
            navigate('/'); // перенаправление на главную стр
        } catch (error) {
            console.error("Ошибка при добавлении автомобиля:", error);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h1 style={styles.title}>Добавление автомобиля</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    type="text" 
                    placeholder="Бренд" 
                    value={brand} 
                    onChange={handleBrandChange} 
                    required 
                    style={styles.input}
                /><br/>
                <input 
                    type="text" 
                    placeholder="Модель" 
                    value={model} 
                    onChange={handleModelChange} 
                    required 
                    style={styles.input}
                /><br/>
                <button type="submit" style={styles.submitButton}>Сохранить</button>
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
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

export default Form;