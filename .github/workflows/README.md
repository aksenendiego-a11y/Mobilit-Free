# GitHub Actions - Build Android APK

## Configuração Necessária

### 1. Adicionar EXPO_TOKEN no GitHub Secrets

1. Vá no seu repositório no GitHub
2. Settings → Secrets and variables → Actions
3. New repository secret:
   - **Name:** `EXPO_TOKEN`
   - **Value:** Seu token do Expo (gere em https://expo.dev/accounts/diegoaksenen/settings/access-tokens)

### 2. Como Disparar o Build

#### Automático (push para main):
```bash
git push origin main
```

#### Manual (workflow_dispatch):
1. Vá na aba **Actions** no GitHub
2. Selecione "Build Android APK"
3. Clique em **"Run workflow"**

### 3. Baixar o APK

Após o build completar:
1. Vá na aba **Actions**
2. Clique no workflow executado
3. Na seção **Artifacts**, clique em `mobility-free-apk`
4. Baixe o arquivo `.apk`

### 3. Instalar no Celular

1. Transfira o `.apk` para o celular (Google Drive, email, cabo USB)
2. No celular: Configurações → Segurança → Fontes desconhecidas (ative)
3. Toque no `.apk` para instalar

---

## Jobs Disponíveis

| Job | Descrição | Status |
|-----|-----------|--------|
| `build` | Build via EAS (recomendado) | ✅ Ativo |
| `build-local` | Build local com Gradle | ⏸️ Desabilitado (defina `if: true` para ativar) |
| `notify` | Notifica resultado | ✅ Ativo |

---

## Configurações Importantes

### eas.json (configurado)
```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### eas.json - Para Build Local (descomente no workflow)
```yaml
build-local:
  if: true  # Mude para true para ativar build local
```

---

## Troubleshooting

| Erro | Solução |
|------|---------|
| `EXPO_TOKEN` inválido | Regere token em expo.dev/settings/access-tokens |
| Build falha em `npm ci` | Verifique se `package-lock.json` está sincronizado |
| Falha no Gradle | Verifique `gradle.properties` - `newArchEnabled=false` |
| Keystore erro | EAS gera automaticamente, não precisa configurar |

---

## Monitorar Builds

- **GitHub Actions:** Aba Actions do repositório
- **EAS Dashboard:** https://expo.dev/accounts/diegoaksenen/projects/mobility-free/builds