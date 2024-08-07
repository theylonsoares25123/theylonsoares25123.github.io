document.addEventListener('DOMContentLoaded', () => {
    const supportersTextElement = document.getElementById('supporters-text');
    const loadingIconElement = document.getElementById('loading-icon');
    const apiURL = 'https://api.sheetmonkey.io/form/9uiwfDSMKPWwF6ZqTA2dpM';

    const fetchSheetData = async () => {
        try {
            console.log('Fetching data from API...');
            const response = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data fetched successfully:', data);
            return data[0]['Apoiadores']; // Substitua 'Apoiadores' pelo nome da coluna correta
        } catch (error) {
            console.error('Erro ao buscar dados da planilha:', error);
            return 'Erro ao carregar';
        }
    };

    const updateSupportersCount = async () => {
        try {
            const count = await fetchSheetData();
            if (count === 'Erro ao carregar') {
                supportersTextElement.textContent = count;
            } else {
                supportersTextElement.textContent = `${count} Pessoas`;
            }
        } catch (error) {
            supportersTextElement.textContent = 'Erro ao carregar';
            console.error('Erro ao atualizar a contagem de apoiadores:', error);
        } finally {
            loadingIconElement.style.display = "none";
        }
    };

    updateSupportersCount();
});
