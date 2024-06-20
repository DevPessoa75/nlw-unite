// Array
let participantes = [
  {
    nome: "João",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 5, 16, 19, 20),
    dataCheckIn: null,
  },
  {
    nome: "Marcelo",
    email: "marpess@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 15, 10),
    dataCheckIn: new Date(2024, 3, 28, 12, 18),
  },

  {
    nome: "Josue",
    email: "josue@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null,
  },
  {
    nome: "Marcio",
    email: "mario@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 15, 10),
    dataCheckIn: new Date(2024, 3, 28, 12, 18),
  },
  // Adicione mais participantes aqui
  {
    nome: "Ana",
    email: "ana@example.com",
    dataInscricao: new Date(2024, 2, 27, 10, 30),
    dataCheckIn: new Date(2024, 3, 29, 14, 45),
  },
  {
    nome: "Luiz",
    email: "luiz@example.com",
    dataInscricao: new Date(2024, 2, 28, 11, 55),
    dataCheckIn: new Date(2024, 3, 30, 16, 35),
  },
  {
    nome: "Camila",
    email: "camila@example.com",
    dataInscricao: new Date(2024, 2, 29, 9, 15),
    dataCheckIn: null,
  },
  {
    nome: "Juiana",
    email: "Juiana@example.com",
    dataInscricao: new Date(2024, 2, 27, 10, 30),
    dataCheckIn: new Date(2024, 3, 29, 14, 45),
  },
  {
    nome: "Luiza",
    email: "luiza@example.com",
    dataInscricao: new Date(2024, 2, 28, 11, 45),
    dataCheckIn: null,
  },
  {
    nome: "Camilo",
    email: "camilo@example.com",
    dataInscricao: new Date(2024, 2, 29, 9, 15),
    dataCheckIn: new Date(2024, 3, 31, 10, 30),
  },
  // Continue adicionando os participantes restantes
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  // Condicional
  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
    >
        Confirmar Check-in
    </button>
    `;
  }

  return `
    <tr>
          <td>
            <strong> ${participante.nome} </strong>
            <br />
            <small>${participante.email}</small>
          </td>
          <td>${dataInscricao}</td>
          <td>${dataCheckIn}</td>
        </tr>
    `;
};

const atualizarLista = (participantes) => {
  let output = "";
  // estrutura de repatição - loop
  for (let participante of participantes) {
    // faça alguma coisa
    output = output + criarNovoParticipante(participante);
  }

  //substituir informacao do HTML
  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  // verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );
  if (participanteExiste) {
    alert("E-mail já cadastrado!");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  // Limpar o formulario
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  // confirmar se realmente quer fazer o check-in
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?";
  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date();

  // atualizar a lista de participantes
  atualizarLista(participantes);
};
