const obj = {
  title: "Plume Libre",
  desc: "Libérez votre créativité avec Plume Libre. Dirigez l'IA pour rédiger, questionner ou explorer des idées, sans aucune contrainte.",
  icon: <i className="fas fa-feather fa-xl"></i>,

  colorCombo: 0,

  to: "/tools/freestyle",
  api: "/tools/freestyle",

  output: {
    title: "Réponse",
    desc: "Voici la réponse généré par l'IA",
  },
  prompts: [
    {
      title: "Texte à soumettre à l'IA",
      attr: "qa",
      placeholder: "Raconte moi sous forme d'histoire la seconde guerre mondaile...",
      type: "textarea",
      minLength: 1,
      maxLength: 800,
      required: true,
      example: "Donne moi le plan pour mon exposé de géographie sur la place de l'ONU dans la société actuelle",
    },
  ],
  example: {
    output: `Dans l'ère technologique où nous évoluons,
Se développe une intelligence artificielle passionnante,
Elle apprend, elle imite, elle raisonne,
Fascinante, elle devient captivante.

Elle sait anticiper, calculer,l
Elle exécute des milliers de tâches à la seconde,
Une machine qui peut presque penser,
Quelle prodigieuse invention qui abonde.

Certains la voient comme un danger,
L'homme pourrait-il être surpassé ?
Mais elle est là pour nous aider,
Ainsi notre confort est maximisé.

Elle analyse, elle suggère,
En quelques secondes, elle agrège,
L'intelligence artificielle est un maître,
Elle envahit nos vies sans aucun refus ni allégence.

Que sera l'avenir pour notre destinée,
Avec cette incroyable intelligence artificielle,
Sera-t-on en mesure de la dominer,
Ou succombera-t-elle à nos propres querelles ?

L'intelligence artificielle est un véritable prodige,
Elle augure le paysage futur,
Mais n'oublions pas qu'elle n'est qu'une sorte de clé,
L'homme, sans cesse, reste le gardien de sa propre ouverture.
      `,
  },
};

export default obj;
