const milestones = [
    {
        id: 1,
        description: "When you face your baby lying down on his back, he looks back at you and watches you.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Personal Social - Regards face"
    }, {
        id: 2,
        description: "When you talk and smile to your baby, he smiles back at you without you tickling or touching him.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Personal Social - Smiles spontaneously"
    }, {
        id: 3,
        description: "When your child is on his back, he can follow the movement of an object, from one side to facing directly forwards.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Fine Motor-Adaptive - Follows to mid-line"
    }, {
        id: 4,
        description: "When your child is on his back, he can follow the movement of an object, from one side, past the mid-line to the other side.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Fine Motor-Adaptive - Follows past mid-line"
    }, {
        id: 5,
        description: "When your child hears a bell sound that he cannot see, i.e. outside his line of vision, he responds with eye movements, changes in breathing pattern or changes in activities.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Language - Responds to a bell"
    }, {
        id: 6,
        description: "Your child makes sounds other than crying, such as small throaty sounds or short vowels sounds like 'UH', 'OO', 'EH', 'AH'...",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Language - Vocalises"
    }, {
        id: 7,
        description: "While your child is lying on his back, he moves his arms and legs equally.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Gross Motor - Equal movement"
    }, {
        id: 8,
        description: "When your child is placed on his stomach, he lifts his head momentarily off the surface.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Gross Motor - Lifts head"
    }, {
        id: 9,
        description: "When your child is placed on his stomach, he can lift his head so that the angle between his face and the surface he is lying on is approximately 45 degrees.",
        ageRange: "1-2_months",
        ageTab: 0,
        title: "Gross Motor - Head-up 45 degrees"
    }, {
        id: 10,
        description: "When you face your baby lying on his back, he looks at you and watches you.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Personal Social - Regards face"
    }, {
        id: 11,
        description: "When you talk and smile to your baby, he smiles back at you without you tickling or touching him.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Gross Motor - Head-up 45 degrees"
    }, {
        id: 12,
        description: "Your child displays excitement like kicking legs, moving arms, on seeing an attractive toy.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Gross Motor - Excites at a toy"
    }, {
        id: 13,
        description: "When the child is on his back, he can follow the movement of an object, from one side past the mid-line to the other side.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Fine Motor-Adaptive - Follows past mid-line"
    }, {
        id: 14,
        description: "Your child can touch his own hands together at the mid-line of his body.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Fine Motor-Adaptive - Hands together"
    }, {
        id: 15,
        description: "When you bring a rattle to touch the back or tips of your child's fingers, he grasps the rattle in the hand for a few seconds.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Fine Motor-Adaptive - Grasps rattle in hand"
    }, {
        id: 16,
        description: "When your child is on his back, his eyes and head will follow the movement of an object from one side, past the mid-line and right over to the other side.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Fine Motor-Adaptive - Follows 180 degrees"
    }, {
        id: 17,
        description: "Your child is able to focus on small objects like a raisin, placed in front of him on the table.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Fine Motor-Adaptive - Regards a raisin"
    }, {
        id: 18,
        description: "When your child hears a bell sound that he cannot see, i.e. outside his line of vision, he responds with eye movements, changes in breathing pattern or changes in activities.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Language - Responds to a bell"
    }, {
        id: 19,
        description: "Your child makes sounds other than crying, such as small throaty sounds or short vowels sounds like 'UH', 'OO', 'EH', 'AH'...",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Language - Vocalises"
    }, {
        id: 20,
        description: "Your child laughs out loud without being tickled.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Language - Laughs"
    }, {
        id: 21,
        description: "Your child turns towards the side of the sound of a rattle placed out of sight about 20cm behind each ear.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Language - Responds to sounds"
    }, {
        id: 22,
        description: "While your child is lying on his back, he moves his arms and legs equally.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Gross Motor - Equal movement"
    }, {
        id: 23,
        description: "When your child is placed on his stomach, he can lift his head so that the angle between his face and the surface he is lying on is approximately 45 degrees.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Gross Motor - Head-up 45 degrees"
    }, {
        id: 24,
        description: "When your child is placed on his stomach, he lifts his head and chest up so that he is looking straight ahead.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Gross Motor - Holds head up - 90 degrees"
    }, {
        id: 25,
        description: "When in a sitting position, your child can hold his head upright steadily without any bobbing motion.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Gross Motor - Sits, head steady"
    }, {
        id: 26,
        description: "When you are holding your child under his arms loosely, he is able to bear some weight on his legs for a few seconds.",
        ageRange: "3-5_months",
        ageTab: 1,
        title: "Gross Motor - Bears weight on legs"
    }, {
        id: 27,
        description: "Your child displays excitement like kicking legs, moving arms, on seeing an attractive toy.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Personal Social - Excites at a toy"
    }, {
        id: 28,
        description: "Your child will try to get a toy that he enjoys when it is out of reach by stretching his arms or body.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Personal Social - Works for a toy out of reach"
    }, {
        id: 29,
        description: "Your child seems to be shy or wary of strangers. ",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Personal Social - Reacts to stranger"
    }, {
        id: 30,
        description: "When you face your child, say bye-bye and wave to him, he responds by waving his arm, hand and fingers without his hands or arms being touched.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Personal Social - Waves bye-bye"
    }, {
        id: 31,
        description: "When you clap your hands, your child responds by clapping his hands when you ask him to, without his hands or arms being touched.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Personal Social - Claps hands"
    }, {
        id: 32,
        description: "Your child can indicate what he wants without crying or whining. He may do this by pointing, pulling and making speech-like sounds or putting arms up to be carried without speaking.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Personal Social - Indicates wants by gestures"
    }, {
        id: 33,
        description: "When your child is on his back, his eyes and head will follow the movement of an object from one side, past the mid-line and right over to the other side.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Follows 180 degrees"
    }, {
        id: 34,
        description: "Your child is able to focus on small objects like a raisin, placed in front of him on the table.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Regards a raisin"
    }, {
        id: 35,
        description: "Your child can pick up a toy within his reach or reach out for things.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Reaches for an object"
    }, {
        id: 36,
        description: "Your child will look for an object that has fallen out of his line of vision when his attention is focused on that object.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Looks for a fallen object"
    }, {
        id: 37,
        description: "Your child can pass something small from one hand to the other hand.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Presses a cube from hand to hand"
    }, {
        id: 38,
        description: "Your child can pick up a raisin by bringing together any part of the thumb and any one finger.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Finger-Thumb Grasp"
    }, {
        id: 39,
        description: "When your child is holding a block in each hand, he is able to hit them together, without his hands or arms being touched by you.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Bangs 2 cubes held in hands"
    }, {
        id: 40,
        description: "Your child can pick up a small object like a raisin, using only the ends of his thumbs and index finger.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Fine Motor-Adaptive - Pincer Grasp"
    }, {
        id: 41,
        description: "Your child laughs out loud without being tickled.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Language - Laughs"
    }, {
        id: 42,
        description: "Your child turns towards the side of the sound of a rattle placed out of sight about 20cm behind each ear.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Language - Responds to sounds"
    }, {
        id: 43,
        description: "Your child makes single sounds consisting of a consonant and a vowel, like 'ba', 'da', 'ga', 'ma'.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Language - Says single syallables"
    }, {
        id: 44,
        description: "Your child imitates any sound after you e.g. sounds like coughing, clicking of the tongue or any other speech sounds.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Language - Imitates speech sounds"
    }, {
        id: 45,
        description: "Your child uses the word 'Papa' and 'Mama' specifically.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Language - Says Papa/Mama specifically"
    }, {
        id: 46,
        description: "When in a sitting position, your child can hold his head upright steadily.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Gross Motor - Sits, head steady"
    }, {
        id: 47,
        description: "Your child is able to roll over from stomach to back or back to stomach.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Gross Motor - Rolls over"
    }, {
        id: 48,
        description: "When you are holding your child under his arms loosely, he is able to bear some weight on his legs for a few seconds.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Gross Motor - Bears weight on legs"
    }, {
        id: 49,
        description: "When your child is placed on his stomach, he can lift his head and chest up using the support of outstretched arms, so that his face is looking straight ahead and the chest is well lifted away from the surface.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Gross Motor - Holds chest up, arm support"
    }, {
        id: 50,
        description: "Without being propped by pillows, a chair or a wall, your child is able to sit alone for more than 5 seconds. He can put his hands on his legs or on a flat surface for support.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Gross Motor - Sits, no external support"
    }, {
        id: 51,
        description: "Your child can stand holding on to a chair or table for more than 5 seconds.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Gross Motor - Stands holding on"
    }, {
        id: 52,
        description: "Your child can pull himself to a standing position by himself without help.",
        ageRange: "6-12_months",
        ageTab: 2,
        title: "Gross Motor - Pulls to stand"
    }, {
        id: 53,
        description: "Your child can indicate what he wants without crying or whining. He may do this by pointing, pulling and making speech-like sounds.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Personal Social - Indicates wants by gestures"
    }, {
        id: 54,
        description: "When you are doing housework, your child copies what you are doing.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Personal Social - Imitates household activities"
    }, {
        id: 55,
        description: "Your child can hold a regular cup himself and drink from it without spilling much. The cup should not have a spout.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Personal Social - Drinks from a cup"
    }, {
        id: 56,
        description: "Your child can pick up a small object like a raisin, using only the ends of his thumbs and index finger.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Fine Motor Adaptive - Pincer grasp"
    }, {
        id: 57,
        description: "Your child can make purposeful markings on paper when you give him a pencil.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Fine Motor Adaptive - Scribbles"
    }, {
        id: 58,
        description: "Your child can put 2 or more blocks one on top of the other without the blocks falling. This applies to small blocks of about one inch square in size.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Fine Motor Adaptive - Builds a block of 2 cubes"
    }, {
        id: 59,
        description: "Your child uses the word 'Papa' and 'Mama' specifically.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Language - Says Papa/Mama specifically"
    }, {
        id: 60,
        description: "Without coaching, point or helping, your child can point to at least 2 parts of his body such as nose, eyes, ears, hands, hair, legs and stomach, when asked.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Language - Points to own body - 2 parts"
    }, {
        id: 61,
        description: "Your child can say at least 3 words other than 'Papa/Mama', which mean the same things each time he uses them.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Language - Says 3 words other than Papa/Mama"
    }, {
        id: 62,
        description: "Your child can stand alone without having to hold on to something for ten seconds or more.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Gross Motor - Stands alone"
    }, {
        id: 63,
        description: "Your child can walk well with good balance, rarely falls and does not sway from side to side.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Gross Motor - Walks well"
    }, {
        id: 64,
        description: "Your child can walk up several steps of the staircase by himself. He may use the wall or rail for support but not hold on to a person.",
        ageRange: "15-18_months",
        ageTab: 3,
        title: "Gross Motor - Walks up steps"
    },
  ];
  
  export default milestones;
  