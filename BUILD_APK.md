# 📱 Compilar APK Oficial — Mundo de Doces da GG

Este guia explica **passo a passo** como compilar o site num aplicativo **Android (.apk)** nativo utilizando **Capacitor** + **Android Studio**.

---

## ✅ Pré-requisitos

Certifica-te de que tens instalado no teu computador:

| Ferramenta | Versão Mínima | Link |
|------------|---------------|------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **Android Studio** | Hedgehog (2023.1.1)+ | [developer.android.com/studio](https://developer.android.com/studio) |
| **Java JDK** | 17 | Incluído no Android Studio |

---

## 📦 Passo 1 — Compilar o Site

No terminal, na raiz do projeto:

```bash
npm run build
```

Isto gera a pasta `dist/` com o site completo compilado.

---

## 🤖 Passo 2 — Criar o Projeto Android Nativo

```bash
npx cap add android
```

Isto cria a pasta `android/` com o projeto Gradle nativo.

---

## 🔄 Passo 3 — Sincronizar o Código Web

Copia o conteúdo de `dist/` para dentro do projeto Android:

```bash
npx cap sync
```

---

## 🛠️ Passo 4 — Abrir no Android Studio

```bash
npx cap open android
```

O Android Studio abre com o projeto carregado.

---

## 📱 Passo 5 — Compilar o APK

No Android Studio:

1. Aguarda a sincronização do **Gradle** (barra inferior).
2. No menu superior: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. Quando terminar, clica em **"locate"** na notificação pop-up.
4. O ficheiro `app-debug.apk` estará em:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

## 🎨 Passo 6 — Personalizar Ícone e Splash Screen (Opcional)

### Ícone
1. No Android Studio, clica com botão direito em `app → res → New → Image Asset`
2. Escolhe **"Launcher Icons (Adaptive and Legacy)"**
3. Faz upload da tua imagem PNG (1024x1024 recomendado)
4. Clica **Next → Finish**

### Splash Screen
O Capacitor usa automaticamente a cor `#e8456b` (rosa da marca) como fundo da splash. Para usar uma imagem personalizada:
1. Coloca um ficheiro `splash.png` (2732x2732px) em `resources/`
2. Instala: `npm install @capacitor/assets`
3. Executa: `npx capacitor-assets generate`

---

## 🔐 Passo 7 — Gerar APK Assinado (Para Produção)

### Criar Keystore (só na primeira vez):
```bash
keytool -genkey -v -keystore mundodedoces.keystore -alias mundodedoces -keyalg RSA -keysize 2048 -validity 10000
```

### Assinar o APK:
No Android Studio: **Build → Generate Signed Bundle / APK → APK**  
Seleciona o keystore criado e segue os passos.

---

## 📲 Instalação no Telemóvel

1. Transfere o ficheiro `.apk` para o telemóvel (via USB, WhatsApp, Google Drive, etc.)
2. No telemóvel, ativa **"Instalar apps de fontes desconhecidas"** (Definições → Segurança)
3. Abre o ficheiro `.apk` e instala

---

## 🚀 Publicar na Google Play Store (Opcional)

1. Cria uma conta em [play.google.com/console](https://play.google.com/console)
2. Paga a taxa única de $25
3. Faz upload do `.aab` (Android App Bundle) em vez do `.apk`
4. Para gerar `.aab`: **Build → Build Bundle(s) → Android App Bundle**

---

## ⚡ Comandos Rápidos (Resumo)

```bash
# 1. Compilar site
npm run build

# 2. Sincronizar com Android
npx cap sync

# 3. Abrir Android Studio
npx cap open android

# 4. (Alternativa) Build APK direto pela linha de comandos
cd android && ./gradlew assembleDebug
```

---

## 🎯 O APK fica em:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Pronto!** 🎉 O APK oficial da Mundo de Doces da GG está compilado e pronto para instalar!
