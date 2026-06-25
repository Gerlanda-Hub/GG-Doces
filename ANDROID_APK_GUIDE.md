# 📱 Guia de Compilação do APK Oficial — Mundo de Doces da GG

Este guia explica passo a passo como empacotar e compilar o código web deste projeto (React + Vite + Tailwind CSS) num aplicativo nativo **Android (APK)** utilizando o **Capacitor** (a tecnologia moderna recomendada pela Ionic e Google).

---

## 🚀 Requisitos Prévios

Antes de começar, garante que tens instalado no teu computador:
1. **Node.js** (versão 18 ou superior).
2. **Android Studio** (com o Android SDK correspondente instalado).
3. **Java JDK 17** (necessário para compilação do Gradle).

---

## 📦 Passo 1: Instalar o Capacitor no Projeto

Garante que o projeto está compilado. De seguida, executa os seguintes comandos no terminal do projeto para instalar o núcleo do Capacitor e a plataforma Android:

```bash
# 1. Instalar as dependências do Capacitor
npm install @capacitor/core @capacitor/cli

# 2. Inicializar o Capacitor no projeto
# Define o nome do App como "Mundo de Doces da GG"
# Define o ID do pacote como "com.ggdoces.app"
# Define a pasta web como "dist" (pasta de build do Vite)
npx cap init "Mundo de Doces da GG" "com.ggdoces.app" --web-dir=dist
```

---

## 🤖 Passo 2: Adicionar a Plataforma Android

Agora, instala o pacote do Android e adiciona a pasta nativa ao projeto:

```bash
# 1. Instalar a plataforma Android do Capacitor
npm install @capacitor/android

# 2. Adicionar o diretório nativo Android
npx cap add android
```

Este comando criará uma pasta chamada `android` na raiz do teu projeto. Esta pasta contém um projeto nativo Gradle completo.

---

## 🔄 Passo 3: Sincronizar o Código Web com o Android

Sempre que fizeres alterações no código React/Vite e quiseres testar no telemóvel, deves rodar o build web e sincronizar com o projeto Android:

```bash
# 1. Compilar o projeto web (gera a pasta dist)
npm run build

# 2. Sincronizar os ficheiros compilados com a pasta Android nativa
npx cap sync
```

---

## 🛠️ Passo 4: Compilar o APK no Android Studio

Para gerar o ficheiro `.apk` final assinado e pronto para distribuição:

```bash
# Abrir o projeto diretamente no Android Studio
npx cap open android
```

1. O **Android Studio** irá abrir automaticamente com o projeto carregado.
2. Aguarda que o Gradle termine de sincronizar os ficheiros (pode demorar alguns minutos na primeira vez).
3. No menu superior do Android Studio, acede a:
   👉 **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
4. O Android Studio irá compilar o app. Assim que terminar, aparecerá uma notificação no canto inferior direito com um link **"locate"** (localizar).
5. Clica em **locate** para abrir a pasta que contém o teu ficheiro **`app-debug.apk`** ou **`app-release.apk`**.

---

## 🌐 Passo 5: Disponibilizar o APK para Download no Site

Para que o botão de download do aplicativo no teu site funcione automaticamente para os teus clientes:

1. Renomeia o ficheiro APK gerado para **`app-release.apk`**.
2. Copia este ficheiro e cola-o dentro da pasta **`public/`** na raiz deste projeto.
3. Faz o deploy do site atualizado para o teu servidor (Vercel, Cloudflare, etc.).
4. **Pronto!** A partir de agora, qualquer cliente que aceda ao site e clique no botão "Descarregar App Android" irá descarregar o APK diretamente para o telemóvel de forma instantânea!

---

## 💎 Dicas de Produção (Android Studio)
- **Ícone do Aplicativo:** Podes alterar os ícones do aplicativo abrindo a pasta `android/app/src/main/res` no Android Studio, clicando com o botão direito na pasta `res` -> `New` -> `Image Asset` para gerar ícones adaptativos profissionais.
- **Splash Screen (Tela de Carregamento):** Podes usar o pacote `@capacitor/splash-screen` para adicionar uma tela de carregamento profissional com o logótipo da Mundo de Doces da GG.
