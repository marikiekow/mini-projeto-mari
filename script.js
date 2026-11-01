let rascunho = {
    nome: 'Herói',
    classe: 'guerreiro',
    atributos: {
    forca: 5,
    agilidade: 5,
    inteligencia: 5,
    resistencia: 5
    }
};

let fichasSalvas = [] 
let bonusAplicado = false

function criarDistribuidor(total) {
    let pontos = total
    return {
        gastar: function(n) {
            if (pontos >= n) {
                pontos = pontos - n;
                return true
            }
            return false
    },

    devolver:function(n) {
        pontos = pontos + n
    },

    verPontos: function() {
        return pontos
    }
  }
}

let pontos = criarDistribuidor(10)

function aplicarBonus(ficha, funcaoBonus) {
    funcaoBonus(ficha) 
}

function BonusGuerreiro (f) {
    f.atributos.forca += 3
    f.atributos.resistencia += 2
}

function BonusMago (f) {
    f.atributos.inteligencia += 4
    f.atributos.agilidade += 1
}

function BonusLadino (f) {
    f.atributos.agilidade += 3
    f.atributos.inteligencia += 2
}

let bonusPorClasse = {
    guerreiro: BonusGuerreiro,
    mago: BonusMago,
    ladino: BonusLadino
}

document.getElementById('btn-bonus').addEventListener('click', function() {

    if (bonusAplicado) {
        return;
    }

    rascunho.classe = document.getElementById('classe').value;

    aplicarBonus(rascunho, bonusPorClasse[rascunho.classe]);

    bonusAplicado = true;

    this.disabled = true;
    document.getElementById('classe').disabled = true;

    atualizar();

});

function salvarFicha() {
    let copia = {
        nome: rascunho.nome,
        classe: rascunho.classe,
        atributos:{}
    }
for (let attr in rascunho.atributos) {
    copia.atributos[attr] = rascunho.atributos[attr];
}

fichasSalvas.push(copia);

let cont = document.getElementById('fichas')
cont.innerHTML = '<h2>Fichas salvas</h2>';

for (let f of fichasSalvas) {
    let div = document.createElement('div')
    div.className = 'ficha'

    let h3 = document.createElement('h3');
    h3.textContent = f.nome + ' - ' + f.classe

    let p = document.createElement('p')
    let a = f.atributos
    p.textContent = 'Força: ' + a.forca + ', Agilidade: ' + a.agilidade + ', Inteligência: ' + a.inteligencia + ', Resistência: ' + a.resistencia;

    div.appendChild(h3)
    div.appendChild(p)
    cont.appendChild(div)
}}

function atualizar () {
    
    document.getElementById('pontos').textContent = pontos.verPontos();
    let a = rascunho.atributos;

    document.getElementById('v-forca').textContent = a.forca;
    document.getElementById('v-agilidade').textContent = a.agilidade;
    document.getElementById('v-inteligencia').textContent = a.inteligencia;
    document.getElementById('v-resistencia').textContent = a.resistencia;
}


function criarBttnAttr(attr, delta) {
    return function() {
    if (delta > 0 && !pontos.gastar(1)) { return}
    if (delta < 0 && rascunho.atributos[attr] <= 1) { return}
    if (delta < 0) { pontos.devolver(1) }
    rascunho.atributos[attr] = rascunho.atributos[attr] + delta
    atualizar()
} }

let attrs = ['forca', 'agilidade', 'inteligencia', 'resistencia'];
for (let i in attrs) {
    document.getElementById('btn-' + attrs[i] + '-mais').addEventListener('click', criarBttnAttr(attrs[i], 1))
    document.getElementById('btn-' + attrs[i] + '-menos').addEventListener('click', criarBttnAttr(attrs[i], -1))
}

    document.getElementById('btn-salvar').addEventListener('click', function(){
    if (!bonusAplicado) {return}
    document.getElementById('classe').disabled = true
    rascunho.nome = document.getElementById('nome').value || 'Herói';
    salvarFicha();
    novaFicha();
})

function novaFicha() {
    rascunho = {
        nome: 'Herói',
        classe: 'guerreiro',
        atributos: {
            forca: 5,
            agilidade: 5,
            inteligencia: 5,
            resistencia: 5 }
        }
        
    pontos = criarDistribuidor(10);
    bonusAplicado = false;

    document.getElementById('btn-salvar').disabled = false;
    document.getElementById('btn-bonus').disabled = false;
    document.getElementById('classe').disabled = false;

    document.getElementById('classe').value = 'guerreiro';
    document.getElementById('nome').value = '';
    atualizar();
}

    atualizar();