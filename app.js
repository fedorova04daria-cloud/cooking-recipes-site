let tg = window.Telegram.WebApp;
tg.expand();

// Данные из БД (в реальном проекте это бы приходило с сервера)
const breedsData = [
    {id: 1, name: "Лабрадор-ретривер", size: "large", character: "Дружелюбный, покладистый, активный", weight: 35, price: 40000},
    {id: 2, name: "Немецкая овчарка", size: "large", character: "Умная, преданная, уверенная", weight: 35, price: 45000},
    {id: 3, name: "Бигль", size: "medium", character: "Весёлый, общительный, любопытный", weight: 12, price: 35000},
    {id: 4, name: "Мопс", size: "small", character: "Спокойный, ласковый, общительный", weight: 8, price: 40000},
    {id: 5, name: "Чихуахуа", size: "small", character: "Храбрый, преданный, бдительный", weight: 3, price: 25000},
    {id: 6, name: "Сибирский хаски", size: "large", character: "Дружелюбный, выносливый, независимый", weight: 25, price: 35000},
    {id: 7, name: "Золотистый ретривер", size: "large", character: "Добрый, терпеливый, игривый", weight: 32, price: 45000},
    {id: 8, name: "Французский бульдог", size: "small", character: "Спокойный, умный, преданный", weight: 12, price: 50000}
];

function searchBreeds() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sizeFilter = document.getElementById('sizeFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    
    let filteredBreeds = breedsData.filter(breed => {
        const matchesSearch = breed.name.toLowerCase().includes(searchTerm);
        const matchesSize = !sizeFilter || breed.size === sizeFilter;
        
        let matchesPrice = true;
        if (priceFilter === 'budget') matchesPrice = breed.price <= 30000;
        else if (priceFilter === 'medium') matchesPrice = breed.price > 30000 && breed.price <= 50000;
        else if (priceFilter === 'premium') matchesPrice = breed.price > 50000;
        
        return matchesSearch && matchesSize && matchesPrice;
    });
    
    displayResults(filteredBreeds);
}

function applyFilters() {
    searchBreeds();
}

function displayResults(breeds) {
    const resultsDiv = document.getElementById('results');
    
    if (breeds.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">🐾 Породы не найдены</div>';
        return;
    }
    
    resultsDiv.innerHTML = breeds.map(breed => `
        <div class="breed-card">
            <div class="breed-name">${breed.name}</div>
            <div class="breed-info">Характер: ${breed.character}</div>
            <div class="breed-info">Вес: ${breed.weight} кг</div>
            <div class="price">💰 От ${breed.price.toLocaleString()} руб.</div>
        </div>
    `).join('');
}

// Показываем все породы при загрузке
displayResults(breedsData);