document.addEventListener('DOMContentLoaded', () => {
    const supportersCountElement = document.getElementById('supporters-count');
    const loadingIcon = document.getElementById('loading-icon');
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
                supportersCountElement.textContent = count;
            } else {
                supportersCountElement.textContent = `${count} Pessoas`;
            }
        } catch (error) {
            supportersCountElement.textContent = 'Erro ao carregar';
            console.error('Erro ao atualizar a contagem de apoiadores:', error);
        } finally {
            loadingIcon.style.display = "none";
        }
    };

    updateSupportersCount();
});
