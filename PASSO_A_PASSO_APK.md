# 📱 GUIA PASSO A PASSO — CRIAR O APK DO ZERO

Este guia assume que tens o **Windows** e que **nunca instalaste nada** antes.

---

## ⚙️ PASSO 1 — Instalar o Node.js

1. Abre o teu navegador (Chrome, Edge, etc.)
2. Vai a: **https://nodejs.org**
3. Clica no botão verde grande que diz **"LTS"** (versão recomendada)
4. Faz download do ficheiro `.msi`
5. Abre o ficheiro `.msi` e clica **"Next"** em todas as etapas (instalação padrão)
6. Clica **"Finish"**

✅ **Testa se instalou:** Abre o **Prompt de Comando** (tecla Windows → escreve `cmd` → Enter). Escreve:

```cmd
node --version
```

Se aparecer um número (ex: `v20.11.0`), está instalado.

---

## 🤖 PASSO 2 — Instalar o Android Studio

1. Vai a: **https://developer.android.com/studio**
2. Clica em **"Download Android Studio"**
3. Aceita os termos e faz download
4. Abre o ficheiro `.exe` e instala com as opções padrão (clica sempre **"Next"**)
5. No final, deixa a opção **"Start Android Studio"** marcada e clica **"Finish"**

✅ Quando o Android Studio abrir pela primeira vez:
- Clica **"Next"** em tudo (Standard installation)
- Aceita as licenças (Accept) e clica **"Finish"**
- Aguarda o download dos componentes terminar (pode demorar 15-30 minutos)
- Quando terminar, fecha o Android Studio.

---

## 📂 PASSO 3 — Abrir o Prompt de Comando na Pasta do Projeto

1. Abre o **Explorador de Ficheiros** (tecla Windows + E)
2. Navega até à pasta onde está o projeto `react-vite-tailwind`
3. Na barra de endereços do Explorador, **apaga o que está escrito**
4. Escreve `cmd` e pressiona **Enter**

✅ O Prompt de Comando abre **já na pasta correta**.

---

## 🔨 PASSO 4 — Compilar o Site

No Prompt de Comando, escreve:

```cmd
npm run build
```

Pressiona **Enter** e aguarda. Vai aparecer `✓ built in X.XXs`.

---

## 📱 PASSO 5 — Criar o Projeto Android

Ainda no Prompt de Comando, escreve:

```cmd
npx cap add android
```

Pressiona **Enter** e aguarda. Vai criar uma pasta chamada `android`.

---

## 🔄 PASSO 6 — Sincronizar o Site com o Android

```cmd
npx cap sync
```

Pressiona **Enter** e aguarda.

---

## 🛠️ PASSO 7 — Abrir o Android Studio

```cmd
npx cap open android
```

Pressiona **Enter**. O Android Studio abre.

---

## 📲 PASSO 8 — Gerar o APK

Dentro do Android Studio:

1. **Aguarda** a barra de progresso no canto inferior direito terminar (Gradle sync)
2. No menu superior, clica: **Build → Build APK(s)**
3. Aguarda compilar (pode demorar 5-10 minutos)
4. Quando terminar, aparece uma notificação no canto inferior direito a dizer **"APK(s) generated successfully"**
5. Clica em **"locate"** nessa notificação

✅ O Explorador de Ficheiros abre com o ficheiro `app-debug.apk`.

---

## 📲 PASSO 9 — Instalar no Telemóvel

1. Transfere o ficheiro `app-debug.apk` para o telemóvel (por cabo USB, WhatsApp, email, etc.)
2. No telemóvel, abre o ficheiro
3. Se aparecer "Bloqueado por segurança", clica em **"Definições"** e ativa **"Permitir desta fonte"**
4. Clica em **"Instalar"**

✅ **A App está instalada no telemóvel!**

---

## ⚡ Resumo dos Comandos (copia e cola)

```cmd
npm run build
npx cap add android
npx cap sync
npx cap open android
```

Depois, no Android Studio: **Build → Build APK(s)**
