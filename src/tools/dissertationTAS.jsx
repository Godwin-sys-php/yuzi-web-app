const obj = {
  title: "Dissertation TAS",
  desc: "Créez une dissertation suvivant le modèle Thèse-Antithèse-Synthèse",
  icon: <i className="fa-solid fa-pencil fa-xl"></i>,

  colorCombo: 2,

  to: "/tools/dissertation",
  api: "/tools/dissertation",

  output: {
    title: "Dissertation",
    desc: "Voici la dissertation générée par l'IA",
  },
  prompts: [
    {
      title: "Le sujet ou la problématique de votre dissertation",
      attr: "subject",
      placeholder: "La place de la science durant la Seconde Guerre mondiale ",
      type: "input",
      minLength: 1,
      maxLength: 100,
      required: true,
      example: "La sagesse est l'art de vivre",
    },
    {
      title: "Les éléments à inclure",
      attr: "elements",
      placeholder:
        "Les éléments que vous souhaitez voir dans votre dissertation",
      type: "textarea",
      maxLength: 200,
      required: false,
      example: "",
    },
  ],
  example: {
    output: `Introduction:
La sagesse est une qualité reconnue à travers le temps et l'espace, souvent considérée comme le summum de l'art de vivre. Elle ne se limite pas à la simple accumulation de connaissances ou à la réalisation d'objectifs concrets, mais implique une réflexion approfondie sur la vie et ses valeurs, ainsi qu'une série de choix conscients. Mais quels sont les composants de la sagesse et comment pouvons-nous les cultiver?

Thèse:
La sagesse est un art de vivre qui repose sur plusieurs piliers. Tout d'abord, la sagesse nécessite la connaissance de soi. Lorsque nous nous connaissions mieux, nous apprenons à être honnêtes avec nous-mêmes et à reconnaître nos propres limites. Cela nous aide à prendre des décisions plus éclairées et à orienter nos choix en fonction de nos besoins et de nos valeurs.

De même, la sagesse implique une forte éthique personnelle. Les personnes sages cherchent à vivre une vie en accord avec leurs croyances et leurs valeurs profondes, en agissant avec honnêteté et intégrité. Ils sont également respectueux des autres et cherchent à établir des relations harmonieuses avec leur entourage.

En outre, la sagesse suppose une attitude d'ouverture et une curiosité constante. Une personne sage est habitée d'un désir de comprendre le monde qui l'entoure, de découvrir de nouvelles idées et d'élargir ses horizons. Ils se montrent également réceptifs aux idées des autres et sont prêts à remettre en cause leurs propres convictions.

Antithèse:
Cependant, il est possible aussi de voir la sagesse d’un autre angle, car elle n'est pas un idéal immuable, mais plutôt une qualité qui varie selon les différentes cultures et les époques de l'histoire. En effet, les critères pour juger de la sagesse humaine varient d'une société à l'autre : ce qui est considéré comme sage dans certaines cultures peut être perçu comme étrange ou même nocif dans d'autres. Par conséquent, il semble difficile d'établir une définition universelle de la sagesse.

En outre, il existe des cas où la sagesse peut entrer en conflit avec d'autres valeurs également importantes. Par exemple, l'honnêteté est souvent considérée comme une qualité sage, mais dans certaines situations, la dissimulation d'informations peut s'avérer nécessaire pour protéger une personne ou une communauté. Dans ces cas, la sagesse peut exiger de prendre des décisions difficiles, voire contradictoires, qui peuvent être difficiles à justifier.

Synthèse:
Finalement, il apparaît que la sagesse est une qualité complexe qui dépend de nombreux facteurs, tels que la connaissance de soi, l'éthique personnelle et l'attitude d'ouverture. Cependant, comme le soutient l'antithèse, la sagesse est également fortement influencée par les cultures et les valeurs de la société dans laquelle elle émerge. Par conséquent, il n'est pas possible d'établir une définition universelle de la sagesse.

Une autre conclusion importante est que la sagesse n'est pas une qualité statique mais plutôt une qualité dynamique, capable de s'adapter aux circonstances et aux valeurs changeantes. Bien qu'il puisse y avoir des conflits entre la sagesse et d'autres valeurs, les personnes les plus sages sont celles qui sont capables de naviguer avec succès dans ces contextes complexes, en décidant des choix les mieux adaptés à la situation spécifique.

Conclusion:
En fin de compte, la sagesse est un art de vivre qui définit les individus les plus accomplis et les plus épanouis, mais qui dépend également de multiples facteurs. Pour cultiver la sagesse, il est important de rechercher une plus grande connaissance de soi, de vivre en accord avec ses valeurs et de rester curieux et ouvert d'esprit. La sagesse n’est pas un idéal immuable, mais plutôt une qualité dynamique qui s’adapte à différents contextes de vie, en permettant aux individus de naviguer avec succès dans un monde complexe et changeant.
      `,
  },
};

export default obj;
