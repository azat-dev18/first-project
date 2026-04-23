import './globals.css';

export const metadata = {
  title: 'GreenTech Solutions – эко-технологии для бизнеса',
  description:
    'Консалтинг по внедрению экологичных IT-решений. Снижаем углеродный след вашей компании.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        {/* Шапка */}
        <header className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-green-700">
              GreenTech
            </a>
            <nav className="space-x-6 hidden md:block">
              <a href="#about" className="hover:text-green-600 transition">
                О нас
              </a>
              <a href="#services" className="hover:text-green-600 transition">
                Услуги
              </a>
              <a href="#contact" className="hover:text-green-600 transition">
                Контакты
              </a>
            </nav>
          </div>
        </header>

        {/* Основное содержимое */}
        <main className="flex-grow">{children}</main>

        {/* Подвал */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm">
            <p>
              © {new Date().getFullYear()} GreenTech Solutions. Все права
              защищены.
            </p>
            <p className="mt-2 text-gray-400">
              Контакты: info@greentech.ru | +7 (999) 123-45-67
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}