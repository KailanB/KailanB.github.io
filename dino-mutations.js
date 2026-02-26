

const MUTATIONS = [
    {
        name: "Accelerated Prey Drive (Carnivore)",
        description: "Deal more damage to animals below 35% health.",
        value: "10%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Advanced Gestation (Female Only)",
        description: "Faster egg gestation/incubation/cooldown rate.",
        value: "50%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Barometric Sensitivity (Herbivore)",
        description: "Receive an indication prior to storms or droughts.",
        value: null,
        criteria: null,
        additionalInfo: null
    },

    {
        name: "Cellular Regeneration",
        description: "Recovers health slightly faster.",
        value: "15%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Congenital Hypoalgesia",
        description: "Reduce incoming damage when fighting larger species.",
        value: "15%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Efficient Digestion",
        description: "Your food drains more slowly.",
        value: "20%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Enhanced Digestion",
        description: "Decrease nutrition decay rate.",
        value: null,
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Enlarged Meniscus",
        description: "Fall damage hits stamina before draining health.",
        value: null,
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Epidermal Fibrosis",
        description: "Increase bleed resistance.",
        value: "15%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Featherweight",
        description: "Your footprints fade much faster.",
        value: "50%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Hematophagy (Carnivore)",
        description: "Restore some thirst while eating corpses.",
        value: "15%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Hemomania (Carnivore)",
        description: "Do extra damage on bleeding target.",
        value: "5%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Hydrodynamic",
        description: "Increased swimming speed.",
        value: "15%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Hydro-regenerative",
        description: "Recover health faster during rainy weather.",
        value: "25%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Hypervigilance (Herbivore)",
        description: "Increases camera angles when eating and drinking. Increases footsteps audio from others.",
        value: "50%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Increased Inspiratory Capacity",
        description: "Increased O2 Capacity.",
        value: "15%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Infrasound Communication",
        description: "Make significantly less noise when talking in chat.",
        value: "50%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Nocturnal",
        description: "Faster health/locked health recover and higher move speed at night.",
        value: "5%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Osteosclerosis",
        description: "Resist or Reduce fracture damage.",
        value: "20%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Parthenogenesis",
        description: "Allows the player to reproduce without a mate.",
        value: null,
        criteria: null,
        additionalInfo: "Does NOT transfer on Entomb"
    },
    {
        name: "Photosynthetic Regeneration (Herbivore)",
        description: "Regenerate stamina faster during the day.",
        value: "10%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Photosynthetic Tissue",
        description: "Faster health/locked health recovery and higher move speed during the day.",
        value: "5%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Reabsorption",
        description: "Recover a small amount of water during the rainy weather or while swimming in drinkable water.",
        value: "1",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Social Behavior (Herbivore/Omnivore)",
        description: "Increased group size. Group Leader Only.",
        value: null,
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Submerged Optical Retention",
        description: "Increased underwater vision range.",
        value: "5%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Sustained Hydration",
        description: "Your water drains more slowly.",
        value: "20%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Truculency (Herbivore)",
        description: "Bucking has a higher chance to dismount latched animals.",
        value: "5%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Wader",
        description: "Less hindered when wading through shallow water.",
        value: "25%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Xerocole Adaptation (Herbivore)",
        description: "Gain some water when eating plants.",
        value: "15%",
        criteria: null,
        additionalInfo: null
    },
    {
        name: "Tactile Endurance (Herbivore)",
        description: "Convert incoming damage to stamina.",
        value: null,
        criteria: "slot 2–4",
        additionalInfo: null
    },
    {
        name: "Traumatic Thrombosis",
        description: "Prevent death from blood loss if resting.",
        value: null,
        criteria: "slot 2–4",
        additionalInfo: null
    },
    {
        name: "Gastronomic Regeneration",
        description: "Eating restores a small amount of health.",
        value: null,
        criteria: "slot 2–4",
        additionalInfo: null
    },
    {
        name: "Hypermetabolic Inanition (Carnivore)",
        description: "The less hunger you have the more damage you deal.",
        value: null,
        criteria: "slot 2–4",
        additionalInfo: null
    },
        {
        name: "Augmented Tapetum (Carnivore)",
        description: "Increased vision at night.",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Kill 5 Players at night. Unlocks on Slot 2."
    },
    {
        name: "Cannibalistic (Carnivore)",
        description: "For species that are not, by default, cannibals. Adds their own species as a preferred prey for nutrients.",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Eat your own species. Unlocks on Slot 2. As of Update 0.18.11 the required amount needed to unlock this mutation has been reduced."
    },
    {
        name: "Heightened Ghrelin",
        description: "Increased overeating capacity by a large amount.",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Maintain current hunger above 80% for 30 minutes. Unlocks on Slot 2."
    },
    {
        name: "Multichambered Lungs",
        description: "Stamina Pool: 100 - 1000 (Increased based on growth).",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Drain 4500 stamina by sprinting or fast swimming. Unlocks on Slot 2/3."
    },
    {
        name: "Osteophagic (Carnivore)",
        description: "Able to consume bones to regenerate fractures faster.",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Unlock by eating bones."
    },
    {
        name: "Prolific Reproduction (Female Only)",
        description: "Your babies have increased health and stamina regen. Your babies require less food and they grow faster.",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Unlocks on Slot 2."
    },
    {
        name: "Reinforced Tendons",
        description: "Jumping costs less stamina. Reduces take off stamina for Ptera.",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Unlock by jumping 50 times."
    },
    {
        name: "Reniculate Kidneys",
        description: "Can drink saltwater. Thirst Pool: 1000. Thirst intake value while drinking saltwater: -2.5%.",
        value: null,
        criteria: "unlockable",
        additionalInfo: "Lose 1250 thirst by drinking saltwater. 50 thirst grants the 'Fluid Deficient' debuff and 1200 thirst removes it. Unlocks on Slot 2/3."
    }
];