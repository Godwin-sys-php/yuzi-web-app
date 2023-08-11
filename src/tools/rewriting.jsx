const obj = {
  title: "Réécriture",
  desc: "Réécrivez des textes de manière plus original",
  icon: <i className="fa-solid fa-rotate fa-xl"></i>,

  colorCombo: 3,

  to: "/tools/rewriting",
  api: "/tools/rewriting",

  output: {
    title: "Réécriture",
    desc: "Voici la texte généré par l'IA",
  },

  prompts: [
    {
      title: "Texte à réécrire",
      attr: "text",
      placeholder: "Le texte que vous souhaitez réécrire...",
      type: "textarea",
      minLength: 1,
      maxLength: 600,
      required: true,
      example:
        "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
    },
    {
      title: "Style de réecriture",
      attr: "style",
      placeholder:
        "Moins complexe, changement de mot, changement de temps, etc.",
      type: "input",
      maxLength: 100,
      required: false,
      example: "Plus simple",
    },
  ],
  example: {
    output:
      "L'IA imite l'intelligence humaine en utilisant des algorithmes dans un environnement informatique, afin que les ordinateurs puissent penser et agir comme des humains.",
    // outputs: [],
    // Icon: RefreshIcon,
    // color: "",
  },
};

export default obj;
