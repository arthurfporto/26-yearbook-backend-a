import prisma from './prisma/client.js';

const alunoInexistente = await prisma.aluno.findUnique({
  where: { id: 999 },
});
console.log('Aluno inexistente:', alunoInexistente);
// Resultado: null

const alunosSemSenha = await prisma.aluno.findMany({
  select: {
    id: true,
    nome: true,
    email: true,
    cidade: true,
    frase: true,
    planosFuturos: true,
    fotoUrl: true,
    role: true,
    criadoEm: true,
    // senhaHash NÃO está aqui — nunca retornado
  },
});
console.log('Alunos sem senhaHash:', alunosSemSenha);

// Criar mensagem
const novaMensagem = await prisma.mensagem.create({
  data: {
    texto: 'Salve, turma! Vamos com tudo nesse último ano!',
    autorId: 1, // ID do aluno criado na demonstração
  },
});
console.log('Mensagem criada:', novaMensagem);

// Listar mensagens com dados do autor via include
const mensagens = await prisma.mensagem.findMany({
  include: {
    autor: {
      select: {
        nome: true,
        fotoUrl: true,
      },
    },
  },
});
console.log('Mensagens com autor:', JSON.stringify(mensagens, null, 2));

await prisma.$disconnect();