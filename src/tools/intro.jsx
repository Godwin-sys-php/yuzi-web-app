const obj = {
  title: "Introduction",
  desc: "Créez une introduction, une phrase d'ouverture ou un paragraphe utile pour votre article ou votre rédaction.",
  icon: <i className="fa-solid fa-info fa-xl"></i>,

  colorCombo: 1,

  to: "/tools/intro",
  api: "/tools/intro",

  output: {
    title: "Introduction",
    desc: "Voici l'introduction générée par l'IA",
  },
  prompts: [
    {
      title: "Problématique",
      attr: "problematique",
      placeholder: "La problématique ou le sujet de votre introduction",
      type: "input",
      minLength: 1,
      maxLength: 150,
      required: true,
      example:
        "Les enseignants de collège n'ont pas les compétences nécessaires pour reconnaître et guider les élèves surdoués en cours",
    },
  ],
  example: {
    output:
      "Les élèves surdoués ont des capacités intellectuelles supérieures à la moyenne de leur âge, ce qui peut souvent les amener à s'ennuyer en classe ou à avoir des difficultés à trouver leur place. Bien que certains enseignants soient formés pour reconnaître et soutenir ces élèves, il est souvent difficile pour les enseignants de collège, qui ont une charge de travail importante, de fournir une aide adaptée aux élèves surdoués. Dans cette rédaction, nous allons examiner les compétences nécessaires pour reconnaître et guider les élèves surdoués en classe, les difficultés rencontrées par les enseignants de collège et les solutions potentielles pour améliorer l'encadrement de ces élèves.",
  },
};

export default obj;
