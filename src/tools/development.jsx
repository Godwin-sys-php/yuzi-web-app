const obj = {
  title: "Developpement",
  desc: "Créez un paragraphe utile pour votre article ou votre rédaction.",
  icon: <i className="fa-solid fa-maximize fa-xl"></i>,

  colorCombo: 1,

  to: "/tools/development",
  api: "/tools/development",

  output: {
    title: "Développement",
    desc: "Voici le paragraphe généré par l'IA",
  },

  prompts: [
    {
      title: "Sujet principale",
      attr: "main",
      placeholder: "La Seconde Guerre Mondiale",
      type: "input",
      minLength: 1,
      maxLength: 50,
      required: true,
      example: "La Seconde Guerre Mondiale",
    },
    {
      title: "Sujet à traité",
      attr: "sub",
      placeholder: "L'armistice",
      type: "input",
      minLength: 1,
      maxLength: 50,
      required: true,
      example: "L'armistice",
    },
    {
      title: "Points à aborder",
      attr: "points",
      placeholder:
        "Les points que vous souhaitez aborder dans votre développement",
      type: "textarea",
      maxLength: 200,
      required: false,
      example: "",
    },
  ],
  example: {
    output:
      "L'armistice marqua la fin de la guerre et détermina les conditions de la victoire des Alliés. Signé le 8 mai 1945, après la reddition officielle de l'Allemagne, il mit fin à six années de guerre sanglante en Europe. L'armistice a marqué un tournant dans l'histoire, car il a ouvert la voie à une ère de reconstruction et de réconciliation entre les pays d'Europe. De plus, il a permis l'organisation de procès des criminels de guerre nazis et la création de l'Organisation des Nations Unies. Cependant, l'armistice n'a pas mis fin à tous les conflits. La guerre continue en Asie, où les combats avec le Japon ont duré jusqu'à l'automne 1945. Les conséquences de la guerre ont été dévastatrices pour les populations civiles et les soldats, marquées par la mort, la destruction et la souffrance. Ainsi, la Seconde Guerre mondiale constitue un événement majeur de l'histoire contemporaine dont les répercussions ont été ressenties longtemps après la fin du conflit.",
  },
};

export default obj;
