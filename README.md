# Instalace:
1) Naklonujte tento repozitář
2) Spusťte příkaz "yarn" pro instalaci node modulů
3) Otevřete packages\sylius\theme\middleware.config.js a zadejte cesty pro api a imagePaths na běžící php Sylius server.
4) Otevřete packages\sylius\theme\nuxt.config.js a upravte port a host podle svých potřeb.
5) Ve složce packages\sylius\theme\ vytvořte soubor .env a v něm zadejte port, na kterém má aplikace běžet (3000 pokud není vyžadovaná jiná hotnota), hostitele aplikace ("0.0.0.0" pokud není vyžadovaná jiná hodnota) a adresu, na které běží váš middleware, např.:
`PORT = 3000`
`HOST = "0.0.0.0"`
`middlewareUrl = "https://vuestorefront.praguebest.cz/api"`


## Vytvoření buildu aplikace:
`npm run build:sylius`

## Spuštění aplikace:
`npm run start:sylius`

Výše uvedené npm příkazy by měly být uvedeny také v **CI/CD pipeline**.


# Příbuzná témata:
Vytvoření datového balíčku pro komunikaci mezi FE a BE:
https://docs.google.com/document/d/1euoPUn31OMdaLf5scQzJ9I-iWhg2X2Btn67F0c6_Zwk
