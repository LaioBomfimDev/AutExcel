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

### ⚡ Vercel - Deploy Completo

#### 🎯 Método 1: Dashboard Vercel (Recomendado)

1. **Acesse** [vercel.com](https://vercel.com) e faça login
2. **New Project** → **Import Git Repository**
3. **Conecte sua conta GitHub** (se necessário)
4. **Selecione** o repositório `LaioBomfimDev/AutExcel`
5. **Configure o projeto:**
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. **Deploy** → Aguarde o build
7. **URL gerada automaticamente** → `https://aut-excel-xxx.vercel.app`

#### 🛠️ Método 2: CLI Vercel

```bash
# 1. Instale a CLI do Vercel
npm i -g vercel

# 2. Faça login na sua conta
vercel login

# 3. Na pasta do projeto, execute:
vercel

# 4. Para deploy em produção:
vercel --prod
```

#### ⚙️ Configuração Automática

O arquivo `vercel.json` já está configurado com:
- ✅ **Build otimizado** para SPA
- ✅ **Roteamento correto** para React Router
- ✅ **Comandos automáticos** de build e dev
- ✅ **Diretório de saída** configurado

#### 🔄 Deploy Contínuo

Após a configuração inicial:
- **Cada push** para `main` → **Deploy automático**
- **Pull Requests** → **Preview deployments**
- **Rollback fácil** via dashboard
- **Logs detalhados** de build

## 📋 Sobre o Projeto

Dashboard interativo para análise de dados empresariais com funcionalidades de:

- ✅ **Filtros Avançados**: Por nome, avaliação, anúncios, reivindicação, etc.
- ✅ **Estatísticas em Tempo Real**: Métricas automáticas dos dados filtrados
- ✅ **Exportação Excel**: Download de dados filtrados em formato .xlsx
- ✅ **Interface Responsiva**: Design moderno e intuitivo
- ✅ **Formatação Condicional**: Cores e estilos baseados nos dados
- ✅ **Upload de Arquivos**: Carregamento dinâmico de novos datasets

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
- **Avaliação** - Alta (4.5+), Média (3.5-4.4), Baixa (<3.5)
- **Gastando em anúncios** - Sim/Não/Todos
- **Pode reivindicar** - Sim/Não/Todos
- **Tem website** - Sim/Não/Todos
- **Tem telefone** - Sim/Não/Todos
- **Tem competidores** - Sim/Não/Todos
- **Quantidade de avaliações** - Muitas (50+), Algumas (10-49), Poucas (<10)

### 📈 Estatísticas Automáticas
- Total de empresas no dataset
- Avaliação média geral
- Total de avaliações
- Resultados filtrados em tempo real

### 📄 Exportação Excel
- **Dados filtrados** exportados
- **Formatação profissional** com cores e estilos
- **Colunas otimizadas** para largura
- **Nome automático** com timestamp
- **Tratamento de erros** robusto
- **Formatação condicional** para valores Sim/Não

## 🗂️ Estrutura do Projeto

```
AutExcel/
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml        # Workflow de deploy
├── public/               # Arquivos estáticos
├── src/                  # Código fonte
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos principais
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Entry point
├── .gitignore           # Arquivos ignorados
├── package.json         # Dependências
├── vite.config.js       # Configuração Vite
├── vercel.json          # Configuração Vercel
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