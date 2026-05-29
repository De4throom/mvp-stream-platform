import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Radio,
  Users,
  Sparkles
} from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

function HomePage() {
  const [activePage, setActivePage] = useState("Главная");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [streamTitle, setStreamTitle] = useState("");
  const [streamCategory, setStreamCategory] = useState("Игры");
  const [conferenceLink, setConferenceLink] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isLive, setIsLive] = useState(false);

  const generateConference = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    const link = `${window.location.origin}/conference/${roomId}`;
    setConferenceLink(link);
    localStorage.setItem("conferenceRoom", roomId);
  };
  const defaultStreams = [
    {
      id: 1,
      title: "Игровой стрим",
      author: "Deathroom",
      viewers: 124,
      type: "Стрим",
      category: "Игры",
      tags: ["Игры", "Общение"]
    },
    {
      id: 2,
      title: "Книжный клуб",
      author: "ReaderHub",
      viewers: 18,
      type: "Конференция",
      category: "Образование",
      tags: ["Образование", "Общение"]
    },
    {
      id: 3,
      title: "Музыкальный эфир",
      author: "NightWave",
      viewers: 67,
      type: "Стрим",
      category: "Музыка",
      tags: ["Музыка"]
    }
  ];
  const [streams, setStreams] = useState(() => {
    const saved = localStorage.getItem("dynamicStreams");
    return saved
      ? JSON.parse(saved)
      : defaultStreams;
  });

  const filteredStreams =
    selectedCategory === "Все"
      ? streams
      : streams.filter(
        (stream) => stream.category === selectedCategory
      );

  const renderContent = () => {
    if (activePage === "Прямые трансляции") {
      return <div className="text-zinc-300 text-lg">Раздел стримов находится в разработке.</div>;
    }

    if (activePage === "Конференции") {
      return <div className="text-zinc-300 text-lg">Раздел конференций находится в разработке.</div>;
    }

    if (activePage === "Рекомендации") {
      return <div className="text-zinc-300 text-lg">Система рекомендаций будет добавлена позже.</div>;
    }

    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStreams((prevStreams) =>
        prevStreams.map((stream) => ({
          ...stream,
          viewers: Math.max(
            1,
            stream.viewers + Math.floor(Math.random() * 7) - 3
          )
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

 useEffect(() => {
    const checkLive = () => {
      setIsLive(localStorage.getItem("streamActive") === "true");
    };
    checkLive();
    const interval = setInterval(checkLive, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#18181b] border-r border-zinc-800 flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <h1 className="text-2xl font-bold">StreamHub</h1>
          <p className="text-sm text-zinc-400 mt-1">
            MVP платформы стримов и конференций
            <div className="text-xs text-zinc-500 mt-2">Шумских М.Р. БПИ22</div>
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <button
            onClick={() => setActivePage("Главная")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activePage === "Главная"
                ? "bg-purple-600"
                : "hover:bg-zinc-800"
            }`}
          >
            <Home size={20} />
            Главная
          </button>

          <button
            onClick={() => setActivePage("Прямые трансляции")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activePage === "Прямые трансляции"
                ? "bg-purple-600"
                : "hover:bg-zinc-800"
            }`}
          >
            <Radio size={20} />
            Прямые трансляции
          </button>

          <button
            onClick={() => setActivePage("Конференции")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activePage === "Конференции"
                ? "bg-purple-600"
                : "hover:bg-zinc-800"
            }`}
          >
            <Users size={20} />
            Конференции
          </button>

          <button
            onClick={() => setActivePage("Рекомендации")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              activePage === "Рекомендации"
                ? "bg-purple-600"
                : "hover:bg-zinc-800"
            }`}
          >
            <Sparkles size={20} />
            Рекомендации
          </button>

        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-purple-600 hover:bg-purple-500 transition py-3 rounded-xl font-medium"
          >
            Создать трансляцию
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 border-b border-zinc-800 bg-[#18181b] flex items-center justify-between px-6">
          <input
            type="text"
            placeholder="Поиск трансляций..."
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 w-80 outline-none"
          />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
              D
            </div>
          </div>
        </header>

        <section className="px-6 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <div className="text-zinc-400 text-sm mb-2">
                Активные трансляции
              </div>
              <div className="text-3xl font-bold">
                3
              </div>
            </div>
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <div className="text-zinc-400 text-sm mb-2">
                Пользователи онлайн
              </div>
              <div className="text-3xl font-bold text-green-400">
                7
              </div>
            </div>
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <div className="text-zinc-400 text-sm mb-2">
                Активные конференции
              </div>
              <div className="text-3xl font-bold text-purple-400">
                1
              </div>
            </div>
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <div className="text-zinc-400 text-sm mb-2">
                Система рекомендаций
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <div className="font-semibold text-green-400">
                  Активна
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="px-6 py-4 border-b border-zinc-800 bg-[#121214]">
          <div className="flex gap-3 overflow-x-auto">

            <button
              onClick={() => setSelectedCategory("Все")}
              className={`px-5 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === "Все"
                  ? "bg-purple-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Все
            </button>

            <button
              onClick={() => setSelectedCategory("Игры")}
              className={`px-5 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === "Игры"
                  ? "bg-purple-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Игры
            </button>

            <button
              onClick={() => setSelectedCategory("Музыка")} 
              className={`px-5 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === "Музыка"
                  ? "bg-purple-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Музыка
            </button>

            <button
              onClick={() => setSelectedCategory("Образование")}
              className={`px-5 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === "Образование"
                  ? "bg-purple-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Образование
            </button>

            <button
              onClick={() => setSelectedCategory("Образование")}
              className={`px-5 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === "Образование"
                  ? "bg-purple-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Конференции
            </button>

            <button
              onClick={() => setSelectedCategory("Подкасты")}
              className={`px-5 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === "Подкасты"
                  ? "bg-purple-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Подкасты
            </button>

          </div>
        </section>
        
        <section className="p-6 border-b border-zinc-800 bg-gradient-to-r from-purple-700/20 to-transparent">
          <h2 className="text-3xl font-bold mb-2">
            Универсальная платформа для стримов и конференций
          </h2>

          <p className="text-zinc-300 max-w-3xl">
            MVP версия системы, объединяющей прямые трансляции, видеоконференции
            и взаимодействие пользователей в едином интерфейсе.
          </p>
        </section>

        <section className="px-6 py-5 border-b border-zinc-800">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-xl font-semibold mb-4">
                Рекомендуемые авторы
              </h3>

              <div className="space-y-4">

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Deathroom</div>
                    <div className="text-sm text-zinc-400">
                      Игры • Общение
                    </div>
                  </div>

                  <div className="text-green-400 text-sm">
                    online
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">NightWave</div>
                    <div className="text-sm text-zinc-400">
                      Музыка
                    </div>
                  </div>

                  <div className="text-green-400 text-sm">
                    online
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-xl font-semibold mb-4">
                Популярные категории
              </h3>

              <div className="flex flex-wrap gap-3">
                <span className="bg-zinc-800 px-4 py-2 rounded-xl">
                  Игры
                </span>

                <span className="bg-zinc-800 px-4 py-2 rounded-xl">
                  Музыка
                </span>

                <span className="bg-zinc-800 px-4 py-2 rounded-xl">
                  Образование
                </span>

                <span className="bg-zinc-800 px-4 py-2 rounded-xl">
                  Подкасты
                </span>
              </div>
            </div>

            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-xl font-semibold mb-4">
                AI рекомендации
              </h3>

              <p className="text-zinc-400 mb-4">
                Рекомендации формируются на основе просмотренных категорий и времени просмотра трансляций.
              </p>

              <div className="bg-zinc-800 rounded-xl p-4">
                Вам может понравиться:
                <div className="mt-2 font-medium">
                  Ночной игровой стрим
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-semibold">
                AI рекомендации
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Персонализированная подборка на основе интересов пользователя
              </p>
            </div>
            <div className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-xl text-sm">
              Система рекомендаций активна
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-purple-400">
                  Совпадение интересов
                </span>
                <span className="text-sm bg-purple-600 px-2 py-1 rounded-lg">
                  92%
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Ночной игровой стрим
              </h4>
              <p className="text-zinc-400 text-sm mb-4">
                Рекомендовано на основе просмотренных игровых трансляций
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-zinc-800 px-3 py-1 rounded-lg text-xs">
                  Игры
                </span>
                <span className="bg-zinc-800 px-3 py-1 rounded-lg text-xs">
                  Экшен
                </span>
                <span className="bg-zinc-800 px-3 py-1 rounded-lg text-xs">
                  Эфир
                </span>
              </div>
            </div>
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-400">
                  Популярное
                </span>
                <span className="text-sm bg-green-600 px-2 py-1 rounded-lg">
                  HOT
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Музыкальная прямая трансляция
              </h4>
              <p className="text-zinc-400 text-sm mb-4">
                Популярно среди пользователей со схожими интересами
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-zinc-800 px-3 py-1 rounded-lg text-xs">
                  Музыка
                </span>
                <span className="bg-zinc-800 px-3 py-1 rounded-lg text-xs">
                  Synthwave
                </span>
              </div>
            </div>
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-blue-400">
                  Новое
                </span>
                <span className="text-sm bg-blue-600 px-2 py-1 rounded-lg">
                  NEW
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Технологичная конференция
              </h4>
              <p className="text-zinc-400 text-sm mb-4">
                Обнаружено AI как релевантный профессиональный контент
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-zinc-800 px-3 py-1 rounded-lg text-xs">
                  Технологии
                </span>
                <span className="bg-zinc-800 px-3 py-1 rounded-lg text-xs">
                  конференция 
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Streams grid */}
        <section className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-semibold">Популярные трансляции</h3>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700">
                Стримы
              </button>

              <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700">
                Конференции
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStreams.map((stream, index) => (
              <Link
                to={stream.type === "Стрим" ? "/stream/1" : "/conference/1"}
                key={index}
                className="bg-[#18181b] border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500 transition block"
              > 
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-700/40 via-zinc-800 to-black">

                  <div
                    className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg ${
                      isLive
                        ? "bg-red-600 animate-pulse"
                        : "bg-zinc-700"
                    }`}
                  >
                    {isLive ? "LIVE" : "OFFLINE"}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-xs px-2 py-1 rounded-lg">
                    {stream.viewers} зрителей
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-white text-xl font-semibold mb-2">
                      {stream.title}
                    </div>
                    <div className="text-zinc-400 text-sm">
                      {stream.category}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded-lg">
                      {stream.type}
                    </span>

                  </div>

                  <h4 className="font-semibold text-lg mb-1">
                    {stream.title}
                  </h4>

                  <p className="text-zinc-400 text-sm">
                    Автор: {stream.author}
                  </p>
                </div>
              </Link> 
            ))}
          </div>
        </section>
      <section className="px-6 pb-6">
          {renderContent()}
        </section>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] border border-zinc-700 rounded-2xl p-6 w-[420px]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-semibold">
                Создание трансляции
              </h3>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Название трансляции
                </label>

                <input
                  type="text"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  placeholder="Введите название..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Категория
                </label>

                <select
                  value={streamCategory}
                  onChange={(e) => setStreamCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
                >
                  <option>Игры</option>
                  <option>Музыка</option>
                  <option>Образование</option>
                  <option>Подкасты</option>
                  <option>Конференции</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">

                <button
                  onClick={() => {
                    localStorage.setItem("streamTitle", streamTitle);
                    localStorage.setItem("streamCategory", streamCategory);
                    const newStream = {
                      id: Date.now(),
                      title: streamTitle || "Новый стрим",
                      author: "Deathroom",
                      viewers: Math.floor(Math.random() * 50) + 10,
                      type: "Стрим",
                      category: streamCategory,
                      tags: [streamCategory]
                    };
                    const updatedStreams = [...streams, newStream];
                    localStorage.setItem(
                      "dynamicStreams",
                      JSON.stringify(updatedStreams)
                    );
                    window.location.href = "/stream/1";
                  }}
                  className="bg-purple-600 hover:bg-purple-500 transition rounded-2xl p-4 text-center font-medium"
                >
                  Запустить стрим
                </button>

                <button
                  onClick={() => {
                    const roomId = Math.random().toString(36).substring(2, 8);
                    localStorage.setItem("conferenceRoom", roomId);
                    window.location.href = `/conference/${roomId}`;
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl p-4 text-center border border-zinc-700 font-medium"
                >
                  Создать конференцию
                </button>
              </div>

              {conferenceLink && (
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 mt-4">
                  <div className="text-sm text-zinc-400 mb-2">
                    Ссылка для подключения
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm break-all text-purple-400">
                      {conferenceLink}
                    </div>

                    <button
                      onClick={() => navigator.clipboard.writeText(conferenceLink)}
                      className="bg-purple-600 hover:bg-purple-500 transition px-3 py-2 rounded-lg text-sm"
                    >
                      Копировать
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StreamPage() {

const streamTitle =
  localStorage.getItem("streamTitle") || "Игровой стрим";
const streamCategory =
  localStorage.getItem("streamCategory") || "Игры";
  
const [screenStream, setScreenStream] = useState(null);
const [streamStatus, setStreamStatus] = useState("OFFLINE");
const videoRef = useRef(null);

const [chatMessages, setChatMessages] = useState([
  { user: "user123", text: "Всем привет!" },
  { user: "viewer77", text: "Отличный стрим 🔥" },
  { user: "gamer", text: "Когда следующая игра?" }
]);
const [newMessage, setNewMessage] = useState("");
const [viewerCount, setViewerCount] = useState(124);
const [streamTime, setStreamTime] = useState(0);

const startScreenShare = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    setScreenStream(stream);
    localStorage.setItem("streamActive", "true");
    setStreamStatus("LIVE");

  } catch (err) {
    console.log("Ошибка захвата экрана:", err);
  }
};

  useEffect(() => {
    if (videoRef.current && screenStream) {
      videoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const randomChange = Math.floor(Math.random() * 7) - 3;
        return Math.max(50, prev + randomChange);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fakeMessages = [
      "Крутой эфир 🔥",
      "Какой микрофон используешь?",
      "Привет всем!",
      "Очень атмосферно",
      "Когда следующий стрим?",
      "Топ контент",
      "Наконец-то успел на трансляцию"
    ];

    const fakeUsers = [
      "viewer21",
      "streamfan",
      "nightbot",
      "alex",
      "cyberfox",
      "ghost",
      "pixel"
    ];

    const interval = setInterval(() => {
      const randomMessage =
        fakeMessages[Math.floor(Math.random() * fakeMessages.length)];

      const randomUser =
        fakeUsers[Math.floor(Math.random() * fakeUsers.length)];

      setChatMessages((prev) => [
        ...prev,
        {
          user: randomUser,
          text: randomMessage
        }
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        user: "Deathroom",
        text: newMessage
      }
    ]);

    setNewMessage("");
  };

  const streamTags = ["Игры", "Общение"];

  const recommendationDatabase = {
    Игры: [
      "Киберспортивный турнир",
      "Ночной игровой стрим",
      "Прохождение хорроров"
    ],

    Музыка: [
      "Synthwave эфир",
      "Live DJ session",
      "Ночной музыкальный поток"
    ],

    Общение: [
      "Общение со зрителями",
      "Вечерний разговорный стрим",
      "Подкаст в прямом эфире"
    ]
  };

  const recommendedStreams = streamTags.flatMap(
    (tag) => recommendationDatabase[tag] || []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      <div className="p-5 pb-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-purple-600/90 hover:bg-purple-500 transition px-4 py-2 rounded-xl text-sm font-medium shadow-lg"
        >
          ← На главную
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Video */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-5 relative border border-zinc-800">

          {!screenStream ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">

              <div className="text-2xl mb-4">
                {streamStatus === "ENDED"
                  ? "Трансляция завершена"
                  : "Трансляция не запущена"}
              </div>

              <button
                onClick={startScreenShare}
                className="bg-purple-600 hover:bg-purple-500 transition px-6 py-3 rounded-xl font-medium"
              >
                Начать трансляцию
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
                <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg animate-pulse">
                  {streamStatus}
                </div>
                <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-sm">
                  {formatTime(streamTime)}
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-sm">
                {viewerCount} зрителей
              </div>

              <button
                onClick={() => {
                  screenStream.getTracks().forEach((track) => track.stop());
                  setScreenStream(null);
                  localStorage.removeItem("streamActive");
                  setStreamStatus("ENDED");
                }}
                className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-xl text-sm font-medium"
              >
                Завершить эфир
              </button>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4">
            <div className="text-zinc-400 text-sm mb-2">
              Качество
            </div>
            <div className="text-xl font-semibold">
              1080p
            </div>
          </div>
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4">
            <div className="text-zinc-400 text-sm mb-2">
              Bitrate
            </div>
            <div className="text-xl font-semibold">
              6.2 Mbps
            </div>
          </div>
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4">
            <div className="text-zinc-400 text-sm mb-2">
              Соединение
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="font-semibold text-green-400">
                Стабильно
              </div>
            </div>
          </div>
          <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4">
            <div className="text-zinc-400 text-sm mb-2">
              Запись
            </div>
            <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="font-semibold text-red-400">
                REC
              </div>
            </div>
          </div>
        </div>

        {/* Stream info */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {streamTitle}
              </h1>

              <p className="text-zinc-400">
                Автор: Deathroom • {viewerCount} зрителей 
              </p>
            </div>

            <button className="bg-purple-600 hover:bg-purple-500 transition px-5 py-3 rounded-xl font-medium">
              Подписаться
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-3 mt-5">
            <span className="bg-zinc-800 px-3 py-1 rounded-lg text-sm">
              {streamCategory}
            </span>

            <span className="bg-zinc-800 px-3 py-1 rounded-lg text-sm">
              Онлайн
            </span>

            <span className="bg-zinc-800 px-3 py-1 rounded-lg text-sm">
              Общение
            </span>
          </div>
        </div>

        {/* Recommended */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5">
          <h2 className="text-2xl font-semibold mb-4">
            Рекомендуемые трансляции
          </h2>

          <div className="space-y-3">
            {recommendedStreams.map((stream, index) => (
              <div
                key={index}
                className="bg-zinc-800 hover:bg-zinc-700 transition rounded-xl p-4 cursor-pointer"
              >
                {stream}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat */}
      <aside className="w-[360px] border-l border-zinc-800 bg-[#18181b] flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <h2 className="text-2xl font-semibold">
            Чат
          </h2>
        </div>

        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {chatMessages.map((msg, index) => (
            <div key={index}>
              <span className="text-purple-400 font-medium">
                {msg.user}:
              </span>

              <span className="ml-2 text-zinc-300">
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Написать сообщение..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-purple-600 hover:bg-purple-500 transition px-4 rounded-xl"
            >
              ➤
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ConferencePage() {
  const { id } = useParams();
  const roomCode = id?.toUpperCase();
  const [username, setUsername] = useState(
    `Guest_${Math.floor(Math.random() * 1000)}`
    );
  const [joined, setJoined] = useState(false);

  const [participants, setParticipants] = useState([
    {
      name: "Deathroom",
      active: true
    },
    {
      name: "ReaderHub",
      active: false
    },
    {
      name: "NightWave",
      active: false
    },
    {
      name: "Alex",
      active: false
    }
  ]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <Link
        to="/"
        className="inline-block mb-6 bg-zinc-800 hover:bg-zinc-700 transition px-4 py-2 rounded-xl"
      >
        ← На главную
      </Link>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Конференция
          </h1>
          <p className="text-zinc-400">
            Комната #{roomCode} • {participants.length} участников
          </p>
        </div>
        <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-xl text-sm font-medium">
          В эфире
        </div>
        <div className="mt-3 text-sm text-zinc-400">
          Ссылка для подключения:
        </div>
        <div className="mt-2 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-purple-400 break-all">
          {window.location.href}
        </div>
      </div>

      {!joined ? (
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 mb-6 max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">
            Вход в конференцию
          </h2>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none mb-4"
          />

          <button
            onClick={() => {
                setParticipants((prev) => [
                  ...prev,
                  {
                    name: username,
                    active: false
                  }
                ]);
                setJoined(true);
            }}
            className="bg-purple-600 hover:bg-purple-500 transition px-5 py-3 rounded-xl font-medium"
          >
            Войти в конференцию
          </button>
        </div>
      ) : (
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zinc-400 text-sm">
                Вы подключены как
              </div>

              <div className="text-xl font-semibold">
                {username}
              </div>
            </div>

            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
              В сети
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {participants.map((participant, index) => (
          <div
            key={index}
            className={`aspect-video rounded-2xl border overflow-hidden relative ${
              participant.active
                ? "border-purple-500 shadow-lg shadow-purple-500/20"
                : "border-zinc-800"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-zinc-500 text-xl">
              ВИДЕО
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-sm">
                {participant.name}
              </div>
              {participant.active && (
                <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-lg animate-pulse">
                  Говорит
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-2xl">
          🎤 Микрофон
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-2xl">
          📷 Камера
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-2xl">
          🖥 Демонстрация
        </button>
        <button className="bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-2xl">
          Покинуть
        </button>
      </div>

      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5 mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          Участники конференции
        </h2>

      <div className="space-y-3">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between"
          >
            <span>{participant.name}</span>
            <span className="text-green-400 text-sm">
              online
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default function StreamPlatformMVP() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stream/1" element={<StreamPage />} />
        <Route path="/conference/:id" element={<ConferencePage />} /> 
      </Routes>
    </BrowserRouter>
  );
}
