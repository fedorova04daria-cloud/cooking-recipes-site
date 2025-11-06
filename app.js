const tg = window.Telegram.WebApp;
tg.expand();

// Данные из БД (в реальном проекте это бы приходило с сервера)
const recipesData = [
    {id: 1, name: "Овсяная каша с ягодами", category: "breakfast", time: 15, calories: 250, difficulty: "легко", ingredients: "овсяные хлопья, молоко, ягоды, мед", weight: 300},
    {id: 2, name: "Яичница с овощами", category: "breakfast", time: 10, calories: 280, difficulty: "легко", ingredients: "яйца, помидоры, перец, лук", weight: 200},
    {id: 3, name: "Сырники", category: "breakfast", time: 25, calories: 320, difficulty: "средне", ingredients: "творог, яйца, мука, сахар", weight: 180},
    {id: 4, name: "Куриный суп", category: "lunch", time: 40, calories: 180, difficulty: "легко", ingredients: "курица, картофель, морковь, лук", weight: 350},
    {id: 5, name: "Паста Карбонара", category: "lunch", time: 20, calories: 450, difficulty: "средне", ingredients: "паста, бекон, яйца, сыр", weight: 300},
    {id: 6, name: "Греческий салат", category: "lunch", time: 15, calories: 200, difficulty: "легко", ingredients: "помидоры, огурцы, сыр фета, оливки", weight: 250},
    {id: 7, name: "Лосось с овощами", category: "dinner", time: 30, calories: 350, difficulty: "средне", ingredients: "лосось, брокколи, морковь, лимон", weight: 280},
    {id: 8, name: "Курица-гриль", category: "dinner", time: 45, calories: 320, difficulty: "сложно", ingredients: "курица, специи, чеснок, розмарин", weight: 250},
    {id: 9, name: "Омлет с сыром", category: "breakfast", time: 12, calories: 290, difficulty: "легко", ingredients: "яйца, сыр, молоко, зелень", weight: 220},
    {id: 10, name: "Плов", category: "lunch", time: 60, calories: 480, difficulty: "сложно", ingredients: "рис, мясо, морковь, лук, специи", weight: 350}
];

function searchRecipes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const timeFilter = document.getElementById('timeFilter').value;
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    
    let filteredRecipes = recipesData.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || 
                            recipe.ingredients.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || recipe.category === categoryFilter;
        const matchesDifficulty = !difficultyFilter || recipe.difficulty === difficultyFilter;
        
        let matchesTime = true;
        if (timeFilter === 'fast') matchesTime = recipe.time <= 20;
        else if (timeFilter === 'medium') matchesTime = recipe.time > 20 && recipe.time <= 40;
        else if (timeFilter === 'long') matchesTime = recipe.time > 40;
        
        return matchesSearch && matchesCategory && matchesTime && matchesDifficulty;
    });
    
    displayResults(filteredRecipes);
}

function applyFilters() {
    searchRecipes();
}

function displayResults(recipes) {
    const resultsDiv = document.getElementById('results');
    
    if (recipes.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">🍳 Рецепты не найдены</div>';
        return;
    }
    
    resultsDiv.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-name">
                ${recipe.name}
                <span class="category-badge">
                    ${recipe.category === 'breakfast' ? '🍳' : recipe.category === 'lunch' ? '🍲' : '🍝'}
                </span>
            </div>
            <div class="recipe-info">🛒 ${recipe.ingredients}</div>
            <div class="recipe-meta">
                <span class="time">⏱ ${recipe.time} мин</span>
                <span class="calories">🔥 ${recipe.calories} ккал</span>
                <span class="difficulty">${getDifficultyEmoji(recipe.difficulty)} ${recipe.difficulty}</span>
            </div>
        </div>
    `).join('');
}

function getDifficultyEmoji(difficulty) {
    switch(difficulty) {
        case 'легко': return '👶';
        case 'средне': return '👨‍🍳';
        case 'сложно': return '🧑‍🍳';
        default: return '👨‍🍳';
    }
}

// Показываем все рецепты при загрузке
displayResults(recipesData);
