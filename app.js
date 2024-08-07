document.addEventListener('DOMContentLoaded', () => {
    const supportersCountElement = document.getElementById('supporters-count');
    const loadingIcon = document.getElementById('loading-icon');
    const apiURL = 'https://api.sheetmonkey.io/form/9uiwfDSMKPWwF6ZqTA2dpM';

    const fetchSheetData = async () => {
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data[0]['Apoiadores']; // Substitua 'Apoiadores' pelo nome da coluna correta
        } catch (error) {
            console.error('Erro ao buscar dados da planilha:', error);
            return 'Erro ao carregar';
        }
    };

    const updateSupportersCount = async () => {
        const count = await fetchSheetData();
        if (count === 'Erro ao carregar') {
            supportersCountElement.textContent = count;
        } else {
            supportersCountElement.textContent = `${count} Pessoas`;
        }
        loadingIcon.style.display = "none";
    };

    updateSupportersCount();
});
