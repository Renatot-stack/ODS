     /* =========================================================
    ESTADO DA APLICAÇÃO
    ========================================================= */

    const estado = {

        tema:
    localStorage.getItem('startjovem-tema') || 'light',

    favoritos:
    JSON.parse(
    localStorage.getItem('startjovem-favoritos') || '[]'
    ),

    candidaturas:
    Number(
    localStorage.getItem('startjovem-candidaturas') || 3
    )

        };

    /* =========================================================
       NAVEGAÇÃO SPA
    ========================================================= */

    function navegar(idPagina) {

            const paginas =
    document.querySelectorAll('.page');

    const menus =
    document.querySelectorAll('nav ul li a');

            paginas.forEach(pagina => {

        pagina.classList.remove('active');

            });

            menus.forEach(menu => {

        menu.classList.remove('active-menu');

            });

    const pagina =
    document.getElementById(
    'page-' + idPagina
    );

    if (!pagina) {
                return;
            }

    pagina.classList.add('active');

    const menu =
    document.getElementById(
    'menu-' + idPagina
    );

    if (menu) {
        menu.classList.add('active-menu');
            }

    window.scrollTo({
        top: 0,
    behavior: 'smooth'
            });

        }

    /* =========================================================
       VAGA
    ========================================================= */

    function verVaga(
    titulo,
    empresa,
    local,
    salario
    ) {

        document.getElementById(
            'detalhe-vaga-titulo'
        ).innerText = titulo;

    document.getElementById(
    'detalhe-vaga-empresa'
    ).innerHTML =
    `<i class="fa-solid fa-building"></i>
    ${empresa}`;

    document.getElementById(
    'detalhe-vaga-local'
    ).innerText = local;

    document.getElementById(
    'detalhe-vaga-salario'
    ).innerText = salario;

    navegar('vaga-detalhe');

        }

    /* =========================================================
       CANDIDATURA
    ========================================================= */

    function candidatar() {

        estado.candidaturas++;

    localStorage.setItem(
    'startjovem-candidaturas',
    estado.candidaturas
    );

    document.getElementById(
    'stat-candidaturas'
    ).innerText =
    estado.candidaturas;

    mostrarToast(
    'Candidatura enviada com sucesso!'
    );

            setTimeout(() => {

        navegar('candidaturas');

            }, 700);

        }

    /* =========================================================
       CURSO
    ========================================================= */

    function verCurso(
    titulo,
    escola
    ) {

        document.getElementById(
            'player-curso-titulo'
        ).innerText = titulo;

    document.getElementById(
    'player-curso-escola'
    ).innerText =
    'Certificado validado por: ' +
    escola;

    navegar('curso-player');

        }

    function aulaConcluida() {

            const barra =
    document.getElementById(
    'player-progress'
    );

    barra.style.width = '80%';

    mostrarToast(
    'Aula concluída! Seu progresso foi atualizado.'
    );

        }

    /* =========================================================
       FAVORITOS
    ========================================================= */

    function favoritar(botao) {

        botao.classList.toggle('active');

    const icone =
    botao.querySelector('i');

    if (botao.classList.contains('active')) {

        icone.className =
        'fa-solid fa-heart';

    mostrarToast(
    'Vaga adicionada aos favoritos.'
    );

            } else {

        icone.className =
        'fa-regular fa-heart';

    mostrarToast(
    'Vaga removida dos favoritos.'
    );

            }

        }

    /* =========================================================
       FILTRO DE VAGAS
    ========================================================= */

    function filtrarVagas() {

            const busca =
    document
    .getElementById('busca-vaga')
    .value
    .toLowerCase()
    .trim();

    const tipo =
    document
    .getElementById('filtro-tipo')
    .value;

    const local =
    document
    .getElementById('filtro-local')
    .value;

    const cards =
    document.querySelectorAll(
    '#lista-vagas .vaga-card'
    );

    let quantidade = 0;

            cards.forEach(card => {

                const texto =
    card.dataset.search
    .toLowerCase();

    const tipoCard =
    card.dataset.tipo;

    const localCard =
    card.dataset.local;

    const encontrouBusca =
    !busca ||
    texto.includes(busca);

    const encontrouTipo =
    !tipo ||
    tipoCard === tipo;

    const encontrouLocal =
    !local ||
    localCard === local;

    const mostrar =
    encontrouBusca &&
    encontrouTipo &&
    encontrouLocal;

    card.style.display =
    mostrar ? 'flex' : 'none';

    if (mostrar) {
        quantidade++;
                }

            });

    document.getElementById(
    'contador-vagas'
    ).innerText =
    `${quantidade} oportunidade${quantidade !== 1 ? 's' : ''}`;

        }

    function limparFiltros() {

        document.getElementById(
            'busca-vaga'
        ).value = '';

    document.getElementById(
    'filtro-tipo'
    ).value = '';

    document.getElementById(
    'filtro-local'
    ).value = '';

    filtrarVagas();

        }

    /* =========================================================
       TEMA
    ========================================================= */

    function aplicarTema() {

            if (estado.tema === 'dark') {

        document.body.classList.add('dark');

    document.getElementById(
    'theme-icon'
    ).className =
    'fa-solid fa-sun';

            } else {

        document.body.classList.remove('dark');

    document.getElementById(
    'theme-icon'
    ).className =
    'fa-solid fa-moon';

            }

        }

    function alternarTema() {

        estado.tema =
        estado.tema === 'dark'
            ? 'light'
            : 'dark';

    localStorage.setItem(
    'startjovem-tema',
    estado.tema
    );

    aplicarTema();

        }

    /* =========================================================
       NOTIFICAÇÕES
    ========================================================= */

    function toggleNotificacoes() {

        document
            .getElementById(
                'notification-panel'
            )
            .classList.toggle('show');

        }

    /* =========================================================
       CURRÍCULO REATIVO
    ========================================================= */

    function atualizarCV() {

            const nome =
    document.getElementById(
    'in-nome'
    ).value;

    const email =
    document.getElementById(
    'in-email'
    ).value;

    const tel =
    document.getElementById(
    'in-tel'
    ).value;

    const cidade =
    document.getElementById(
    'in-cidade'
    ).value;

    const escola =
    document.getElementById(
    'in-escola'
    ).value;

    const objetivo =
    document.getElementById(
    'in-objetivo'
    ).value;

    const habilidades =
    document.getElementById(
    'in-hab'
    ).value;

    document.getElementById(
    'cv-nome'
    ).innerText =
    nome
    ? nome.toUpperCase()
    : 'SEU NOME COMPLETO';

    document.getElementById(
    'cv-email'
    ).innerText =
    email ||
    'contato@seuprovedor.com';

    document.getElementById(
    'cv-tel'
    ).innerText =
    tel ||
    '(00) 00000-0000';

    document.getElementById(
    'cv-cidade'
    ).innerText =
    cidade ||
    'Sua cidade';

    document.getElementById(
    'cv-escola'
    ).innerText =
    escola ||
    'Informação acadêmica em aberto.';

    document.getElementById(
    'cv-objetivo'
    ).innerText =
    objetivo ||
    'Insira seu objetivo profissional no painel ao lado.';

    document.getElementById(
    'cv-hab'
    ).innerText =
    habilidades ||
    'Indique suas competências técnicas e comportamentais.';

        }

    /* =========================================================
       TOAST
    ========================================================= */

    function mostrarToast(mensagem) {

            const container =
    document.getElementById(
    'toast-container'
    );

    const toast =
    document.createElement('div');

    toast.className = 'toast';

    toast.innerHTML = `

    <i
        class="fa-solid fa-circle-check"
        style="color:var(--green);"
    ></i>

    <span>${mensagem}</span>

    `;

    container.appendChild(toast);

            setTimeout(() => {

        toast.style.opacity = '0';

    toast.style.transform =
    'translateX(30px)';

                setTimeout(() => {

        toast.remove();

                }, 250);

            }, 3000);

        }

    /* =========================================================
       INICIALIZAÇÃO
    ========================================================= */

    document.addEventListener(
    'DOMContentLoaded',
            () => {

        aplicarTema();

    document.getElementById(
    'stat-candidaturas'
    ).innerText =
    estado.candidaturas;

    atualizarCV();

            }
    );