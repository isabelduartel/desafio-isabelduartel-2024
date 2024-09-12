// Definição dos recintos existentes
const recintos = [
    { numero: 1, bioma: 'savana', capacidade: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
    { numero: 2, bioma: 'floresta', capacidade: 5, animais: [] },
    { numero: 3, bioma: 'savana e rio', temRio: true, capacidade: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
    { numero: 4, bioma: 'rio', capacidade: 8, animais: [] },
    { numero: 5, bioma: 'savana', capacidade: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
];

// Definição dos tamanhos dos animais e biomas adequados
const animais = {
    'LEAO': { tamanho: 3, biomas: ['savana'] },
    'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
    'CROCODILO': { tamanho: 3, biomas: ['rio'] },
    'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
    'GAZELA': { tamanho: 2, biomas: ['savana'] },
    'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
};

function verificarRecintos(tipo, quantidade) {
    // Validação do tipo de animal
    if (!animais.hasOwnProperty(tipo)) {
        return { erro: 'Animal inválido' };
    }

    const animalInfo = animais[tipo];
    
    // Validação da quantidade de animais
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
    }

    const recintosViaveis = [];

    for (const recinto of recintos) {
        const { numero, bioma, capacidade, temRio, animais } = recinto;
        const biomasAdequados = animalInfo.biomas;

        // Verificar se o bioma é adequado
        if (!biomasAdequados.includes(bioma)) {
            continue;
        }

        // Verificar se o tipo de animal é hipopótamo e se o recinto tem rio
        if (tipo === 'HIPOPOTAMO' && !temRio) {
            continue;
        }

        // Verificar o espaço necessário
        const espacoNecessario = animais.length === 0 || animais.every(a => a.especie === tipo) 
            ? quantidade * animalInfo.tamanho 
            : quantidade * animalInfo.tamanho + animalInfo.tamanho;

        // Calcular o espaço ocupado
        const espacoOcupado = animais.reduce((total, a) => total + (animais.find(a1 => a1.especie === a.especie)?.quantidade || 0) * animalInfo.tamanho, 0);
        const espacoLivre = capacidade - espacoOcupado;

        // Verificar se há espaço suficiente
        if (espacoLivre >= espacoNecessario) {
            recintosViaveis.push({
                numero: numero,
                espacoLivre: espacoLivre - (quantidade * animalInfo.tamanho),
                espacoTotal: capacidade
            });
        }
    }

    // Se não houver recintos viáveis
    if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
    }

    // Ordenar os recintos viáveis pelo número
    recintosViaveis.sort((a, b) => a.numero - b.numero);

    // Formatando a lista de recintos viáveis
    const listaRecintos = recintosViaveis.map(r => 
        `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`
    );

    return { recintosViaveis: listaRecintos };
}

// Exemplos de uso
console.log(verificarRecintos('MACACO', 5));  // Verifica recintos para 5 macacos
console.log(verificarRecintos('HIPOPOTAMO', 3));  // Verifica recintos para 3 hipopótamos
console.log(verificarRecintos('LEOPARDO', 1));  // Verifica recintos para 1 leopardo
console.log(verificarRecintos('CROCODILO', 2));  // Verifica recintos para 2 crocodilos
console.log(verificarRecintos('LEAO', 10));  // Verifica recintos para 10 leões (não há recinto com espaço suficiente)

