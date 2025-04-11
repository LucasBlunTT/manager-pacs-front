# Manager PACS Frontend

## 📋 Descrição do Projeto
O **Manager PACS Frontend** é um sistema desenvolvido em **Next.js** e **React** para gestão de imagens e volumetria de dados no PACS. Ele fornece uma interface intuitiva para análise e visualização de dados médicos, com suporte para gráficos interativos, gerenciamento de volumetria diária e funcionalidades de controle de status de gravação.

## 🚀 Funcionalidades
- **📊 Dashboard Interativo**: Exibição de volumetria de exames com gráficos dinâmicos.
- **📉 Gráficos de Consumo**: Análise detalhada do uso de armazenamento.
- **🔄 Resetar Status de Gravação**: Possibilidade de redefinir status de gravação por **ACC** ou por **intervalo de datas**.
- **📱 Interface Responsiva**: Adaptação para diferentes tamanhos de tela.
- **🔗 Integração com API**: Consumo de dados dinâmicos para análise de volumetria.
- **🛠️ Componentização**: Estrutura modular para reutilização de componentes.
- **⚡ Carregamento Assíncrono**: Melhor desempenho com carregamento de dados em segundo plano.

## 📷 Screenshot

### Volumetria Por Data
<img src="https://github.com/user-attachments/assets/53d6a6e7-098a-45e0-8a3b-af08d22e6eba" width="1900"/>

### Consumo Diário
![image](https://github.com/user-attachments/assets/83b6c7e2-24f5-48c0-a212-4f4d05f39dba)

### Resetar Status de Gravação por ACC
<img src="https://github.com/user-attachments/assets/b9e27d68-1ee8-45c0-8279-fc7b03653db3" width="900"/>

### Resetar Status de Gravação por Range de Data
<img src="https://github.com/user-attachments/assets/864f7940-2989-4522-bde3-3e804ee539fa" width="900"/>

### Verificar espaço em disco
![image](https://github.com/user-attachments/assets/bd248afe-b31b-4abb-a497-a2a5848eaf91)


## 💻 Tecnologias Utilizadas
- **Next.js**: Framework para aplicações React com renderização do lado do servidor.
- **React**: Biblioteca para construção da interface do usuário.
- **Recharts**: Biblioteca de gráficos para visualização de volumetria.
- **Axios**: Cliente HTTP para comunicação com a API.
- **Tailwind CSS**: Framework de CSS para estilização rápida e responsiva.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.

## 🌐 Rotas Disponíveis
O sistema possui as seguintes rotas principais:
- `/relatorio-volumetria`: Relatório de volumetria por intervalo de datas.
- `/consumo-diario`: Visualização do consumo diário de armazenamento.
- `/resetar-status-gravacao`: Resetar status de gravação por número de acesso (ACC).
- `/resetar-status-gravacao-data`: Resetar status de gravação por intervalo de datas.
- `/space-disk`: Monitoramento do espaço de armazenamento em disco.

## 📦 Estrutura de Componentes
O projeto utiliza uma abordagem modular com componentes reutilizáveis para facilitar a manutenção e escalabilidade. Alguns dos principais componentes incluem:
- **`<VolumetriaChart>`**: Gráfico de barras para exibição de volumetria por data.
- **`<VolumetriaChartDaily>`**: Gráfico de barras para consumo diário de armazenamento.
- **`<RadialChart>`**: Gráfico radial para visualização percentual de estudos.
- **`<CustomGauge>`**: Indicador de espaço em disco utilizado.
- **`<InputDate>`**: Componente para seleção de intervalo de datas.
- **`<Button>`**: Botão estilizado com suporte a eventos.
- **`<Accordion>`**: Acordeão para navegação e organização de informações.
- **`<NavBarLeft>`**: Barra de navegação lateral com links para as principais funcionalidades.

## 📊 Gráficos e Visualizações
O projeto utiliza bibliotecas poderosas para visualização de dados:
- **Recharts**: Para gráficos de barras e gráficos lineares.
- **ApexCharts**: Para gráficos radiais e donuts.
- **MUI X-Charts**: Para indicadores de espaço em disco.

## 🛠️ Configuração do Ambiente
Certifique-se de configurar as variáveis de ambiente no arquivo `.env` para que o sistema funcione corretamente:
```env
# URL da API
NEXT_PUBLIC_API_URL=http://localhost:3333
## 📈 Status do Projeto
✅ **Concluído**

## 🛠️ Como Usar
1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/LucasBlunTT/manager-pacs-front.git
   cd manager-pacs-front
   npm install
   npm run dev
   ```

2. **Acesse o Sistema** no navegador através de `http://localhost:3000`.

3. **Utilize as Funcionalidades**:
   - Visualize **gráficos de volumetria por data**.
   - Analise o **consumo diário de armazenamento**.
   - **Resete o status de gravação** por **ACC** ou **intervalo de datas**.

