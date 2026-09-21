const hoje = new Date().toISOString().split("T")[0];

let appointments = JSON.parse(
    localStorage.getItem("petcare_appointments")
) || [
        {
            id: 1,
            date: hoje,
            time: "08:00",
            client: "João Silva",
            phone: "81999990000",
            pet: "Thor",
            bath: true,
            grooming: true,
            groomType: "Tosa completa",
            status: "Agendado",
            notes: ""
        },
        {
            id: 2,
            date: hoje,
            time: "09:30",
            client: "Ana Paula",
            phone: "81988880000",
            pet: "Mel",
            bath: true,
            grooming: false,
            groomType: "Sem tosa",
            status: "Em atendimento",
            notes: ""
        },
        {
            id: 3,
            date: hoje,
            time: "11:00",
            client: "Carlos Souza",
            phone: "81977770000",
            pet: "Luna",
            bath: false,
            grooming: true,
            groomType: "Tosa higiênica",
            status: "Agendado",
            notes: ""
        }
    ];


let clients = JSON.parse(
    localStorage.getItem("petcare_clients")
) || [
        {
            id: 1,
            name: "João Silva",
            phone: "(81) 99999-0000",
            pet: "Thor",
            animal: "Cachorro",
            notes: ""
        },
        {
            id: 2,
            name: "Ana Paula",
            phone: "(81) 98888-0000",
            pet: "Mel",
            animal: "Cachorro",
            notes: ""
        },
        {
            id: 3,
            name: "Carlos Souza",
            phone: "(81) 97777-0000",
            pet: "Luna",
            animal: "Gato",
            notes: ""
        }
    ];


let products = JSON.parse(
    localStorage.getItem("petcare_products")
) || [
        {
            id: 1,
            name: "Shampoo Pet",
            price: 35,
            quantity: 18
        },
        {
            id: 2,
            name: "Condicionador Pet",
            price: 29.90,
            quantity: 4
        },
        {
            id: 3,
            name: "Perfume Pet",
            price: 22,
            quantity: 0
        },
        {
            id: 4,
            name: "Hidratante",
            price: 39.90,
            quantity: 8
        }
    ];


let sales = JSON.parse(
    localStorage.getItem("petcare_sales")
) || [
        {
            id: 1,
            date: hoje,
            client: "João Silva",
            phone: "(81) 99999-0000",
            pet: "Thor",
            service: "Banho + Tosa",
            value: 75
        },
        {
            id: 2,
            date: hoje,
            client: "Ana Paula",
            phone: "(81) 98888-0000",
            pet: "Mel",
            service: "Banho",
            value: 45
        }
    ];


/* ================= UTILIDADES ================= */

function saveData() {

    localStorage.setItem(
        "petcare_appointments",
        JSON.stringify(appointments)
    );

    localStorage.setItem(
        "petcare_clients",
        JSON.stringify(clients)
    );

    localStorage.setItem(
        "petcare_products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "petcare_sales",
        JSON.stringify(sales)
    );
}


function money(value) {

    return Number(value || 0).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


function showToast(message) {

    const toast = document.getElementById("toast");

    toast.querySelector("p").textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* ================= NAVEGAÇÃO ================= */

const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");

const pageTitles = {
    dashboard: [
        "Dashboard",
        "Visão geral do seu Pet Shop"
    ],

    agendamentos: [
        "Agendamentos",
        "Organize os horários de banho e tosa"
    ],

    clientes: [
        "Clientes & Pets",
        "Cadastre e consulte seus clientes"
    ],

    financeiro: [
        "Financeiro",
        "Acompanhe o movimento financeiro"
    ],

    estoque: [
        "Estoque",
        "Controle seus produtos"
    ],

    vendas: [
        "Vendas",
        "Histórico de vendas e serviços"
    ]
};


function openPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    menuItems.forEach(item => {
        item.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active-page");
    }

    const button = document.querySelector(
        `.menu-item[data-page="${pageId}"]`
    );

    if (button) {
        button.classList.add("active");
    }

    document.getElementById("pageTitle").textContent =
        pageTitles[pageId][0];

    document.getElementById("pageSubtitle").textContent =
        pageTitles[pageId][1];

    if (pageId === "dashboard") updateDashboard();
    if (pageId === "agendamentos") renderAppointments();
    if (pageId === "clientes") renderClients();
    if (pageId === "financeiro") renderFinance();
    if (pageId === "estoque") renderStock();
    if (pageId === "vendas") renderSales();
}


menuItems.forEach(item => {

    item.addEventListener("click", () => {

        openPage(item.dataset.page);

    });

});


document.querySelectorAll("[data-page-link]").forEach(button => {

    button.addEventListener("click", () => {

        openPage(button.dataset.pageLink);

    });

});


/* ================= MODAIS ================= */

function openModal(id) {

    document.getElementById(id).classList.add("show");

}


function closeModals() {

    document.querySelectorAll(".modal").forEach(modal => {
        modal.classList.remove("show");
    });

}


document.querySelectorAll(".close-modal").forEach(button => {

    button.addEventListener("click", closeModals);

});


document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModals();
    }

});


/* ================= AGENDAMENTO ================= */

document.getElementById("quickAppointment")
    .addEventListener("click", () => openAppointmentModal());


document.getElementById("newAppointment")
    .addEventListener("click", () => openAppointmentModal());


function openAppointmentModal() {

    document.getElementById("appointmentForm").reset();

    document.getElementById("formAppointmentDate").value =
        document.getElementById("appointmentDate").value ||
        hoje;

    openModal("appointmentModal");
}


document.getElementById("appointmentForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const bath =
            document.getElementById("appointmentBath").checked;

        const grooming =
            document.getElementById("appointmentGrooming").checked;

        if (!bath && !grooming) {

            showToast("Selecione pelo menos um serviço.");

            return;
        }


        const appointment = {

            id: Date.now(),

            date:
                document.getElementById("formAppointmentDate").value,

            time:
                document.getElementById("appointmentTime").value,

            client:
                document.getElementById("appointmentClient").value,

            phone:
                document.getElementById("appointmentPhone").value,

            pet:
                document.getElementById("appointmentPet").value,

            bath,

            grooming,

            groomType:
                document.getElementById("appointmentGroom").value,

            status: "Agendado",

            notes:
                document.getElementById("appointmentNotes").value

        };


        appointments.push(appointment);

        saveData();

        closeModals();

        renderAppointments();

        updateDashboard();

        showToast("Agendamento criado com sucesso!");

    });


/* ================= RENDER AGENDA ================= */

let currentFilter = "all";


function renderAppointments() {

    const tbody =
        document.getElementById("appointmentsTable");

    const search =
        document.getElementById("searchAppointment")
            .value
            .toLowerCase();

    const date =
        document.getElementById("appointmentDate").value ||
        hoje;


    let data = appointments.filter(item => {

        const matchesDate =
            item.date === date;

        const matchesSearch =
            item.client.toLowerCase().includes(search) ||
            item.pet.toLowerCase().includes(search);

        const matchesFilter =
            currentFilter === "all" ||
            item.status === currentFilter;

        return matchesDate &&
            matchesSearch &&
            matchesFilter;

    });


    data.sort((a, b) =>
        a.time.localeCompare(b.time)
    );


    if (!data.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Nenhum agendamento encontrado.
                </td>
            </tr>
        `;

        return;
    }


    tbody.innerHTML = data.map(item => {

        const services = [];

        if (item.bath) {
            services.push("🛁 Banho");
        }

        if (item.grooming) {
            services.push("✂️ Tosa");
        }


        let statusClass = "agendado";

        if (item.status === "Em atendimento") {
            statusClass = "atendimento";
        }

        if (item.status === "Finalizado") {
            statusClass = "finalizado";
        }

        if (item.status === "Cancelado") {
            statusClass = "cancelado";
        }


        return `
            <tr>

                <td>
                    <strong>${escapeHTML(item.time)}</strong>
                </td>

                <td>
                    <strong>${escapeHTML(item.client)}</strong>
                </td>

                <td>
                    🐾 ${escapeHTML(item.pet)}
                </td>

                <td>
                    <div class="service-tags">
                        ${services.map(service =>
            `<span class="service-tag">${service}</span>`
        ).join("")}
                    </div>
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${escapeHTML(item.status)}
                    </span>
                </td>

                <td>

                    <div class="table-actions">

                        <button
                            class="table-action"
                            title="Alterar status"
                            onclick="changeStatus(${item.id})">
                            🔄
                        </button>

                        <button
                            class="table-action"
                            title="WhatsApp"
                            onclick="openWhatsApp('${item.phone}')">
                            💬
                        </button>

                        <button
                            class="table-action"
                            title="Cancelar"
                            onclick="cancelAppointment(${item.id})">
                            ✕
                        </button>

                    </div>

                </td>

            </tr>
        `;

    }).join("");

}


document.getElementById("searchAppointment")
    .addEventListener("input", renderAppointments);


document.getElementById("appointmentDate")
    .addEventListener("change", renderAppointments);


document.getElementById("appointmentDate").value = hoje;


/* ================= FILTROS ================= */

document.querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            currentFilter = button.dataset.filter;

            renderAppointments();

        });

    });


function changeStatus(id) {

    const appointment =
        appointments.find(item => item.id === id);

    if (!appointment) return;


    const statuses = [
        "Agendado",
        "Em atendimento",
        "Finalizado"
    ];

    const current =
        statuses.indexOf(appointment.status);

    appointment.status =
        statuses[(current + 1) % statuses.length];


    if (appointment.status === "Finalizado") {

        const existingSale =
            sales.find(
                sale =>
                    sale.appointmentId === appointment.id
            );

        if (!existingSale) {

            let value = 0;

            if (appointment.bath) {
                value += 45;
            }

            if (appointment.grooming) {
                value += 30;
            }

            sales.push({

                id: Date.now(),

                appointmentId: appointment.id,

                date: appointment.date,

                client: appointment.client,

                phone: appointment.phone,

                pet: appointment.pet,

                service:
                    `${appointment.bath ? "Banho" : ""}` +
                    `${appointment.bath && appointment.grooming ? " + " : ""}` +
                    `${appointment.grooming ? "Tosa" : ""}`,

                value

            });

        }

    }


    saveData();

    renderAppointments();

    updateDashboard();

    showToast(
        `Status: ${appointment.status}`
    );

}


function cancelAppointment(id) {

    const appointment =
        appointments.find(item => item.id === id);

    if (!appointment) return;


    if (!confirm("Cancelar este agendamento?")) {
        return;
    }


    appointment.status = "Cancelado";

    saveData();

    renderAppointments();

    updateDashboard();

    showToast("Agendamento cancelado.");

}


/* ================= WHATSAPP ================= */

function openWhatsApp(phone) {

    const clean =
        String(phone).replace(/\D/g, "");

    if (!clean) return;

    window.open(
        `https://wa.me/55${clean}`,
        "_blank"
    );

}


/* ================= CLIENTES ================= */

document.getElementById("newClient")
    .addEventListener("click", () => {

        document.getElementById("clientForm").reset();

        openModal("clientModal");

    });


document.getElementById("clientForm")
    .addEventListener("submit", event => {

        event.preventDefault();


        const client = {

            id: Date.now(),

            name:
                document.getElementById("clientName").value,

            phone:
                document.getElementById("clientPhone").value,

            pet:
                document.getElementById("clientPet").value,

            animal:
                document.getElementById("animalType").value,

            notes:
                document.getElementById("clientNotes").value

        };


        clients.push(client);

        saveData();

        closeModals();

        renderClients();

        updateDashboard();

        showToast("Cliente cadastrado!");

    });


function renderClients() {

    const container =
        document.getElementById("clientsGrid");

    const search =
        document.getElementById("searchClient")
            .value
            .toLowerCase();


    const data = clients.filter(client =>

        client.name.toLowerCase().includes(search) ||
        client.pet.toLowerCase().includes(search)

    );


    if (!data.length) {

        container.innerHTML = `
            <div class="panel">
                Nenhum cliente encontrado.
            </div>
        `;

        return;
    }


    container.innerHTML = data.map(client => `

        <div class="client-card">

            <div class="client-head">

                <div class="client-avatar">
                    ${client.animal === "Gato" ? "🐱" : "🐶"}
                </div>

                <div>
                    <strong>
                        ${escapeHTML(client.name)}
                    </strong>

                    <small>
                        ${escapeHTML(client.animal)}
                    </small>
                </div>

            </div>


            <div class="pet-box">

                <strong>
                    🐾 ${escapeHTML(client.pet)}
                </strong>

                <span>
                    Cliente cadastrado no sistema
                </span>

            </div>


            <div class="client-contact">
                📱 ${escapeHTML(client.phone)}
            </div>

        </div>

    `).join("");

}


document.getElementById("searchClient")
    .addEventListener("input", renderClients);


/* ================= PRODUTOS ================= */

document.getElementById("newProduct")
    .addEventListener("click", () => {

        document.getElementById("productForm").reset();

        openModal("productModal");

    });


document.getElementById("productForm")
    .addEventListener("submit", event => {

        event.preventDefault();


        const product = {

            id: Date.now(),

            name:
                document.getElementById("productName").value,

            price:
                Number(
                    document.getElementById("productPrice").value
                ),

            quantity:
                Number(
                    document.getElementById("productQuantity").value
                )

        };


        products.push(product);

        saveData();

        closeModals();

        renderStock();

        updateDashboard();

        showToast("Produto cadastrado!");

    });


function renderStock() {

    const tbody =
        document.getElementById("stockTable");

    const search =
        document.getElementById("searchProduct")
            .value
            .toLowerCase();


    const data = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );


    tbody.innerHTML = data.map(product => {

        let status = "Normal";
        let statusClass = "normal";

        if (product.quantity <= 5 && product.quantity > 0) {

            status = "Estoque baixo";
            statusClass = "low";

        }

        if (product.quantity === 0) {

            status = "Esgotado";
            statusClass = "empty";

        }


        return `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>
                </td>

                <td>
                    ${money(product.price)}
                </td>

                <td>
                    ${product.quantity}
                </td>

                <td>
                    <span class="stock-status ${statusClass}">
                        ${status}
                    </span>
                </td>

                <td>

                    <div class="table-actions">

                        <button
                            class="table-action"
                            title="Alterar quantidade"
                            onclick="changeStock(${product.id})">
                            ✏️
                        </button>

                    </div>

                </td>

            </tr>

        `;

    }).join("");


    const low =
        products.filter(
            product => product.quantity <= 5
        ).length;


    document.getElementById("stockAlertText").textContent =
        `${low} produtos precisam de atenção`;

}


document.getElementById("searchProduct")
    .addEventListener("input", renderStock);


function changeStock(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;


    const quantity = prompt(
        `Nova quantidade para ${product.name}:`,
        product.quantity
    );


    if (quantity === null) return;


    const value = Number(quantity);


    if (Number.isNaN(value) || value < 0) {

        showToast("Quantidade inválida.");

        return;
    }


    product.quantity = value;

    saveData();

    renderStock();

    updateDashboard();

    showToast("Estoque atualizado!");

}


/* ================= VENDAS ================= */

document.getElementById("newSale")
    .addEventListener("click", () => {

        const client =
            prompt("Nome do cliente:");

        if (!client) return;


        const pet =
            prompt("Nome do pet:");

        if (!pet) return;


        const service =
            prompt(
                "Serviço realizado:",
                "Banho + Tosa"
            );

        if (!service) return;


        const value =
            Number(
                prompt("Valor da venda:", "75")
            );


        if (!value) return;


        sales.push({

            id: Date.now(),

            date: hoje,

            client,

            phone: "",

            pet,

            service,

            value

        });


        saveData();

        renderSales();

        renderFinance();

        updateDashboard();

        showToast("Venda registrada!");

    });


function renderSales() {

    const tbody =
        document.getElementById("salesTable");

    const search =
        document.getElementById("searchSale")
            .value
            .toLowerCase();


    const data = sales.filter(sale =>

        sale.client.toLowerCase().includes(search) ||
        sale.pet.toLowerCase().includes(search) ||
        sale.service.toLowerCase().includes(search)

    );


    tbody.innerHTML = data.slice().reverse().map(sale => `

        <tr>

            <td>
                ${formatDate(sale.date)}
            </td>

            <td>
                <strong>
                    ${escapeHTML(sale.client)}
                </strong>
            </td>

            <td>
                ${escapeHTML(sale.phone || "-")}
            </td>

            <td>
                🐾 ${escapeHTML(sale.pet)}
            </td>

            <td>
                ${escapeHTML(sale.service)}
            </td>

            <td>
                <strong>
                    ${money(sale.value)}
                </strong>
            </td>

        </tr>

    `).join("");

}


document.getElementById("searchSale")
    .addEventListener("input", renderSales);


/* ================= FINANCEIRO ================= */

function renderFinance() {

    const tbody =
        document.getElementById("financeTable");


    const todaySales =
        sales.filter(sale => sale.date === hoje);


    const revenue =
        todaySales.reduce(
            (sum, sale) => sum + Number(sale.value || 0),
            0
        );


    const services =
        todaySales.length;


    const ticket =
        services ? revenue / services : 0;


    document.getElementById("financeRevenue").textContent =
        money(revenue);

    document.getElementById("financeServices").textContent =
        services;

    document.getElementById("financeTicket").textContent =
        money(ticket);


    tbody.innerHTML =
        sales.slice().reverse().map(sale => `

            <tr>

                <td>${formatDate(sale.date)}</td>

                <td>
                    ${escapeHTML(sale.client)}
                </td>

                <td>
                    🐾 ${escapeHTML(sale.pet)}
                </td>

                <td>
                    ${escapeHTML(sale.service)}
                </td>

                <td>
                    <strong>${money(sale.value)}</strong>
                </td>

            </tr>

        `).join("");

}


document.getElementById("exportSales")
    .addEventListener("click", () => {

        const rows = [
            [
                "Data",
                "Cliente",
                "Pet",
                "Serviço",
                "Valor"
            ]
        ];


        sales.forEach(sale => {

            rows.push([
                sale.date,
                sale.client,
                sale.pet,
                sale.service,
                sale.value
            ]);

        });


        const csv =
            rows
                .map(row =>
                    row.map(value =>
                        `"${String(value).replaceAll('"', '""')}"`
                    ).join(";")
                )
                .join("\n");


        const blob =
            new Blob(
                [csv],
                { type: "text/csv;charset=utf-8;" }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "petcare-vendas.csv";

        link.click();

        URL.revokeObjectURL(url);

        showToast("Arquivo exportado!");

    });


/* ================= DASHBOARD ================= */

function updateDashboard() {

    const todaySales =
        sales.filter(sale => sale.date === hoje);


    const todayRevenue =
        todaySales.reduce(
            (sum, sale) => sum + Number(sale.value || 0),
            0
        );


    const currentMonth =
        hoje.slice(0, 7);


    const monthRevenue =
        sales
            .filter(sale =>
                sale.date.startsWith(currentMonth)
            )
            .reduce(
                (sum, sale) =>
                    sum + Number(sale.value || 0),
                0
            );


    const currentYear =
        hoje.slice(0, 4);


    const yearRevenue =
        sales
            .filter(sale =>
                sale.date.startsWith(currentYear)
            )
            .reduce(
                (sum, sale) =>
                    sum + Number(sale.value || 0),
                0
            );


    const todayAppointments =
        appointments.filter(
            item =>
                item.date === hoje &&
                item.status !== "Cancelado"
        );


    document.getElementById("dashToday").textContent =
        money(todayRevenue);

    document.getElementById("dashMonth").textContent =
        money(monthRevenue);

    document.getElementById("dashYear").textContent =
        money(yearRevenue);

    document.getElementById("dashAppointments").textContent =
        todayAppointments.length;


    document.getElementById("totalBaths").textContent =
        todayAppointments.filter(item => item.bath).length;


    document.getElementById("totalGrooms").textContent =
        todayAppointments.filter(item => item.grooming).length;


    document.getElementById("totalPets").textContent =
        clients.length;


    document.getElementById("lowStock").textContent =
        products.filter(
            product => product.quantity <= 5
        ).length;


    renderDashboardAppointments();

    updateChart();

}


function renderDashboardAppointments() {

    const container =
        document.getElementById("dashboardAppointments");


    const data =
        appointments
            .filter(
                item =>
                    item.date === hoje &&
                    item.status !== "Cancelado"
            )
            .sort(
                (a, b) =>
                    a.time.localeCompare(b.time)
            )
            .slice(0, 5);


    if (!data.length) {

        container.innerHTML = `
            <p style="color:#78837f;font-size:11px">
                Nenhum atendimento para hoje.
            </p>
        `;

        return;
    }


    container.innerHTML = data.map(item => `

        <div class="mini-appointment">

            <div class="mini-time">
                ${escapeHTML(item.time)}
            </div>

            <div class="mini-pet">
                🐾
            </div>

            <div class="mini-info">

                <strong>
                    ${escapeHTML(item.pet)}
                </strong>

                <small>
                    ${escapeHTML(item.client)}
                </small>

            </div>

            <span class="status ${item.status === "Finalizado"
            ? "finalizado"
            : item.status === "Em atendimento"
                ? "atendimento"
                : "agendado"
        }">
                ${escapeHTML(item.status)}
            </span>

        </div>

    `).join("");

}


/* ================= GRÁFICO ================= */

let financeChart;


function updateChart() {

    const canvas =
        document.getElementById("financeChart");

    if (!canvas) return;


    const labels = [];

    const values = [];


    for (let i = 6; i >= 0; i--) {

        const date =
            new Date();

        date.setDate(
            date.getDate() - i
        );


        const dateString =
            date.toISOString().split("T")[0];


        labels.push(
            date.toLocaleDateString(
                "pt-BR",
                {
                    day: "2-digit",
                    month: "2-digit"
                }
            )
        );


        const total =
            sales
                .filter(
                    sale =>
                        sale.date === dateString
                )
                .reduce(
                    (sum, sale) =>
                        sum + Number(sale.value || 0),
                    0
                );


        values.push(total);

    }


    if (financeChart) {
        financeChart.destroy();
    }


    financeChart =
        new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels,

                    datasets: [

                        {
                            label: "Faturamento",

                            data: values,

                            borderWidth: 3,

                            tension: .4,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            ticks: {

                                callback: value =>
                                    "R$ " + value

                            }

                        }

                    }

                }

            }
        );

}


/* ================= DATA ================= */

function formatDate(date) {

    if (!date) return "-";

    const parts =
        date.split("-");

    return `${parts[2]}/${parts[1]}/${parts[0]}`;

}


/* ================= INICIALIZAÇÃO ================= */

function initialize() {

    renderAppointments();

    renderClients();

    renderStock();

    renderSales();

    renderFinance();

    updateDashboard();

}


initialize();

/* =====================================================
   LOGIN E CONTROLE DE ACESSO
===================================================== */


/*
    USUÁRIOS DE TESTE

    CHEFE
    usuário: chefe
    senha: 1234

    FUNCIONÁRIO
    usuário: funcionario
    senha: 1234
*/


const users = {

    chefe: {
        password: "1234",
        name: "Chefe",
        role: "Administrador",
        permission: "chefe"
    },

    funcionario: {
        password: "1234",
        name: "Funcionário",
        role: "Funcionário",
        permission: "funcionario"
    }

};


const loginScreen =
    document.getElementById("loginScreen");

const mainApp =
    document.getElementById("mainApp");

const loginForm =
    document.getElementById("loginForm");

const loginUser =
    document.getElementById("loginUser");

const loginPassword =
    document.getElementById("loginPassword");

const loginError =
    document.getElementById("loginError");

const showPassword =
    document.getElementById("showPassword");

const rememberUser =
    document.getElementById("rememberUser");

const loggedUser =
    document.getElementById("loggedUser");

const loggedRole =
    document.getElementById("loggedRole");

const userAvatar =
    document.getElementById("userAvatar");


/* ================= MOSTRAR SENHA ================= */

showPassword.addEventListener("click", () => {

    if (loginPassword.type === "password") {

        loginPassword.type = "text";

        showPassword.textContent = "🙈";

    } else {

        loginPassword.type = "password";

        showPassword.textContent = "👁";

    }

});


/* ================= LEMBRAR USUÁRIO ================= */

const savedUser =
    localStorage.getItem("petcare_saved_user");

if (savedUser) {

    loginUser.value = savedUser;

    rememberUser.checked = true;

}


/* ================= LOGIN ================= */

loginForm.addEventListener("submit", event => {

    event.preventDefault();


    const username =
        loginUser.value
            .trim()
            .toLowerCase();

    const password =
        loginPassword.value;


    const user =
        users[username];


    if (!user || user.password !== password) {

        loginError.classList.add("show");

        loginPassword.value = "";

        return;

    }


    loginError.classList.remove("show");


    /* Salvar usuário */

    if (rememberUser.checked) {

        localStorage.setItem(
            "petcare_saved_user",
            username
        );

    } else {

        localStorage.removeItem(
            "petcare_saved_user"
        );

    }


    /* Salvar sessão */

    sessionStorage.setItem(
        "petcare_logged_user",
        username
    );


    enterSystem(username);

});


/* ================= ENTRAR NO SISTEMA ================= */

function enterSystem(username) {

    const user =
        users[username];

    if (!user) return;


    loginScreen.classList.add("hidden");

    mainApp.classList.add("logged");


    loggedUser.textContent =
        user.name;

    loggedRole.textContent =
        user.role;


    userAvatar.textContent =
        user.name.charAt(0).toUpperCase();


    /*
        CONTROLE DE PERMISSÕES
    */

    const chefButtons =
        document.querySelectorAll(".chef-only");


    chefButtons.forEach(button => {

        if (user.permission === "chefe") {

            button.style.display = "";

        } else {

            button.style.display = "none";

        }

    });


    /*
        Atualiza o título do navegador
    */

    document.title =
        `PetCare — ${ user.name } `;


    /*
        Começa no Dashboard
    */

    openPage("dashboard");

}


/* ================= LOGOUT ================= */

document.getElementById("logoutButton")
    .addEventListener("click", () => {

        sessionStorage.removeItem(
            "petcare_logged_user"
        );


        mainApp.classList.remove("logged");

        loginScreen.classList.remove("hidden");


        loginPassword.value = "";


        showToast("Você saiu do sistema.");

    });


/* ================= RECUPERAR SESSÃO ================= */

const loggedSession =
    sessionStorage.getItem(
        "petcare_logged_user"
    );


if (loggedSession && users[loggedSession]) {

    enterSystem(loggedSession);

}