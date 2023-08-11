const obj = {
  title: "Poème",
  desc: "Créez des poèmes en un rien de temps avec l'IA",
  icon: <i className="fa-brands fa-pied-piper-hat fa-xl"></i>,

  colorCombo: 3,

  to: "/tools/poem",
  api: "/tools/poem",

  output: {
    title: "Poème",
    desc: "Voici le poème généré par l'IA",
  },
  prompts: [
    {
      title: "Description",
      attr: "desc",
      placeholder: "Un poème sur l'amour...",
      type: "textarea",
      minLength: 1,
      maxLength: 150,
      required: true,
      example: "Un poème sur l'intelligence artificielle",
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
