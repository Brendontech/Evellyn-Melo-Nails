// Procedimentos oferecidos. Valores e tempos são [EXEMPLO] até a Evellyn confirmar.
// duracao em minutos; aPartirDe mostra "a partir de" antes do preço.

export const TECNICAS = [
  'Fibra de vidro',
  'Molde F1',
  'Gel na tips',
  'Banho de gel',
  'Blindagem',
  'Esmaltação em gel',
  'Nail art à mão livre',
]

export const PROCEDIMENTOS = [
  { id: 'fibra', nome: 'Alongamento em fibra de vidro', descricao: 'Unha longa, fina e resistente', duracao: 150, preco: 150 },
  { id: 'f1', nome: 'Alongamento no molde F1', descricao: 'Formato perfeito em menos tempo', duracao: 150, preco: 140 },
  { id: 'manutencao', nome: 'Manutenção', descricao: 'Para quem já tem alongamento', duracao: 120, preco: 100 },
  { id: 'banho', nome: 'Banho de gel', descricao: 'Fortalece e protege a unha natural', duracao: 90, preco: 90 },
  { id: 'esmaltacao', nome: 'Esmaltação em gel', descricao: 'Brilho e cor por até 3 semanas', duracao: 60, preco: 60 },
  { id: 'nailart', nome: 'Nail art à mão livre', descricao: 'Desenho exclusivo, valor por unha', duracao: 30, preco: 15, aPartirDe: true },
]
