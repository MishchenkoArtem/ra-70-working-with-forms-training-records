/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-has-content */

import { useState } from 'react';
import './App.css';

function App() {
    // --- Состояние
    const [form, setForm] = useState([]);

    // --- Слушатель формы
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { target } = evt;
        const formData = new FormData(target);
        const data = Object.fromEntries(formData);
        if (data.date === '' || data.distance === '') return;
        if (form.length === 0) {
            createData(data);
        } else if (form.find((elem) => elem.date === data.date)) {
            updateData(data);
        } else {
            createData(data);
        }

        target.date.value = '';
        target.distance.value = '';
    };

    // --- Добавление данных в состояние
    const createData = (data) => {
        const newForm = () => {
            return [
                {
                    date: data.date,
                    distance: data.distance,
                    id: Math.random()
                },
                ...form,
            ];
        };
        setForm(newForm);
    };

    // --- Обновление данных в состоянии
    const updateData = (data) => {
        const formUpdate = form.map((elem, index) => {
            if (elem.date === data.date) {
                return {
                    ...elem,
                    distance: Number(elem.distance) + Number(data.distance),
                };
            } else {
                return elem;
            }
        });
        setForm(formUpdate);
    };

    // --- Сортировка данных в состоянии
    const sortData = form.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // --- Удаление элемента из состояния
    const handleDelete = (e) => {
        const parentTarget = e.target.closest('.list__wrapper-items');
        setForm((prevState) => {
            return prevState.filter(
                (elem) => elem.id !== Number(parentTarget.id),
            );
        });
    };

    // --- Отображения списка состояния
    const renderTicket = sortData.map((item) => {
        if (typeof item === 'undefined') return;

        return (
            <div className="list__wrapper-items" key={item.id} id={item.id}>
                <li>{item.date}</li>
                <li>{item.distance}</li>
                <div className="list__wrapper-button">
                    <a href="#0" className="list__button-edit"></a>
                    <a
                        href="#0"
                        className="list__button-delete"
                        onClick={handleDelete}
                    ></a>
                </div>
            </div>
        );
    });

    // --- Эффект клика по кнопке
    const onMouseDown = (e) => {
        e.target.style.transform = 'scale(.8)';
    };

    // --- Эффект клика по кнопке
    const onMouseUp = (e) => {
        e.target.style.transform = 'scale(1)';
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form__wrapper-input">
                        <label> Дата(ДД.ММ.ГГ)</label>
                        <input name="date" type="date" />
                    </div>
                    <div className="form__wrapper-input">
                        <label> Пройдено км</label>
                        <input name="distance" />
                    </div>
                </fieldset>
                <button onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                    OK
                </button>
            </form>
            <div>
                <ul className="list">
                    <div className="list__wrapper-title">
                        <p>Дата &nbsp; (ДД.ММ.ГГ)</p>
                        <p>Пройдено км</p>
                        <p>Действия</p>
                    </div>
                    {renderTicket}
                </ul>
            </div>
        </div>
    );
}

export default App;
