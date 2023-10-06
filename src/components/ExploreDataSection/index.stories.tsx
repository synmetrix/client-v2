import RootLayout from "@/layouts/RootLayout";

import ExploreDataSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreDataSection",
  component: ExploreDataSection,
} as Meta<typeof ExploreDataSection>;

const Template: StoryFn<typeof ExploreDataSection> = (args) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <RootLayout>
      <ExploreDataSection
        {...args}
        isActive={isActive}
        onToggleSection={() => setIsActive((prev) => !prev)}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  width: 825,
  selectedQueryMembers: {
    measures: [],
    dimensions: [
      {
        index: 0,
        isVisible: true,
        name: "Airports.airportid",
        shortTitle: "Airportid",
        suggestFilterValues: true,
        title: "Airports Airportid",
        type: "string",
      },
      {
        index: 1,
        isVisible: true,
        name: "Airports.name",
        shortTitle: "Name",
        suggestFilterValues: true,
        title: "Airports Name",
        type: "string",
      },
      {
        index: 2,
        isVisible: true,
        name: "Airports.city",
        shortTitle: "City",
        suggestFilterValues: true,
        title: "Airports City",
        type: "string",
      },
    ],
    segments: [],
    timeDimensions: [],
    filters: [],
  },
  disabled: true,
  state: {
    modelingSection: "modelDefinition",
    dataSection: "results",
    filtersCount: 0,
    experimentsCount: 0,
  },
  queryState: {
    loading: false,
    progress: {},
    hitLimit: true,
    columns: [
      {
        id: "Airports.airportid",
        Header: "Airports Airportid",
        colId: "Airports.airportid",
        type: "string",
      },
      {
        id: "Airports.name",
        Header: "Airports Name",
        colId: "Airports.name",
        type: "string",
      },
      {
        id: "Airports.city",
        Header: "Airports City",
        colId: "Airports.city",
        type: "string",
      },
    ],
    rows: [
      {
        "Airports.airportid": "9796",
        "Airports.city": "ELLIOT LAKE",
        "Airports.name": "Elliot Lake Municipal Airport",
      },
      {
        "Airports.airportid": "4092",
        "Airports.city": "Santarem",
        "Airports.name": "Maestro Wilson Fonseca Airport",
      },
      {
        "Airports.airportid": "7383",
        "Airports.city": "Guarapuava",
        "Airports.name": "Tancredo Thomas de Faria Airport",
      },
      {
        "Airports.airportid": "2607",
        "Airports.city": "Porto Velho",
        "Airports.name": "Governador Jorge Teixeira de Oliveira Airport",
      },
      {
        "Airports.airportid": "11828",
        "Airports.city": "Fort Belvoir",
        "Airports.name": "Davison Army Air Field",
      },
      {
        "Airports.airportid": "358",
        "Airports.city": "Worms",
        "Airports.name": "Worms Airport",
      },
      {
        "Airports.airportid": "12051",
        "Airports.city": "",
        "Airports.name": "Baruun Urt Airport",
      },
      {
        "Airports.airportid": "7610",
        "Airports.city": "Whitianga",
        "Airports.name": "Whitianga Airport",
      },
      {
        "Airports.airportid": "6299",
        "Airports.city": "Mount Magnet",
        "Airports.name": "Mount Magnet Airport",
      },
      {
        "Airports.airportid": "3932",
        "Airports.city": "Chiang Rai",
        "Airports.name": "Chiang Rai International Airport",
      },
      {
        "Airports.airportid": "5935",
        "Airports.city": "Ardabil",
        "Airports.name": "Ardabil Airport",
      },
      {
        "Airports.airportid": "8111",
        "Airports.city": "Rinteln",
        "Airports.name": "Rinteln Airport",
      },
      {
        "Airports.airportid": "13599",
        "Airports.city": "The Granites",
        "Airports.name": "The Granites Airport",
      },
      {
        "Airports.airportid": "5736",
        "Airports.city": "Elko",
        "Airports.name": "Elko Regional Airport",
      },
      {
        "Airports.airportid": "2878",
        "Airports.city": "Fort-de-france",
        "Airports.name": "Martinique Aimé Césaire International Airport",
      },
      {
        "Airports.airportid": "2981",
        "Airports.city": "Samarkand",
        "Airports.name": "Samarkand Airport",
      },
      {
        "Airports.airportid": "8874",
        "Airports.city": "Phoenix",
        "Airports.name": "Ak-Chin Regional Airport",
      },
      {
        "Airports.airportid": "7059",
        "Airports.city": "Jamestown",
        "Airports.name": "Chautauqua County-Jamestown Airport",
      },
      {
        "Airports.airportid": "2179",
        "Airports.city": "Abu Dhabi",
        "Airports.name": "Abu Dhabi International Airport",
      },
      {
        "Airports.airportid": "6110",
        "Airports.city": "Solovetsky Islands",
        "Airports.name": "Solovki Airport",
      },
      {
        "Airports.airportid": "7813",
        "Airports.city": "Malbork",
        "Airports.name": "Malbork Military Air Base",
      },
      {
        "Airports.airportid": "3719",
        "Airports.city": "Columbia",
        "Airports.name": "Columbia Regional Airport",
      },
      {
        "Airports.airportid": "3924",
        "Airports.city": "Bima",
        "Airports.name": "Muhammad Salahuddin Airport",
      },
      {
        "Airports.airportid": "248",
        "Airports.city": "Accra",
        "Airports.name": "Kotoka International Airport",
      },
      {
        "Airports.airportid": "6261",
        "Airports.city": "Cooma",
        "Airports.name": "Cooma Snowy Mountains Airport",
      },
      {
        "Airports.airportid": "8966",
        "Airports.city": "Kratie",
        "Airports.name": "Kratie Airport",
      },
      {
        "Airports.airportid": "2217",
        "Airports.city": "Panjgur",
        "Airports.name": "Panjgur Airport",
      },
      {
        "Airports.airportid": "2234",
        "Airports.city": "Basrah",
        "Airports.name": "Basrah International Airport",
      },
      {
        "Airports.airportid": "7076",
        "Airports.city": "Vernal",
        "Airports.name": "Vernal Regional Airport",
      },
      {
        "Airports.airportid": "1936",
        "Airports.city": "Bullocks Harbour",
        "Airports.name": "Great Harbour Cay Airport",
      },
      {
        "Airports.airportid": "3922",
        "Airports.city": "Tanjung Santan",
        "Airports.name": "Tanjung Santan Airport",
      },
      {
        "Airports.airportid": "152",
        "Airports.city": "Broughton Island",
        "Airports.name": "Qikiqtarjuaq Airport",
      },
      {
        "Airports.airportid": "4138",
        "Airports.city": "Al Taqaddum",
        "Airports.name": "Al Taqaddum Air Base",
      },
      {
        "Airports.airportid": "71",
        "Airports.city": "Montreal",
        "Airports.name": "Montréal / Saint-Hubert Airport",
      },
      {
        "Airports.airportid": "2556",
        "Airports.city": "Fernando Do Noronha",
        "Airports.name": "Fernando de Noronha Airport",
      },
      {
        "Airports.airportid": "3914",
        "Airports.city": "Ende",
        "Airports.name": "Ende (H Hasan Aroeboesman) Airport",
      },
      {
        "Airports.airportid": "705",
        "Airports.city": "Oskarshamn",
        "Airports.name": "Oskarshamn Airport",
      },
      {
        "Airports.airportid": "2514",
        "Airports.city": "Tandil",
        "Airports.name": "Héroes De Malvinas Airport",
      },
      {
        "Airports.airportid": "2830",
        "Airports.city": "Canaima",
        "Airports.name": "Canaima Airport",
      },
      {
        "Airports.airportid": "8138",
        "Airports.city": "Novato",
        "Airports.name": "Marin County Airport - Gnoss Field",
      },
      {
        "Airports.airportid": "1836",
        "Airports.city": "Puerto Vallarta",
        "Airports.name": "Licenciado Gustavo Díaz Ordaz International Airport",
      },
      {
        "Airports.airportid": "2283",
        "Airports.city": "Iwojima",
        "Airports.name": "Iwo Jima Airport",
      },
      {
        "Airports.airportid": "708",
        "Airports.city": "Malmoe",
        "Airports.name": "Malmö Sturup Airport",
      },
      {
        "Airports.airportid": "944",
        "Airports.city": "M'banza-congo",
        "Airports.name": "Mbanza Congo Airport",
      },
      {
        "Airports.airportid": "766",
        "Airports.city": "Kitzingen",
        "Airports.name": "Flugplatz Kitzingen",
      },
      {
        "Airports.airportid": "8860",
        "Airports.city": "Wildenrath",
        "Airports.name": "Tutow Airport",
      },
      {
        "Airports.airportid": "8974",
        "Airports.city": "Changhai",
        "Airports.name": "Changhai Airport",
      },
      {
        "Airports.airportid": "11932",
        "Airports.city": "Tocopilla",
        "Airports.name": "Barriles Airport",
      },
      {
        "Airports.airportid": "1747",
        "Airports.city": "Malacky",
        "Airports.name": "Kuchyňa Air Base",
      },
      {
        "Airports.airportid": "5857",
        "Airports.city": "Arthur's Town",
        "Airports.name": "Arthur's Town Airport",
      },
      {
        "Airports.airportid": "5693",
        "Airports.city": "Lokichoggio",
        "Airports.name": "Lokichoggio Airport",
      },
      {
        "Airports.airportid": "7204",
        "Airports.city": "Cold Bay",
        "Airports.name": "Port Moller Airport",
      },
      {
        "Airports.airportid": "3243",
        "Airports.city": "Timika",
        "Airports.name": "Moses Kilangin Airport",
      },
      {
        "Airports.airportid": "10110",
        "Airports.city": "Bubaque",
        "Airports.name": "Bubaque Airport",
      },
      {
        "Airports.airportid": "1249",
        "Airports.city": "Vitoria",
        "Airports.name": "Vitoria/Foronda Airport",
      },
      {
        "Airports.airportid": "5432",
        "Airports.city": "Misima Island",
        "Airports.name": "Misima Island Airport",
      },
      {
        "Airports.airportid": "6918",
        "Airports.city": "Ringi Cove",
        "Airports.name": "Ringi Cove Airport",
      },
      {
        "Airports.airportid": "7456",
        "Airports.city": "Raivavae",
        "Airports.name": "Raivavae Airport",
      },
      {
        "Airports.airportid": "11765",
        "Airports.city": "Port Hawkesbury",
        "Airports.name": "Port Hawkesbury Airport",
      },
      {
        "Airports.airportid": "2163",
        "Airports.city": "Zanjan",
        "Airports.name": "Zanjan Airport",
      },
      {
        "Airports.airportid": "8703",
        "Airports.city": "Barberton",
        "Airports.name": "Barberton Airport",
      },
      {
        "Airports.airportid": "2886",
        "Airports.city": "Fajardo",
        "Airports.name": "Diego Jimenez Torres Airport",
      },
      {
        "Airports.airportid": "11080",
        "Airports.city": "Elkhart",
        "Airports.name": "Elkhart Morton County Airport",
      },
      {
        "Airports.airportid": "348",
        "Airports.city": "Leipzig",
        "Airports.name": "Leipzig/Halle Airport",
      },
      {
        "Airports.airportid": "6159",
        "Airports.city": "Vorkuta",
        "Airports.name": "Vorkuta Airport",
      },
      {
        "Airports.airportid": "11673",
        "Airports.city": "William Creek",
        "Airports.name": "William Creek Airport",
      },
      {
        "Airports.airportid": "2956",
        "Airports.city": "Barnaul",
        "Airports.name": "Barnaul Airport",
      },
      {
        "Airports.airportid": "2719",
        "Airports.city": "Florencia",
        "Airports.name": "Gustavo Artunduaga Paredes Airport",
      },
      {
        "Airports.airportid": "6908",
        "Airports.city": "Brest",
        "Airports.name": "Brest Airport",
      },
      {
        "Airports.airportid": "7946",
        "Airports.city": "Tureia",
        "Airports.name": "Tureia Airport",
      },
      {
        "Airports.airportid": "1868",
        "Airports.city": "Howard",
        "Airports.name": "Panama Pacific International Airport",
      },
      {
        "Airports.airportid": "11823",
        "Airports.city": "Burley",
        "Airports.name": "Burley Municipal Airport",
      },
      {
        "Airports.airportid": "136",
        "Airports.city": "Fort Smith",
        "Airports.name": "Fort Smith Airport",
      },
      {
        "Airports.airportid": "9818",
        "Airports.city": "Lilydale",
        "Airports.name": "Lilydale Airport",
      },
      {
        "Airports.airportid": "5808",
        "Airports.city": "Middle Caicos",
        "Airports.name": "Middle Caicos Airport",
      },
      {
        "Airports.airportid": "5759",
        "Airports.city": "Hattiesburg/Laurel",
        "Airports.name": "Hattiesburg Laurel Regional Airport",
      },
      {
        "Airports.airportid": "8233",
        "Airports.city": "Burqin",
        "Airports.name": "Kanas Airport",
      },
      {
        "Airports.airportid": "9761",
        "Airports.city": "Bartica",
        "Airports.name": "Bartica A Airport",
      },
      {
        "Airports.airportid": "2549",
        "Airports.city": "Cruzeiro do Sul",
        "Airports.name": "Cruzeiro do Sul Airport",
      },
      {
        "Airports.airportid": "3282",
        "Airports.city": "Ketapang",
        "Airports.name": "Ketapang(Rahadi Usman) Airport",
      },
      {
        "Airports.airportid": "5676",
        "Airports.city": "Baco",
        "Airports.name": "Baco Airport",
      },
      {
        "Airports.airportid": "540",
        "Airports.city": "Dundee",
        "Airports.name": "Dundee Airport",
      },
      {
        "Airports.airportid": "12024",
        "Airports.city": "Forbes",
        "Airports.name": "Forbes Airport",
      },
      {
        "Airports.airportid": "828",
        "Airports.city": "Marble Hall",
        "Airports.name": "Marble Hall Airport",
      },
      {
        "Airports.airportid": "9521",
        "Airports.city": "Saint Denis",
        "Airports.name": "Samambaia Heliport",
      },
      {
        "Airports.airportid": "1391",
        "Airports.city": "Luneville",
        "Airports.name": "Lunéville-Croismare Airport",
      },
      {
        "Airports.airportid": "286",
        "Airports.city": "Monastir",
        "Airports.name": "Monastir Habib Bourguiba International Airport",
      },
      {
        "Airports.airportid": "11910",
        "Airports.city": "Shorkot",
        "Airports.name": "Rafiqui Air Base",
      },
      {
        "Airports.airportid": "2387",
        "Airports.city": "Ishigaki",
        "Airports.name": "Ishigaki Airport",
      },
      {
        "Airports.airportid": "8846",
        "Airports.city": "Mali Losinj",
        "Airports.name": "Lošinj Island Airport",
      },
      {
        "Airports.airportid": "8921",
        "Airports.city": "Kangding",
        "Airports.name": "Kangding Airport",
      },
      {
        "Airports.airportid": "8983",
        "Airports.city": "Motueka",
        "Airports.name": "Motueka Airport",
      },
      {
        "Airports.airportid": "973",
        "Airports.city": "Sao Tome",
        "Airports.name": "São Tomé International Airport",
      },
      {
        "Airports.airportid": "6164",
        "Airports.city": "Orsk",
        "Airports.name": "Orsk Airport",
      },
      {
        "Airports.airportid": "2990",
        "Airports.city": "Kazan",
        "Airports.name": "Kazan International Airport",
      },
      {
        "Airports.airportid": "8286",
        "Airports.city": "Danbury",
        "Airports.name": "Danbury Municipal Airport",
      },
      {
        "Airports.airportid": "551",
        "Airports.city": "Cranfield",
        "Airports.name": "Cranfield Airport",
      },
      {
        "Airports.airportid": "6298",
        "Airports.city": "Mildura",
        "Airports.name": "Mildura Airport",
      },
      {
        "Airports.airportid": "812",
        "Airports.city": "Hendrik Verwoerddam",
        "Airports.name": "Gariep Dam Airport",
      },
      {
        "Airports.airportid": "9237",
        "Airports.city": "Midland",
        "Airports.name": "Huronia Airport",
      },
      {
        "Airports.airportid": "12844",
        "Airports.city": "Docker River",
        "Airports.name": "Docker River Airport",
      },
      {
        "Airports.airportid": "5875",
        "Airports.city": "Matei",
        "Airports.name": "Matei Airport",
      },
      {
        "Airports.airportid": "11737",
        "Airports.city": "Schoenstadt",
        "Airports.name": "Marburg-Schönstadt Airport",
      },
      {
        "Airports.airportid": "1199",
        "Airports.city": "Akrotiri",
        "Airports.name": "RAF Akrotiri",
      },
      {
        "Airports.airportid": "3266",
        "Airports.city": "Miri",
        "Airports.name": "Miri Airport",
      },
      {
        "Airports.airportid": "9759",
        "Airports.city": "Walker's Cay",
        "Airports.name": "Abaco I Walker C Airport",
      },
      {
        "Airports.airportid": "11911",
        "Airports.city": "Karachi",
        "Airports.name": "Faisal Air Base",
      },
      {
        "Airports.airportid": "1574",
        "Airports.city": "Caslav",
        "Airports.name": "Čáslav Air Base",
      },
      {
        "Airports.airportid": "12052",
        "Airports.city": "Bengbu",
        "Airports.name": "Bengbu Airport",
      },
      {
        "Airports.airportid": "3104",
        "Airports.city": "Leh",
        "Airports.name": "Leh Kushok Bakula Rimpochee Airport",
      },
      {
        "Airports.airportid": "9543",
        "Airports.city": "Ogden",
        "Airports.name": "Ogden Hinckley Airport",
      },
      {
        "Airports.airportid": "11961",
        "Airports.city": "Magadan",
        "Airports.name": "Magadan-13 Airport",
      },
      {
        "Airports.airportid": "8290",
        "Airports.city": "Fitchburg",
        "Airports.name": "Fitchburg Municipal Airport",
      },
      {
        "Airports.airportid": "5510",
        "Airports.city": "Lansdowne House",
        "Airports.name": "Lansdowne House Airport",
      },
      {
        "Airports.airportid": "11963",
        "Airports.city": "Palana",
        "Airports.name": "Palana Airport",
      },
      {
        "Airports.airportid": "6002",
        "Airports.city": "Miyakejima",
        "Airports.name": "Miyakejima Airport",
      },
      {
        "Airports.airportid": "6165",
        "Airports.city": "Penza",
        "Airports.name": "Penza Airport",
      },
      {
        "Airports.airportid": "355",
        "Airports.city": "Hahn",
        "Airports.name": "Frankfurt-Hahn Airport",
      },
      {
        "Airports.airportid": "249",
        "Airports.city": "Tamale",
        "Airports.name": "Tamale Airport",
      },
      {
        "Airports.airportid": "3172",
        "Airports.city": "Satun",
        "Airports.name": "Khoun Khan Airport",
      },
      {
        "Airports.airportid": "1108",
        "Airports.city": "Addis Ababa",
        "Airports.name": "Lideta Army Airport",
      },
      {
        "Airports.airportid": "12015",
        "Airports.city": "",
        "Airports.name": "Brewarrina Airport",
      },
      {
        "Airports.airportid": "7046",
        "Airports.city": "Papa",
        "Airports.name": "Pápa Air Base",
      },
      {
        "Airports.airportid": "9053",
        "Airports.city": "Bangalore",
        "Airports.name": "Yelahanka Air Force Station",
      },
      {
        "Airports.airportid": "7413",
        "Airports.city": "Am Timan",
        "Airports.name": "Am Timan Airport",
      },
      {
        "Airports.airportid": "2758",
        "Airports.city": "Bermejo",
        "Airports.name": "Bermejo Airport",
      },
      {
        "Airports.airportid": "7621",
        "Airports.city": "Bartow",
        "Airports.name": "Bartow Municipal Airport",
      },
      {
        "Airports.airportid": "3509",
        "Airports.city": "Houlton",
        "Airports.name": "Houlton International Airport",
      },
      {
        "Airports.airportid": "5633",
        "Airports.city": "Mocamedes",
        "Airports.name": "Namibe Airport",
      },
      {
        "Airports.airportid": "8115",
        "Airports.city": "Scharlibbe",
        "Airports.name": "Klietz/Scharlibbe Airport",
      },
      {
        "Airports.airportid": "104",
        "Airports.city": "Pitt Meadows",
        "Airports.name": "Pitt Meadows Airport",
      },
      {
        "Airports.airportid": "3830",
        "Airports.city": "Chicago",
        "Airports.name": "Chicago O'Hare International Airport",
      },
      {
        "Airports.airportid": "7061",
        "Airports.city": "Somerset",
        "Airports.name": "Lake Cumberland Regional Airport",
      },
      {
        "Airports.airportid": "5716",
        "Airports.city": "Athens",
        "Airports.name": "Athens Ben Epps Airport",
      },
      {
        "Airports.airportid": "1785",
        "Airports.city": "Aguascalientes",
        "Airports.name": "Jesús Terán Paredo International Airport",
      },
      {
        "Airports.airportid": "5777",
        "Airports.city": "Worland",
        "Airports.name": "Worland Municipal Airport",
      },
      {
        "Airports.airportid": "13023",
        "Airports.city": "Victoria",
        "Airports.name": "Victoria Harbour (Camel Point) Heliport",
      },
      {
        "Airports.airportid": "5490",
        "Airports.city": "Fort Albany",
        "Airports.name": "Fort Albany Airport",
      },
      {
        "Airports.airportid": "1690",
        "Airports.city": "Iskenderun",
        "Airports.name": "İskenderun Airport",
      },
      {
        "Airports.airportid": "5915",
        "Airports.city": "Aniwa",
        "Airports.name": "Aniwa Airport",
      },
      {
        "Airports.airportid": "1190",
        "Airports.city": "Tirana",
        "Airports.name": "Tirana International Airport Mother Teresa",
      },
      {
        "Airports.airportid": "1892",
        "Airports.city": "San Salvador",
        "Airports.name": "Monseñor Óscar Arnulfo Romero International Airport",
      },
      {
        "Airports.airportid": "2437",
        "Airports.city": "Gualeguaychu",
        "Airports.name": "Gualeguaychu Airport",
      },
      {
        "Airports.airportid": "2553",
        "Airports.city": "Sao Pedro Da Aldeia",
        "Airports.name": "São Pedro da Aldeia Airport",
      },
      {
        "Airports.airportid": "604",
        "Airports.city": "Sligo",
        "Airports.name": "Sligo Airport",
      },
      {
        "Airports.airportid": "8500",
        "Airports.city": "Furstenwalde",
        "Airports.name": "Fuerstenwalde Airport",
      },
      {
        "Airports.airportid": "1054",
        "Airports.city": "Gran Canaria",
        "Airports.name": "Gran Canaria Airport",
      },
      {
        "Airports.airportid": "3950",
        "Airports.city": "Daytona Beach",
        "Airports.name": "Daytona Beach International Airport",
      },
      {
        "Airports.airportid": "9252",
        "Airports.city": "Angleton",
        "Airports.name": "Texas Gulf Coast Regional Airport",
      },
      {
        "Airports.airportid": "2379",
        "Airports.city": "Suwon",
        "Airports.name": "Suwon Airport",
      },
      {
        "Airports.airportid": "1859",
        "Airports.city": "Zapopan",
        "Airports.name": "Zapopan Airport",
      },
      {
        "Airports.airportid": "2316",
        "Airports.city": "Amami",
        "Airports.name": "Amami Airport",
      },
      {
        "Airports.airportid": "2802",
        "Airports.city": "Arequipa",
        "Airports.name": "Rodríguez Ballón International Airport",
      },
      {
        "Airports.airportid": "2819",
        "Airports.city": "Anaco",
        "Airports.name": "Anaco Airport",
      },
      {
        "Airports.airportid": "833",
        "Airports.city": "Mkuze",
        "Airports.name": "Mkuze Airport",
      },
      {
        "Airports.airportid": "5725",
        "Airports.city": "Brunswick",
        "Airports.name": "Brunswick Golden Isles Airport",
      },
      {
        "Airports.airportid": "1220",
        "Airports.city": "La Coruna",
        "Airports.name": "A Coruña Airport",
      },
      {
        "Airports.airportid": "4172",
        "Airports.city": "Lamidanda",
        "Airports.name": "Lamidanda Airport",
      },
      {
        "Airports.airportid": "7023",
        "Airports.city": "Corpus Christi",
        "Airports.name": "Corpus Christi Naval Air Station/Truax Field",
      },
      {
        "Airports.airportid": "76",
        "Airports.city": "St. Jean",
        "Airports.name": "St Jean Airport",
      },
      {
        "Airports.airportid": "1985",
        "Airports.city": "Mataiva",
        "Airports.name": "Mataiva Airport",
      },
      {
        "Airports.airportid": "11054",
        "Airports.city": "Canmore",
        "Airports.name": "Canmore Municipal Heliport",
      },
      {
        "Airports.airportid": "564",
        "Airports.city": "Northolt",
        "Airports.name": "RAF Northolt",
      },
      {
        "Airports.airportid": "11721",
        "Airports.city": "Aschaffenburg",
        "Airports.name": "Aschaffenburg Airport",
      },
      {
        "Airports.airportid": "2735",
        "Airports.city": "Ocana",
        "Airports.name": "Aguas Claras Airport",
      },
      {
        "Airports.airportid": "3762",
        "Airports.city": "Princeton",
        "Airports.name": "Princeton Municipal Airport",
      },
      {
        "Airports.airportid": "7417",
        "Airports.city": "Jijiga",
        "Airports.name": "Wilwal International Airport",
      },
      {
        "Airports.airportid": "181",
        "Airports.city": "Penticton",
        "Airports.name": "Penticton Airport",
      },
      {
        "Airports.airportid": "3570",
        "Airports.city": "Pittsburgh",
        "Airports.name": "Pittsburgh International Airport",
      },
      {
        "Airports.airportid": "7549",
        "Airports.city": "Toyooka",
        "Airports.name": "Tajima Airport",
      },
      {
        "Airports.airportid": "906",
        "Airports.city": "Livingstone",
        "Airports.name": "Livingstone Airport",
      },
      {
        "Airports.airportid": "1382",
        "Airports.city": "Paris",
        "Airports.name": "Charles de Gaulle International Airport",
      },
      {
        "Airports.airportid": "8461",
        "Airports.city": "Isabela",
        "Airports.name": "General Villamil Airport",
      },
      {
        "Airports.airportid": "9123",
        "Airports.city": "Kasongo",
        "Airports.name": "Kasongo Airport",
      },
      {
        "Airports.airportid": "11860",
        "Airports.city": "Ukiah",
        "Airports.name": "Ukiah Municipal Airport",
      },
      {
        "Airports.airportid": "1335",
        "Airports.city": "Lyon",
        "Airports.name": "Lyon Saint-Exupéry Airport",
      },
      {
        "Airports.airportid": "2052",
        "Airports.city": "Maimama",
        "Airports.name": "Maimana Airport",
      },
      {
        "Airports.airportid": "918",
        "Airports.city": "Antananarivo",
        "Airports.name": "Ivato Airport",
      },
      {
        "Airports.airportid": "1877",
        "Airports.city": "El Carmen",
        "Airports.name": "El Carmen de Siquirres Airport",
      },
      {
        "Airports.airportid": "2563",
        "Airports.city": "Macae",
        "Airports.name": "EMBRAER - Unidade Gavião Peixoto Airport",
      },
      {
        "Airports.airportid": "1487",
        "Airports.city": "Dekelia",
        "Airports.name": "Tatoi Airport",
      },
      {
        "Airports.airportid": "11930",
        "Airports.city": "Barretos",
        "Airports.name": "Chafei Amsei Airport",
      },
      {
        "Airports.airportid": "8560",
        "Airports.city": "Batavia",
        "Airports.name": "Genesee County Airport",
      },
      {
        "Airports.airportid": "34",
        "Airports.city": "Castlegar",
        "Airports.name": "Castlegar/West Kootenay Regional Airport",
      },
      {
        "Airports.airportid": "9484",
        "Airports.city": "Sevilla",
        "Airports.name": "Central Bolívar Airport",
      },
      {
        "Airports.airportid": "6066",
        "Airports.city": "Cajamarca",
        "Airports.name": "Mayor General FAP Armando Revoredo Iglesias Airport",
      },
      {
        "Airports.airportid": "3410",
        "Airports.city": "Alexandria",
        "Airports.name": "Borg El Arab International Airport",
      },
      {
        "Airports.airportid": "201",
        "Airports.city": "Whitecourt",
        "Airports.name": "Whitecourt Airport",
      },
      {
        "Airports.airportid": "156",
        "Airports.city": "Vancouver",
        "Airports.name": "Vancouver International Airport",
      },
      {
        "Airports.airportid": "13514",
        "Airports.city": "Jeypore",
        "Airports.name": "Jeypore Airport",
      },
      {
        "Airports.airportid": "5630",
        "Airports.city": "Catumbela",
        "Airports.name": "Catumbela Airport",
      },
      {
        "Airports.airportid": "6493",
        "Airports.city": "La Rochelle",
        "Airports.name": "La Rochelle-Île de Ré Airport",
      },
      {
        "Airports.airportid": "3901",
        "Airports.city": "Semarang",
        "Airports.name": "Achmad Yani Airport",
      },
      {
        "Airports.airportid": "1947",
        "Airports.city": "Staniel Cay",
        "Airports.name": "Staniel Cay Airport",
      },
      {
        "Airports.airportid": "7382",
        "Airports.city": "Rondonopolis",
        "Airports.name": "Maestro Marinho Franco Airport",
      },
      {
        "Airports.airportid": "770",
        "Airports.city": "Hohn",
        "Airports.name": "Hohn Airport",
      },
      {
        "Airports.airportid": "1715",
        "Airports.city": "Dalaman",
        "Airports.name": "Dalaman International Airport",
      },
      {
        "Airports.airportid": "12948",
        "Airports.city": "Kintore",
        "Airports.name": "Kintore Airport",
      },
      {
        "Airports.airportid": "1504",
        "Airports.city": "Lecce",
        "Airports.name": "Lecce Galatina Air Base",
      },
      {
        "Airports.airportid": "8139",
        "Airports.city": "Lakeview",
        "Airports.name": "Lake County Airport",
      },
      {
        "Airports.airportid": "2968",
        "Airports.city": "Chelyabinsk",
        "Airports.name": "Chelyabinsk Balandino Airport",
      },
      {
        "Airports.airportid": "2422",
        "Airports.city": "Tacloban",
        "Airports.name": "Daniel Z. Romualdez Airport",
      },
      {
        "Airports.airportid": "713",
        "Airports.city": "Hede",
        "Airports.name": "Hedlanda Airport",
      },
      {
        "Airports.airportid": "3751",
        "Airports.city": "Denver",
        "Airports.name": "Denver International Airport",
      },
      {
        "Airports.airportid": "6329",
        "Airports.city": "Thargomindah",
        "Airports.name": "Thargomindah Airport",
      },
      {
        "Airports.airportid": "7016",
        "Airports.city": "Ely",
        "Airports.name": "Ely Municipal Airport",
      },
      {
        "Airports.airportid": "6897",
        "Airports.city": "Katherine",
        "Airports.name": "Tindal Airport",
      },
      {
        "Airports.airportid": "1722",
        "Airports.city": "Diyabakir",
        "Airports.name": "Diyarbakir Airport",
      },
      {
        "Airports.airportid": "2243",
        "Airports.city": "Rota",
        "Airports.name": "Rota International Airport",
      },
      {
        "Airports.airportid": "6171",
        "Airports.city": "Battambang",
        "Airports.name": "Battambang Airport",
      },
      {
        "Airports.airportid": "7691",
        "Airports.city": "Whittier",
        "Airports.name": "Whittier Airport",
      },
      {
        "Airports.airportid": "6130",
        "Airports.city": "Greenville",
        "Airports.name": "Mid Delta Regional Airport",
      },
      {
        "Airports.airportid": "2355",
        "Airports.city": "Shimofusa",
        "Airports.name": "Shimofusa Airport",
      },
      {
        "Airports.airportid": "5850",
        "Airports.city": "Jeremie",
        "Airports.name": "Jérémie Airport",
      },
      {
        "Airports.airportid": "8510",
        "Airports.city": "Ocala",
        "Airports.name": "Ocala International Airport - Jim Taylor Field",
      },
      {
        "Airports.airportid": "12037",
        "Airports.city": "",
        "Airports.name": "Snake Bay Airport",
      },
      {
        "Airports.airportid": "7015",
        "Airports.city": "Null",
        "Airports.name": "Spirit of St Louis Airport",
      },
      {
        "Airports.airportid": "7481",
        "Airports.city": "Nizhneangarsk",
        "Airports.name": "Nizhneangarsk Airport",
      },
      {
        "Airports.airportid": "6068",
        "Airports.city": "Nazca",
        "Airports.name": "Maria Reiche Neuman Airport",
      },
      {
        "Airports.airportid": "2851",
        "Airports.city": "Caracas",
        "Airports.name": "Simón Bolívar International Airport",
      },
      {
        "Airports.airportid": "5591",
        "Airports.city": "Bydgoszcz",
        "Airports.name": "Bydgoszcz Ignacy Jan Paderewski Airport",
      },
      {
        "Airports.airportid": "674",
        "Airports.city": "Poznan",
        "Airports.name": "Poznań-Ławica Airport",
      },
      {
        "Airports.airportid": "1403",
        "Airports.city": "Brest",
        "Airports.name": "Brest Bretagne Airport",
      },
      {
        "Airports.airportid": "4167",
        "Airports.city": "Sanford",
        "Airports.name": "Orlando Sanford International Airport",
      },
      {
        "Airports.airportid": "5706",
        "Airports.city": "Musoma",
        "Airports.name": "Musoma Airport",
      },
      {
        "Airports.airportid": "10941",
        "Airports.city": "Arxan",
        "Airports.name": "Arxan Yi'ershi Airport",
      },
      {
        "Airports.airportid": "8958",
        "Airports.city": "Yankton",
        "Airports.name": "Chan Gurney Municipal Airport",
      },
      {
        "Airports.airportid": "5523",
        "Airports.city": "Powell River",
        "Airports.name": "Powell River Airport",
      },
      {
        "Airports.airportid": "772",
        "Airports.city": "Laage",
        "Airports.name": "Rostock-Laage Airport",
      },
      {
        "Airports.airportid": "3849",
        "Airports.city": "Baltimore",
        "Airports.name":
          "Baltimore/Washington International Thurgood Marshall Airport",
      },
      {
        "Airports.airportid": "1123",
        "Airports.city": "Kismayu",
        "Airports.name": "Kisimayu Airport",
      },
      {
        "Airports.airportid": "6204",
        "Airports.city": "Waikabubak-Sumba Island",
        "Airports.name": "Tambolaka Airport",
      },
      {
        "Airports.airportid": "9769",
        "Airports.city": "Tres Lagoas",
        "Airports.name": "Plínio Alarcom Airport",
      },
      {
        "Airports.airportid": "1539",
        "Airports.city": "Treviso",
        "Airports.name": "Treviso-Sant'Angelo Airport",
      },
      {
        "Airports.airportid": "5933",
        "Airports.city": "Dasht-e-naz",
        "Airports.name": "Dasht-e Naz Airport",
      },
      {
        "Airports.airportid": "1069",
        "Airports.city": "Meknes",
        "Airports.name": "Bassatine Airport",
      },
      {
        "Airports.airportid": "126",
        "Airports.city": "Sydney",
        "Airports.name": "Sydney / J.A. Douglas McCurdy Airport",
      },
      {
        "Airports.airportid": "7293",
        "Airports.city": "Rosita",
        "Airports.name": "Rosita Airport",
      },
      {
        "Airports.airportid": "1194",
        "Airports.city": "Sofia",
        "Airports.name": "Sofia Airport",
      },
      {
        "Airports.airportid": "533",
        "Airports.city": "Inverness",
        "Airports.name": "Inverness Airport",
      },
      {
        "Airports.airportid": "7134",
        "Airports.city": "Kirchheim-Teck",
        "Airports.name": "Nabern/Teck Airport",
      },
      {
        "Airports.airportid": "3810",
        "Airports.city": "Lompoc",
        "Airports.name": "Vandenberg Air Force Base",
      },
      {
        "Airports.airportid": "7192",
        "Airports.city": "Shaktoolik",
        "Airports.name": "Shaktoolik Airport",
      },
      {
        "Airports.airportid": "3554",
        "Airports.city": "Victorville",
        "Airports.name": "Southern California Logistics Airport",
      },
      {
        "Airports.airportid": "1133",
        "Airports.city": "Mersa-matruh",
        "Airports.name": "Mersa Matruh Airport",
      },
      {
        "Airports.airportid": "5967",
        "Airports.city": "Aniak",
        "Airports.name": "Aniak Airport",
      },
      {
        "Airports.airportid": "5939",
        "Airports.city": "Bahawalpur",
        "Airports.name": "Bahawalpur Airport",
      },
      {
        "Airports.airportid": "6896",
        "Airports.city": "Amberley",
        "Airports.name": "RAAF Base Amberley",
      },
      {
        "Airports.airportid": "857",
        "Airports.city": "Sishen",
        "Airports.name": "Sishen Airport",
      },
      {
        "Airports.airportid": "2503",
        "Airports.city": "Olavarria",
        "Airports.name": "Olavarria Airport",
      },
      {
        "Airports.airportid": "3596",
        "Airports.city": "Yuma",
        "Airports.name": "Yuma MCAS/Yuma International Airport",
      },
      {
        "Airports.airportid": "1438",
        "Airports.city": "Hyeres",
        "Airports.name": "Toulon-Hyères Airport",
      },
      {
        "Airports.airportid": "12054",
        "Airports.city": "Wuhu",
        "Airports.name": "Wuhu Air Base",
      },
      {
        "Airports.airportid": "190",
        "Airports.city": "Kapuskasing",
        "Airports.name": "Kapuskasing Airport",
      },
      {
        "Airports.airportid": "6034",
        "Airports.city": "Juazeiro Do Norte",
        "Airports.name": "Orlando Bezerra de Menezes Airport",
      },
      {
        "Airports.airportid": "1407",
        "Airports.city": "Granville",
        "Airports.name": "Granville Airport",
      },
      {
        "Airports.airportid": "6085",
        "Airports.city": "Zhezkazgan",
        "Airports.name": "Zhezkazgan Airport",
      },
      {
        "Airports.airportid": "3157",
        "Airports.city": "Bangkok",
        "Airports.name": "Don Mueang International Airport",
      },
      {
        "Airports.airportid": "5691",
        "Airports.city": "Asyut",
        "Airports.name": "Assiut International Airport",
      },
      {
        "Airports.airportid": "8876",
        "Airports.city": "Yangzhou",
        "Airports.name": "Yangzhou Taizhou Airport",
      },
      {
        "Airports.airportid": "2866",
        "Airports.city": "Tucupita",
        "Airports.name": "Tucupita Airport",
      },
      {
        "Airports.airportid": "2803",
        "Airports.city": "San Ramon",
        "Airports.name": "Capitán FAP Leonardo Alvariño Herr Airport",
      },
      {
        "Airports.airportid": "6049",
        "Airports.city": "Cartago",
        "Airports.name": "Santa Ana Airport",
      },
      {
        "Airports.airportid": "4228",
        "Airports.city": "Las Cruces",
        "Airports.name": "Las Cruces International Airport",
      },
      {
        "Airports.airportid": "542",
        "Airports.city": "Tiree",
        "Airports.name": "Tiree Airport",
      },
      {
        "Airports.airportid": "84",
        "Airports.city": "Meadow Lake",
        "Airports.name": "Meadow Lake Airport",
      },
      {
        "Airports.airportid": "2570",
        "Airports.city": "Ipatinga",
        "Airports.name": "Usiminas Airport",
      },
      {
        "Airports.airportid": "6187",
        "Airports.city": "Buonmethuot",
        "Airports.name": "Buon Ma Thuot Airport",
      },
      {
        "Airports.airportid": "8116",
        "Airports.city": "Burg",
        "Airports.name": "Burg Airport",
      },
      {
        "Airports.airportid": "8892",
        "Airports.city": "Kooddoo",
        "Airports.name": "Kooddoo Airport",
      },
      {
        "Airports.airportid": "1763",
        "Airports.city": "San Isidoro",
        "Airports.name": "San Isidro Air Base",
      },
      {
        "Airports.airportid": "9120",
        "Airports.city": "Petersburg",
        "Airports.name": "Dinwiddie County Airport",
      },
      {
        "Airports.airportid": "4132",
        "Airports.city": "Roi Et",
        "Airports.name": "Roi Et Airport",
      },
      {
        "Airports.airportid": "1858",
        "Airports.city": "Manzanillo",
        "Airports.name": "Playa De Oro International Airport",
      },
      {
        "Airports.airportid": "7367",
        "Airports.city": "Sinop",
        "Airports.name": "Presidente João Batista Figueiredo Airport",
      },
      {
        "Airports.airportid": "3454",
        "Airports.city": "Omaha",
        "Airports.name": "Eppley Airfield",
      },
      {
        "Airports.airportid": "7600",
        "Airports.city": "Nonouti",
        "Airports.name": "Nonouti Airport",
      },
      {
        "Airports.airportid": "2682",
        "Airports.city": "Montalvo",
        "Airports.name": "El Carmen Airport",
      },
      {
        "Airports.airportid": "1078",
        "Airports.city": "Al Hociema",
        "Airports.name": "Cherif Al Idrissi Airport",
      },
      {
        "Airports.airportid": "4004",
        "Airports.city": "Talkeetna",
        "Airports.name": "Talkeetna Airport",
      },
      {
        "Airports.airportid": "529",
        "Airports.city": "Kirkwall",
        "Airports.name": "Kirkwall Airport",
      },
      {
        "Airports.airportid": "5994",
        "Airports.city": "Kushiro",
        "Airports.name": "Kushiro Airport",
      },
      {
        "Airports.airportid": "219",
        "Airports.city": "Relizane",
        "Airports.name": "Relizane Airport",
      },
      {
        "Airports.airportid": "6860",
        "Airports.city": "Bungle Bungle",
        "Airports.name": "Bungle Bungle Airport",
      },
      {
        "Airports.airportid": "8995",
        "Airports.city": "Temora",
        "Airports.name": "Temora Airport",
      },
      {
        "Airports.airportid": "3731",
        "Airports.city": "San Diego",
        "Airports.name": "San Diego International Airport",
      },
      {
        "Airports.airportid": "1031",
        "Airports.city": "Kisangani",
        "Airports.name": "Bangoka International Airport",
      },
      {
        "Airports.airportid": "4005",
        "Airports.city": "Gozo",
        "Airports.name": "Xewkija Heliport",
      },
      {
        "Airports.airportid": "7256",
        "Airports.city": "Rimouski",
        "Airports.name": "Rimouski Airport",
      },
      {
        "Airports.airportid": "1925",
        "Airports.city": "Cayman Brac",
        "Airports.name": "Gerrard Smith International Airport",
      },
      {
        "Airports.airportid": "8690",
        "Airports.city": "Segovia",
        "Airports.name": "Fuentemilanos Airport",
      },
      {
        "Airports.airportid": "1163",
        "Airports.city": "Zella 74",
        "Airports.name": "Zella 74 Airport",
      },
      {
        "Airports.airportid": "3706",
        "Airports.city": "Fort Knox",
        "Airports.name": "Godman Army Air Field",
      },
      {
        "Airports.airportid": "3721",
        "Airports.city": "Miami",
        "Airports.name": "Dade Collier Training and Transition Airport",
      },
      {
        "Airports.airportid": "2154",
        "Airports.city": "Jahrom",
        "Airports.name": "Jahrom Airport",
      },
      {
        "Airports.airportid": "283",
        "Airports.city": "Dirkou",
        "Airports.name": "Dirkou Airport",
      },
      {
        "Airports.airportid": "8608",
        "Airports.city": "Ramona",
        "Airports.name": "Ramona Airport",
      },
      {
        "Airports.airportid": "2949",
        "Airports.city": "Murmansk",
        "Airports.name": "Murmansk Airport",
      },
      {
        "Airports.airportid": "11452",
        "Airports.city": "Leopoldsburg",
        "Airports.name": "Leopoldsburg Airfield",
      },
      {
        "Airports.airportid": "147",
        "Airports.city": "Repulse Bay",
        "Airports.name": "Repulse Bay Airport",
      },
      {
        "Airports.airportid": "2769",
        "Airports.city": "Trinidad",
        "Airports.name": "Teniente Av. Jorge Henrich Arauz Airport",
      },
      {
        "Airports.airportid": "4363",
        "Airports.city": "Saratov",
        "Airports.name": "Saratov Central Airport",
      },
      {
        "Airports.airportid": "4208",
        "Airports.city": "Juist",
        "Airports.name": "Juist Airport",
      },
      {
        "Airports.airportid": "524",
        "Airports.city": "Llanbedr",
        "Airports.name": "Llanbedr Airport",
      },
      {
        "Airports.airportid": "6258",
        "Airports.city": "Cunnamulla",
        "Airports.name": "Cunnamulla Airport",
      },
      {
        "Airports.airportid": "4342",
        "Airports.city": "Lamar",
        "Airports.name": "Lamar Municipal Airport",
      },
      {
        "Airports.airportid": "1617",
        "Airports.city": "Santa Maria (island)",
        "Airports.name": "Santa Maria Airport",
      },
      {
        "Airports.airportid": "8042",
        "Airports.city": "Hondo",
        "Airports.name": "South Texas Regional Airport at Hondo",
      },
      {
        "Airports.airportid": "1737",
        "Airports.city": "Skopje",
        "Airports.name": "Skopje Alexander the Great Airport",
      },
      {
        "Airports.airportid": "6218",
        "Airports.city": "Bakalalan",
        "Airports.name": "Bakalalan Airport",
      },
      {
        "Airports.airportid": "873",
        "Airports.city": "Waterkloof",
        "Airports.name": "Waterkloof Air Force Base",
      },
      {
        "Airports.airportid": "3321",
        "Airports.city": "Coolangatta",
        "Airports.name": "Gold Coast Airport",
      },
      {
        "Airports.airportid": "5471",
        "Airports.city": "Poplar Hill",
        "Airports.name": "Poplar Hill Airport",
      },
      {
        "Airports.airportid": "7617",
        "Airports.city": "Choiseul Bay",
        "Airports.name": "Choiseul Bay Airport",
      },
      {
        "Airports.airportid": "4137",
        "Airports.city": "Al Asad",
        "Airports.name": "Al Asad Air Base",
      },
      {
        "Airports.airportid": "3770",
        "Airports.city": "Texarkana",
        "Airports.name": "Texarkana Regional Webb Field",
      },
      {
        "Airports.airportid": "5719",
        "Airports.city": "Walla Walla",
        "Airports.name": "Walla Walla Regional Airport",
      },
      {
        "Airports.airportid": "6288",
        "Airports.city": "Lightning Ridge",
        "Airports.name": "Lightning Ridge Airport",
      },
      {
        "Airports.airportid": "9826",
        "Airports.city": "Uyo",
        "Airports.name": "Akwa Ibom International Airport",
      },
      {
        "Airports.airportid": "3704",
        "Airports.city": "Jackson",
        "Airports.name": "Mc Kellar Sipes Regional Airport",
      },
      {
        "Airports.airportid": "8517",
        "Airports.city": "Lumberton",
        "Airports.name": "Lumberton Regional Airport",
      },
      {
        "Airports.airportid": "2560",
        "Airports.city": "Rio De Janeiro",
        "Airports.name": "Rio Galeão – Tom Jobim International Airport",
      },
      {
        "Airports.airportid": "528",
        "Airports.city": "Woodvale",
        "Airports.name": "RAF Woodvale",
      },
      {
        "Airports.airportid": "2064",
        "Airports.city": "Dammam",
        "Airports.name": "King Fahd International Airport",
      },
      {
        "Airports.airportid": "8644",
        "Airports.city": "Drummond Island",
        "Airports.name": "Drummond Island Airport",
      },
      {
        "Airports.airportid": "13154",
        "Airports.city": "Pampa",
        "Airports.name": "Perry Lefors Field",
      },
      {
        "Airports.airportid": "2703",
        "Airports.city": "Mariscal Estigarribia",
        "Airports.name": "Dr. Luis Maria Argaña International Airport",
      },
      {
        "Airports.airportid": "1522",
        "Airports.city": "Turin",
        "Airports.name": "Torino-Aeritalia Airport",
      },
      {
        "Airports.airportid": "1992",
        "Airports.city": "Moorea",
        "Airports.name": "Moorea Airport",
      },
      {
        "Airports.airportid": "2575",
        "Airports.city": "Joao Pessoa",
        "Airports.name": "Presidente Castro Pinto International Airport",
      },
      {
        "Airports.airportid": "11755",
        "Airports.city": "Hope",
        "Airports.name": "Hope Airport",
      },
      {
        "Airports.airportid": "4291",
        "Airports.city": "Ballina Byron Bay",
        "Airports.name": "Ballina Byron Gateway Airport",
      },
      {
        "Airports.airportid": "3258",
        "Airports.city": "Kaimana",
        "Airports.name": "Kaimana Airport",
      },
      {
        "Airports.airportid": "1046",
        "Airports.city": "Kayes",
        "Airports.name": "Kayes Dag Dag Airport",
      },
      {
        "Airports.airportid": "12945",
        "Airports.city": "Simberi Island",
        "Airports.name": "Simberi Airport",
      },
      {
        "Airports.airportid": "1662",
        "Airports.city": "Tirgu Mures",
        "Airports.name": "Transilvania Târgu Mureş International Airport",
      },
      {
        "Airports.airportid": "2291",
        "Airports.city": "Nakashibetsu",
        "Airports.name": "Nakashibetsu Airport",
      },
      {
        "Airports.airportid": "2478",
        "Airports.city": "Oran",
        "Airports.name": "Orán Airport",
      },
      {
        "Airports.airportid": "1733",
        "Airports.city": "Izmir",
        "Airports.name": "Selçuk Efes Airport",
      },
      {
        "Airports.airportid": "1887",
        "Airports.city": "Palmar Sur",
        "Airports.name": "Palmar Sur Airport",
      },
      {
        "Airports.airportid": "11967",
        "Airports.city": "Dzhankoy",
        "Airports.name": "Dzhankoy Airport",
      },
      {
        "Airports.airportid": "3585",
        "Airports.city": "Indianapolis",
        "Airports.name": "Indianapolis International Airport",
      },
      {
        "Airports.airportid": "13405",
        "Airports.city": "Anholt",
        "Airports.name": "Anholt Airport",
      },
      {
        "Airports.airportid": "3616",
        "Airports.city": "San Luis",
        "Airports.name": "Scappoose Industrial Airpark",
      },
      {
        "Airports.airportid": "4301",
        "Airports.city": "Jiuzhaigou",
        "Airports.name": "Jiuzhai Huanglong Airport",
      },
      {
        "Airports.airportid": "3503",
        "Airports.city": "Fort Carson",
        "Airports.name": "Butts AAF (Fort Carson) Air Field",
      },
      {
        "Airports.airportid": "3353",
        "Airports.city": "Christmas Island",
        "Airports.name": "Christmas Island Airport",
      },
      {
        "Airports.airportid": "3360",
        "Airports.city": "Richmond",
        "Airports.name": "RAAF Base Richmond",
      },
      {
        "Airports.airportid": "7686",
        "Airports.city": "Okavango Delta",
        "Airports.name": "Camp Okavango Airport",
      },
      {
        "Airports.airportid": "1181",
        "Airports.city": "Lake Manyara",
        "Airports.name": "Lake Manyara Airport",
      },
      {
        "Airports.airportid": "7199",
        "Airports.city": "Alakanuk",
        "Airports.name": "Alakanuk Airport",
      },
      {
        "Airports.airportid": "5544",
        "Airports.city": "Muskrat Dam",
        "Airports.name": "Muskrat Dam Airport",
      },
      {
        "Airports.airportid": "2358",
        "Airports.city": "Zama",
        "Airports.name": "Kastner Army Heliport",
      },
      {
        "Airports.airportid": "6408",
        "Airports.city": "Karamay",
        "Airports.name": "Karamay Airport",
      },
      {
        "Airports.airportid": "7703",
        "Airports.city": "Frejus",
        "Airports.name": "Fréjus Airport",
      },
      {
        "Airports.airportid": "6147",
        "Airports.city": "Khudzhand",
        "Airports.name": "Khudzhand Airport",
      },
      {
        "Airports.airportid": "8380",
        "Airports.city": "Mallacoota",
        "Airports.name": "Mallacoota Airport",
      },
      {
        "Airports.airportid": "9075",
        "Airports.city": "Endelage",
        "Airports.name": "Endelave Flyveplads",
      },
      {
        "Airports.airportid": "3637",
        "Airports.city": "Minot",
        "Airports.name": "Minot Air Force Base",
      },
      {
        "Airports.airportid": "5836",
        "Airports.city": "Guerrero Negro",
        "Airports.name": "Guerrero Negro Airport",
      },
      {
        "Airports.airportid": "2172",
        "Airports.city": "Aqaba",
        "Airports.name": "Aqaba King Hussein International Airport",
      },
      {
        "Airports.airportid": "2569",
        "Airports.city": "Ilheus",
        "Airports.name": "Bahia - Jorge Amado Airport",
      },
      {
        "Airports.airportid": "12057",
        "Airports.city": "Shenyang",
        "Airports.name": "Shenyang Dongta Airport",
      },
      {
        "Airports.airportid": "3967",
        "Airports.city": "Asmara",
        "Airports.name": "Asmara International Airport",
      },
      {
        "Airports.airportid": "5565",
        "Airports.city": "Fair Isle",
        "Airports.name": "Fair Isle Airport",
      },
      {
        "Airports.airportid": "569",
        "Airports.city": "Honington",
        "Airports.name": "RAF Honington",
      },
      {
        "Airports.airportid": "11974",
        "Airports.city": "Baranavichi",
        "Airports.name": "Baranavichi Air Base",
      },
      {
        "Airports.airportid": "2695",
        "Airports.city": "Tena",
        "Airports.name": "Mayor Galo Torres Airport",
      },
      {
        "Airports.airportid": "159",
        "Airports.city": "Petawawa",
        "Airports.name": "Petawawa Airport",
      },
      {
        "Airports.airportid": "8347",
        "Airports.city": "Kuwait",
        "Airports.name": "Ali Al Salem Air Base",
      },
      {
        "Airports.airportid": "3161",
        "Airports.city": "Pattaya",
        "Airports.name": "U-Tapao International Airport",
      },
      {
        "Airports.airportid": "13707",
        "Airports.city": "Seldovia",
        "Airports.name": "Seldovia Airport",
      },
      {
        "Airports.airportid": "11053",
        "Airports.city": "Wood Buffalo",
        "Airports.name": "Fort Mackay / Horizon Airport",
      },
      {
        "Airports.airportid": "6044",
        "Airports.city": "Sorocaba",
        "Airports.name": "Sorocaba Airport",
      },
      {
        "Airports.airportid": "7978",
        "Airports.city": "Wilmington",
        "Airports.name": "Wilmington Airpark",
      },
      {
        "Airports.airportid": "2497",
        "Airports.city": "Ushuaia",
        "Airports.name": "Malvinas Argentinas Airport",
      },
      {
        "Airports.airportid": "2069",
        "Airports.city": "Hail",
        "Airports.name": "Ha'il Airport",
      },
      {
        "Airports.airportid": "3508",
        "Airports.city": "Hawthorne",
        "Airports.name": "Jack Northrop Field Hawthorne Municipal Airport",
      },
      {
        "Airports.airportid": "5412",
        "Airports.city": "Gizo",
        "Airports.name": "Nusatupe Airport",
      },
      {
        "Airports.airportid": "5791",
        "Airports.city": "Aosta",
        "Airports.name": "Aosta Airport",
      },
      {
        "Airports.airportid": "6730",
        "Airports.city": "Imo",
        "Airports.name": "Sam Mbakwe International Airport",
      },
      {
        "Airports.airportid": "706",
        "Airports.city": "Anderstorp",
        "Airports.name": "Anderstorp Airport",
      },
      {
        "Airports.airportid": "6004",
        "Airports.city": "Mokpo",
        "Airports.name": "Mokpo Heliport",
      },
      {
        "Airports.airportid": "2034",
        "Airports.city": "Tauranga",
        "Airports.name": "Tauranga Airport",
      },
      {
        "Airports.airportid": "12041",
        "Airports.city": "",
        "Airports.name": "Wangaratta Airport",
      },
      {
        "Airports.airportid": "2391",
        "Airports.city": "Kitadaito",
        "Airports.name": "Kitadaito Airport",
      },
      {
        "Airports.airportid": "226",
        "Airports.city": "Bou Sfer",
        "Airports.name": "Bou Sfer Airport",
      },
      {
        "Airports.airportid": "4011",
        "Airports.city": "Manchester NH",
        "Airports.name": "Manchester-Boston Regional Airport",
      },
      {
        "Airports.airportid": "3139",
        "Airports.city": "Carnicobar",
        "Airports.name": "Car Nicobar Air Force Station",
      },
      {
        "Airports.airportid": "2506",
        "Airports.city": "Bolivar",
        "Airports.name": "Bolivar Airport",
      },
      {
        "Airports.airportid": "2493",
        "Airports.city": "Marambio Base",
        "Airports.name": "Marambio Base",
      },
      {
        "Airports.airportid": "7856",
        "Airports.city": "Dabaa City",
        "Airports.name": "El Alamein International Airport",
      },
      {
        "Airports.airportid": "9129",
        "Airports.city": "Kangel Danda",
        "Airports.name": "Kangel Danda Airport",
      },
      {
        "Airports.airportid": "1079",
        "Airports.city": "Tetouan",
        "Airports.name": "Saniat R'mel Airport",
      },
      {
        "Airports.airportid": "582",
        "Airports.city": "Maastricht",
        "Airports.name": "Maastricht Aachen Airport",
      },
      {
        "Airports.airportid": "6717",
        "Airports.city": "Kaltag",
        "Airports.name": "Kaltag Airport",
      },
      {
        "Airports.airportid": "6381",
        "Airports.city": "Jiujiang",
        "Airports.name": "Jiujiang Lushan Airport",
      },
      {
        "Airports.airportid": "3949",
        "Airports.city": "Santa Barbara",
        "Airports.name": "Santa Barbara Municipal Airport",
      },
      {
        "Airports.airportid": "2454",
        "Airports.city": "San Rafael",
        "Airports.name": "Suboficial Ay Santiago Germano Airport",
      },
      {
        "Airports.airportid": "650",
        "Airports.city": "Farsund",
        "Airports.name": "Lista Airport",
      },
      {
        "Airports.airportid": "2524",
        "Airports.city": "Alta Floresta",
        "Airports.name": "Piloto Osvaldo Marques Dias Airport",
      },
      {
        "Airports.airportid": "2177",
        "Airports.city": "Beirut",
        "Airports.name": "Beirut Rafic Hariri International Airport",
      },
      {
        "Airports.airportid": "1980",
        "Airports.city": "Kaukura Atoll",
        "Airports.name": "Kaukura Airport",
      },
      {
        "Airports.airportid": "3096",
        "Airports.city": "Jhansi",
        "Airports.name": "Jhansi Airport",
      },
      {
        "Airports.airportid": "5722",
        "Airports.city": "Bradford",
        "Airports.name": "Bradford Regional Airport",
      },
      {
        "Airports.airportid": "2635",
        "Airports.city": "Uberaba",
        "Airports.name": "Mário de Almeida Franco Airport",
      },
      {
        "Airports.airportid": "2707",
        "Airports.city": "El Banco",
        "Airports.name": "Las Flores Airport",
      },
      {
        "Airports.airportid": "8000",
        "Airports.city": "Kiev",
        "Airports.name": "Gostomel Airport",
      },
      {
        "Airports.airportid": "8477",
        "Airports.city": "Bob Quinn Lake",
        "Airports.name": "Bob Quinn Lake Airport",
      },
      {
        "Airports.airportid": "1480",
        "Airports.city": "Sitia",
        "Airports.name": "Sitia Airport",
      },
      {
        "Airports.airportid": "5763",
        "Airports.city": "Portsmouth",
        "Airports.name": "Portsmouth International at Pease Airport",
      },
      {
        "Airports.airportid": "7595",
        "Airports.city": "Beru Island",
        "Airports.name": "Beru Airport",
      },
      {
        "Airports.airportid": "8291",
        "Airports.city": "Villa Rica",
        "Airports.name": "Earl L. Small Jr. Field/Stockmar Airport",
      },
      {
        "Airports.airportid": "8620",
        "Airports.city": "Karlsruhe",
        "Airports.name": "Karlsruhe-Forchheim Airport",
      },
      {
        "Airports.airportid": "2530",
        "Airports.city": "Barbacena",
        "Airports.name": "Major Brigadeiro Doorgal Borges Airport",
      },
      {
        "Airports.airportid": "7563",
        "Airports.city": "Kulyab",
        "Airports.name": "Kulob Airport",
      },
      {
        "Airports.airportid": "7653",
        "Airports.city": "SARATOGA",
        "Airports.name": "Shively Field",
      },
      {
        "Airports.airportid": "10137",
        "Airports.city": "Dunnville",
        "Airports.name": "Dunnville Airport",
      },
      {
        "Airports.airportid": "13373",
        "Airports.city": "Tasiusaq",
        "Airports.name": "Tasiusaq (Kujalleq) Heliport",
      },
      {
        "Airports.airportid": "11927",
        "Airports.city": "",
        "Airports.name": "Bislig Airport",
      },
      {
        "Airports.airportid": "3836",
        "Airports.city": "Omaha",
        "Airports.name": "Offutt Air Force Base",
      },
      {
        "Airports.airportid": "11770",
        "Airports.city": "St Leonard",
        "Airports.name": "St Leonard Airport",
      },
      {
        "Airports.airportid": "1456",
        "Airports.city": "Kalamata",
        "Airports.name": "Kalamata Airport",
      },
      {
        "Airports.airportid": "1952",
        "Airports.city": "Mayaguana",
        "Airports.name": "Mayaguana Airport",
      },
      {
        "Airports.airportid": "13215",
        "Airports.city": "Nzerekore",
        "Airports.name": "Nzérékoré Airport",
      },
      {
        "Airports.airportid": "2365",
        "Airports.city": "Yeosu",
        "Airports.name": "Yeosu Airport",
      },
      {
        "Airports.airportid": "3864",
        "Airports.city": "Albany",
        "Airports.name": "Albany International Airport",
      },
      {
        "Airports.airportid": "6275",
        "Airports.city": "Hughenden",
        "Airports.name": "Hughenden Airport",
      },
      {
        "Airports.airportid": "7394",
        "Airports.city": "Rio Verde",
        "Airports.name": "General Leite de Castro Airport",
      },
      {
        "Airports.airportid": "13499",
        "Airports.city": "SANTO ANTONIO DO MATUPI",
        "Airports.name": "Mostardas Airport",
      },
      {
        "Airports.airportid": "7976",
        "Airports.city": "Ukunda",
        "Airports.name": "Ukunda Airstrip",
      },
      {
        "Airports.airportid": "7979",
        "Airports.city": "Tucson",
        "Airports.name": "Marana Regional Airport",
      },
      {
        "Airports.airportid": "2612",
        "Airports.city": "Rio De Janeiro",
        "Airports.name": "Santos Dumont Airport",
      },
      {
        "Airports.airportid": "11846",
        "Airports.city": "Orangeburg",
        "Airports.name": "Orangeburg Municipal Airport",
      },
      {
        "Airports.airportid": "5582",
        "Airports.city": "Mo i Rana",
        "Airports.name": "Mo i Rana Airport, Røssvoll",
      },
      {
        "Airports.airportid": "3814",
        "Airports.city": "Las Vegas",
        "Airports.name": "Nellis Air Force Base",
      },
      {
        "Airports.airportid": "742",
        "Airports.city": "Linkoeping",
        "Airports.name": "Linköping City Airport",
      },
      {
        "Airports.airportid": "4159",
        "Airports.city": "Pai",
        "Airports.name": "Mae Hong Son Airport",
      },
      {
        "Airports.airportid": "5848",
        "Airports.city": "San Jose",
        "Airports.name": "Tobias Bolanos International Airport",
      },
      {
        "Airports.airportid": "2131",
        "Airports.city": "Teheran",
        "Airports.name": "Mehrabad International Airport",
      },
      {
        "Airports.airportid": "1893",
        "Airports.city": "San Salvador",
        "Airports.name": "Ilopango International Airport",
      },
      {
        "Airports.airportid": "9744",
        "Airports.city": "Napaskiak",
        "Airports.name": "Napaskiak Airport",
      },
      {
        "Airports.airportid": "4247",
        "Airports.city": "Santa Cruz",
        "Airports.name": "El Trompillo Airport",
      },
      {
        "Airports.airportid": "8100",
        "Airports.city": "Hamm",
        "Airports.name": "Hamm-Lippewiesen Airport",
      },
      {
        "Airports.airportid": "3869",
        "Airports.city": "Kendall-tamiami",
        "Airports.name": "Kendall-Tamiami Executive Airport",
      },
      {
        "Airports.airportid": "1823",
        "Airports.city": "Monclova",
        "Airports.name": "Monclova International Airport",
      },
      {
        "Airports.airportid": "1286",
        "Airports.city": "Toulouse",
        "Airports.name": "Toulouse-Lasbordes Airport",
      },
      {
        "Airports.airportid": "5925",
        "Airports.city": "Al-Jawf",
        "Airports.name": "Al-Jawf Domestic Airport",
      },
      {
        "Airports.airportid": "11916",
        "Airports.city": "Taji",
        "Airports.name": "Al Taji Army Air Field",
      },
      {
        "Airports.airportid": "5",
        "Airports.city": "Port Moresby",
        "Airports.name": "Port Moresby Jacksons International Airport",
      },
      {
        "Airports.airportid": "1225",
        "Airports.city": "Ibiza",
        "Airports.name": "Ibiza Airport",
      },
      {
        "Airports.airportid": "7070",
        "Airports.city": "Glendive",
        "Airports.name": "Dawson Community Airport",
      },
      {
        "Airports.airportid": "7459",
        "Airports.city": "Lleida",
        "Airports.name": "Lleida-Alguaire Airport",
      },
      {
        "Airports.airportid": "1051",
        "Airports.city": "Fuerteventura",
        "Airports.name": "Fuerteventura Airport",
      },
      {
        "Airports.airportid": "8438",
        "Airports.city": "Arnhem",
        "Airports.name": "Terlet Glider Field",
      },
      {
        "Airports.airportid": "1486",
        "Airports.city": "Thessaloniki",
        "Airports.name": "Thessaloniki Macedonia International Airport",
      },
      {
        "Airports.airportid": "6968",
        "Airports.city": "Scotia NY",
        "Airports.name": "Schenectady County Airport",
      },
      {
        "Airports.airportid": "11762",
        "Airports.city": "Charlevoix",
        "Airports.name": "Charlevoix Airport",
      },
      {
        "Airports.airportid": "11751",
        "Airports.city": "Ross River",
        "Airports.name": "Ross River Airport",
      },
      {
        "Airports.airportid": "2845",
        "Airports.city": "San Juan De Los Morros",
        "Airports.name": "San Juan de Los Morros Airport",
      },
      {
        "Airports.airportid": "2212",
        "Airports.city": "Moenjodaro",
        "Airports.name": "Moenjodaro Airport",
      },
      {
        "Airports.airportid": "5443",
        "Airports.city": "Maniitsoq",
        "Airports.name": "Maniitsoq Airport",
      },
      {
        "Airports.airportid": "677",
        "Airports.city": "Slupsk",
        "Airports.name": "Redzikowo Air Base",
      },
      {
        "Airports.airportid": "5553",
        "Airports.city": "Béchar",
        "Airports.name": "Béchar Boudghene Ben Ali Lotfi Airport",
      },
      {
        "Airports.airportid": "3759",
        "Airports.city": "Columbus",
        "Airports.name": "John Glenn Columbus International Airport",
      },
      {
        "Airports.airportid": "2460",
        "Airports.city": "Tucuman",
        "Airports.name": "Teniente Benjamin Matienzo Airport",
      },
      {
        "Airports.airportid": "7418",
        "Airports.city": "Mekane Selam",
        "Airports.name": "Mekane Selam Airport",
      },
      {
        "Airports.airportid": "8220",
        "Airports.city": "Los Angeles",
        "Airports.name": "Whiteman Airport",
      },
      {
        "Airports.airportid": "3668",
        "Airports.city": "Houghton Lake",
        "Airports.name": "Roscommon County - Blodgett Memorial Airport",
      },
      {
        "Airports.airportid": "124",
        "Airports.city": "North Battleford",
        "Airports.name": "North Battleford Airport",
      },
      {
        "Airports.airportid": "5411",
        "Airports.city": "Munda",
        "Airports.name": "Munda Airport",
      },
      {
        "Airports.airportid": "6961",
        "Airports.city": "Oxnard",
        "Airports.name": "Oxnard Airport",
      },
      {
        "Airports.airportid": "1680",
        "Airports.city": "Samedan",
        "Airports.name": "Samedan Airport",
      },
      {
        "Airports.airportid": "3386",
        "Airports.city": "Hangzhou",
        "Airports.name": "Hangzhou Xiaoshan International Airport",
      },
      {
        "Airports.airportid": "2706",
        "Airports.city": "Puerto Asis",
        "Airports.name": "Tres De Mayo Airport",
      },
      {
        "Airports.airportid": "3526",
        "Airports.city": "Elizabeth City",
        "Airports.name":
          "Elizabeth City Regional Airport & Coast Guard Air Station",
      },
      {
        "Airports.airportid": "11991",
        "Airports.city": "Kazan",
        "Airports.name": "Borisoglebskoye Airport",
      },
      {
        "Airports.airportid": "6363",
        "Airports.city": "Golmud",
        "Airports.name": "Golmud Airport",
      },
      {
        "Airports.airportid": "1971",
        "Airports.city": "Rurutu",
        "Airports.name": "Rurutu Airport",
      },
      {
        "Airports.airportid": "2824",
        "Airports.city": "Barquisimeto",
        "Airports.name": "Barquisimeto International Airport",
      },
      {
        "Airports.airportid": "11887",
        "Airports.city": "Varese",
        "Airports.name": "Varese-Venegono Airport",
      },
      {
        "Airports.airportid": "5869",
        "Airports.city": "Vunisea",
        "Airports.name": "Vunisea Airport",
      },
      {
        "Airports.airportid": "2674",
        "Airports.city": "Gualaquiza",
        "Airports.name": "Gualaquiza Airport",
      },
      {
        "Airports.airportid": "6020",
        "Airports.city": "San Fernando",
        "Airports.name": "San Fernando Airport",
      },
      {
        "Airports.airportid": "4023",
        "Airports.city": "Traverse City",
        "Airports.name": "Cherry Capital Airport",
      },
      {
        "Airports.airportid": "8740",
        "Airports.city": "Gorno-Altaysk",
        "Airports.name": "Gorno-Altaysk Airport",
      },
      {
        "Airports.airportid": "75",
        "Airports.city": "Pond Inlet",
        "Airports.name": "Pond Inlet Airport",
      },
      {
        "Airports.airportid": "2262",
        "Airports.city": "Fengnin",
        "Airports.name": "Taitung Airport",
      },
      {
        "Airports.airportid": "5504",
        "Airports.city": "Ivujivik",
        "Airports.name": "Ivujivik Airport",
      },
      {
        "Airports.airportid": "3053",
        "Airports.city": "Jorhat",
        "Airports.name": "Jorhat Airport",
      },
      {
        "Airports.airportid": "13177",
        "Airports.city": "Jakabszallas",
        "Airports.name": "Jakabszállás Airport",
      },
      {
        "Airports.airportid": "7058",
        "Airports.city": "Frenchville",
        "Airports.name": "Northern Aroostook Regional Airport",
      },
      {
        "Airports.airportid": "5407",
        "Airports.city": "Fera Island",
        "Airports.name": "Fera/Maringe Airport",
      },
      {
        "Airports.airportid": "856",
        "Airports.city": "Swartkop",
        "Airports.name": "Swartkop Air Force Base",
      },
      {
        "Airports.airportid": "2945",
        "Airports.city": "Lvov",
        "Airports.name": "Lviv International Airport",
      },
      {
        "Airports.airportid": "8472",
        "Airports.city": "Yalata",
        "Airports.name": "Yalata Mission Airport",
      },
      {
        "Airports.airportid": "3042",
        "Airports.city": "Bhubaneswar",
        "Airports.name": "Biju Patnaik Airport",
      },
      {
        "Airports.airportid": "3388",
        "Airports.city": "Nanjing",
        "Airports.name": "Nanjing Lukou Airport",
      },
      {
        "Airports.airportid": "2021",
        "Airports.city": "Manapouri",
        "Airports.name": "Manapouri Airport",
      },
      {
        "Airports.airportid": "1481",
        "Airports.city": "Stefanovikion",
        "Airports.name": "Stefanovikion Air Base",
      },
      {
        "Airports.airportid": "4196",
        "Airports.city": "Kastelorizo",
        "Airports.name": "Kastelorizo Airport",
      },
      {
        "Airports.airportid": "5474",
        "Airports.city": "La Tabatière",
        "Airports.name": "La Tabatière Airport",
      },
      {
        "Airports.airportid": "8087",
        "Airports.city": "Osnabrueck",
        "Airports.name": "Osnabrück-Atterheide Airport",
      },
      {
        "Airports.airportid": "6282",
        "Airports.city": "Kubin",
        "Airports.name": "Kubin Airport",
      },
      {
        "Airports.airportid": "3974",
        "Airports.city": "Mukalla",
        "Airports.name": "Mukalla International Airport",
      },
      {
        "Airports.airportid": "13448",
        "Airports.city": "El Bayadh",
        "Airports.name": "El Bayadh Airport",
      },
      {
        "Airports.airportid": "96",
        "Airports.city": "Matagami",
        "Airports.name": "Matagami Airport",
      },
      {
        "Airports.airportid": "160",
        "Airports.city": "Winnipeg",
        "Airports.name":
          "Winnipeg / James Armstrong Richardson International Airport",
      },
      {
        "Airports.airportid": "960",
        "Airports.city": "Luena",
        "Airports.name": "Luena Airport",
      },
      {
        "Airports.airportid": "420",
        "Airports.city": "Helsinki",
        "Airports.name": "Helsinki Malmi Airport",
      },
      {
        "Airports.airportid": "7419",
        "Airports.city": "Debre Marqos",
        "Airports.name": "Debra Marcos Airport",
      },
      {
        "Airports.airportid": "11752",
        "Airports.city": "Dolbeau-St-Félicien",
        "Airports.name": "Dolbeau St Felicien Airport",
      },
      {
        "Airports.airportid": "3705",
        "Airports.city": "Molokai",
        "Airports.name": "Molokai Airport",
      },
      {
        "Airports.airportid": "4374",
        "Airports.city": "Krasnoyarsk",
        "Airports.name": "Yemelyanovo Airport",
      },
      {
        "Airports.airportid": "6829",
        "Airports.city": "Fraser Island",
        "Airports.name": "Oceanside Municipal Airport",
      },
      {
        "Airports.airportid": "12017",
        "Airports.city": "",
        "Airports.name": "Corowa Airport",
      },
      {
        "Airports.airportid": "13016",
        "Airports.city": "New Smyrna Beach",
        "Airports.name": "New Smyrna Beach Municipal Airport",
      },
      {
        "Airports.airportid": "5537",
        "Airports.city": "Ilford",
        "Airports.name": "Ilford Airport",
      },
      {
        "Airports.airportid": "4296",
        "Airports.city": "Gillette",
        "Airports.name": "Gillette Campbell County Airport",
      },
      {
        "Airports.airportid": "7889",
        "Airports.city": "Ocean Reef Club Airport",
        "Airports.name": "Ocean Reef Club Airport",
      },
      {
        "Airports.airportid": "12618",
        "Airports.city": "Goondiwindi",
        "Airports.name": "Goondiwindi Airport",
      },
      {
        "Airports.airportid": "2107",
        "Airports.city": "Bastak",
        "Airports.name": "Bastak Airport",
      },
      {
        "Airports.airportid": "5599",
        "Airports.city": "Hemavan",
        "Airports.name": "Hemavan Airport",
      },
      {
        "Airports.airportid": "6758",
        "Airports.city": "Sege",
        "Airports.name": "Sege Airport",
      },
      {
        "Airports.airportid": "2741",
        "Airports.city": "Popayan",
        "Airports.name": "Guillermo León Valencia Airport",
      },
      {
        "Airports.airportid": "3804",
        "Airports.city": "Cheyenne",
        "Airports.name": "Cheyenne Regional Jerry Olson Field",
      },
      {
        "Airports.airportid": "11088",
        "Airports.city": "Ulysses",
        "Airports.name": "Ulysses Airport",
      },
      {
        "Airports.airportid": "6868",
        "Airports.city": "Sabadell",
        "Airports.name": "Sabadell Airport",
      },
      {
        "Airports.airportid": "1984",
        "Airports.city": "Arutua",
        "Airports.name": "Arutua Airport",
      },
      {
        "Airports.airportid": "3597",
        "Airports.city": "Carlsbad",
        "Airports.name": "Cavern City Air Terminal",
      },
      {
        "Airports.airportid": "777",
        "Airports.city": "Wunstorf",
        "Airports.name": "Wunstorf Air Base",
      },
      {
        "Airports.airportid": "6012",
        "Airports.city": "Camiguin",
        "Airports.name": "Camiguin Airport",
      },
      {
        "Airports.airportid": "5570",
        "Airports.city": "Lerwick",
        "Airports.name": "Lerwick / Tingwall Airport",
      },
      {
        "Airports.airportid": "6103",
        "Airports.city": "Zaporozhye",
        "Airports.name": "Zaporizhzhia International Airport",
      },
      {
        "Airports.airportid": "6084",
        "Airports.city": "Petropavlosk",
        "Airports.name": "Petropavlosk South Airport",
      },
      {
        "Airports.airportid": "1319",
        "Airports.city": "Cassagnes-beghones",
        "Airports.name": "Cassagnes-Bégonhès Airport",
      },
      {
        "Airports.airportid": "396",
        "Airports.city": "Mengen",
        "Airports.name": "Mengen-Hohentengen Airport",
      },
      {
        "Airports.airportid": "1755",
        "Airports.city": "South Caicos",
        "Airports.name": "South Caicos Airport",
      },
      {
        "Airports.airportid": "5550",
        "Airports.city": "Churchill Falls",
        "Airports.name": "Churchill Falls Airport",
      },
      {
        "Airports.airportid": "8052",
        "Airports.city": "Prospect Creek",
        "Airports.name": "Prospect Creek Airport",
      },
      {
        "Airports.airportid": "882",
        "Airports.city": "Selebi-phikwe",
        "Airports.name": "Selebi Phikwe Airport",
      },
      {
        "Airports.airportid": "13384",
        "Airports.city": "Ikerasaarsuk",
        "Airports.name": "Ikerassaarsuk Heliport",
      },
      {
        "Airports.airportid": "1586",
        "Airports.city": "Prerov",
        "Airports.name": "Přerov Air Base",
      },
      {
        "Airports.airportid": "8931",
        "Airports.city": "Longview",
        "Airports.name": "Longview Ranch Airport",
      },
      {
        "Airports.airportid": "6814",
        "Airports.city": "Culebra Island",
        "Airports.name": "Benjamin Rivera Noriega Airport",
      },
      {
        "Airports.airportid": "302",
        "Airports.city": "Brussels",
        "Airports.name": "Brussels Airport",
      },
      {
        "Airports.airportid": "2863",
        "Airports.city": "San Fernando De Apure",
        "Airports.name": "San Fernando De Apure Airport",
      },
      {
        "Airports.airportid": "887",
        "Airports.city": "Manzini",
        "Airports.name": "Matsapha Airport",
      },
      {
        "Airports.airportid": "2526",
        "Airports.city": "Belem",
        "Airports.name":
          "Val de Cans/Júlio Cezar Ribeiro International Airport",
      },
      {
        "Airports.airportid": "5762",
        "Airports.city": "Pellston",
        "Airports.name": "Pellston Regional Airport of Emmet County Airport",
      },
      {
        "Airports.airportid": "7062",
        "Airports.city": "Weyers Cave",
        "Airports.name": "Shenandoah Valley Regional Airport",
      },
      {
        "Airports.airportid": "3443",
        "Airports.city": "Pine Bluff",
        "Airports.name": "Grider Field",
      },
      {
        "Airports.airportid": "1880",
        "Airports.city": "Guapiles",
        "Airports.name": "Guapiles Airport",
      },
      {
        "Airports.airportid": "2114",
        "Airports.city": "Bakhtaran",
        "Airports.name": "Shahid Ashrafi Esfahani Airport",
      },
      {
        "Airports.airportid": "1786",
        "Airports.city": "Huatulco",
        "Airports.name": "Bahías de Huatulco International Airport",
      },
      {
        "Airports.airportid": "6196",
        "Airports.city": "Banmaw",
        "Airports.name": "Banmaw Airport",
      },
      {
        "Airports.airportid": "3562",
        "Airports.city": "Tucson",
        "Airports.name": "Davis Monthan Air Force Base",
      },
      {
        "Airports.airportid": "13463",
        "Airports.city": "Manzini",
        "Airports.name": "King Mswati III International Airport",
      },
      {
        "Airports.airportid": "7720",
        "Airports.city": "Big Timber",
        "Airports.name": "Big Timber Airport",
      },
      {
        "Airports.airportid": "1237",
        "Airports.city": "Rota",
        "Airports.name": "Rota Naval Station Airport",
      },
      {
        "Airports.airportid": "10148",
        "Airports.city": "Vladimir",
        "Airports.name": "Semyazino Airport",
      },
      {
        "Airports.airportid": "5806",
        "Airports.city": "Žilina",
        "Airports.name": "Žilina Airport",
      },
      {
        "Airports.airportid": "2947",
        "Airports.city": "Odessa",
        "Airports.name": "Odessa International Airport",
      },
      {
        "Airports.airportid": "6776",
        "Airports.city": "Sialkot",
        "Airports.name": "Sialkot Airport",
      },
      {
        "Airports.airportid": "991",
        "Airports.city": "Alphonse",
        "Airports.name": "Alphonse Airport",
      },
      {
        "Airports.airportid": "1074",
        "Airports.city": "Casablanca",
        "Airports.name": "Mohammed V International Airport",
      },
      {
        "Airports.airportid": "251",
        "Airports.city": "Sunyani",
        "Airports.name": "Sunyani Airport",
      },
      {
        "Airports.airportid": "7048",
        "Airports.city": "Camp Douglas",
        "Airports.name": "Volk Field",
      },
      {
        "Airports.airportid": "5554",
        "Airports.city": "Bordj Badji Mokhtar",
        "Airports.name": "Bordj Badji Mokhtar Airport",
      },
      {
        "Airports.airportid": "1553",
        "Airports.city": "Rome",
        "Airports.name": "Ciampino–G. B. Pastine International Airport",
      },
      {
        "Airports.airportid": "11785",
        "Airports.city": "Neubrandenburg",
        "Airports.name": "Neubrandenburg Airport",
      },
      {
        "Airports.airportid": "1842",
        "Airports.city": "San Luis Potosi",
        "Airports.name": "Ponciano Arriaga International Airport",
      },
      {
        "Airports.airportid": "4390",
        "Airports.city": "Hong Kong",
        "Airports.name": "Shun Tak Heliport",
      },
      {
        "Airports.airportid": "8118",
        "Airports.city": "Ormond Beach",
        "Airports.name": "Ormond Beach Municipal Airport",
      },
      {
        "Airports.airportid": "1461",
        "Airports.city": "Kasos",
        "Airports.name": "Kasos Airport",
      },
      {
        "Airports.airportid": "3291",
        "Airports.city": "Rengat",
        "Airports.name": "Japura Airport",
      },
      {
        "Airports.airportid": "6362",
        "Airports.city": "Ankang",
        "Airports.name": "Ankang Wulipu Airport",
      },
      {
        "Airports.airportid": "3463",
        "Airports.city": "Bangor",
        "Airports.name": "Bangor International Airport",
      },
      {
        "Airports.airportid": "5480",
        "Airports.city": "Kasabonika",
        "Airports.name": "Kasabonika Airport",
      },
      {
        "Airports.airportid": "13621",
        "Airports.city": "Jastarnia",
        "Airports.name": "Jastarnia Airport",
      },
      {
        "Airports.airportid": "1958",
        "Airports.city": "Aitutaki",
        "Airports.name": "Aitutaki Airport",
      },
      {
        "Airports.airportid": "453",
        "Airports.city": "Rovaniemi",
        "Airports.name": "Rovaniemi Airport",
      },
      {
        "Airports.airportid": "2571",
        "Airports.city": "Itumbiara",
        "Airports.name": "Francisco Vilela do Amaral Airport",
      },
      {
        "Airports.airportid": "4120",
        "Airports.city": "Haikou",
        "Airports.name": "Haikou Meilan International Airport",
      },
      {
        "Airports.airportid": "1824",
        "Airports.city": "Mexico City",
        "Airports.name": "Licenciado Benito Juarez International Airport",
      },
      {
        "Airports.airportid": "8864",
        "Airports.city": "Palo Alto",
        "Airports.name": "Palo Alto Airport of Santa Clara County",
      },
      {
        "Airports.airportid": "9188",
        "Airports.city": "New Orleans",
        "Airports.name": "Lakefront Airport",
      },
      {
        "Airports.airportid": "370",
        "Airports.city": "Moenchengladbach",
        "Airports.name": "Mönchengladbach Airport",
      },
      {
        "Airports.airportid": "1710",
        "Airports.city": "Kutahya",
        "Airports.name": "Kütahya Airport",
      },
      {
        "Airports.airportid": "7854",
        "Airports.city": "Kirovograd",
        "Airports.name": "Kirovograd Airport",
      },
      {
        "Airports.airportid": "5934",
        "Airports.city": "Lar",
        "Airports.name": "Lar Airport",
      },
      {
        "Airports.airportid": "4013",
        "Airports.city": "Redang",
        "Airports.name": "LTS Pulau Redang Airport",
      },
      {
        "Airports.airportid": "7870",
        "Airports.city": "Easton",
        "Airports.name": "Easton Newnam Field",
      },
      {
        "Airports.airportid": "12182",
        "Airports.city": "Pipalyatjara",
        "Airports.name": "Mount Davies Airport",
      },
      {
        "Airports.airportid": "9002",
        "Airports.city": "Menindee",
        "Airports.name": "Menindee Airport",
      },
      {
        "Airports.airportid": "6426",
        "Airports.city": "Worcester",
        "Airports.name": "Worcester Regional Airport",
      },
      {
        "Airports.airportid": "8308",
        "Airports.city": "Gainesville",
        "Airports.name": "Lee Gilmer Memorial Airport",
      },
      {
        "Airports.airportid": "7485",
        "Airports.city": "Yekaterinburg",
        "Airports.name": "Uktus Airport",
      },
      {
        "Airports.airportid": "1702",
        "Airports.city": "Balikesir",
        "Airports.name": "Balıkesir Merkez Airport",
      },
      {
        "Airports.airportid": "2477",
        "Airports.city": "Jujuy",
        "Airports.name": "Gobernador Horacio Guzman International Airport",
      },
      {
        "Airports.airportid": "3287",
        "Airports.city": "Jambi",
        "Airports.name": "Sultan Thaha Airport",
      },
      {
        "Airports.airportid": "10017",
        "Airports.city": "El Monte",
        "Airports.name": "San Gabriel Valley Airport",
      },
      {
        "Airports.airportid": "11093",
        "Airports.city": "Lampasas",
        "Airports.name": "Lampasas Airport",
      },
      {
        "Airports.airportid": "2485",
        "Airports.city": "Curuzu Cuatia",
        "Airports.name": "Curuzu Cuatia Airport",
      },
      {
        "Airports.airportid": "4179",
        "Airports.city": "Rukumkot",
        "Airports.name": "Rukumkot Airport",
      },
      {
        "Airports.airportid": "11277",
        "Airports.city": "Turtle Island",
        "Airports.name": "Turtle Island Seaplane Base",
      },
      {
        "Airports.airportid": "313",
        "Airports.city": "St.-hubert",
        "Airports.name": "Saint Hubert Air Base",
      },
      {
        "Airports.airportid": "5567",
        "Airports.city": "Papa Westray",
        "Airports.name": "Papa Westray Airport",
      },
      {
        "Airports.airportid": "3787",
        "Airports.city": "Bradshaw Field",
        "Airports.name": "Bradshaw Army Airfield",
      },
      {
        "Airports.airportid": "7068",
        "Airports.city": "McCook",
        "Airports.name": "Mc Cook Ben Nelson Regional Airport",
      },
      {
        "Airports.airportid": "7246",
        "Airports.city": "Manley Hot Springs",
        "Airports.name": "Manley Hot Springs Airport",
      },
      {
        "Airports.airportid": "1983",
        "Airports.city": "Takapoto",
        "Airports.name": "Takapoto Airport",
      },
      {
        "Airports.airportid": "184",
        "Airports.city": "Victoria",
        "Airports.name": "Victoria International Airport",
      },
      {
        "Airports.airportid": "2415",
        "Airports.city": "Baler",
        "Airports.name": "Dr.Juan C. Angara Airport",
      },
      {
        "Airports.airportid": "1278",
        "Airports.city": "Brive",
        "Airports.name": "Toul Rosières Air Base",
      },
      {
        "Airports.airportid": "5772",
        "Airports.city": "Santa Maria",
        "Airports.name": "Santa Maria Pub/Capt G Allan Hancock Field",
      },
      {
        "Airports.airportid": "7398",
        "Airports.city": "Coari",
        "Airports.name": "Coari Airport",
      },
      {
        "Airports.airportid": "10748",
        "Airports.city": "Stapleford",
        "Airports.name": "Stapleford Aerodrome",
      },
      {
        "Airports.airportid": "2205",
        "Airports.city": "Jacobsbad",
        "Airports.name": "Shahbaz Air Base",
      },
      {
        "Airports.airportid": "7690",
        "Airports.city": "Rocky Mount",
        "Airports.name": "Rocky Mount Wilson Regional Airport",
      },
      {
        "Airports.airportid": "2310",
        "Airports.city": "Oita",
        "Airports.name": "Oita Airport",
      },
      {
        "Airports.airportid": "7905",
        "Airports.city": "Lahr",
        "Airports.name": "Lahr Airport",
      },
      {
        "Airports.airportid": "2504",
        "Airports.city": "General Pico",
        "Airports.name": "General Pico Airport",
      },
      {
        "Airports.airportid": "3005",
        "Airports.city": "Deesa",
        "Airports.name": "Deesa Airport",
      },
      {
        "Airports.airportid": "6723",
        "Airports.city": "Shishmaref",
        "Airports.name": "Shishmaref Airport",
      },
      {
        "Airports.airportid": "7984",
        "Airports.city": "Athens",
        "Airports.name": "McMinn County Airport",
      },
      {
        "Airports.airportid": "301",
        "Airports.city": "Kleine Brogel",
        "Airports.name": "Kleine Brogel Air Base",
      },
      {
        "Airports.airportid": "669",
        "Airports.city": "Krakow",
        "Airports.name": "Kraków John Paul II International Airport",
      },
      {
        "Airports.airportid": "1033",
        "Airports.city": "Bunia",
        "Airports.name": "Bunia Airport",
      },
      {
        "Airports.airportid": "3300",
        "Airports.city": "Kerteh",
        "Airports.name": "Kerteh Airport",
      },
      {
        "Airports.airportid": "5697",
        "Airports.city": "Tobruk",
        "Airports.name": "Gamal Abdel Nasser Airport",
      },
      {
        "Airports.airportid": "347",
        "Airports.city": "Nuernberg",
        "Airports.name": "Nuremberg Airport",
      },
      {
        "Airports.airportid": "5946",
        "Airports.city": "Khuzdar",
        "Airports.name": "Khuzdar Airport",
      },
      {
        "Airports.airportid": "8848",
        "Airports.city": "Theodore",
        "Airports.name": "Theodore Airport",
      },
      {
        "Airports.airportid": "546",
        "Airports.city": "Peterborough",
        "Airports.name": "Peterborough Business Airport",
      },
      {
        "Airports.airportid": "13263",
        "Airports.city": "Port Hardy",
        "Airports.name": "Port Hardy Seaplane Base",
      },
      {
        "Airports.airportid": "320",
        "Airports.city": "Eisenhuettenstadt",
        "Airports.name": "Eisenhüttenstadt Airport",
      },
      {
        "Airports.airportid": "1119",
        "Airports.city": "Asosa",
        "Airports.name": "Asosa Airport",
      },
      {
        "Airports.airportid": "1634",
        "Airports.city": "Pico",
        "Airports.name": "Pico Airport",
      },
      {
        "Airports.airportid": "7090",
        "Airports.city": "Shageluk",
        "Airports.name": "Shageluk Airport",
      },
      {
        "Airports.airportid": "2828",
        "Airports.city": "San Carlos",
        "Airports.name": "San Carlos Airport",
      },
      {
        "Airports.airportid": "10173",
        "Airports.city": "Tremblay-en-France",
        "Airports.name": "Digby (General Hospital) Heliport",
      },
      {
        "Airports.airportid": "252",
        "Airports.city": "Takoradi",
        "Airports.name": "Takoradi Airport",
      },
      {
        "Airports.airportid": "2221",
        "Airports.city": "Quetta",
        "Airports.name": "Quetta International Airport",
      },
      {
        "Airports.airportid": "646",
        "Airports.city": "Hasvik",
        "Airports.name": "Hasvik Airport",
      },
      {
        "Airports.airportid": "8969",
        "Airports.city": "Copacabana",
        "Airports.name": "Copacabana Airport",
      },
      {
        "Airports.airportid": "5926",
        "Airports.city": "Wadi-al-dawasir",
        "Airports.name": "Wadi Al Dawasir Airport",
      },
      {
        "Airports.airportid": "6780",
        "Airports.city": "Eskissehir",
        "Airports.name": "Anadolu Airport",
      },
      {
        "Airports.airportid": "7774",
        "Airports.city": "Mysore",
        "Airports.name": "Mysore Airport",
      },
      {
        "Airports.airportid": "9372",
        "Airports.city": "Seymchan",
        "Airports.name": "Seymchan Airport",
      },
      {
        "Airports.airportid": "11981",
        "Airports.city": "Valek",
        "Airports.name": "Valek Airport",
      },
      {
        "Airports.airportid": "299",
        "Airports.city": "Antwerp",
        "Airports.name": "Antwerp International Airport (Deurne)",
      },
      {
        "Airports.airportid": "10611",
        "Airports.city": "Nasiriyah",
        "Airports.name": "Ali Air Base",
      },
      {
        "Airports.airportid": "6790",
        "Airports.city": "Hamadan",
        "Airports.name": "Hamadan Airport",
      },
      {
        "Airports.airportid": "4131",
        "Airports.city": "Nan",
        "Airports.name": "Nan Airport",
      },
      {
        "Airports.airportid": "11811",
        "Airports.city": "Beni Suef",
        "Airports.name": "Beni Suef Air Base",
      },
      {
        "Airports.airportid": "1389",
        "Airports.city": "Reims",
        "Airports.name": "Reims-Prunay Airport",
      },
      {
        "Airports.airportid": "5540",
        "Airports.city": "Fond-Du-Lac",
        "Airports.name": "Fond-Du-Lac Airport",
      },
      {
        "Airports.airportid": "6963",
        "Airports.city": "Tongren",
        "Airports.name": "Tongren Fenghuang Airport",
      },
      {
        "Airports.airportid": "13400",
        "Airports.city": "Sao Raimundo Nonato",
        "Airports.name": "Serra da Capivara Airport",
      },
      {
        "Airports.airportid": "675",
        "Airports.city": "Rzeszow",
        "Airports.name": "Rzeszów-Jasionka Airport",
      },
      {
        "Airports.airportid": "11272",
        "Airports.city": "Murray Bridge",
        "Airports.name": "Murray Bridge Airport",
      },
      {
        "Airports.airportid": "3026",
        "Airports.city": "Batticaloa",
        "Airports.name": "Batticaloa Airport",
      },
      {
        "Airports.airportid": "9901",
        "Airports.city": "Clermont",
        "Airports.name": "Clermont Airport",
      },
      {
        "Airports.airportid": "3795",
        "Airports.city": "Muir",
        "Airports.name": "Muir Army Air Field (Fort Indiantown Gap) Airport",
      },
      {
        "Airports.airportid": "1965",
        "Airports.city": "Tarawa",
        "Airports.name": "Bonriki International Airport",
      },
      {
        "Airports.airportid": "2861",
        "Airports.city": "Santo Domingo",
        "Airports.name": "Mayor Buenaventura Vivas International Airport",
      },
      {
        "Airports.airportid": "1414",
        "Airports.city": "Le Mans",
        "Airports.name": "Le Mans-Arnage Airport",
      },
      {
        "Airports.airportid": "591",
        "Airports.city": "Rotterdam",
        "Airports.name": "Rotterdam The Hague Airport",
      },
      {
        "Airports.airportid": "504",
        "Airports.city": "Farnborough",
        "Airports.name": "Farnborough Airport",
      },
      {
        "Airports.airportid": "2072",
        "Airports.city": "Jeddah",
        "Airports.name": "King Abdulaziz International Airport",
      },
      {
        "Airports.airportid": "7766",
        "Airports.city": "Syangboche",
        "Airports.name": "Syangboche Airport",
      },
      {
        "Airports.airportid": "6377",
        "Airports.city": "Simao",
        "Airports.name": "Pu'er Simao Airport",
      },
      {
        "Airports.airportid": "995",
        "Airports.city": "Praslin",
        "Airports.name": "Praslin Airport",
      },
      {
        "Airports.airportid": "377",
        "Airports.city": "Mindelheim",
        "Airports.name": "Mindelheim-Mattsies Airport",
      },
      {
        "Airports.airportid": "10140",
        "Airports.city": "Atherton",
        "Airports.name": "Atherton Airport",
      },
      {
        "Airports.airportid": "11638",
        "Airports.city": "Watsonville",
        "Airports.name": "Watsonville Municipal Airport",
      },
      {
        "Airports.airportid": "2957",
        "Airports.city": "Kemorovo",
        "Airports.name": "Kemerovo Airport",
      },
      {
        "Airports.airportid": "11897",
        "Airports.city": "Upala",
        "Airports.name": "Upala Airport",
      },
      {
        "Airports.airportid": "7009",
        "Airports.city": "Kerrville",
        "Airports.name": "Kerrville Municipal Louis Schreiner Field",
      },
      {
        "Airports.airportid": "1421",
        "Airports.city": "Vannes",
        "Airports.name": "Vannes-Meucon Airport",
      },
      {
        "Airports.airportid": "1012",
        "Airports.city": "Hwange National Park",
        "Airports.name": "Hwange National Park Airport",
      },
      {
        "Airports.airportid": "1060",
        "Airports.city": "Cufar",
        "Airports.name": "Cufar Airport",
      },
      {
        "Airports.airportid": "41",
        "Airports.city": "Coral Harbour",
        "Airports.name": "Coral Harbour Airport",
      },
      {
        "Airports.airportid": "2630",
        "Airports.city": "Sao Gabriel",
        "Airports.name": "São Gabriel da Cachoeira Airport",
      },
      {
        "Airports.airportid": "3567",
        "Airports.city": "Buckley",
        "Airports.name": "Buckley Air Force Base",
      },
      {
        "Airports.airportid": "8494",
        "Airports.city": "Phillips",
        "Airports.name": "Price County Airport",
      },
      {
        "Airports.airportid": "1885",
        "Airports.city": "San Jose",
        "Airports.name": "Juan Santamaria International Airport",
      },
      {
        "Airports.airportid": "12021",
        "Airports.city": "Deniliquin",
        "Airports.name": "Deniliquin Airport",
      },
      {
        "Airports.airportid": "2790",
        "Airports.city": "Juanjui",
        "Airports.name": "Juanjui Airport",
      },
      {
        "Airports.airportid": "6292",
        "Airports.city": "Mabuiag Island",
        "Airports.name": "Mabuiag Island Airport",
      },
      {
        "Airports.airportid": "2838",
        "Airports.city": "Elorza",
        "Airports.name": "Elorza Airport",
      },
      {
        "Airports.airportid": "9886",
        "Airports.city": "Nagan Raya",
        "Airports.name": "Seunagan Airport",
      },
      {
        "Airports.airportid": "3094",
        "Airports.city": "Gwalior",
        "Airports.name": "Gwalior Airport",
      },
      {
        "Airports.airportid": "7618",
        "Airports.city": "Santa Ana",
        "Airports.name": "Santa Ana Airport",
      },
      {
        "Airports.airportid": "5654",
        "Airports.city": "Ilebo",
        "Airports.name": "Ilebo Airport",
      },
      {
        "Airports.airportid": "8742",
        "Airports.city": "Fond du Lac",
        "Airports.name": "Fond du Lac County Airport",
      },
      {
        "Airports.airportid": "603",
        "Airports.city": "Shannon",
        "Airports.name": "Shannon Airport",
      },
      {
        "Airports.airportid": "6994",
        "Airports.city": "Lake City",
        "Airports.name": "Lake City Gateway Airport",
      },
      {
        "Airports.airportid": "7443",
        "Airports.city": "Bird Island",
        "Airports.name": "Bird Island Airport",
      },
      {
        "Airports.airportid": "6321",
        "Airports.city": "Portland",
        "Airports.name": "Portland Airport",
      },
      {
        "Airports.airportid": "2005",
        "Airports.city": "Noumea",
        "Airports.name": "La Tontouta International Airport",
      },
      {
        "Airports.airportid": "3003",
        "Airports.city": "Bhaunagar",
        "Airports.name": "Bhavnagar Airport",
      },
      {
        "Airports.airportid": "11719",
        "Airports.city": "Aero",
        "Airports.name": "Ærø Airport",
      },
      {
        "Airports.airportid": "3613",
        "Airports.city": "Savannah",
        "Airports.name": "Savannah Hilton Head International Airport",
      },
      {
        "Airports.airportid": "7035",
        "Airports.city": "Hutchinson",
        "Airports.name": "Hutchinson Municipal Airport",
      },
      {
        "Airports.airportid": "8293",
        "Airports.city": "Centre",
        "Airports.name": "Centre-Piedmont-Cherokee County Regional Airport",
      },
      {
        "Airports.airportid": "2675",
        "Airports.city": "Ibarra",
        "Airports.name": "Atahualpa Airport",
      },
      {
        "Airports.airportid": "5604",
        "Airports.city": "Mpumalanga",
        "Airports.name": "Kruger Mpumalanga International Airport",
      },
      {
        "Airports.airportid": "4230",
        "Airports.city": "Temple",
        "Airports.name": "Draughon Miller Central Texas Regional Airport",
      },
      {
        "Airports.airportid": "11739",
        "Airports.city": "Huettenbusch",
        "Airports.name": "Hüttenbusch Airport",
      },
      {
        "Airports.airportid": "1211",
        "Airports.city": "Albacete",
        "Airports.name": "Albacete-Los Llanos Airport",
      },
      {
        "Airports.airportid": "6511",
        "Airports.city": "Lake Tekapo",
        "Airports.name": "Tekapo Aerodrome",
      },
      {
        "Airports.airportid": "1678",
        "Airports.city": "Zurich",
        "Airports.name": "Zürich Airport",
      },
      {
        "Airports.airportid": "4213",
        "Airports.city": "Iguatu",
        "Airports.name": "Iguatu Airport",
      },
      {
        "Airports.airportid": "7071",
        "Airports.city": "Wolf Point",
        "Airports.name": "L M Clayton Airport",
      },
      {
        "Airports.airportid": "3997",
        "Airports.city": "Aasiaat",
        "Airports.name": "Aasiaat Airport",
      },
      {
        "Airports.airportid": "4221",
        "Airports.city": "Hayman Island",
        "Airports.name": "Hayman Island Heliport",
      },
      {
        "Airports.airportid": "739",
        "Airports.city": "Borlange",
        "Airports.name": "Borlange Airport",
      },
      {
        "Airports.airportid": "7582",
        "Airports.city": "Richfield",
        "Airports.name": "Richfield Municipal Airport",
      },
      {
        "Airports.airportid": "155",
        "Airports.city": "Norman Wells",
        "Airports.name": "Norman Wells Airport",
      },
      {
        "Airports.airportid": "128",
        "Airports.city": "Resolute",
        "Airports.name": "Resolute Bay Airport",
      },
      {
        "Airports.airportid": "1827",
        "Airports.city": "Nogales",
        "Airports.name": "Nogales International Airport",
      },
      {
        "Airports.airportid": "2135",
        "Airports.city": "Jiroft",
        "Airports.name": "Jiroft Airport",
      },
      {
        "Airports.airportid": "4309",
        "Airports.city": "Ancona",
        "Airports.name": "Ancona Falconara Airport",
      },
      {
        "Airports.airportid": "1514",
        "Airports.city": "Reggio Calabria",
        "Airports.name": "Reggio Calabria Airport",
      },
      {
        "Airports.airportid": "3601",
        "Airports.city": "Fort Huachuca",
        "Airports.name": "Sierra Vista Municipal Libby Army Air Field",
      },
      {
        "Airports.airportid": "1724",
        "Airports.city": "Erzurum",
        "Airports.name": "Erzurum International Airport",
      },
      {
        "Airports.airportid": "640",
        "Airports.city": "Bardufoss",
        "Airports.name": "Bardufoss Airport",
      },
      {
        "Airports.airportid": "5888",
        "Airports.city": "Apataki",
        "Airports.name": "Apataki Airport",
      },
      {
        "Airports.airportid": "8855",
        "Airports.city": "Neustadt-Glewe",
        "Airports.name": "Neustadt-Glewe Airport",
      },
      {
        "Airports.airportid": "1845",
        "Airports.city": "Torreon",
        "Airports.name": "Francisco Sarabia International Airport",
      },
      {
        "Airports.airportid": "9163",
        "Airports.city": "Kvarkeno",
        "Airports.name": "Kvarkeno",
      },
      {
        "Airports.airportid": "6265",
        "Airports.city": "Elcho Island",
        "Airports.name": "Elcho Island Airport",
      },
      {
        "Airports.airportid": "6997",
        "Airports.city": "Santa Lucia",
        "Airports.name": "Palmar Airport",
      },
      {
        "Airports.airportid": "9829",
        "Airports.city": "Mbeya",
        "Airports.name": "Mbeya Airport",
      },
      {
        "Airports.airportid": "9277",
        "Airports.city": "Sandtoft",
        "Airports.name": "Sandtoft Airfield",
      },
      {
        "Airports.airportid": "3685",
        "Airports.city": "Grand Rapids",
        "Airports.name": "Gerald R. Ford International Airport",
      },
      {
        "Airports.airportid": "917",
        "Airports.city": "St.-pierre",
        "Airports.name": "Pierrefonds Airport",
      },
      {
        "Airports.airportid": "9408",
        "Airports.city": "Chehalis",
        "Airports.name": "Chehalis Centralia Airport",
      },
      {
        "Airports.airportid": "9797",
        "Airports.city": "North Wilkesboro",
        "Airports.name": "Wilkes County Airport",
      },
      {
        "Airports.airportid": "11201",
        "Airports.city": "Vila Rica",
        "Airports.name": "Vila Rica Airport",
      },
      {
        "Airports.airportid": "7711",
        "Airports.city": "Arkhangelsk",
        "Airports.name": "Vaskovo Airport",
      },
      {
        "Airports.airportid": "2367",
        "Airports.city": "Kangnung",
        "Airports.name": "Gangneung Airport (K-18)",
      },
      {
        "Airports.airportid": "2596",
        "Airports.city": "Santo Angelo",
        "Airports.name": "Santo Ângelo Airport",
      },
      {
        "Airports.airportid": "2430",
        "Airports.city": "Kalibo",
        "Airports.name": "Kalibo International Airport",
      },
      {
        "Airports.airportid": "8771",
        "Airports.city": "Lompoc",
        "Airports.name": "Lompoc Airport",
      },
      {
        "Airports.airportid": "6793",
        "Airports.city": "Orange",
        "Airports.name": "Orange Airport",
      },
      {
        "Airports.airportid": "10062",
        "Airports.city": "Pineville",
        "Airports.name": "Kee Field",
      },
      {
        "Airports.airportid": "5910",
        "Airports.city": "Ambryn Island",
        "Airports.name": "Uléi Airport",
      },
      {
        "Airports.airportid": "11203",
        "Airports.city": "Caceres",
        "Airports.name": "Cáceres Airport",
      },
      {
        "Airports.airportid": "11871",
        "Airports.city": "Kuçovë",
        "Airports.name": "Kuçovë Air Base",
      },
      {
        "Airports.airportid": "1400",
        "Airports.city": "Merville",
        "Airports.name": "Merville-Calonne Airport",
      },
      {
        "Airports.airportid": "3672",
        "Airports.city": "Tacoma",
        "Airports.name": "McChord Air Force Base",
      },
      {
        "Airports.airportid": "6719",
        "Airports.city": "Kivalina",
        "Airports.name": "Kivalina Airport",
      },
      {
        "Airports.airportid": "7647",
        "Airports.city": "Santa Monica",
        "Airports.name": "Santa Monica Municipal Airport",
      },
      {
        "Airports.airportid": "1991",
        "Airports.city": "Huahine Island",
        "Airports.name": "Huahine-Fare Airport",
      },
      {
        "Airports.airportid": "203",
        "Airports.city": "Teslin",
        "Airports.name": "Teslin Airport",
      },
      {
        "Airports.airportid": "4060",
        "Airports.city": "Seronera",
        "Airports.name": "Seronera Airport",
      },
      {
        "Airports.airportid": "6944",
        "Airports.city": "Jining",
        "Airports.name": "Jining Qufu Airport",
      },
      {
        "Airports.airportid": "10794",
        "Airports.city": "Rio de Janeiro",
        "Airports.name": "Morro da Urca Heliport",
      },
      {
        "Airports.airportid": "10160",
        "Airports.city": "Erenhot",
        "Airports.name": "Erenhot Saiwusu International Airport",
      },
      {
        "Airports.airportid": "11889",
        "Airports.city": "Sarzana (SP)",
        "Airports.name": "Sarzana-Luni Air Base",
      },
      {
        "Airports.airportid": "2709",
        "Airports.city": "Bogota",
        "Airports.name": "El Dorado International Airport",
      },
      {
        "Airports.airportid": "7352",
        "Airports.city": "Mahdia",
        "Airports.name": "Mahdia Airport",
      },
      {
        "Airports.airportid": "2544",
        "Airports.city": "Corumba",
        "Airports.name": "Corumbá International Airport",
      },
      {
        "Airports.airportid": "5853",
        "Airports.city": "Trinidad",
        "Airports.name": "Alberto Delgado Airport",
      },
      {
        "Airports.airportid": "7179",
        "Airports.city": "Kiana",
        "Airports.name": "Bob Baker Memorial Airport",
      },
      {
        "Airports.airportid": "48",
        "Airports.city": "Dawson Creek",
        "Airports.name": "Dawson Creek Airport",
      },
      {
        "Airports.airportid": "6909",
        "Airports.city": "Oshkosh",
        "Airports.name": "Wittman Regional Airport",
      },
      {
        "Airports.airportid": "1851",
        "Airports.city": "Tapachula",
        "Airports.name": "Tapachula International Airport",
      },
      {
        "Airports.airportid": "1931",
        "Airports.city": "San Andros",
        "Airports.name": "San Andros Airport",
      },
      {
        "Airports.airportid": "5835",
        "Airports.city": "Ciudad Constitución",
        "Airports.name": "Ciudad Constitución Airport",
      },
      {
        "Airports.airportid": "1677",
        "Airports.city": "Grenchen",
        "Airports.name": "Grenchen Airport",
      },
      {
        "Airports.airportid": "3355",
        "Airports.city": "Canberra",
        "Airports.name": "Canberra International Airport",
      },
      {
        "Airports.airportid": "6206",
        "Airports.city": "Senggeh-Papua Island",
        "Airports.name": "Senggeh Airport",
      },
      {
        "Airports.airportid": "1254",
        "Airports.city": "Calais",
        "Airports.name": "Calais-Dunkerque Airport",
      },
      {
        "Airports.airportid": "2247",
        "Airports.city": "West Tinian",
        "Airports.name": "Tinian International Airport",
      },
      {
        "Airports.airportid": "53",
        "Airports.city": "Eureka",
        "Airports.name": "Eureka Airport",
      },
      {
        "Airports.airportid": "2712",
        "Airports.city": "Buenaventura",
        "Airports.name": "Gerardo Tobar López Airport",
      },
      {
        "Airports.airportid": "69",
        "Airports.city": "Gjoa Haven",
        "Airports.name": "Gjoa Haven Airport",
      },
      {
        "Airports.airportid": "6376",
        "Airports.city": "Luxi",
        "Airports.name": "Mangshi Airport",
      },
      {
        "Airports.airportid": "3738",
        "Airports.city": "Brownsville",
        "Airports.name": "Brownsville South Padre Island International Airport",
      },
      {
        "Airports.airportid": "1485",
        "Airports.city": "Tripolis",
        "Airports.name": "Tripolis Airport",
      },
      {
        "Airports.airportid": "328",
        "Airports.city": "Schoenhagen",
        "Airports.name": "Schönhagen Airport",
      },
      {
        "Airports.airportid": "2812",
        "Airports.city": "Cuzco",
        "Airports.name": "Alejandro Velasco Astete International Airport",
      },
      {
        "Airports.airportid": "961",
        "Airports.city": "Uige",
        "Airports.name": "Uige Airport",
      },
      {
        "Airports.airportid": "1127",
        "Airports.city": "Abu Simbel",
        "Airports.name": "Abu Simbel Airport",
      },
      {
        "Airports.airportid": "3429",
        "Airports.city": "Iliamna",
        "Airports.name": "Iliamna Airport",
      },
      {
        "Airports.airportid": "2906",
        "Airports.city": "Mustique",
        "Airports.name": "Mustique Airport",
      },
      {
        "Airports.airportid": "678",
        "Airports.city": "Shapaja",
        "Airports.name": "Swidwin Military Air Base",
      },
      {
        "Airports.airportid": "1534",
        "Airports.city": "Cuneo",
        "Airports.name": "Cuneo International Airport",
      },
      {
        "Airports.airportid": "440",
        "Airports.city": "Vesivehmaa",
        "Airports.name": "Lahti Vesivehmaa Airport",
      },
      {
        "Airports.airportid": "8225",
        "Airports.city": "Arctic Bay",
        "Airports.name": "Old Arctic Bay Airport",
      },
      {
        "Airports.airportid": "6088",
        "Airports.city": "Kostanay",
        "Airports.name": "Kostanay West Airport",
      },
      {
        "Airports.airportid": "9247",
        "Airports.city": "Parry Sound",
        "Airports.name": "Parry Sound Area Municipal Airport",
      },
      {
        "Airports.airportid": "6881",
        "Airports.city": "Riverton WY",
        "Airports.name": "Riverton Regional Airport",
      },
      {
        "Airports.airportid": "1833",
        "Airports.city": "Punta Penasco",
        "Airports.name": "Puerto Peñasco International Airport",
      },
      {
        "Airports.airportid": "2976",
        "Airports.city": "Ashkhabad",
        "Airports.name": "Ashgabat Airport",
      },
      {
        "Airports.airportid": "13243",
        "Airports.city": "Bajawa",
        "Airports.name": "Bajawa Soa Airport",
      },
      {
        "Airports.airportid": "9792",
        "Airports.city": "Brenham",
        "Airports.name": "Brenham Municipal Airport",
      },
      {
        "Airports.airportid": "1136",
        "Airports.city": "Aswan",
        "Airports.name": "Aswan International Airport",
      },
      {
        "Airports.airportid": "13416",
        "Airports.city": "Pyramiden",
        "Airports.name": "Pyramiden Heliport",
      },
      {
        "Airports.airportid": "3373",
        "Airports.city": "Nanning",
        "Airports.name": "Nanning Wuxu Airport",
      },
      {
        "Airports.airportid": "10949",
        "Airports.city": "Wonsan",
        "Airports.name": "Wonsan Kalma International Airport",
      },
      {
        "Airports.airportid": "4304",
        "Airports.city": "Georgetown",
        "Airports.name": "Cheddi Jagan International Airport",
      },
      {
        "Airports.airportid": "2196",
        "Airports.city": "Thumrait",
        "Airports.name": "Thumrait Air Base",
      },
      {
        "Airports.airportid": "7550",
        "Airports.city": "Amakusa",
        "Airports.name": "Amakusa Airport",
      },
      {
        "Airports.airportid": "7182",
        "Airports.city": "Selawik",
        "Airports.name": "Selawik Airport",
      },
      {
        "Airports.airportid": "4330",
        "Airports.city": "Tehran",
        "Airports.name": "Imam Khomeini International Airport",
      },
      {
        "Airports.airportid": "1050",
        "Airports.city": "Banjul",
        "Airports.name": "Banjul International Airport",
      },
      {
        "Airports.airportid": "2685",
        "Airports.city": "Pasaje",
        "Airports.name": "Amable Calle Gutierrez Airport",
      },
      {
        "Airports.airportid": "3771",
        "Airports.city": "Plattsburgh",
        "Airports.name": "Plattsburgh International Airport",
      },
      {
        "Airports.airportid": "1484",
        "Airports.city": "Kasteli",
        "Airports.name": "Kasteli Airport",
      },
      {
        "Airports.airportid": "7221",
        "Airports.city": "ZAPALA",
        "Airports.name": "Zapala Airport",
      },
      {
        "Airports.airportid": "9245",
        "Airports.city": "Holland Landing",
        "Airports.name": "Holland Landing Airpark",
      },
      {
        "Airports.airportid": "8098",
        "Airports.city": "Celle",
        "Airports.name": "Celle-Arloh Airport",
      },
      {
        "Airports.airportid": "10831",
        "Airports.city": "Roxboro",
        "Airports.name": "Person County Airport",
      },
      {
        "Airports.airportid": "3368",
        "Airports.city": "Tianjin",
        "Airports.name": "Tianjin Binhai International Airport",
      },
      {
        "Airports.airportid": "3566",
        "Airports.city": "Houston",
        "Airports.name": "William P Hobby Airport",
      },
      {
        "Airports.airportid": "3124",
        "Airports.city": "Janakpur",
        "Airports.name": "Janakpur Airport",
      },
      {
        "Airports.airportid": "3803",
        "Airports.city": "Willow Grove",
        "Airports.name": "Willow Grove Naval Air Station/Joint Reserve Base",
      },
      {
        "Airports.airportid": "691",
        "Airports.city": "Gothenborg",
        "Airports.name": "Gothenburg City Airport",
      },
      {
        "Airports.airportid": "3956",
        "Airports.city": "Kaunas",
        "Airports.name": "Kaunas International Airport",
      },
      {
        "Airports.airportid": "735",
        "Airports.city": "Vidsel",
        "Airports.name": "Vidsel Air Base",
      },
      {
        "Airports.airportid": "7769",
        "Airports.city": "Murrieta-Temecula",
        "Airports.name": "French Valley Airport",
      },
      {
        "Airports.airportid": "8474",
        "Airports.city": "Cumberland",
        "Airports.name": "Greater Cumberland Regional Airport",
      },
      {
        "Airports.airportid": "1999",
        "Airports.city": "Koumac",
        "Airports.name": "Koumac Airport",
      },
      {
        "Airports.airportid": "8932",
        "Airports.city": "Rothera Research Station",
        "Airports.name": "Rothera Research Station",
      },
      {
        "Airports.airportid": "8914",
        "Airports.city": "Rio Hondo",
        "Airports.name": "Termas de Río Hondo international Airport",
      },
      {
        "Airports.airportid": "534",
        "Airports.city": "Glasgow",
        "Airports.name": "Glasgow International Airport",
      },
      {
        "Airports.airportid": "7660",
        "Airports.city": "Wangen-Lachen",
        "Airports.name": "Wangen-Lachen Airport",
      },
      {
        "Airports.airportid": "4064",
        "Airports.city": "Saint George",
        "Airports.name": "St George Municipal Airport",
      },
      {
        "Airports.airportid": "351",
        "Airports.city": "Berlin",
        "Airports.name": "Berlin-Tegel Airport",
      },
      {
        "Airports.airportid": "12672",
        "Airports.city": "Jasper",
        "Airports.name": "Marion County Brown Field",
      },
      {
        "Airports.airportid": "8811",
        "Airports.city": "Georgetown",
        "Airports.name": "Georgetown Municipal Airport",
      },
      {
        "Airports.airportid": "2831",
        "Airports.city": "Carora",
        "Airports.name": "Carora Airport",
      },
      {
        "Airports.airportid": "6193",
        "Airports.city": "Phucat",
        "Airports.name": "Phu Cat Airport",
      },
      {
        "Airports.airportid": "4183",
        "Airports.city": "Tumling Tar",
        "Airports.name": "Tumling Tar Airport",
      },
      {
        "Airports.airportid": "970",
        "Airports.city": "Libreville",
        "Airports.name": "Libreville Leon M'ba International Airport",
      },
      {
        "Airports.airportid": "4015",
        "Airports.city": "Charlottesville VA",
        "Airports.name": "Charlottesville Albemarle Airport",
      },
      {
        "Airports.airportid": "7245",
        "Airports.city": "Lake Minchumina",
        "Airports.name": "Minchumina Airport",
      },
      {
        "Airports.airportid": "3260",
        "Airports.city": "Manokwari",
        "Airports.name": "Rendani Airport",
      },
      {
        "Airports.airportid": "267",
        "Airports.city": "Ilorin",
        "Airports.name": "Ilorin International Airport",
      },
      {
        "Airports.airportid": "5430",
        "Airports.city": "Momote",
        "Airports.name": "Momote Airport",
      },
      {
        "Airports.airportid": "1995",
        "Airports.city": "Raiatea Island",
        "Airports.name": "Raiatea Airport",
      },
      {
        "Airports.airportid": "277",
        "Airports.city": "Yola",
        "Airports.name": "Yola Airport",
      },
      {
        "Airports.airportid": "5473",
        "Airports.city": "Tête-à-la-Baleine",
        "Airports.name": "Tête-à-la-Baleine Airport",
      },
      {
        "Airports.airportid": "7362",
        "Airports.city": "Condoto",
        "Airports.name": "Mandinga Airport",
      },
      {
        "Airports.airportid": "7777",
        "Airports.city": "Richmond",
        "Airports.name": "Richmond Municipal Airport",
      },
      {
        "Airports.airportid": "9186",
        "Airports.city": "Fryeburg",
        "Airports.name": "Eastern Slopes Regional Airport",
      },
      {
        "Airports.airportid": "518",
        "Airports.city": "Warton",
        "Airports.name": "Warton Airport",
      },
      {
        "Airports.airportid": "2580",
        "Airports.city": "Lins",
        "Airports.name": "Lins Airport",
      },
      {
        "Airports.airportid": "3220",
        "Airports.city": "Lashio",
        "Airports.name": "Lashio Airport",
      },
      {
        "Airports.airportid": "2457",
        "Airports.city": "Tinogasta",
        "Airports.name": "Tinogasta Airport",
      },
      {
        "Airports.airportid": "9025",
        "Airports.city": "Bijie",
        "Airports.name": "Bijie Feixiong Airport",
      },
      {
        "Airports.airportid": "1325",
        "Airports.city": "Propriano",
        "Airports.name": "Propriano Airport",
      },
      {
        "Airports.airportid": "11805",
        "Airports.city": "Lusaka",
        "Airports.name": "Lusaka City Airport",
      },
      {
        "Airports.airportid": "1207",
        "Airports.city": "Varazdin",
        "Airports.name": "Varaždin Airport",
      },
      {
        "Airports.airportid": "62",
        "Airports.city": "La Grande Riviere",
        "Airports.name": "La Grande Rivière Airport",
      },
      {
        "Airports.airportid": "8281",
        "Airports.city": "Westfield",
        "Airports.name": "Westfield-Barnes Regional Airport",
      },
      {
        "Airports.airportid": "13364",
        "Airports.city": "Siorapaluk",
        "Airports.name": "Siorapaluk Heliport",
      },
      {
        "Airports.airportid": "13468",
        "Airports.city": "Mansa",
        "Airports.name": "Mansa Airport",
      },
      {
        "Airports.airportid": "13627",
        "Airports.city": "Hikueru",
        "Airports.name": "Hikueru Atoll Airport",
      },
      {
        "Airports.airportid": "2171",
        "Airports.city": "Amman",
        "Airports.name": "Amman-Marka International Airport",
      },
      {
        "Airports.airportid": "9138",
        "Airports.city": "Marana",
        "Airports.name": "Pinal Airpark",
      },
      {
        "Airports.airportid": "6106",
        "Airports.city": "Ivano-Frankivsk",
        "Airports.name": "Ivano-Frankivsk International Airport",
      },
      {
        "Airports.airportid": "2148",
        "Airports.city": "Kalaleh",
        "Airports.name": "Kalaleh Airport",
      },
      {
        "Airports.airportid": "6375",
        "Airports.city": "Shangri-La",
        "Airports.name": "Diqing Airport",
      },
      {
        "Airports.airportid": "8253",
        "Airports.city": "Umuarama",
        "Airports.name": "Umuarama Airport",
      },
      {
        "Airports.airportid": "8512",
        "Airports.city": "Madison",
        "Airports.name": "Madison Municipal Airport",
      },
      {
        "Airports.airportid": "3602",
        "Airports.city": "Lihue",
        "Airports.name": "Lihue Airport",
      },
      {
        "Airports.airportid": "6148",
        "Airports.city": "Andizhan",
        "Airports.name": "Andizhan Airport",
      },
      {
        "Airports.airportid": "3552",
        "Airports.city": "Camp Springs",
        "Airports.name": "Andrews Air Force Base",
      },
      {
        "Airports.airportid": "5740",
        "Airports.city": "Grand Island",
        "Airports.name": "Central Nebraska Regional Airport",
      },
      {
        "Airports.airportid": "470",
        "Airports.city": "Coventry",
        "Airports.name": "Coventry Airport",
      },
      {
        "Airports.airportid": "509",
        "Airports.city": "Lydd",
        "Airports.name": "Lydd Airport",
      },
      {
        "Airports.airportid": "5445",
        "Airports.city": "Narsaq",
        "Airports.name": "Narsaq Heliport",
      },
      {
        "Airports.airportid": "6301",
        "Airports.city": "Moranbah",
        "Airports.name": "Moranbah Airport",
      },
      {
        "Airports.airportid": "1247",
        "Airports.city": "Valladolid",
        "Airports.name": "Valladolid Airport",
      },
      {
        "Airports.airportid": "7295",
        "Airports.city": "Waspam",
        "Airports.name": "Waspam Airport",
      },
      {
        "Airports.airportid": "3030",
        "Airports.city": "Trinciomalee",
        "Airports.name": "China Bay Airport",
      },
      {
        "Airports.airportid": "11431",
        "Airports.city": "San Sebastian",
        "Airports.name": "San Sebastián Airport",
      },
      {
        "Airports.airportid": "6926",
        "Airports.city": "Rimatara",
        "Airports.name": "Rimatara Airport",
      },
      {
        "Airports.airportid": "3338",
        "Airports.city": "Melbourne",
        "Airports.name": "Melbourne Moorabbin Airport",
      },
      {
        "Airports.airportid": "11798",
        "Airports.city": "Ljungbyhed",
        "Airports.name": "Ljungbyhed Airport",
      },
      {
        "Airports.airportid": "2002",
        "Airports.city": "Mare",
        "Airports.name": "Maré Airport",
      },
      {
        "Airports.airportid": "6936",
        "Airports.city": "Khabarovsk",
        "Airports.name": "Khabarovsk Airport",
      },
      {
        "Airports.airportid": "11948",
        "Airports.city": "Tamchy",
        "Airports.name": "Issyk-Kul International Airport",
      },
      {
        "Airports.airportid": "7265",
        "Airports.city": "Red Sucker Lake",
        "Airports.name": "Red Sucker Lake Airport",
      },
      {
        "Airports.airportid": "797",
        "Airports.city": "Cape Town",
        "Airports.name": "Cape Town International Airport",
      },
      {
        "Airports.airportid": "8221",
        "Airports.city": "Madera",
        "Airports.name": "Madera Municipal Airport",
      },
      {
        "Airports.airportid": "895",
        "Airports.city": "Diego Garcia Island",
        "Airports.name": "Diego Garcia Naval Support Facility",
      },
      {
        "Airports.airportid": "1337",
        "Airports.city": "St.-yan",
        "Airports.name": "Saint-Yan Airport",
      },
      {
        "Airports.airportid": "220",
        "Airports.city": "Annaba",
        "Airports.name": "Rabah Bitat Airport",
      },
      {
        "Airports.airportid": "8208",
        "Airports.city": "Ittoqqortoormiit",
        "Airports.name": "Ittoqqortoormiit Heliport",
      },
      {
        "Airports.airportid": "1475",
        "Airports.city": "Skiathos",
        "Airports.name": "Skiathos Island National Airport",
      },
      {
        "Airports.airportid": "7205",
        "Airports.city": "Klawock",
        "Airports.name": "Klawock Airport",
      },
      {
        "Airports.airportid": "3581",
        "Airports.city": "Galveston",
        "Airports.name": "Scholes International At Galveston Airport",
      },
      {
        "Airports.airportid": "3067",
        "Airports.city": "Zero",
        "Airports.name": "Ziro Airport",
      },
      {
        "Airports.airportid": "5948",
        "Airports.city": "Parachinar",
        "Airports.name": "Parachinar Airport",
      },
      {
        "Airports.airportid": "11935",
        "Airports.city": "Talca",
        "Airports.name": "Panguilemo Airport",
      },
      {
        "Airports.airportid": "6227",
        "Airports.city": "Sintang-Borneo Island",
        "Airports.name": "Sintang(Susilo) Airport",
      },
      {
        "Airports.airportid": "45",
        "Airports.city": "Deer Lake",
        "Airports.name": "Deer Lake Airport",
      },
      {
        "Airports.airportid": "1213",
        "Airports.city": "Almeria",
        "Airports.name": "Almería International Airport",
      },
      {
        "Airports.airportid": "1259",
        "Airports.city": "Le Tourquet",
        "Airports.name": "Le Touquet-Côte d'Opale Airport",
      },
      {
        "Airports.airportid": "1042",
        "Airports.city": "Kananga",
        "Airports.name": "Kananga Airport",
      },
      {
        "Airports.airportid": "7983",
        "Airports.city": "Gila Bend",
        "Airports.name": "Gila Bend Municipal Airport",
      },
      {
        "Airports.airportid": "730",
        "Airports.city": "Arvidsjaur",
        "Airports.name": "Arvidsjaur Airport",
      },
      {
        "Airports.airportid": "1442",
        "Airports.city": "Amberieu",
        "Airports.name": "Ambérieu Air Base (BA 278)",
      },
      {
        "Airports.airportid": "1740",
        "Airports.city": "Nis",
        "Airports.name": "Nis Airport",
      },
      {
        "Airports.airportid": "6940",
        "Airports.city": "Yaroslavl",
        "Airports.name": "Tunoshna Airport",
      },
      {
        "Airports.airportid": "3865",
        "Airports.city": "Valdez",
        "Airports.name": "Valdez Pioneer Field",
      },
      {
        "Airports.airportid": "9399",
        "Airports.city": "Newton",
        "Airports.name": "Newton City-County Airport",
      },
      {
        "Airports.airportid": "4218",
        "Airports.city": "Bundaberg",
        "Airports.name": "Bundaberg Airport",
      },
      {
        "Airports.airportid": "11913",
        "Airports.city": "Qayyarah",
        "Airports.name": "Qayyarah West Airport",
      },
      {
        "Airports.airportid": "2873",
        "Airports.city": "Lethem",
        "Airports.name": "Lethem Airport",
      },
      {
        "Airports.airportid": "3560",
        "Airports.city": "Harlingen",
        "Airports.name": "Valley International Airport",
      },
      {
        "Airports.airportid": "2898",
        "Airports.city": "Oranjestad",
        "Airports.name": "F. D. Roosevelt Airport",
      },
      {
        "Airports.airportid": "3582",
        "Airports.city": "Long Beach",
        "Airports.name": "Long Beach /Daugherty Field/ Airport",
      },
      {
        "Airports.airportid": "493",
        "Airports.city": "Plymouth",
        "Airports.name": "Plymouth City Airport",
      },
      {
        "Airports.airportid": "5479",
        "Airports.city": "Fort Frances",
        "Airports.name": "Fort Frances Municipal Airport",
      },
      {
        "Airports.airportid": "2657",
        "Airports.city": "Easter Island",
        "Airports.name": "Mataveri Airport",
      },
      {
        "Airports.airportid": "1954",
        "Airports.city": "Duncan Town",
        "Airports.name": "Duncan Town Airport",
      },
      {
        "Airports.airportid": "2759",
        "Airports.city": "Cochabamba",
        "Airports.name": "Jorge Wilsterman International Airport",
      },
      {
        "Airports.airportid": "295",
        "Airports.city": "Sfax",
        "Airports.name": "Sfax Thyna International Airport",
      },
      {
        "Airports.airportid": "3278",
        "Airports.city": "Padang",
        "Airports.name": "Minangkabau International Airport",
      },
      {
        "Airports.airportid": "570",
        "Airports.city": "Cottesmore",
        "Airports.name": "RAF Cottesmore",
      },
      {
        "Airports.airportid": "5881",
        "Airports.city": "Angaha, Niuafo'ou Island",
        "Airports.name": "Mata'aho Airport",
      },
      {
        "Airports.airportid": "2127",
        "Airports.city": "Kushke Nosrat",
        "Airports.name": "Kushke Nosrat Airport",
      },
      {
        "Airports.airportid": "3811",
        "Airports.city": "Birmingham",
        "Airports.name": "Birmingham-Shuttlesworth International Airport",
      },
      {
        "Airports.airportid": "993",
        "Airports.city": "Farquhar",
        "Airports.name": "Farquhar Airport",
      },
      {
        "Airports.airportid": "171",
        "Airports.city": "Earlton",
        "Airports.name": "Earlton (Timiskaming Regional) Airport",
      },
      {
        "Airports.airportid": "5444",
        "Airports.city": "Nanortalik",
        "Airports.name": "Nanortalik Heliport",
      },
      {
        "Airports.airportid": "3658",
        "Airports.city": "Bush Field",
        "Airports.name": "Augusta Regional At Bush Field",
      },
      {
        "Airports.airportid": "7131",
        "Airports.city": "Arkalyk",
        "Airports.name": "Arkalyk North Airport",
      },
      {
        "Airports.airportid": "820",
        "Airports.city": "Johannesburg",
        "Airports.name": "Lanseria Airport",
      },
      {
        "Airports.airportid": "5467",
        "Airports.city": "North Spirit Lake",
        "Airports.name": "North Spirit Lake Airport",
      },
      {
        "Airports.airportid": "1990",
        "Airports.city": "Rangiroa",
        "Airports.name": "Rangiroa Airport",
      },
      {
        "Airports.airportid": "1457",
        "Airports.city": "Kavala",
        "Airports.name": "Amigdhaleon Airport",
      },
      {
        "Airports.airportid": "5488",
        "Airports.city": "Nain",
        "Airports.name": "Nain Airport",
      },
      {
        "Airports.airportid": "6467",
        "Airports.city": "North Connel",
        "Airports.name": "Oban Airport",
      },
      {
        "Airports.airportid": "1094",
        "Airports.city": "Nouakschott",
        "Airports.name": "Nouakchott–Oumtounsy International Airport",
      },
      {
        "Airports.airportid": "1987",
        "Airports.city": "Nuku Hiva",
        "Airports.name": "Nuku Hiva Airport",
      },
      {
        "Airports.airportid": "361",
        "Airports.city": "Siegerland",
        "Airports.name": "Siegerland Airport",
      },
      {
        "Airports.airportid": "530",
        "Airports.city": "Sumburgh",
        "Airports.name": "Sumburgh Airport",
      },
      {
        "Airports.airportid": "750",
        "Airports.city": "Spangdahlem",
        "Airports.name": "Spangdahlem Air Base",
      },
      {
        "Airports.airportid": "8335",
        "Airports.city": "Zagora",
        "Airports.name": "Zagora Airport",
      },
      {
        "Airports.airportid": "357",
        "Airports.city": "Allendorf",
        "Airports.name": "Allendorf/Eder Airport",
      },
      {
        "Airports.airportid": "4229",
        "Airports.city": "Breckenridge",
        "Airports.name": "Stephens County Airport",
      },
      {
        "Airports.airportid": "11814",
        "Airports.city": "Alton/St Louis",
        "Airports.name": "St Louis Regional Airport",
      },
      {
        "Airports.airportid": "8873",
        "Airports.city": "Hasselt",
        "Airports.name": "Kiewit Airfield Hasselt",
      },
      {
        "Airports.airportid": "6898",
        "Airports.city": "Laverton",
        "Airports.name": "RAAF Williams, Laverton Base",
      },
      {
        "Airports.airportid": "7768",
        "Airports.city": "Krasnoyarsk",
        "Airports.name": "Cheremshanka Airport",
      },
      {
        "Airports.airportid": "5742",
        "Airports.city": "Huntington",
        "Airports.name": "Tri-State/Milton J. Ferguson Field",
      },
      {
        "Airports.airportid": "6287",
        "Airports.city": "Lismore",
        "Airports.name": "Lismore Airport",
      },
      {
        "Airports.airportid": "2656",
        "Airports.city": "Concepcion",
        "Airports.name": "Carriel Sur Airport",
      },
      {
        "Airports.airportid": "6108",
        "Airports.city": "Rivne",
        "Airports.name": "Rivne International Airport",
      },
      {
        "Airports.airportid": "1695",
        "Airports.city": "Malatya",
        "Airports.name": "Malatya Erhaç Airport",
      },
      {
        "Airports.airportid": "8306",
        "Airports.city": "Atlanta",
        "Airports.name": "Peachtree City Falcon Field",
      },
      {
        "Airports.airportid": "809",
        "Airports.city": "Harmony",
        "Airports.name": "Harmony Airport",
      },
      {
        "Airports.airportid": "6297",
        "Airports.city": "McArthur River Mine",
        "Airports.name": "McArthur River Mine Airport",
      },
      {
        "Airports.airportid": "3957",
        "Airports.city": "Kaunas",
        "Airports.name": "S. Darius and S. Girėnas Airport",
      },
      {
        "Airports.airportid": "7787",
        "Airports.city": "Ebenhofen",
        "Airports.name": "Engels heliport",
      },
      {
        "Airports.airportid": "11966",
        "Airports.city": "Saki",
        "Airports.name": "Saki Air Base",
      },
      {
        "Airports.airportid": "11049",
        "Airports.city": "La Grand'Combe",
        "Airports.name": "La Grand'combe Airport",
      },
      {
        "Airports.airportid": "13176",
        "Airports.city": "Budaoers",
        "Airports.name": "Budaörs Airfield",
      },
      {
        "Airports.airportid": "7483",
        "Airports.city": "Vanavara",
        "Airports.name": "Vanavara Airport",
      },
      {
        "Airports.airportid": "854",
        "Airports.city": "Saldanha",
        "Airports.name": "Saldanha /Vredenburg Airport",
      },
      {
        "Airports.airportid": "2385",
        "Airports.city": "Iejima",
        "Airports.name": "Ie Shima Auxiliary Air Base",
      },
      {
        "Airports.airportid": "3467",
        "Airports.city": "Spokane",
        "Airports.name": "Spokane International Airport",
      },
      {
        "Airports.airportid": "3766",
        "Airports.city": "Mineral Wells",
        "Airports.name": "Mineral Wells Airport",
      },
      {
        "Airports.airportid": "4197",
        "Airports.city": "Marsa Alam",
        "Airports.name": "Marsa Alam International Airport",
      },
      {
        "Airports.airportid": "513",
        "Airports.city": "Repton",
        "Airports.name": "Retford Gamston Airport",
      },
      {
        "Airports.airportid": "608",
        "Airports.city": "Billund",
        "Airports.name": "Billund Airport",
      },
      {
        "Airports.airportid": "6126",
        "Airports.city": "Aleknagik",
        "Airports.name": "Aleknagik / New Airport",
      },
      {
        "Airports.airportid": "9190",
        "Airports.city": "Beaumont",
        "Airports.name": "Beaumont Municipal Airport",
      },
      {
        "Airports.airportid": "5960",
        "Airports.city": "Gustavus",
        "Airports.name": "Gustavus Airport",
      },
      {
        "Airports.airportid": "6123",
        "Airports.city": "Nalchik",
        "Airports.name": "Nalchik Airport",
      },
      {
        "Airports.airportid": "5864",
        "Airports.city": "Mauke Island",
        "Airports.name": "Mauke Airport",
      },
      {
        "Airports.airportid": "13491",
        "Airports.city": "Pimenta Bueno",
        "Airports.name": "Pimenta Bueno Airport",
      },
      {
        "Airports.airportid": "7220",
        "Airports.city": "Wainwright",
        "Airports.name": "Wainwright Airport",
      },
      {
        "Airports.airportid": "3501",
        "Airports.city": "Robinson",
        "Airports.name": "Robinson Army Air Field",
      },
      {
        "Airports.airportid": "4249",
        "Airports.city": "Saba",
        "Airports.name": "Juancho E. Yrausquin Airport",
      },
      {
        "Airports.airportid": "9066",
        "Airports.city": "Hampton",
        "Airports.name": "Henry County Airport",
      },
      {
        "Airports.airportid": "688",
        "Airports.city": "Joenkoeping",
        "Airports.name": "Jönköping Airport",
      },
      {
        "Airports.airportid": "8318",
        "Airports.city": "Augusta",
        "Airports.name": "Daniel Field",
      },
      {
        "Airports.airportid": "2144",
        "Airports.city": "Emam Shahr",
        "Airports.name": "Shahroud Airport",
      },
      {
        "Airports.airportid": "8362",
        "Airports.city": "Manitowaning",
        "Airports.name": "Manitoulin East Municipal Airport",
      },
      {
        "Airports.airportid": "11005",
        "Airports.city": "Greenville",
        "Airports.name": "Greenville Downtown Airport",
      },
      {
        "Airports.airportid": "11017",
        "Airports.city": "Tucson",
        "Airports.name": "Ryan Field",
      },
      {
        "Airports.airportid": "2442",
        "Airports.city": "Buenos Aires",
        "Airports.name": "Jorge Newbery Airpark",
      },
      {
        "Airports.airportid": "2816",
        "Airports.city": "Montevideo",
        "Airports.name": "Carrasco International /General C L Berisso Airport",
      },
      {
        "Airports.airportid": "450",
        "Airports.city": "Pyhasalmi",
        "Airports.name": "Pyhäsalmi Airport",
      },
      {
        "Airports.airportid": "11870",
        "Airports.city": "Kukës",
        "Airports.name": "Kukës Airport",
      },
      {
        "Airports.airportid": "1103",
        "Airports.city": "Boa Vista",
        "Airports.name": "Rabil Airport",
      },
      {
        "Airports.airportid": "6736",
        "Airports.city": "Port Clarence",
        "Airports.name": "Port Clarence Coast Guard Station",
      },
      {
        "Airports.airportid": "8511",
        "Airports.city": "Jesup",
        "Airports.name": "Jesup Wayne County Airport",
      },
      {
        "Airports.airportid": "4308",
        "Airports.city": "Dunhuang",
        "Airports.name": "Dunhuang Airport",
      },
      {
        "Airports.airportid": "3648",
        "Airports.city": "Fort Polk",
        "Airports.name": "Polk Army Air Field",
      },
    ],
    page: 0,
    limit: 1000,
    order: [],
    offset: 0,
    filters: [],
    measures: [],
    segments: [],
    timezone: "UTC",
    dimensions: ["Airports.airportid", "Airports.name", "Airports.city"],
    timeDimensions: [],
    rawSql: {
      params: [],
      preAggregations: [],
      sql: 'SELECT\n      `airports`."AirportID" `airports__airportid`, `airports`."Name" `airports__name`, `airports`."City" `airports__city`\n    FROM\n      default.airports AS `airports`  GROUP BY `airports__airportid`, `airports__name`, `airports__city` LIMIT 1000',
    },
    skippedMembers: [],
    settings: {},
  },
  explorationRowId: "b24d941c-94ac-4bca-8a3a-9e179a4fc06e",
  screenshotMode: false,
  rowHeight: 20,
  isActive: true,
};
