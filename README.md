# IPCamMonitor

**IPCamMonitor** é uma aplicação desktop desenvolvida com Tauri, TypeScript e Tailwind CSS, projetada para simular conexões de câmeras IP. Esta ferramenta permite que desenvolvedores testem e interajam com fluxos de vídeo IP em um ambiente controlado.

## Funcionalidades

- **Simulação de Câmeras IP**: Crie e gerencie instâncias virtuais de câmeras IP utilizando de fotos, videos, ou até mesmo outros tipos de câmera, para testes e desenvolvimento.
- **Interface Intuitiva**: Utilize uma interface moderna e responsiva construída com Tailwind CSS.
- **Desempenho Otimizado**: Aproveite a eficiência do Tauri para aplicações desktop leves e rápidas.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- **Node.js**: Ambiente de execução JavaScript. [Instalar Node.js](https://nodejs.org/)
- **Rust**: Necessário para compilar o backend do Tauri. [Instalar Rust](https://www.rust-lang.org/pt-BR/tools/install)
- **Tauri CLI**: Interface de linha de comando do Tauri. Instale globalmente com:

  ```bash
  cargo install tauri-cli
  ```


## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/thepokenik/IPCamMonitor.git
   ```


2. **Navegue até o diretório do projeto**:

   ```bash
   cd IPCamMonitor
   ```


3. **Instale as dependências**:

   ```bash
   npm install
   ```


   *Nota*: Você pode optar por usar `yarn` ou `pnpm` conforme sua preferência.

## Desenvolvimento

Para iniciar o ambiente de desenvolvimento com recarregamento automático:

```bash
npm run tauri dev
```


Isso iniciará a aplicação em modo de desenvolvimento, permitindo que você veja as alterações em tempo real.

## Construção

Para gerar os executáveis de produção:

```bash
npm run tauri build
```

Os arquivos gerados estarão disponíveis no diretório `src-tauri/target/release/bundle`. Para mais detalhes sobre a distribuição em diferentes plataformas, consulte a [documentação oficial do Tauri](https://tauri.app/v1/guides/building/).