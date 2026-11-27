// China in Numbers — the figures behind this site.
// All figures are for 2024 unless a year is named, and every value below
// was checked against the National Bureau of Statistics of China (NBS),
// the General Administration of Customs (GACC), the China Association of
// Automobile Manufacturers (CAAM) or the National Energy Administration
// (NEA). GDP and sector values are the NBS preliminary estimates published
// in January 2025; the NBS later revised 2024 GDP slightly, to 134,806.6
// billion yuan (final verification, December 2025). This site keeps the
// preliminary series so every year in a chart comes from the same release.

export const COUNTRY = {
  name: 'China',
  edition: '2024 edition',
  updated: 'Figures as published January–February 2025',
  note: 'Preliminary NBS estimates for 2024. See the Sources page for every figure.',
};

export const SOURCES = [
  { short: 'NBS', full: 'National Bureau of Statistics of China, Statistical Communiqué on the 2024 National Economic and Social Development, 28 February 2025, and “National economy witnessed steady progress… in 2024”, 17 January 2025.' },
  { short: 'GACC', full: 'General Administration of Customs of China, briefing on imports and exports in 2024, 13 January 2025; China–EU trade data via GACC as reported by Global Times, 14 January 2025.' },
  { short: 'CAAM', full: 'China Association of Automobile Manufacturers, 2024 vehicle production and sales, January 2025.' },
  { short: 'NEA', full: 'National Energy Administration, 2024 installed capacity and power generation, reported January 2025; generation mix from the China Energy Data Report 2025 (China Energy Media Research Institute, June 2025), NEA data; renewable capacity history from NEA releases.' },
];

// Total goods trade, trillion yuan, GACC. 2019 is the GACC annual figure.
export const TRADE_SERIES = [
  { year: 2019, total: 31.54 },
  { year: 2020, total: 32.16 },
  { year: 2021, total: 39.10 },
  { year: 2022, total: 42.07 },
  { year: 2023, total: 41.76 },
  { year: 2024, total: 43.85 },
];

// Installed renewable capacity at year-end, GW (hydro, wind, solar,
// biomass and pumped storage), NEA. 2023: 1,516.4 GW per the China
// Renewable Energy Engineering Institute; 2024: 1,890 GW (NEA).
export const RENEWABLE_SERIES = [
  { year: 2019, total: 794 },
  { year: 2020, total: 934 },
  { year: 2021, total: 1063 },
  { year: 2022, total: 1213 },
  { year: 2023, total: 1516 },
  { year: 2024, total: 1890 },
];

// Population by age and by urban/rural, end-2024, millions (NBS communiqué,
// Table 1). The 65+ group is inside the 60+ group, not an extra segment.
export const POP_AGE_2024 = [
  { name: 'Aged 0–15 (under 16)', value: 239.99, display: '239.99m', note: '17.1% of the population' },
  { name: 'Aged 16–59 (working age)', value: 857.98, display: '857.98m', note: '60.9% of the population' },
  { name: 'Aged 60 and above', value: 310.31, display: '310.31m', note: '22.0% of the population, of which 220.23m are 65+' },
];

export const URBAN_RURAL_2024 = [
  { name: 'Urban permanent residents', value: 943.50, display: '943.50m', note: 'Urbanisation rate 67.0%' },
  { name: 'Rural permanent residents', value: 464.78, display: '464.78m', note: '33.0% of the population' },
];

// Goods trade with the largest partners, 2024, trillion yuan (GACC).
// The US yuan value is implied by the reported +4.9% growth on the 2023
// value of ¥4.67 trillion; ASEAN and EU values are as reported.
export const TRADE_PARTNERS_2024 = [
  { name: 'ASEAN', value: 6.99, display: '¥6.99tn', note: 'Largest partner, 5th year running; +9.0% on 2023' },
  { name: 'European Union', value: 5.59, display: '¥5.59tn', note: 'Second-largest partner; +1.6% on 2023' },
  { name: 'United States', value: 4.90, display: '≈¥4.90tn', note: 'Third-largest partner; +4.9% on 2023' },
  { name: 'Belt and Road partners', value: 22.06, display: '¥22.06tn', note: '50.3% of all goods trade, +6.4%; overlaps the three above' },
];

// What China sold abroad in 2024, trillion yuan (GACC). Mechanical and
// electrical products were 59.4% of exports and grew 8.7%.
export const TRADE_PRODUCTS_2024 = [
  { name: 'Mechanical & electrical exports', value: 15.12, display: '¥15.12tn', note: '59.4% of exports; +8.7% on 2023' },
  { name: 'All other exports', value: 10.33, display: '¥10.33tn', note: '40.6% of exports' },
];

// Electricity actually generated in 2024, billion kWh (NEA, via the China
// Energy Data Report 2025). Total 10,086.88 billion kWh, +6.7%.
export const ENERGY_GENERATION_2024 = [
  { name: 'Thermal (mostly coal)', value: 6374.26, display: '6,374bn kWh', note: '63.2% of generation; +1.7% on 2023' },
  { name: 'Hydropower', value: 1425.68, display: '1,426bn kWh', note: '14.1% of generation; +10.9%' },
  { name: 'Wind', value: 997.04, display: '997bn kWh', note: '9.9% of generation; +12.5%' },
  { name: 'Solar', value: 839.04, display: '839bn kWh', note: '8.3% of generation; +43.6%' },
  { name: 'Nuclear', value: 450.85, display: '451bn kWh', note: '4.5% of generation; +3.7%' },
];

// Installed power capacity at end-2024, million kW (NEA). Total 3,348.62.
export const ENERGY_CAPACITY_2024 = [
  { name: 'Thermal', value: 1444.45, display: '1,444m kW', note: '43.1% of capacity; +3.8% on 2023' },
  { name: 'Solar', value: 886.66, display: '887m kW', note: '26.5% of capacity; +45.2%' },
  { name: 'Wind', value: 520.68, display: '521m kW', note: '15.5% of capacity; +18.0%' },
  { name: 'Hydropower', value: 435.95, display: '436m kW', note: '13.0% of capacity; +3.2%' },
  { name: 'Nuclear', value: 60.83, display: '61m kW', note: '1.8% of capacity; +6.9%' },
];

// GDP in billion yuan, current prices, NBS preliminary series.
export const GDP_SERIES = [
  { year: 2019, total: 100587.2, growth: 6.0 },
  { year: 2020, total: 103486.8, growth: 2.2 },
  { year: 2021, total: 117382.3, growth: 8.6 },
  { year: 2022, total: 123402.9, growth: 3.0 },
  { year: 2023, total: 129427.2, growth: 5.2 },
  { year: 2024, total: 134908.4, growth: 5.0 },
];

export const SECTORS_2024 = [
  { name: 'Primary industry', value: 9141.4, growth: 3.5, what: 'Agriculture, forestry, animal husbandry and fishery.' },
  { name: 'Secondary industry', value: 49208.7, growth: 5.3, what: 'Industry and construction.' },
  { name: 'Tertiary industry', value: 76558.3, growth: 5.0, what: 'Services, from retail and transport to finance and software.' },
];

// Population at year-end, millions, NBS.
export const POPULATION_SERIES = [
  { year: 2019, total: 1410.08 },
  { year: 2020, total: 1412.12 },
  { year: 2021, total: 1412.60 },
  { year: 2022, total: 1411.75 },
  { year: 2023, total: 1409.67 },
  { year: 2024, total: 1408.28 },
];

export const TOPICS = [
  {
    id: 'population', title: 'Population', route: '#/population', icon: '◉',
    headline: '1,408.28 million people',
    sub: 'At the end of 2024, down 1.39 million on a year earlier — the third straight annual fall.',
    source: 'NBS',
    kpis: [
      { label: 'Population, end-2024', value: '1,408.28m', note: '−1.39m vs end-2023' },
      { label: 'Births in 2024', value: '9.54m', note: 'Up from 9.02m in 2023' },
      { label: 'Change on 2023', value: '−0.10%', note: 'Population fell for a third year' },
    ],
    points: [
      'Births rose in 2024, to 9.54 million from 9.02 million in 2023, but deaths still outnumbered births, so the total fell by 1.39 million.',
      'The peak was 2021, at 1,412.60 million. Every year since has been lower.',
      'Two in three people now live in towns and cities: 943.50 million urban residents, a 67.0% urbanisation rate. The working-age group (16–59) is 857.98 million, 60.9% of the total; 310.31 million people, 22.0%, are 60 or older, and 220.23 million, 15.6%, are 65 or older.',
      'A shrinking population does not mean a shrinking economy: output per person rose 5.1% in real terms in 2024, to 95,749 yuan.',
    ],
  },
  {
    id: 'economy', title: 'Economy & GDP', route: '#/economy', icon: '▦',
    headline: 'GDP 134,908.4 billion yuan',
    sub: 'Up 5.0% in real terms in 2024, meeting the year’s target of around 5%.',
    source: 'NBS',
    kpis: [
      { label: 'GDP, 2024', value: '¥134,908.4bn', note: 'About $18.8 trillion' },
      { label: 'Real growth', value: '+5.0%', note: 'Q4 grew 5.4% year on year' },
      { label: 'GDP per person', value: '¥95,749', note: 'Up 5.1% in real terms' },
    ],
    points: [
      'Services are now the largest part of the economy: 76,558.3 billion yuan, or about 57% of GDP. Industry and construction added 49,208.7 billion, farming 9,141.4 billion.',
      'Retail sales of consumer goods reached 48.79 trillion yuan in 2024, up 3.5% — spending grew more slowly than output.',
      'Industrial output of larger firms grew 5.8% in 2024, faster than GDP as a whole.',
    ],
  },
  {
    id: 'employment', title: 'Jobs & Income', route: '#/employment', icon: '⚒',
    headline: '12.56 million new urban jobs',
    sub: 'The surveyed urban unemployment rate averaged 5.1% in 2024.',
    source: 'NBS',
    kpis: [
      { label: 'New urban jobs', value: '12.56m', note: '+120,000 on 2023' },
      { label: 'Surveyed jobless rate', value: '5.1%', note: 'Average for 2024; 5.0% in 31 major cities in Dec' },
      { label: 'Disposable income per person', value: '¥41,314', note: '+5.3% nominal, +5.1% real' },
    ],
    points: [
      'The jobless rate averaged 5.1% in 2024, 0.1 points lower than in 2023. In December it was also 5.1%.',
      'Income per person rose faster than prices: 41,314 yuan, up 5.3% in cash terms and 5.1% after inflation.',
      'Urban jobs are the headline the government watches: 12.56 million new ones in 2024 beat the year’s target.',
    ],
  },
  {
    id: 'prices', title: 'Prices', route: '#/prices', icon: '¥',
    headline: 'Consumer prices +0.2%',
    sub: 'Inflation stayed near zero in 2024; factory-gate prices fell for a second year.',
    source: 'NBS',
    kpis: [
      { label: 'CPI, 2024', value: '+0.2%', note: 'Consumer prices, year on year' },
      { label: 'PPI, 2024', value: '−2.2%', note: 'Producer prices, year on year' },
      { label: 'CPI in December', value: '+0.1%', note: 'Year on year; flat month on month' },
    ],
    points: [
      'A CPI rise of 0.2% is the lowest annual consumer inflation in years, and it followed weak demand and falling food and energy prices.',
      'Producer prices fell 2.2% in 2024, which squeezes factory margins even as it keeps consumer prices down.',
      'For a household, the practical read is simple: prices barely moved in 2024, so the 5.1% real rise in incomes was almost all extra spending power.',
    ],
  },
  {
    id: 'trade', title: 'Trade', route: '#/trade', icon: '⇄',
    headline: 'Goods trade ¥43.85 trillion',
    sub: 'A record year: exports 25.45 trillion yuan, imports 18.39 trillion.',
    source: 'GACC',
    kpis: [
      { label: 'Total goods trade', value: '¥43.85tn', note: '+5.0% on 2023, a record' },
      { label: 'Exports', value: '¥25.45tn', note: '+7.1%; first year above ¥25tn' },
      { label: 'Imports', value: '¥18.39tn', note: '+2.3%; goods surplus ¥7.06tn' },
    ],
    points: [
      'Exports grew 7.1% to 25.45 trillion yuan, passing 25 trillion for the first time. Mechanical and electrical products rose 8.7% and made up 59.4% of exports.',
      'Imports grew more slowly, 2.3% to 18.39 trillion yuan, leaving a goods surplus of about 7.06 trillion yuan.',
      'ASEAN is the largest trading partner for the fifth year running, at 6.99 trillion yuan, followed by the EU at 5.59 trillion and the US at about 4.90 trillion. Trade with Belt and Road partners passed half of all goods trade, at 50.3%.',
      'China stayed the world’s largest goods trader: its exports were 14.5% and its imports 10.5% of the world total in the first three quarters of 2024 (WTO, via GACC).',
    ],
  },
  {
    id: 'energy', title: 'Energy & Green', route: '#/energy', icon: '☀',
    headline: 'Renewables are 56% of capacity',
    sub: 'Installed renewable capacity reached 1.89 billion kW at the end of 2024.',
    source: 'NEA / CAAM',
    kpis: [
      { label: 'Renewable capacity', value: '1.89bn kW', note: '56% of all installed capacity' },
      { label: 'Total power generation', value: '10,087bn kWh', note: '+6.7% on 2023' },
      { label: 'New-energy vehicles built', value: '12.89m', note: '+34.4%; 40.9% of new car sales' },
    ],
    points: [
      'Total installed power capacity reached 3,349 GW at the end of 2024, up 14.6%. Solar stood at 887 million kW, wind at 521 million kW, hydro at 436 million kW, thermal at 1,444 million kW and nuclear at 61 million kW.',
      'Capacity is not generation. Thermal plants produced 6,374 billion kWh in 2024 — 63.2% of all electricity — while solar, 26.5% of capacity, generated 8.3%, because the sun does not shine all day. Wind generated 9.9% and hydro 14.1%.',
      'Primary energy production was 4.98 billion tonnes of standard coal equivalent in 2024, up 4.6%. Raw coal output was 4.76 billion tonnes.',
      'New-energy vehicle output (12.89 million) and sales (12.87 million) each passed 12 million for the first time, leading the world for a tenth straight year.',
    ],
  },
];

// Indicator index used by the overview search box.
export const INDICATORS = [
  { name: 'GDP', value: '¥134,908.4bn', change: '+5.0% real', topic: 'economy' },
  { name: 'GDP per person', value: '¥95,749', change: '+5.1% real', topic: 'economy' },
  { name: 'Population', value: '1,408.28m', change: '−1.39m', topic: 'population' },
  { name: 'Births', value: '9.54m', change: 'up from 9.02m', topic: 'population' },
  { name: 'New urban jobs', value: '12.56m', change: '+120,000', topic: 'employment' },
  { name: 'Surveyed unemployment', value: '5.1%', change: '−0.1 pts', topic: 'employment' },
  { name: 'Disposable income per person', value: '¥41,314', change: '+5.1% real', topic: 'employment' },
  { name: 'Consumer prices (CPI)', value: '+0.2%', change: '2024', topic: 'prices' },
  { name: 'Producer prices (PPI)', value: '−2.2%', change: '2024', topic: 'prices' },
  { name: 'Goods exports', value: '¥25.45tn', change: '+7.1%', topic: 'trade' },
  { name: 'Goods imports', value: '¥18.39tn', change: '+2.3%', topic: 'trade' },
  { name: 'Total goods trade', value: '¥43.85tn', change: '+5.0%', topic: 'trade' },
  { name: 'Renewable capacity', value: '1.89bn kW', change: '56% of total', topic: 'energy' },
  { name: 'Power generation', value: '10,087bn kWh', change: '+6.7%', topic: 'energy' },
  { name: 'New-energy vehicles built', value: '12.89m', change: '+34.4%', topic: 'energy' },
  { name: 'Retail sales', value: '¥48.79tn', change: '+3.5%', topic: 'economy' },
];
