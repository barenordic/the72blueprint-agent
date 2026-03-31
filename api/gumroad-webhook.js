const FROM = 'The 72 Blueprint <contact@the72blueprint.com>';
const RESEND_KEY = process.env.RESEND_API_KEY;

function scheduleAt(daysFromNow) {
  if (daysFromNow === 0) return undefined;
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(8, 0, 0, 0);
  return d.toISOString();
}

function buildHtml(name, body) {
  const paras = body.split('\n\n').map(p => {
    const l = p.trim();
    if (!l) return '';
    if (l.startsWith('→')) {
      return `<p style="margin:0 0 16px;padding:14px 18px;background:#f8f7f4;border-left:3px solid #b8832a;font-size:14px;">${l}</p>`;
    }
    return `<p style="margin:0 0 16px;">${l.replace(/\n/g, '<br>')}</p>`;
  }).join('');

  return `<!DOCTYPE html><html lang="no"><head><meta charset="UTF-8"></head><body>
<div style="font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#1f2937;max-width:560px;margin:0 auto;">
  <div style="background:#112240;padding:20px 32px;text-align:center;">
    <span style="color:white;font-family:Georgia,serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;">
      The 72 <span style="color:#d4a44c;">Blueprint</span>
    </span>
  </div>
  <div style="padding:32px 32px 8px;background:#ffffff;">${paras}</div>
  <div style="padding:16px 32px 24px;text-align:center;font-size:11px;color:#9ca3af;font-family:Arial,sans-serif;border-top:1px solid #f3f4f6;">
    The 72 Blueprint · Architecting Your Legacy<br>
    <a href="mailto:contact@the72blueprint.com?subject=Avslutt+abonnement" style="color:#b8832a;">Avslutt abonnement</a>
  </div>
</div></body></html>`;
}

// ─── SEKVENS A: Gratis leadmagnet → kjøp (7 e-poster over 14 dager) ──────────

const seqLeadMagnet = [
  {
    delay: 0,
    subject: 'Din digitale sjekkliste er her ⚓',
    body: `Hei [navn],

Din gratis Digital Legacy Checklist er klar til nedlasting.

→ Last ned sjekklisten her: [LENKE TIL LEADMAGNET]

Denne 7-siders guiden dekker de fem tingene familien din trenger for å få tilgang til ditt digitale liv hvis noe skulle skje med deg. Print den ut, jobb deg gjennom den, ta vare på den.

Én ting du kan gjøre i dag — før alt annet på listen:

Sett opp en Legacy Contact på iPhone. Det tar fem minutter og betyr at noen du stoler på kan få tilgang til Apple-kontoen din og bildene dine hvis du ikke er her lenger.

Slik gjør du det:
Innstillinger → Ditt navn → Passord og sikkerhet → Legacy Contact → Legg til Legacy Contact

Ferdig. Fem minutter. Familien din vil takke deg for det.

Ha det godt,
Hanne`
  },
  {
    delay: 1,
    subject: 'Hvorfor jeg bygde dette (det ærlige svaret)',
    body: `Hei [navn],

Jeg vil fortelle deg hvorfor jeg bygde The 72 Blueprint — fordi det ikke er den åpenbare grunnen.

Det var ikke fordi jeg selv opplevde et tap, eller fordi jeg jobbet med arv juridisk. Det var fordi jeg gjentatte ganger la merke til det samme mønsteret: mennesker som hadde livet sitt godt organisert — riktig forsikring, testament, pensjon — hadde ikke gjort noe som helst med det digitale.

E-postkontoer med 20 år med korrespondanse. Sky-lagring med tusenvis av uerstattelige bilder. Abonnementer som fortsatte å trekke i månedsvis etter et dødsfall.

Og familier — i den vanskeligste perioden — som måtte navigere dette alene.

Problemet er ikke at folk ikke bryr seg. Det er at ingen har vist dem et klart, praktisk system for å håndtere det. Så jeg bygde ett.

I morgen — det spesifikke problemet som de fleste oppdager for sent. Det handler om to-faktor-autentisering.

Ha det godt,
Hanne`
  },
  {
    delay: 3,
    subject: 'Den stille blokkeren: passord er ikke nok',
    body: `Hei [navn],

Her er en situasjon som utspiller seg oftere enn du tror:

Et familiemedlem faller fra. De etterlatte har passordene. Så prøver de å logge inn på e-postkontoen.

To-faktor-autentisering slår inn. En kode sendes til den avdødes telefon. En telefon som er slått av, eller har fått SIM-kortet deaktivert.

Koden ankommer aldri. Og nå er alle kontoer som bruker den e-posten til passordtilbakestilling utilgjengelige. Alt.

Løsningen er backup-koder. Alle store tjenester lar deg generere engangskoder som fungerer i stedet for SMS-koden.

Slik finner du dem:
Google: myaccount.google.com → Sikkerhet → 2-trinns bekreftelse → Backup-koder
Apple: Innstillinger → Passord og sikkerhet → Gjenopprettingsnøkkel
Facebook: Innstillinger → Sikkerhet → Gjenopprettingskoder

Print de kodene denne uken. Legg dem på et sted familien din kan finne dem.

Ha det godt,
Hanne`
  },
  {
    delay: 5,
    subject: 'Hva som egentlig skjer med bildene dine når du er borte',
    body: `Hei [navn],

De fleste tror bildene deres er trygge i skyen. Og det er de — frem til kontoen blir inaktiv.

Google Photos kan begynne å slette innhold etter to år med inaktivitet. Apple iCloud Photos sletter data når kontoen lukkes — uten en Legacy Contact finnes det ingen ankeinstans.

Det praktiske svaret er to ting: sett opp Legacy Contact på både Apple og Google (fem minutter hver), og ha en fysisk backup av de viktigste bildene på en ekstern harddisk.

Én viktig ting: sørg for at familien vet at de skal laste ned alt FØR de melder dødsfallet til noen plattform. Når en minneforespørsel er sendt, fryses kontoen.

På søndag viser jeg deg det komplette systemet.

Ha det godt,
Hanne`
  },
  {
    delay: 7,
    subject: 'Det komplette Digital Legacy Blueprint — hva er inni',
    body: `Hei [navn],

Jeg vil vise deg nøyaktig hva det komplette systemet inneholder.

The Digital Legacy Blueprint er tre deler:

Del 1 — Blueprint-guiden (norsk + engelsk)
60 sider, steg for steg, plattform for plattform. De fire pilarene: Tilgang, Passord, 2FA og Den røde mappen.

Del 2 — Digital Inventory-arbeidsbok (utfyllbar PDF)
Dokumenter dine enheter, kontoer, finansielle tjenester og abonnementer. Fullføres på én ettermiddag.

Del 3 — Legacy Kit (arvingsmaler)
Brev til dine kjære, arvingsjekkliste (første 24 timer, første uke, første måned), printbare klistremerker.

Den komplette pakken er $57 — én enkelt betaling, øyeblikkelig nedlasting, livstids oppdateringer.

→ Kjøp det komplette systemet: [LENKE TIL SALGSSIDE]

30-dagers pengene-tilbake-garanti. Ingen spørsmål.

Ha det godt,
Hanne`
  },
  {
    delay: 10,
    subject: '"Jeg ordner det senere" — en kommentar til det',
    body: `Hei [navn],

Det vanligste jeg hører fra folk som ikke har kjøpt ennå er: "Jeg tar det etter hvert."

To ting er verdt å si ærlig.

Det første: "etterhvert" er når de viktigste tingene slutter å eksistere. Spørsmålet er om digital arv noensinne blir viktigere enn det er akkurat nå.

Det andre: dette tar én ettermiddag. To til tre timer, én gang. Deretter oppdateres det én gang i året og eksisterer stille resten av livet ditt.

→ Kjøp det komplette systemet: [LENKE TIL SALGSSIDE]

Ha det godt,
Hanne`
  },
  {
    delay: 14,
    subject: 'Siste melding fra meg om dette',
    body: `Hei [navn],

Dette er den siste e-posten i denne serien.

De fleste har over 100 digitale kontoer. De fleste etterlater seg ingenting for å hjelpe familien med å få tilgang til dem. Resultatet er måneder med frustrasjon, tapte minner og i noen tilfeller permanent tap av verdier.

Løsningen krever én ettermiddag, en utfylt arbeidsbok og en mappe.

→ The 72 Blueprint — $57, øyeblikkelig nedlasting, livstids oppdateringer: [LENKE TIL SALGSSIDE]

Ta vare på deg selv — og dem som en dag vil trenge de nøklene.

Hanne`
  }
];

// ─── SEKVENS B: Starter-kjøper ($29) → upsell til Complete ───────────────────

const seqStarter = [
  {
    delay: 0,
    subject: 'Velkommen — Blueprint-guiden er klar',
    body: `Hei [navn],

Takk for at du kjøpte Digital Legacy Blueprint. Guiden er klar til nedlasting.

→ Last ned her: [GUMROAD NEDLASTNINGSLENKE]

Begynn med kapittel 2 — De fire pilarene. Og gjør én ting i dag: sett opp Legacy Contact på iPhone (Innstillinger → Ditt navn → Passord og sikkerhet → Legacy Contact).

Et tips: Starter-pakken inkluderer Blueprint-guiden. Mange oppdager at arbeidsboken og arvingsmalene er det som gjør systemet komplett — de gjør det mulig å faktisk etterlate et veikart. Du kan oppgradere de neste 7 dagene og betale kun differansen ($28).

Ha det godt,
Hanne`
  },
  {
    delay: 3,
    subject: 'Du mangler halvparten av systemet',
    body: `Hei [navn],

Guiden forteller deg hva du skal gjøre. Men de to andre delene er det som gjør at det faktisk skjer:

Digital Inventory-arbeidsboken er der du skriver ned alt — enheter, kontoer, finansielle tjenester, abonnementer. Uten den er det du gjør bare lesing. Med den har familien et komplett dokument å følge.

Legacy Kit er arvingsmalene — brevet til dine kjære, 24-timers-sjekklisten og klistremerker til safe og ruter.

Du kan oppgradere nå for $28 (differansen).

→ Oppgrader til Complete: [LENKE TIL SALGSSIDE]

Ha det godt,
Hanne`
  },
  {
    delay: 7,
    subject: 'Siste sjanse: oppgrader til komplett system ($28)',
    body: `Hei [navn],

Siste påminnelse om oppgraderingstilbudet — $28 for hele systemet.

→ Oppgrader her: [LENKE TIL SALGSSIDE]

Etter i dag er prisen tilbake til full pris ($57).

Uansett hva du bestemmer: takk for at du tok det første steget.

Ha det godt,
Hanne`
  }
];

// ─── SEKVENS C: Complete-kjøper ($57) → onboarding + testimonial ─────────────

const seqComplete = [
  {
    delay: 0,
    subject: 'Velkommen — alt er klart for nedlasting ⚓',
    body: `Hei [navn],

Takk for at du kjøpte det komplette systemet. Alt er klart.

→ Last ned alle filene her: [GUMROAD NEDLASTNINGSLENKE]

Hva som er inkludert:
– Digital Legacy Blueprint (norsk + engelsk)
– Digital Inventory-arbeidsbok (norsk + engelsk)
– Legacy Kit: arvingsmaler (norsk + engelsk)

Begynn med: åpne Digital Inventory og fyll ut Seksjon 1 — Mine enheter. Ti minutter. Det er det viktigste startpunktet.

Du har livstids tilgang til oppdateringer. Spørsmål? Svar på denne e-posten.

Ha det godt,
Hanne`
  },
  {
    delay: 7,
    subject: 'Sjekk-inn: hvordan går det?',
    body: `Hei [navn],

En uke siden du lastet ned — hvordan går det med systemet?

De fleste bruker første økt på enhetene (Seksjon 1) og e-postkontoene (Seksjon 2). Legacy Contact og backup-koder er det som gir mest ro med én gang.

Er du fast på noe? Svar på denne e-posten.

Ha det godt,
Hanne`
  },
  {
    delay: 30,
    subject: 'En liten forespørsel',
    body: `Hei [navn],

En måned har gått. Hjalp systemet?

Hvis du har jobbet deg gjennom det og synes det var nyttig, vil jeg gjerne ha en kort tilbakemelding — noen setninger om hva som fungerte. Svar direkte på denne e-posten. Jeg spør alltid om tillatelse før jeg bruker noe på nettsiden.

Ha det godt,
Hanne`
  }
];

// ─── SEKVENS D: Premium-kjøper ($87) → VIP + affiliate ───────────────────────

const seqPremium = [
  {
    delay: 0,
    subject: 'Velkommen — Premium-tilgang + bonus-guide klar',
    body: `Hei [navn],

Takk for at du valgte Premium. Du har det komplette systemet, bonus-guiden og prioritert støtte de neste 30 dagene.

→ Last ned alle filene her: [GUMROAD NEDLASTNINGSLENKE]
→ Video-gjennomgang: [LENKE TIL VIDEO]
→ Krypto- og 2FA-guide: [LENKE TIL BONUS]

Prioritert støtte: svar på denne e-posten med spørsmål — jeg svarer innen 24 timer på hverdager.

Ha det godt,
Hanne`
  },
  {
    delay: 30,
    subject: 'Vil du dele dette med andre?',
    body: `Hei [navn],

En måned siden du fikk Premium-pakken.

To ting: om systemet var nyttig setter jeg pris på noen setninger om hva som fungerte — svar direkte her.

Og: The 72 Blueprint har nå et affiliateprogram. Hvis du kjenner noen som burde ha dette, kan du anbefale det med din personlige lenke og få 30% kommisjon ($17 per Complete-salg).

→ Registrer deg som affiliate: [GUMROAD AFFILIATE-LENKE]

Ha det godt,
Hanne`
  }
];

// ─── Send én e-post via Resend ────────────────────────────────────────────────

async function sendOne(to, name, template) {
  const body = template.body.replace(/\[navn\]/g, name);
  const payload = {
    from: FROM,
    to: [to],
    subject: template.subject,
    html: buildHtml(name, body)
  };
  const sat = scheduleAt(template.delay);
  if (sat) payload.scheduledAt = sat;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(data));
  return data;
}

// ─── Velg sekvens basert på pris ─────────────────────────────────────────────

function pickSequence(price) {
  const p = parseInt(price || '0');
  if (p === 0)    return seqLeadMagnet;
  if (p < 4000)   return seqStarter;   // $29 = 2900 cents
  if (p < 7000)   return seqComplete;  // $57 = 5700 cents
  return seqPremium;                   // $87 = 8700 cents
}

// ─── Hoved-handler ───────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const b = req.body || {};
  const email = b.email;
  const name  = (b.first_name || b.full_name || 'deg').split(' ')[0];
  const price = b.price;

  if (!email) {
    return res.status(400).json({ error: 'No email in payload' });
  }

  const seq = pickSequence(price);
  const results = [];

  for (const tmpl of seq) {
    try {
      const r = await sendOne(email, name, tmpl);
      results.push({ day: tmpl.delay, status: 'ok', id: r.id });
    } catch (err) {
      console.error(`Day ${tmpl.delay} failed:`, err.message);
      results.push({ day: tmpl.delay, status: 'error', error: err.message });
    }
  }

  const failed = results.filter(r => r.status === 'error').length;
  console.log(`[72BP] ${email} → ${seq.length} emails, ${failed} failed`);

  return res.status(200).json({ ok: true, email, total: seq.length, failed, results });
};

module.exports.config = {
  api: { bodyParser: true }
};
