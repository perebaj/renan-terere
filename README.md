# Renan Peliçari já fez o tereré dele hoje?

Site estático que sorteia se o Renan Peliçari já preparou o tereré do dia com probabilidade calibrada em **60% para sim** e **40% para não**, acompanhado de uma vitrola de country texano.

## Por que é estático e exige o primeiro clique

Navegadores modernos bloqueiam reprodução automática de áudio antes de uma interação direta da pessoa na página. Vincular o início da playlist texana ao clique do sorteio destrava o áudio inclusive no Safari do iOS e mantém a hospedagem gratuita sem backend.

O cabeçalho `Referrer-Policy: strict-origin-when-cross-origin` é obrigatório para que o player embutido do YouTube autorize a reprodução de clipes oficiais em domínios externos.

## Rodar localmente

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080` (não abra via `file://`, pois a API de iframe do YouTube exige origem HTTP/HTTPS).

## Deploy na Vercel

1. Pelo terminal (sem precisar instalar nada globalmente):
   ```bash
   npx vercel
   ```
   Para publicar na URL final de produção:
   ```bash
   npx vercel --prod
   ```
2. Ou suba este repositório no GitHub e importe direto em `https://vercel.com/new` (Framework Preset: **Other**, sem comando de build).
