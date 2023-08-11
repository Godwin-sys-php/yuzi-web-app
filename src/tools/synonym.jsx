const obj = {
  title: "Synonymes",
  desc: "Obtenez des synonymes pour le mot désiré.",
  icon: <i className="fa-solid fa-quote-right fa-xl"></i>,

  colorCombo: 4,

  to: "/tools/synonym",
  api: "/tools/synonym",

  output: {
    title: "Synonymes",
    desc: "Voici les synonymes trouvés par l'IA",
  },

  prompts: [
    {
      title: "Mot",
      attr: "word",
      value: "",
      placeholder: "Le mot",
      type: "input",
      minLength: 1,
      maxLength: 50,
      required: true,
      example:
        "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
    },
  ],
  example: {
    output: `"L'intelligence artificielle : la capacité d'imiter l'intelligence humaine"`,
  },
};

export default obj;
