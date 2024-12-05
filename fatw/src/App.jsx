import React from 'react';
import './App.css';
import DataFetcher from './components/DataFetcher';
import DataForm from './components/DataForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-yellow text-black min-h-screen font-raleway">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="p-8 space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-pink">
          Festivals Around The World
        </h1>
        <p className="text-lg font-medium">
          Discover and share festivals happening globally.
        </p>

        {/* Data Fetcher Component */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-600">
            Explore Festivals
          </h2>
          <DataFetcher endpoint="/api/festivals" />
        </section>

        {/* Data Form Component */}
        <section className="bg-pink p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-semibold">
            Add a Festival
          </h2>
          <DataForm />
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
