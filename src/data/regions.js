// Region grouping for the destination filter. The data file has no region field, so it is derived here
// by matching keywords against the destination name. Anything unmatched falls into "Others".
export const REGIONS = [
  {
    id: 'kerala-tn',
    label: 'Kerala & Tamil Nadu',
    keywords: [
      'kerala', 'munnar','Marayur', 'thekkady', 'periyar', 'alleppey', 'alappuzha', 'kovalam', 'varkala', 'wayanad', 'vagamon',
      'athirappilly', 'kochi', 'cochin', 'kumarakom', 'kollam', 'trivandrum', 'thiruvananthapuram', 'guruvayur',
      'ponmudi', 'idukki', 'kozhikode', 'calicut', 'thrissur', 'kannur', 'bekal', 'sabarimala', 'poovar',
      'tamil', 'kanyakumari', 'rameshwaram', 'rameswaram', 'madurai', 'ooty', 'udhagamandalam', 'kodaikanal',
      'palani', 'velankanni', 'chennai', 'mahabalipuram', 'thanjavur', 'coimbatore', 'yercaud',
    ],
  },
  {
    id: 'karnataka',
    label: 'Karnataka',
    keywords: [
      'karnataka', 'mysore', 'mysuru', 'coorg', 'kodagu', 'bangalore', 'bengaluru', 'hampi', 'gokarna', 'udupi',
      'mangalore', 'mangaluru', 'chikmanglore', 'murudeshwar', 'dharmasthala', 'kabini', 'belur', 'halebidu',
    ],
  },
]

export const OTHER_REGION = { id: 'others', label: 'Others' }

export function regionFor(destinationName) {
  const name = destinationName.toLowerCase()
  return REGIONS.find((region) => region.keywords.some((keyword) => name.includes(keyword))) ?? OTHER_REGION
}
