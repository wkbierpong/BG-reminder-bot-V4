# Bruutgeweld CWL Reminder Bot

Deze Discord bot leest een verse ClashPerk Excel-export en stuurt een privebericht naar leden die in het tabblad **Missing members** staan.

De normale workflow:

1. Draai in Discord met ClashPerk:
   ```text
   /export rosters category:CWL
   ```
2. Download de export als `.xlsx`.
3. Draai eerst:
   ```text
   /remind-unregistered dry_run:true file:<ClashPerk-export.xlsx>
   ```
4. Controleer het rapport.
5. Draai daarna:
   ```text
   /remind-unregistered dry_run:false file:<dezelfde-export.xlsx>
   ```

## Wat de bot nodig heeft

De bot gebruikt het tabblad **Missing members**. In dat tabblad moet een Discord-kolom staan met een Discord mention of Discord User ID. Voorbeelden die werken:

```text
<@123456789012345678>
123456789012345678
```

Alleen een Discord-naam is niet genoeg om betrouwbaar een DM te sturen.

## Discord bot aanmaken

1. Ga naar de Discord Developer Portal.
2. Maak een nieuwe application aan.
3. Ga naar **Bot** en maak een bot aan.
4. Kopieer de bot token. Zet die later in `DISCORD_TOKEN`.
5. Ga naar **OAuth2 > General** en kopieer de **Client ID**. Zet die later in `DISCORD_CLIENT_ID`.
6. Nodig de bot uit met scopes:
   - `bot`
   - `applications.commands`
7. Geef de bot minimaal toestemming om berichten te sturen in jullie server.

De server staat standaard al ingesteld op:

```text
951865015126851584
```

## Instellen

Maak lokaal of op Railway deze environment variables aan:

```text
DISCORD_TOKEN=...
DISCORD_CLIENT_ID=...
DISCORD_GUILD_ID=951865015126851584
ALLOWED_ROLE_NAMES=admins,co leider [BG1],co leider [BGX]
DM_DELAY_MS=2500
MAX_DMS_PER_RUN=100
REGISTER_COMMANDS_ON_START=true
```

Role IDs zijn betrouwbaarder dan rolnamen. Als je die later hebt, kun je dit gebruiken:

```text
ALLOWED_ROLE_IDS=role_id_1,role_id_2,role_id_3
```

## Starten

Na het invullen van de environment variables:

```bash
npm install
npm start
```

De bot registreert de slash command standaard automatisch bij het opstarten.

Wil je dat toch handmatig doen, zet dan `REGISTER_COMMANDS_ON_START=false` en draai:

```bash
npm run register-commands
```

## Railway

Voor Railway:

1. Upload of koppel dit project aan Railway.
2. Zet dezelfde environment variables in Railway.
3. Gebruik als start command:
   ```text
   npm start
   ```
4. De slash command wordt automatisch geregistreerd bij het opstarten.

## Veiligheid

De command kan alleen worden gebruikt door rollen uit `ALLOWED_ROLE_NAMES` of `ALLOWED_ROLE_IDS`.

De bot verstuurt nooit meteen bij `dry_run:true`. Gebruik die dry-run altijd eerst. Bij `dry_run:false` wacht de bot standaard 2,5 seconde tussen DM's en stopt standaard na 100 DM's per run.
