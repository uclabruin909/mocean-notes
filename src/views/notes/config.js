const BodyPartConfig = {
  TMJ: {
    joint: ['temporo-mandibular joint', 'mandibular condyle', 'omohyoid'],
    muscle: [
      'SCM',
      'scalene',
      'masseter',
      'anterior temporalis',
      'posterior temporalis',
      'lateral pterygoid',
      'medial pterygoid',
    ],
    nerve: ['Trigeminal nerve', 'facial nerve'],
  },
  shoulder: {
    joint: [
      'AC joint',
      'SC joint',
      'ST joint',
      'GH joint',
      '1st rib',
      '2nd rib',
      'Cervico-Thoracic junction',
    ],
    muscle: [
      'serratus anterior',
      'anteior deltoid',
      'posterior deltoid',
      'sucscapularis',
      'teres major',
      'teres minor',
      'brachioradialis',
      'brachialis',
      'coracobrachialis',
      'upper trap',
      'lower trap',
      'pectoralis major',
      'pectoralis minor',
      'subclavius',
      'biceps',
      'triceps',
    ],
    nerve: ['radial nerve', 'median nerve', 'ulnar nerve', 'axillary nerve', 'brachial nerve'],
    ligament_tendon: [
      'coracoacromial Ligament',
      'coracohumeral Ligament',
      'transverse Humeral Ligament',
      'conoid Ligament',
      'acromiclavicular Ligament',
      'biceps tendon',
      'triceps tendon',
    ],
  },
  elbow: {
    joint: ['radio-ulnar joint', 'humero-ulnar joint'],
    muscle: ['extensor carpi unlaris', 'flexor carpi ulnaris'],
    nerve: ['radial nerve', 'median nerve'],
    ligament_tendon: ['ulnar collateral ligament', 'radial collateral ligament'],
  },
  lumbar: {
    joint: ['lumbar spine segments', 'thoraco-lumbar junction', 'L2-3', 'L3-4', 'L4-5', 'L5-S1'],
    muscle: [
      'multifidus',
      'serratus posterior',
      'intercostal',
      'latissimus dorsi',
      'psoas major',
      'iliopsoas',
      'erector spinae',
      'internal oblique',
      'external oblique',
      'quadratus lumborum',
    ],
    nerve: ['sciatic nerve', 'obturator nerve'],
  },
  hip: {
    joint: [
      'acetabular-femoral joint',
      'SI joint',
      'ilio-pubo joint',
      'anterior capsule',
      'posterior capsule',
    ],
    muscle: [
      'piriformis',
      'quadratus lumborum',
      'iliopsoas',
      'gluteus maximus',
      'gluteus medius & minimus',
      'obturator',
      'adductor magnus',
      'adductor longus',
      'pectineus',
      'tensor fasciae latae',
      'vastus lateralis',
      'vastus medialis',
      'sartorius',
      'gracilis',
      'hamstring',
      'biceps femoris',
      'semi-membranosus',
    ],
    nerve: ['sciatic nerve', 'Femoral nerve', 'obturator nerve'],
    ligament_tendon: ['ilio-femoral ligament', 'pubo-femorala ligament'],
  },
  knee: {
    joint: [
      'patella femoral joint',
      'proximal Tib-fib joint',
      'tibiofemoral joint',
      'distal tib-fib joint',
    ],
    muscle: [
      'quadriceps',
      'hamstring',
      'tensor fasciae latae',
      'tibialis anterior',
      'tibialis posterior',
      'popliteus',
      'sartorius',
      'gracilis',
      'gastrocnemius',
      'soleus',
      'peroneus',
    ],
    nerve: ['tibial nerve', 'femoral nerve', 'common peroneal nerve', 'saphenous nerve'],
    ligament_tendon: ['ACL', 'PCL', 'MCL', 'LCL', 'medial meniscus', 'lateral meniscus'],
  },
  ankle: {
    joint: ['subtalar joint', 'talocrural joint', '1st MTP', '5th MTP', 'MTP'],
    muscle: [
      'gastroc',
      'soleus',
      'anterior tibialis',
      'posterior tibialis',
      'fibularis',
      'extensor hallucis longus',
      'flexor hallucis longus',
      'extensor digitorum longus',
      'flexor digitorum longus',
    ],
    nerve: ['tibial nerve', 'common peroneal nerve', 'saphenous nerve'],
    ligament_tendon: ['deltoid ligament', 'spring ligament', 'ATFL', 'achilles tendon'],
  },
  foot: {
    joint: [
      '1st MTP',
      '5th MTP',
      'metatarsophalangeal joint',
      '1st ray',
      '5th ray',
      'cuboid',
      'cuneiform',
      'navicular ',
    ],
    muscle: [
      'tibialis anterior',
      'tibialis posterior',
      'flexor digitorum longus',
      'extensor digitorum longus',
      'abductor hallucis',
      'abductor digitorum',
      'adductor hallucis',
      'adductor digitorum',
      'peroneus',
      'intrinsic muscles',
    ],
    ligament_tendon: [
      'anterior talofibular ligament',
      'posterior talofibular ligament',
      'calcaneofibular ligament',
      'spring ligament',
      'Achilles tendon',
      'extensor tendon',
      'flexor tendon',
    ],
  },
  wrist: {
    joint: ['proximal radio-ulnar joint', 'distal radio-ulnar joint', 'TFCC'],
    muscle: [
      'extensor carpi unlaris',
      'extensor carpi radialis',
      'flexor carpi ulnaris',
      'flexor carpi radialis',
      'pronator',
      'supinator',
    ],
    ligament_tendon: ['ulnar collateral ligament', 'radial collateral ligament'],
    nerve: ['ulnar nerve'],
  },
  cervical: {
    joint: [
      'Upper cervicle spine',
      'lower cervicle spine',
      'cervico-thoracic junction',
      'OA Joint',
      'AA Joint',
    ],
    muscle: [
      'Intrinsic Deep Neck Flexors',
      'Extensors',
      'Upper Trap',
      'SCM',
      'Levator Scapula',
      'Scalene',
      'Longus Coli',
      'Brachial Plexus',
      'Platysma',
      'Subclavious',
      'suboccipital',
    ],
    nerve: ['brachial plexus', 'facial nerve', 'vagus nerve', 'phrenic nerve'],
  },
  thoracic: {
    joint: [
      'thoracic spine segments',
      'thoraco-lumbar junction',
      'Posterior Mediastinum',
      'Zone of Apposition',
      'Ribs',
      'sternum',
    ],
    muscle: [
      'Pec Major',
      'Pec Minor',
      'Serratus Anterior',
      'Rhomboid',
      'Upper trap',
      'Mid & lower trap',
      'Erector Spinae',
      'Multifidus',
      'Serratus Posterior',
      'Latissmus dorsi',
      'Intercostal',
      'IO & TA',
      'External Oblique',
    ],
    nerve: ['brachial plexus', 'vagus nerve', 'phrenic nerve'],
  },
};

const RestrictionsConfig = {
  joint: [
    'hyper-mobility',
    'hypo-mobility',
    'instability',
    'restriction',
    'compression',
    'mobility restriction',
  ],
  muscle: [
    'neurological tension',
    'hyper-tonicity',
    'hypo-tonicity',
    'strain',
    'facial restriction',
    'tightness',
    'weakness',
    'decreased strength and endurance	',
  ],
  nerve: [
    'hyper-tonicity',
    'hypo-tonicity',
    'neurological tension',
    'compression',
    'hyper-sensitivity',
    'hypo-sensitivity',
  ],
  ligament_tendon: ['sprain', 'effusion', 'inflammation', 'instability'],
};

const ManualJointConfig = [
  { name: 'Joint Mob I&II', text: 'to decrease pain and reduce muscle guarding' },
  {
    name: 'Joint Mob Grade III&IV',
    text: 'to increase ROM without a joint impingement.',
  },
  {
    name: 'Distraction Technique',
    text: 'to reduce the tension and to facilitate mechanoreceptors to promote greater ROM.',
  },
  {
    name: 'Mulligan Mobilization',
    text: 'to improve joint ROM and joint stability.',
  },
];

const ManualMuscleConfig = [
  { name: 'IASTM facial release', text: 'to release muscle tension & neurological tension.' },
  {
    name: 'Soft tissue therapy',
    text: 'to release hypertonic muscle and decrease muscle guarding using IASTM and PEMF',
  },
  {
    name: 'Cupping mobilization (negative pressure decompression tx)',
    text: 'to enhance circulation to decrease muscle tension.',
  },
  {
    name: 'Pulsed Electro Magnetic Field therapy',
    text: 'to replorize muscle tissue to normalize soft tissue tension.',
  },
  {
    name: 'Trigger Point release',
    text: 'to decrease muscle tension and to increase the joint ROM and stability',
  },
  {
    name: 'PAILs & RAILs',
    text: 'to increase the load capacity to decrease neural tension',
  },
];

const ManualNerveConfig = [
  { name: 'Nerve Stimulation', text: 'to decrease muscle tone to increase joint ROM' },
  {
    name: 'Nerve Glide',
    text: 'to decrease neural tension to normalize muscle tone & ROM',
  },
  {
    name: 'Facial release',
    text: 'PT performed fascial release using Graston to release neurological muscle tension.',
  },
  {
    name: 'Air compression Therapy',
    text: 'to enhance circulation and to enhance parasympatheic activity.',
  },
  {
    name: 'Strain and counter strain mobilization',
    text: 'to decrease the neural tension to normalize the muscle tone and ROM',
  },
];

const TherexConfig = {
  TMJ: ['mandibular trusion', 'suboccipital muscle facilitation', 'OA & AA mobility and stability'],
  shoulder: [
    'GH, ST, AC joint stability',
    'shoulder strength and stability',
    'humero-radial joint mobility & stability',
    'radio-ulnar joint mobility & stability',
    'forarm, wrist strength ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
  ],
  elbow: [
    'GH, ST, AC joint stability',
    'shoulder strength and stability',
    'humero-radial joint mobility & stability',
    'radio-ulnar joint mobility & stability',
    'forarm, wrist strength ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
  ],
  lumbar: [
    'sagittal plane mobility',
    'frontal plane mobility',
    'transverse plane mobility',
    'lumbar, SI joint stability',
    'thoracic & lumbar spine stability',
    'hip shift & stability',
    'hip dominant activity',
    'knee mobility & stability',
    'knee dominant movement',
    'ankle & foot mobility & balance ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
  ],
  hip: [
    'sagittal plane mobility',
    'frontal plane mobility',
    'transverse plane mobility',
    'lumbar, SI joint stability',
    'thoracic & lumbar spine stability',
    'hip shift & stability',
    'hip dominant activity',
    'knee mobility & stability',
    'knee dominant movement',
    'ankle & foot mobility & balance ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
    'gait mechanics ',
    'running mechanics',
    'anterior, posterior kinetic chain facilitation',
    'oblique kinetic chain activation ',
  ],
  knee: [
    'sagittal plane mobility',
    'frontal plane mobility',
    'transverse plane mobility',
    'lumbar, SI joint stability',
    'thoracic & lumbar spine stability',
    'hip shift & stability',
    'hip dominant activity',
    'knee mobility & stability',
    'knee dominant movement',
    'ankle & foot mobility & balance ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
    'gait mechanics ',
    'running mechanics',
    'anterior, posterior kinetic chain facilitation',
    'oblique kinetic chain activation ',
  ],
  ankle: [
    'sagittal plane mobility',
    'frontal plane mobility',
    'transverse plane mobility',
    'lumbar, SI joint stability',
    'thoracic & lumbar spine stability',
    'hip shift & stability',
    'hip dominant activity',
    'knee mobility & stability',
    'knee dominant movement',
    'ankle & foot mobility & balance ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
    'gait mechanics ',
    'running mechanics',
    'anterior, posterior kinetic chain facilitation',
    'oblique kinetic chain activation ',
  ],
  foot: [
    'sagittal plane mobility',
    'frontal plane mobility',
    'transverse plane mobility',
    'lumbar, SI joint stability',
    'thoracic & lumbar spine stability',
    'hip shift & stability',
    'hip dominant activity',
    'knee mobility & stability',
    'knee dominant movement',
    'ankle & foot mobility & balance ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
    'gait mechanics ',
    'running mechanics',
    'anterior, posterior kinetic chain facilitation',
    'oblique kinetic chain activation ',
  ],
  wrist: [
    'GH, ST, AC joint stability',
    'humero-radial joint mobility & stability',
    'radio-ulnar joint mobility & stability',
    'forarm, wrist strength ',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
  ],
  cervical: [
    'occipito-atlanta joint mobility and stability',
    'upper cervical spine stability',
    'cervical ROM',
    'cervico-thoracic movement ',
    'scapulo-thoracic stability',
    'cervical, thoracic spine stability',
    'vestibulo-ocular reflex facilitation ',
    'brachial chain activity ',
    'flexion, extension',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
  ],
  thoracic: [
    'cervico-thoracic movement ',
    'scapulo-thoracic stability',
    'thoracic spine stability',
    'sagittal plane mobility ',
    'frontal plane mobility',
    'transverse plane mobility',
    'lumbar, SI joint stability',
    'flexion, extension',
    'internal, external rotation',
    'abbucion, adduction',
    'balance, coordination',
    'core balance strength ',
    'intrinsic muscle facilitation',
    'extrinsic muscle facilitation ',
  ],
};

const defaultMovementQualities = [
  'poor',
  'improper',
  'restricted',
  'decreased',
  'slightly improved ',
  'enhanced',
  'improved',
  'slightly decreased',
  'good',
  'proper',
];
const defaultMovementTypes = [
  'motor control',
  'proprioceptive sense and balance',
  'joint mobility & stability',
  'pain level', //except when 'restricted' movement quality is selected
  'muscle strength and endurance',
  'movement coordination',
  'muscle recruitment',
  'range of motion',
  'intrinsic muscle facilatation',
  'extrinsic muscle activation',
  'stability',
  'mechanoreceptor facilitation ',
];

const MovementConfigs = {
  TMJ: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: ['medial, lateral glide', 'protruion, retrusion'],
  },
  shoulder: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'rotation',
      'abduction, adduction',
      'internal, external rotatation',
      'controlled articular rotation movement',
      'protraction, retraction',
      'horizontal abduction, adduction ',
    ],
  },
  elbow: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'internal, external rotatation',
      'supination, pronation',
      'ulnar, radial deviation ',
    ],
  },
  lumbar: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'rotation',
      'abduction, adduction',
      'internal, external rotatation',
      'controlled articular rotation movement',
      'side bending',
    ],
  },
  hip: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'rotation',
      'abduction, adduction',
      'internal, external rotatation',
      'controlled articular rotation movement',
      'horizontal abduction, adduction ',
    ],
  },
  knee: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'internal, external rotatation',
      'supination, pronation',
      'controlled articular rotation movement',
      'inversion, eversion ',
      'dorsi-flexion, plantar-flexion',
    ],
  },
  ankle: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'internal, external rotatation',
      'supination, pronation',
      'controlled articular rotation movement',
      'inversion, eversion ',
      'dorsi-flexion, plantar-flexion',
    ],
  },
  foot: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'internal, external rotatation',
      'supination, pronation',
      'controlled articular rotation movement',
      'inversion, eversion ',
      'dorsi-flexion, plantar-flexion',
    ],
  },
  wrist: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'internal, external rotatation',
      'supination, pronation',
      'ulnar, radial deviation ',
    ],
  },
  cervical: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'rotation',
      'controlled articular rotation movement',
      'side bending',
    ],
  },
  thoracic: {
    quality: [...defaultMovementQualities],
    types: [...defaultMovementTypes],
    tasks: [
      'flexion, extension',
      'rotation',
      'abduction, adduction',
      'internal, external rotatation',
      'controlled articular rotation movement',
      'side bending',
    ],
  },
};

const ResultsConfig = [
  { name: 'ROM I', text: 'Pt demonstrated improved ROM.' },
  { name: 'ROM II', text: 'Pt demonstrated decreased movement restriction.' },
  { name: 'Pain I', text: 'Pt reported improved pain.' },
  { name: 'Pain II', text: 'improved mobility with decreased pain.' },
  { name: 'Strength', text: 'Pt demonstrated improved muscular strength and endurance' },
  { name: 'Motor Control', text: 'Pt demonstrated improved motor control.' },
  { name: 'Stability', text: 'Pt demonstrated improved joints stability and controled mobility' },
  { name: 'Motor Planning', text: 'Pt demonstrated improved motor planning and excution.' },
  { name: 'Balance', text: 'Pt demonstrated enhanced balance and proprioceptive sense' },
];

const CuesConfig = [
  'verbal cues',
  'tactile cues',
  'visual cues',
  'proproceptive cues',
  'sensory cues',
];

const SelectionConfig = {
  restrictions: {
    maxSelection: 1,
    minSelection: 1,
  },
  manualJoint: {
    maxSelection: 1,
    minSelection: 1,
  },
  manualMuscle: {
    maxSelection: 1,
    minSelection: 1,
  },
  manualNerve: {
    maxSelection: 1,
    minSelection: 1,
  },
  therex: {
    maxSelection: 3,
    minSelection: 2,
  },
  movement: {
    isNested: true,
    quality: {
      maxSelection: 1,
      minSelection: 1,
    },
    types: {
      maxSelection: 1,
      minSelection: 1,
    },
    tasks: {
      maxSelection: 3,
      minSelection: 2,
    },
  },
  result: {
    maxSelection: 1,
    minSelection: 1,
  },
  cues: {
    maxSelection: 1,
    minSelection: 1,
  },
};

const NotesConfig = {
  bodyPart: BodyPartConfig,
  restrictions: RestrictionsConfig,
  manualJoint: ManualJointConfig,
  manualNerve: ManualNerveConfig,
  manualMuscle: ManualMuscleConfig,
  therex: TherexConfig,
  movement: MovementConfigs,
  result: ResultsConfig,
  cues: CuesConfig,
  selectionConfig: SelectionConfig,
};

export default NotesConfig;
