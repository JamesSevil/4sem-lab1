import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ data, loadData }) => {

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/cars/${id}`).then(() => {
            console.log(`Товар ${id} удален`);
            loadData(); // Обновляем данные после удаления
            alert("Автомобиль удален из списка!");
        }).catch(error => console.error("Ошибка удаления:", error));
    };

    return (
        <div style={styles.homeContainer}>
            <h1 style={styles.title}>Список автомобилей</h1>
            <ul style={styles.carList}>
                {data.map(item => (
                    <li key={item.id} style={styles.carItem}>
                        <Link to={`/detail/${item.id}`} style={styles.carLink}>
                            {item.brand} {item.model}
                        </Link>
                        <button onClick={() => deleteItem(item.id)} style={styles.deleteButton}>
                            Удалить
                        </button>
                        <div style={styles.carDetails}>
                            <b>Уровень топлива:</b> {item.fuel}% <br />
                            <b>Уровень тормозной жидкости:</b> {item.brakes}% <br />
                            <b>Давление в шинах:</b> {item.pressure} бар(а) <br />
                            <b>Замок:</b> {item.lock} <br /><br />
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/add" style={styles.addButton}>Добавить автомобиль</Link>
        </div>
    );
};

const styles = {
    homeContainer: {
        padding: '20px',
        backgroundColor: '#f2f2f2',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    carList: {
        listStyleType: 'none',
        padding: 0,
    },
    carItem: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#fff',
    },
    carLink: {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold',
    },
    deleteButton: {
        marginLeft: '10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    carDetails: {
        marginTop: '10px',
        fontSize: '0.9em',
        color: '#555',
    },
    addButton: {
        display: 'block',
        marginTop: '20px',
        textAlign: 'center',
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
    }
};

export default Home;