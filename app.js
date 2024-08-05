document.addEventListener('DOMContentLoaded', () => {
    const supportersCount = document.getElementById('supporters-count');
    
    // URL da API do SheetMonkey
    const apiURL = 'https://api.sheetmonkey.io/form/9uiwfDSMKPWwF6ZqTA2dpM';

    // Função para buscar dados da planilha
    const fetchSheetData = async () => {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            return data[0]['Apoiadores']; // Substitua 'Apoiadores' pelo nome da coluna que contém o valor desejado
        } catch (error) {
            console.error('Erro ao buscar dados da planilha:', error);
        }
    };

    // Atualizar a contagem inicial de apoiadores
    const updateSupportersCount = async () => {
        const count = await fetchSheetData();
        supportersCount.textContent = count;
    };

    // Chama a função para atualizar a contagem inicial
    updateSupportersCount();
});
