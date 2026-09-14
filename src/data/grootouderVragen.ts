export type VraagGroep = {
  id: string;
  titel: string;
  vragen: { id: string; vraag: string; lang?: boolean }[];
};

// Dezelfde vragen als in het Grootouderboek van Simonne Vandeputte
export const grootouderVraagGroepen: VraagGroep[] = [
  {
    id: "afkomst",
    titel: "Uw afkomst",
    vragen: [
      { id: "geboorte", vraag: "Waar, wanneer en onder welke omstandigheden bent u geboren?", lang: true },
      { id: "namen", vraag: "Welke namen kreeg u? Was u naar iemand vernoemd?" },
      { id: "ouders", vraag: "Hoe heetten uw ouders, uit welke streek waren ze afkomstig en wat was hun beroep?", lang: true },
      { id: "broerszussen", vraag: "Had u broers en zusters?", lang: true },
    ],
  },
  {
    id: "thuis",
    titel: "Thuis, ouders en godsdienst",
    vragen: [
      { id: "gezellig", vraag: "Was het gezellig thuis? Werden er spelletjes gedaan, voorgelezen, muziek gemaakt?", lang: true },
      { id: "streng", vraag: "Waren uw ouders streng?" },
      { id: "uitstap", vraag: "Ging u met het gezin wel eens een dagje uit? Hoe? Waarheen?" },
      { id: "godsdienst", vraag: "Welke rol speelde godsdienst in het gezinsleven?" },
    ],
  },
  {
    id: "welstand",
    titel: "Welstand, grootouders en hoogtepunten",
    vragen: [
      { id: "armrijk", vraag: "Waren uw ouders arm of rijk? Heeft dit voor u een rol gespeeld?" },
      { id: "grootouders", vraag: "Hebt u uw grootouders gekend?", lang: true },
      { id: "oomstantes", vraag: "Had u ook 'speciale' ooms en tantes?" },
      { id: "hoogtepunten", vraag: "Herinnert u zich hoogtepunten uit het gezinsleven?", lang: true },
      { id: "dieptepunten", vraag: "Dieptepunten?", lang: true },
      { id: "vakanties", vraag: "Vakanties met het hele gezin?" },
    ],
  },
  {
    id: "kindertijd",
    titel: "Uw kindertijd (2-12 jaar)",
    vragen: [
      { id: "woonhuis", vraag: "Waar woonde u in uw kinderjaren? Bestaat het huis nog?", lang: true },
      { id: "personeel", vraag: "Waren er in die tijd nog dienstmeisjes of ander huishoudelijk personeel?" },
      { id: "huisdier", vraag: "Had u een huisdier?" },
      { id: "speelgoed", vraag: "Welk speelgoed had u? Waarmee speelde u het liefst?", lang: true },
    ],
  },
  {
    id: "tienerjaren",
    titel: "De tienerjaren (10-20 jaar)",
    vragen: [
      { id: "taken", vraag: "Welke taken had u thuis?" },
      { id: "zakgeld", vraag: "Kreeg u zakgeld?" },
      { id: "vervoer", vraag: "Van welke vervoermiddelen werd er bij u thuis gebruik gemaakt?" },
      { id: "onderwijs", vraag: "Heeft u voortgezet onderwijs gevolgd en hoe lang?", lang: true },
      { id: "vakken", vraag: "Welke vakken vond u het leukst?" },
      { id: "sport", vraag: "Deed u aan sport?" },
      { id: "muziek", vraag: "Speelde u een muziekinstrument? Waarom juist dat instrument?" },
      { id: "toneelclub", vraag: "Deed u mee in toneelstukjes of muziekuitvoeringen? Was u lid van een club?", lang: true },
      { id: "liedjes", vraag: "Welke liedjes waren populair? Zat u op dansles?" },
      { id: "kleding", vraag: "Hoe was u gekleed?" },
    ],
  },
  {
    id: "liefde",
    titel: "Invloeden, eerste liefde en huwelijk",
    vragen: [
      { id: "invloeden", vraag: "Waren er mensen of zaken die van invloed waren op uw denken en handelen indertijd?", lang: true },
      { id: "eersteliefde", vraag: "Wie was uw eerste liefde? Hoe hebt u elkaar leren kennen?", lang: true },
      { id: "partner", vraag: "Hoe hebt u uw echtgenoot of echtgenote ontmoet?", lang: true },
      { id: "huwelijk", vraag: "Wanneer en waar bent u getrouwd? Hoe verliep die dag?", lang: true },
      { id: "kinderen", vraag: "Welke kinderen kreeg u en wanneer werden zij geboren?", lang: true },
    ],
  },
  {
    id: "werk",
    titel: "Werk en gewoonten",
    vragen: [
      { id: "eerstewerk", vraag: "Wat was uw eerste werk? Hoe oud was u toen?", lang: true },
      { id: "beroepen", vraag: "Welke beroepen hebt u later uitgeoefend?", lang: true },
      { id: "tradities", vraag: "Welke familietradities en feesten herinnert u zich (Sinterklaas, Nieuwjaar, kermis)?", lang: true },
    ],
  },
  {
    id: "oorlog",
    titel: "Oorlog en grote gebeurtenissen",
    vragen: [
      { id: "oorlogsherinnering", vraag: "Welke herinneringen hebt u aan de oorlog of andere ingrijpende gebeurtenissen?", lang: true },
      { id: "vroegernu", vraag: "Wat is het grootste verschil tussen het leven van vroeger en nu?", lang: true },
      { id: "boodschap", vraag: "Welke boodschap wilt u aan uw kleinkinderen meegeven?", lang: true },
    ],
  },
];

export const alleVragen = grootouderVraagGroepen.flatMap((g) =>
  g.vragen.map((v) => ({ ...v, groep: g.titel }))
);
