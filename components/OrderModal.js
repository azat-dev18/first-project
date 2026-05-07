'use client';

import { useState, useEffect } from 'react';
import { submitOrder } from '@/actions/order';

export default function OrderModal({ service, isOpen, onClose }) {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '',
        address: '',
    });
    const [status, setStatus] = useState('idle');
    const [validationError, setValidationError] = useState('');

    // Сброс состояния при каждом открытии
    useEffect(() => {
        if (isOpen) {
            setFormData({ full_name: '', phone: '', email: '', address: '' });
            setStatus('idle');
            setValidationError('');
        }
    }, [isOpen]);

    // Автозакрытие через 2 секунды при успехе
    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => onClose(), 2000);
            return () => clearTimeout(timer);
        }
    }, [status, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValidationError('');
    };

    // Валидация перед отправкой
    const validate = () => {
        const { full_name, phone } = formData;
        // ФИО: только буквы, пробелы, дефис, апостроф 
        const nameRegex = /^[a-zA-Zа-яёА-ЯЁ\s\-']+$/;
        if (!nameRegex.test(full_name) || full_name.trim().length < 5 || full_name.trim().length > 80) {
            return 'ФИО должно содержать только буквы и быть длиной от 5 до 80 символов.';
        }
        // Телефон: российский формат +7 или 8, затем 10 цифр, допустимы разделители
        const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            return 'Введите корректный номер телефона (например, +7 777 123-45-67).';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        const error = validate();
        if (error) {
            setValidationError(error);
            return;
        }

        setStatus('loading');
        try {
            const fd = new FormData();
            fd.append('service', service);
            fd.append('full_name', formData.full_name);
            fd.append('phone', formData.phone);
            fd.append('email', formData.email);
            fd.append('address', formData.address);
            await submitOrder(fd);
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    const serviceNames = {
        'esg-audit': 'ESG-аудит IT',
        'energy': 'Энергоэффективная архитектура',
        'dashboards': 'Green-дашборды',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">Заказ услуги: {serviceNames[service]}</h2>

                {status === 'success' ? (
                    <div className="text-green-700 bg-green-50 p-4 rounded-lg text-center">
                        <p className="font-semibold">Спасибо за заявку!</p>
                        <p className="text-sm">Окно закроется автоматически…</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">ФИО</label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Иванов Иван Иванович"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Телефон</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="+7 777 123-45-67"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Адрес</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Город, улица, дом"
                            ></textarea>
                        </div>
                        {validationError && (
                            <p className="text-red-600 text-sm">{validationError}</p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-600 text-sm">Произошла ошибка. Попробуйте позже.</p>
                        )}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}