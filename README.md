# 📊 AutExcel - Dashboard de Empresas

> **Análise e exportação de dados empresariais com React + Vite**

## 🚀 Demo Online

**🌐 GitHub Pages:** [https://laiobomfimdev.github.io/AutExcel/](https://laiobomfimdev.github.io/AutExcel/)

**⚡ Vercel:** [Será disponibilizado após o deploy]

## 🚀 Deploy Automático

### 📄 GitHub Pages

O projeto está configurado com **GitHub Actions** para deploy automático:

1. **Push para main** → Build automático
2. **Deploy no GitHub Pages** → Aplicação online
3. **URL disponível** → `https://laiobomfimdev.github.io/AutExcel/`

**Configuração:**
1. Vá em **Settings** → **Pages**
2. Source: **GitHub Actions**
3. O workflow `.github/workflows/deploy.yml` fará o resto!

### ⚡ Vercel

Para deploy no **Vercel**:

1. **Conecte o repositório** no [Vercel Dashboard](https://vercel.com)
2. **Import Project** → Selecione o repositório `AutExcel`
3. **Deploy automático** a cada push
4. **Configuração automática** via `vercel.json`

**Passos detalhados:**
```bash
# 1. Instale a CLI do Vercel (opcional)
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy direto da pasta
vercel --prod
```

**Ou via Dashboard:**
- Acesse [vercel.com](https://vercel.com)
- **New Project** → **Import Git Repository**
- Selecione `LaioBomfimDev/AutExcel`
- **Deploy** (configuração automática!)

## 📋 Sobre o Projeto

Dashboard interativo para análise de dados empresariais com funcionalidades de:

- ✅ **Filtros Avançados**: Por nome, avaliação, anúncios, reivindicação, etc.
- ✅ **Estatísticas em Tempo Real**: Métricas automáticas dos dados filtrados
- ✅ **Exportação Excel**: Download de dados filtrados em formato .xlsx
- ✅ **Interface Responsiva**: Design moderno e intuitivo
- ✅ **Formatação Condicional**: Cores e estilos baseados nos dados

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **XLSX** - Manipulação de arquivos Excel
- **File-Saver** - Download de arquivos
- **Lucide React** - Ícones modernos
- **CSS3** - Estilização responsiva

## 🏃‍♂️ Como Executar Localmente

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/LaioBomfimDev/AutExcel.git

# Entre na pasta
cd AutExcel

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

A aplicação estará disponível em: `http://localhost:5174`

## 📦 Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📊 Funcionalidades

### 🔍 Filtros Disponíveis
- **Busca por nome** - Pesquisa em tempo real
- **Avaliação mínima** - Slider de 0 a 5 estrelas
- **Gastando em anúncios** - Sim/Não/Todos
- **Pode reivindicar** - Sim/Não/Todos
- **Tem website** - Sim/Não/Todos
- **Tem telefone** - Sim/Não/Todos
- **Tem competidores** - Sim/Não/Todos
- **Mínimo de avaliações** - Controle numérico

### 📈 Estatísticas Automáticas
- Total de empresas filtradas
- Avaliação média
- % com anúncios ativos
- % que podem reivindicar

### 📄 Exportação Excel
- **Dados filtrados** exportados
- **Formatação profissional** com cores
- **Colunas otimizadas** para largura
- **Nome automático** com timestamp
- **Tratamento de erros** robusto

## 🗂️ Estrutura do Projeto

```
AutExcel/
├── .github/workflows/     # GitHub Actions
├── public/               # Arquivos estáticos
├── src/                  # Código fonte
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos principais
│   └── main.jsx         # Entry point
├── .gitignore           # Arquivos ignorados
├── package.json         # Dependências
├── vite.config.js       # Configuração Vite
└── README.md           # Este arquivo
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Laio Bomfim** - [GitHub](https://github.com/LaioBomfimDev)

---

⭐ **Gostou do projeto? Deixe uma estrela!**