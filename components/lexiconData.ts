export interface LexiconEntry {
    term: string;
    definition: string;
    reference: string;
    category: string;
  }
  
  export const DIGNITY_LEXICON: LexiconEntry[] = [
    // I. FOUNDATIONAL PRINCIPLES
    {
      term: "Dignity",
      definition: "The intrinsic worth of all human beings, serving as the moral and legal foundation for universal human rights.",
      reference: "McCrudden, C. (2008). Human dignity and judicial interpretation of human rights. European Journal of International Law, 19 (4), 655–724.",
      category: "Foundational Principles"
    },
    {
      term: "Inherent Worth",
      definition: "The non-contingent value of each person, not dependent on merit or circumstance.",
      reference: "Beyleveld, D., & Brownsword, R. (2001). Human Dignity in Bioethics and Biolaw. Oxford University Press.",
      category: "Foundational Principles"
    },
    {
      term: "Human Rights",
      definition: "The codified entitlements arising from dignity, ensuring protection of life, liberty, and equality.",
      reference: "Donnelly, J. (2013). Universal Human Rights in Theory and Practice. Cornell University Press.",
      category: "Foundational Principles"
    },
    {
      term: "Autonomy",
      definition: "The right to self-determination and informed decision-making in moral and legal contexts.",
      reference: "O’Neill, O. (2002). Autonomy and Trust in Bioethics. Cambridge University Press.",
      category: "Foundational Principles"
    },
    {
      term: "Respect",
      definition: "Recognition of another’s dignity through attitudes and practices that affirm equality.",
      reference: "Sensen, O. (2011). Kant on Human Dignity. De Gruyter.",
      category: "Foundational Principles"
    },
  
    // II. LEGAL AND POLITICAL DIMENSIONS
    {
      term: "Constitutional Dignity",
      definition: "The formal recognition of dignity as a constitutional right and interpretive principle.",
      reference: "Barak, A. (2015). Human Dignity: The Constitutional Value and the Constitutional Right. Cambridge University Press.",
      category: "Legal and Political Dimensions"
    },
    {
      term: "Dignity Jurisprudence",
      definition: "Judicial reasoning that defines and applies dignity in human rights law.",
      reference: "Rao, N. (2011). Three Concepts of Dignity in Constitutional Law. Notre Dame Law Review, 86 (1), 183–271.",
      category: "Legal and Political Dimensions"
    },
    {
      term: "Balancing Rights",
      definition: "A legal process to reconcile conflicts between dignity and other protected freedoms.",
      reference: "Alexy, R. (2002). A Theory of Constitutional Rights. Oxford University Press.",
      category: "Legal and Political Dimensions"
    },
    {
      term: "Proportionality Principle",
      definition: "The requirement that state interference with rights must be appropriate and necessary.",
      reference: "Klatt, M., & Meister, M. (2012). The Constitutional Structure of Proportionality. Oxford University Press.",
      category: "Legal and Political Dimensions"
    },
    {
      term: "Restorative Justice",
      definition: "Justice aimed at restoring dignity through accountability and community repair.",
      reference: "Zehr, H. (2002). The Little Book of Restorative Justice. Good Books.",
      category: "Legal and Political Dimensions"
    },
  
    // III. SOCIAL DIGNITY AND HUMAN EXPERIENCE
    {
      term: "Social Dignity",
      definition: "The public manifestation of self-worth in societal interaction.",
      reference: "Jacobson, N. (2007). Dignity and health: A review. Social Science & Medicine, 64 (2), 292–302.",
      category: "Social Dignity"
    },
    {
      term: "Economic Dignity",
      definition: "The assurance of material conditions that enable autonomy and self-respect.",
      reference: "Summers, L. (2019). Economic Dignity. Foreign Affairs, 98 (2), 12–20.",
      category: "Social Dignity"
    },
    {
      term: "Bodily Integrity",
      definition: "The inviolability of the human body against physical coercion or intrusion.",
      reference: "Macklin, R. (2003). Dignity is a useless concept. BMJ, 327 (7429), 1419–1420.",
      category: "Social Dignity"
    },
    {
      term: "Empowerment",
      definition: "Processes enabling individuals to reclaim agency and affirm their dignity.",
      reference: "Sen, A. (1999). Development as Freedom. Oxford University Press.",
      category: "Social Dignity"
    },
    {
      term: "Marginalization",
      definition: "Systemic exclusion denying individuals recognition and dignity.",
      reference: "Fraser, N. (2000). Rethinking recognition. New Left Review, 3, 107–120.",
      category: "Social Dignity"
    },
  
    // IV. HEALTH, ENVIRONMENT, AND TECHNOLOGY
    {
      term: "Bioethics",
      definition: "The discipline addressing moral dilemmas in life sciences where dignity is central.",
      reference: "Beauchamp, T., & Childress, J. (2019). Principles of Biomedical Ethics (8th ed.). Oxford University Press.",
      category: "Health, Environment, and Technology"
    },
    {
      term: "Dignified Care",
      definition: "Medical treatment that honors individuality and humanity.",
      reference: "Jacobson, N. (2009). A taxonomy of dignity. Qualitative Health Research, 19 (3), 293–304.",
      category: "Health, Environment, and Technology"
    },
    {
      term: "Digital Dignity",
      definition: "The preservation of autonomy, privacy, and identity in digital spaces.",
      reference: "Floridi, L. (2013). The Ethics of Information. Oxford University Press.",
      category: "Health, Environment, and Technology"
    },
    {
      term: "AI Ethics",
      definition: "Normative principles ensuring AI systems respect human dignity and rights.",
      reference: "Jobin, A., Ienca, M., & Vayena, E. (2019). The global landscape of AI ethics guidelines. Nature Machine Intelligence, 1 (9), 389–399.",
      category: "Health, Environment, and Technology"
    },
    {
      term: "Environmental Dignity",
      definition: "Recognition of the interdependence of human and ecological well-being.",
      reference: "Bosselmann, K. (2016). The Principle of Sustainability. Routledge.",
      category: "Health, Environment, and Technology"
    },
  
    // V. GLOBAL AND CULTURAL DIMENSIONS
    {
      term: "Universalism",
      definition: "The idea that dignity and rights are valid across all human societies.",
      reference: "Donnelly, J. (2007). The relative universality of human rights. Human Rights Quarterly, 29 (2), 281–306.",
      category: "Global and Cultural Dimensions"
    },
    {
      term: "Cultural Relativism",
      definition: "The perspective that dignity and rights depend on cultural context.",
      reference: "Merry, S. E. (2006). Human Rights and Gender Violence. University of Chicago Press.",
      category: "Global and Cultural Dimensions"
    },
    {
      term: "Solidarity",
      definition: "Commitment to others’ dignity as an expression of shared humanity.",
      reference: "Bayertz, K. (1999). Solidarity: Philosophical Studies. Springer.",
      category: "Global and Cultural Dimensions"
    },
    {
      term: "Subsidiarity",
      definition: "The principle that decisions should be made at the most local dignity-respecting level.",
      reference: "Pontifical Council for Justice and Peace (2004). Compendium of the Social Doctrine of the Church.",
      category: "Global and Cultural Dimensions"
    },
    {
      term: "Dignity in Diversity",
      definition: "Valuing cultural and individual difference as integral to dignity.",
      reference: "Nussbaum, M. (2011). Creating Capabilities: The Human Development Approach. Harvard University Press.",
      category: "Global and Cultural Dimensions"
    },
  
    // VI. ETHICAL AND PHILOSOPHICAL FOUNDATIONS
    {
      term: "Imago Dei",
      definition: "Theological view that humans possess dignity because they reflect the divine image.",
      reference: "Sacks, J. (2002). The Dignity of Difference. Continuum.",
      category: "Ethical and Philosophical Foundations"
    },
    {
      term: "Moral Agency",
      definition: "The capacity for ethical reasoning and responsible action.",
      reference: "Gewirth, A. (1992). Human Rights: Essays on Justification and Applications. University of Chicago Press.",
      category: "Ethical and Philosophical Foundations"
    },
    {
      term: "Virtue Ethics",
      definition: "A framework emphasizing moral character in upholding dignity.",
      reference: "MacIntyre, A. (2007). After Virtue. University of Notre Dame Press.",
      category: "Ethical and Philosophical Foundations"
    },
    {
      term: "Humiliation",
      definition: "A denial or violation of dignity through degrading acts.",
      reference: "Lindner, E. (2006). Making Enemies: Humiliation and International Conflict. Praeger.",
      category: "Ethical and Philosophical Foundations"
    },
    {
      term: "Eudaimonia (Flourishing)",
      definition: "The realization of human potential and dignity through virtuous living.",
      reference: "Aristotle. Nicomachean Ethics.",
      category: "Ethical and Philosophical Foundations"
    },
  
    // VII. CONTEMPORARY CHALLENGES
    {
      term: "Digital Surveillance",
      definition: "Systematic observation that threatens privacy and dignity.",
      reference: "Zuboff, S. (2019). The Age of Surveillance Capitalism. PublicAffairs.",
      category: "Contemporary Challenges"
    },
    {
      term: "Posthuman Dignity",
      definition: "Philosophical exploration of dignity in a transhumanist future.",
      reference: "Bostrom, N. (2005). In Defense of Posthuman Dignity. Bioethics, 19 (3), 202–214.",
      category: "Contemporary Challenges"
    },
    {
      term: "Algorithmic Bias",
      definition: "Discrimination embedded in automated systems that undermine dignity.",
      reference: "Noble, S. (2018). Algorithms of Oppression. NYU Press.",
      category: "Contemporary Challenges"
    },
    {
      term: "Climate Justice",
      definition: "Integrating human dignity into global environmental governance.",
      reference: "Gardiner, S. (2011). A Perfect Moral Storm. Oxford University Press.",
      category: "Contemporary Challenges"
    },
    {
      term: "Intersectionality",
      definition: "Recognition that dignity violations intersect across race, gender, and class.",
      reference: "Crenshaw, K. (1991). Mapping the margins. Stanford Law Review, 43 (6), 1241–1299.",
      category: "Contemporary Challenges"
    },
  
    // VIII. RIGHTS IN PRACTICE
    {
      term: "Right to Dignity",
      definition: "Codified entitlement to be treated with respect by law and state.",
      reference: "United Nations (1948). Universal Declaration of Human Rights, Article 1.",
      category: "Rights in Practice"
    },
    {
      term: "Workplace Dignity",
      definition: "Respectful treatment and recognition within employment structures.",
      reference: "Hodson, R. (2001). Dignity at Work. Cambridge University Press.",
      category: "Rights in Practice"
    },
    {
      term: "Educational Dignity",
      definition: "Pedagogical approaches that affirm student worth.",
      reference: "Noddings, N. (2013). Caring: A Relational Approach to Ethics and Moral Education. University of California Press.",
      category: "Rights in Practice"
    },
    {
      term: "Prison Dignity",
      definition: "Rights and humane treatment of incarcerated individuals.",
      reference: "Liebling, A. (2011). Moral performance, inhuman treatment and prison pain. Punishment & Society, 13 (5), 530–550.",
      category: "Rights in Practice"
    },
    {
      term: "Healthcare Dignity",
      definition: "Ethical standards ensuring patient autonomy and compassion.",
      reference: "Nordenfelt, L. (2004). The varieties of dignity. Health Care Analysis, 12 (2), 69–81.",
      category: "Rights in Practice"
    },
  
    // IX. DEVELOPMENT AND POLICY
    {
      term: "Human Development",
      definition: "Expansion of people’s freedoms to live dignified lives.",
      reference: "Sen, A. (1999). Development as Freedom. Oxford University Press.",
      category: "Development and Policy"
    },
    {
      term: "Capability Approach",
      definition: "Framework assessing dignity via people’s opportunities and freedoms.",
      reference: "Nussbaum, M. (2000). Women and Human Development. Cambridge University Press.",
      category: "Development and Policy"
    },
    {
      term: "Poverty of Dignity",
      definition: "Deprivation not just of resources but of recognition and agency.",
      reference: "Appadurai, A. (2004). The capacity to aspire. In Culture and Public Action. Stanford University Press.",
      category: "Development and Policy"
    },
    {
      term: "Policy Dignity Framework",
      definition: "Using dignity as a guiding principle in law and governance.",
      reference: "Fukuyama, F. (2018). Identity: The Demand for Dignity and the Politics of Resentment. Farrar, Straus & Giroux.",
      category: "Development and Policy"
    },
  
    // X. EMERGING FRONTIERS
    {
      term: "Neuroethics",
      definition: "Ethical reflection on dignity in neuroscience and cognitive enhancement.",
      reference: "Racine, E. (2010). Pragmatic Neuroethics. MIT Press.",
      category: "Emerging Frontiers"
    },
    {
      term: "Data Dignity",
      definition: "Valuing individuals as rightful owners of their digital data.",
      reference: "Lanier, J. (2013). Who Owns the Future? Simon & Schuster.",
      category: "Emerging Frontiers"
    },
    {
      term: "Postcolonial Dignity",
      definition: "Restoring dignity after historical injustices and colonial violence.",
      reference: "Fanon, F. (1961). The Wretched of the Earth. Grove Press.",
      category: "Emerging Frontiers"
    },
    {
      term: "Gender Dignity",
      definition: "Affirmation of equality, safety, and autonomy in gender relations.",
      reference: "Butler, J. (2004). Undoing Gender. Routledge.",
      category: "Emerging Frontiers"
    },
    {
      term: "AI Personhood",
      definition: "Debate over extending moral dignity to artificial entities.",
      reference: "Bryson, J. J. (2018). Patiency is not a virtue. Science and Engineering Ethics, 24 (5), 1521–1533.",
      category: "Emerging Frontiers"
    },
    {
      term: "Ethics of Care",
      definition: "Dignity rooted in relational responsibility and empathy.",
      reference: "Tronto, J. (1993). Moral Boundaries: A Political Argument for an Ethic of Care. Routledge.",
      category: "Emerging Frontiers"
    }
  ];