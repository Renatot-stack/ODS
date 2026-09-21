        // Controlador de Rotas SPA nativo
        function navegar(idPagina) {
            const paginas = document.querySelectorAll('.page');
            paginas.forEach(p => p.classList.remove('active'));

            const menus = document.querySelectorAll('nav ul li a');
            menus.forEach(m => m.classList.remove('active-menu'));

            document.getElementById('page-' + idPagina).classList.add('active');
            
            const menuAtivo = document.getElementById('menu-' + idPagina);
            if(menuAtivo) menuAtivo.classList.add('active-menu');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Injeção de Dados de Oportunidades
        function verVaga(titulo, empresa, local, salario) {
            document.getElementById('detalhe-vaga-titulo').innerText = titulo;
            document.getElementById('detalhe-vaga-empresa').innerHTML = `<i class="fa-building fa-solid"></i> Instituição de Origem: ` + empresa;
            document.getElementById('detalhe-vaga-local').innerHTML = `<i class="fa-location-dot fa-solid"></i> <strong>Ponto de Lotação:</strong> ` + local;
            document.getElementById('detalhe-vaga-salario').innerHTML = `<i class="fa-money-bill-wave fa-solid"></i> <strong>Remuneração Prevista:</strong> ` + salario;
            navegar('vaga-detalhe');
        }

        // Injeção de Dados de Cursos
        function verCurso(titulo, escola) {
            document.getElementById('player-curso-titulo').innerText = titulo;
            document.getElementById('player-curso-escola').innerText = "Certificado validado por: " + escola;
            navegar('curso-player');
        }

        // Algoritmo de Atualização de UI Reativa para Currículos
        function atualizarCV() {
            document.getElementById('cv-nome').innerText = document.getElementById('in-nome').value.toUpperCase() || "SEU NOME COMPLETO";
            document.getElementById('cv-email').innerText = document.getElementById('in-email').value || "contato@seuprovedor.com";
            document.getElementById('cv-tel').innerText = document.getElementById('in-tel').value || "(00) 00000-0000";
            document.getElementById('cv-escola').innerText = document.getElementById('in-escola').value || "Informação acadêmica em aberto.";
            document.getElementById('cv-hab').innerText = document.getElementById('in-hab').value || "Indique suas competências comportamentais e técnicas no painel lateral.";
        }