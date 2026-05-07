'use client';

import { useState } from 'react';
import OrderModal from '@/components/OrderModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOrderClick = (serviceId) => {
    setSelectedService(serviceId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      {/* Главный экран (Hero) */}
      <section className="bg-gradient-to-br from-green-100 to-green-200 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Технологии на страже экологии
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            GreenTech Solutions помогает компаниям внедрять энергоэффективные,
            малоуглеродные IT-инфраструктуры. Консалтинг, аудит, разработка.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#contact"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Связаться с нами
            </a>
            <a
              href="#services"
              className="bg-white hover:bg-gray-100 text-green-700 font-semibold py-3 px-8 rounded-lg border border-green-600 transition"
            >
              Наши услуги
            </a>
          </div>
        </div>
      </section>

      {/* О компании */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            О GreenTech Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Мы команда инженеров, экологов и IT-консультантов, объединённых
                целью сделать бизнес более устойчивым. С 2020 года реализовали
                более 50 проектов по «зелёной» трансформации IT-инфраструктуры.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Наш подход основан на анализе данных, лучших мировых практиках
                (Green Software Foundation) и индивидуальных решениях для
                каждого клиента.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3">Наши ценности</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🌱 Экологическая ответственность</li>
                <li>💡 Инновации без компромиссов</li>
                <li>🤝 Партнёрство и прозрачность</li>
                <li>📊 Данные, а не догадки</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги с кнопками заказа */}
      <section id="services" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Услуги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                {service.hasOrderButton && (
                  <button
                    onClick={() => handleOrderClick(service.id)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition self-start"
                  >
                    Заказать услугу
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Контакты</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
            Готовы обсудить ваш проект? Свяжитесь с нами удобным способом или
            оставьте заявку.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-2xl mb-2">📧</div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-700">info@greentech.ru</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-2xl mb-2">📞</div>
              <h4 className="font-semibold">Телефон</h4>
              <p className="text-gray-700">+7 (777) 123-45-67</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-2xl mb-2">📍</div>
              <h4 className="font-semibold">Офис</h4>
              <p className="text-gray-700">Алматы, ул. Байтурсынова, д. 15</p>
            </div>
          </div>

          {/* Форма обратной связи (демо) */}
          <form className="mt-12 max-w-xl mx-auto text-left bg-white p-8 rounded-xl shadow">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Имя
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ваше имя"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Сообщение
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Расскажите о задаче..."
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Отправить заявку
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              (Форма не отправляет данные, это демо-версия)
            </p>
          </form>
        </div>
      </section>

      {/* Модальное окно заказа услуги */}
      <OrderModal
    key={selectedService + (modalOpen ? 'open' : 'closed')}
    service={selectedService}
    isOpen={modalOpen}
    onClose={closeModal}
    />
    </>
  );
}

// Данные услуг с id и флагом для кнопок
const services = [
  {
    id: 'esg-audit',
    icon: '🌍',
    title: 'ESG-аудит IT',
    description:
      'Оценка углеродного следа вашей IT-инфраструктуры и рекомендации по снижению.',
    hasOrderButton: true,
  },
  {
    id: 'energy',
    icon: '⚡',
    title: 'Энергоэффективная архитектура',
    description:
      'Проектирование облачных и on‑premise решений с минимальным энергопотреблением.',
    hasOrderButton: true,
  },
  {
    id: 'dashboards',
    icon: '📊',
    title: 'Green-дашборды',
    description:
      'Визуализация ключевых экологических метрик вашего цифрового бизнеса в реальном времени.',
    hasOrderButton: true,
  },
  {
    id: null,
    icon: '🔄',
    title: 'Карбоновый менеджмент',
    description:
      'Автоматизация учёта и отчётности по выбросам Scope 1, 2, 3.',
    hasOrderButton: false,
  },
  {
    id: null,
    icon: '💻',
    title: 'Разработка эко-софта',
    description:
      'Создание веб-приложений с низким потреблением ресурсов и оптимизацией трафика.',
    hasOrderButton: false,
  },
  {
    id: null,
    icon: '🎓',
    title: 'Обучение команд',
    description:
      'Тренинги и воркшопы по принципам Green Coding для ваших разработчиков.',
    hasOrderButton: false,
  },
];