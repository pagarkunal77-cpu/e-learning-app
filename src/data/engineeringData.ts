import { Branch, BranchId, SubjectTag, NoteItem, VideoLecture, Quiz, FormulaItem } from '../types';

export const BRANCHES: Branch[] = [
  {
    id: 'COMMON',
    name: '1st Year Foundation & Common Core',
    code: 'FY-CORE',
    description: 'Engineering Physics, Chemistry, Math, Engineering Graphics, FEE, C Programming & Python.',
    totalSubjects: 8,
  },
  {
    id: 'CSE',
    name: 'Computer Science & Engineering',
    code: 'CSE',
    description: 'Algorithms, operating systems, databases, networks, and software architecture.',
    totalSubjects: 14,
  },
  {
    id: 'ECE',
    name: 'Electronics & Communication',
    code: 'ECE',
    description: 'Digital logic, microprocessors, signals & systems, VLSI, and communication theory.',
    totalSubjects: 12,
  },
  {
    id: 'ME',
    name: 'Mechanical Engineering',
    code: 'ME',
    description: 'Thermodynamics, fluid mechanics, machine design, kinematics, and CAD/CAM.',
    totalSubjects: 12,
  },
  {
    id: 'EEE',
    name: 'Electrical & Electronics',
    code: 'EEE',
    description: 'Circuit theory, electrical machines, power systems, and control systems.',
    totalSubjects: 11,
  },
  {
    id: 'CE',
    name: 'Civil Engineering',
    code: 'CE',
    description: 'Structural analysis, geotechnical engineering, hydraulics, and surveying.',
    totalSubjects: 10,
  },
];

export const SUBJECT_TABS = [
  { id: 'ALL', label: 'All Subjects' },
  { id: 'CHEMISTRY', label: 'Chemistry' },
  { id: 'PHYSICS', label: 'Physics' },
  { id: 'MATHEMATICS', label: 'Mathematics' },
  { id: 'GRAPHICS', label: 'Engineering Graphics' },
  { id: 'FEE', label: 'FEE (Basic Electrical)' },
  { id: 'CP', label: 'C Programming (CP)' },
  { id: 'PYTHON', label: 'Python Programming' },
  { id: 'DSA', label: 'Data Structures (DSA)' },
  { id: 'OS', label: 'Operating Systems' },
] as const;

export const ENGINEERING_NOTES: NoteItem[] = [
  // --- 1. ENGINEERING CHEMISTRY ---
  {
    id: 'note-chem-water-corrosion',
    title: 'Water Technology, Demineralization, Corrosion & UV-Vis Spectroscopy',
    subjectId: 'chem-eng',
    subjectName: 'Engineering Chemistry',
    subjectTag: 'CHEMISTRY',
    branch: 'COMMON',
    semester: 1,
    readTime: '22 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Comprehensive analysis of water hardness calculations via EDTA titration, Zeolite softening, boiler troubles, electrochemical corrosion mechanisms, Pilling-Bedworth rule, and Beer-Lambert law.',
    keyTopics: ['Temporary vs Permanent Hardness (CaCO3 Equivalents)', 'EDTA Complexometric Titration (EBT Indicator)', 'Electrochemical Corrosion & Galvanic Protection', 'Beer-Lambert Law (A = ε · c · l)'],
    formulas: [
      {
        label: 'Hardness in CaCO3 Equivalents',
        formula: 'CaCO₃ Equiv = [ (Mass of hardness causing salt in mg/L) / (Equivalent weight of salt) ] × 50',
        explanation: 'Standardizes disparate divalent cations (Ca²⁺, Mg²⁺) to equivalent weight of CaCO3 (50 g/eq).'
      },
      {
        label: 'Beer-Lambert Law of Absorption',
        formula: 'A = log₁₀(I₀ / I) = ε · c · l',
        explanation: 'A is absorbance (optical density), ε is molar absorptivity (L·mol⁻¹·cm⁻¹), c is concentration (mol/L), and l is optical path length in cm.'
      },
      {
        label: 'Pilling-Bedworth Ratio (PB Ratio)',
        formula: 'PB Ratio = (Volume of Metal Oxide Layer) / (Volume of Metal Consumed)',
        explanation: 'If PB < 1: porous oxide film (non-protective). If PB between 1 and 2: dense non-porous protective film (passivation). If PB > 2: excessive stress causes flaking.'
      }
    ],
    sections: [
      {
        id: 'sec-edta',
        title: '1. Determination of Hardness by EDTA Method',
        content: `EDTA (Ethylenediaminetetraacetic acid) is a hexadentate chelating ligand. Since free EDTA acid is poorly soluble in water, its disodium salt (Na₂H₂EDTA) is utilized in analytical chemistry.

Principle:
1. Hard water is buffered to pH 9–10 using an ammoniacal buffer solution (NH₄Cl + NH₄OH).
2. Eriochrome Black T (EBT) indicator is added. It binds loosely with Ca²⁺ and Mg²⁺ ions, forming an unstable, wine-red metal-indicator complex:
   M²⁺ + EBT → [M-EBT]²⁺ (Wine Red)
3. Upon titration against standard EDTA solution, EDTA displaces EBT because the metal-EDTA complex is far more stable:
   [M-EBT]²⁺ + EDTA⁴⁻ → [M-EDTA]²⁻ + EBT (Steel Blue)
4. The sharp color transition from Wine Red to Steel Blue marks the exact stoichiometric equivalence point.`,
        practiceNumerical: {
          problem: 'A 50 mL sample of hard water consumed 18 mL of 0.01 M EDTA solution for total hardness titration. Calculate total hardness in parts per million (ppm) of CaCO3.',
          solution: 'Total Hardness = 360 ppm (mg/L).',
          steps: [
            '1 mL of 0.01 M EDTA = 1 mg of CaCO3 equivalent.',
            '18 mL of 0.01 M EDTA = 18 mg of CaCO3 equivalent.',
            'This 18 mg is present in 50 mL of water sample.',
            'Hardness per liter (1000 mL) = (18 mg / 50 mL) × 1000 mL = 360 mg/L = 360 ppm.'
          ]
        },
        examTips: [
          'Buffer pH must strictly stay between 9 and 10; at lower pH, the EDTA-metal chelate collapses.',
          'Always mention the chemical structure of the hexadentate ring with 4 oxygen and 2 nitrogen donor atoms.'
        ]
      },
      {
        id: 'sec-corrosion',
        title: '2. Mechanism of Electrochemical / Wet Corrosion',
        content: `Wet corrosion occurs when a metal comes in contact with a conducting liquid or when two dissimilar metals are immersed in an electrolyte.
Anodic Reaction (Oxidation):
M → Mⁿ⁺ + n·e⁻ (Dissolution of metal)

Cathodic Reaction (Reduction):
Depending on environmental pH and dissolved oxygen availability:
1. Evolution of Hydrogen (in acidic media without oxygen):
   2H⁺ + 2e⁻ → H₂ ↑
2. Absorption of Oxygen (in neutral or basic aerated aqueous media):
   O₂ + 2H₂O + 4e⁻ → 4OH⁻
Overall rust formation: Fe²⁺ + 2OH⁻ → Fe(OH)₂ (Ferrous hydroxide), which oxidizes further into hydrated ferric oxide Fe₂O₃·xH₂O (Rust).`
      }
    ]
  },

  // --- 2. ENGINEERING PHYSICS ---
  {
    id: 'note-phys-quantum-lasers',
    title: 'Quantum Mechanics, Lasers & Fiber Optics Engineering',
    subjectId: 'phys-eng',
    subjectName: 'Engineering Physics',
    subjectTag: 'PHYSICS',
    branch: 'COMMON',
    semester: 1,
    readTime: '24 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Mastering the time-independent Schrödinger wave equation, particle in a 1D potential well, Einstein A & B coefficients, He-Ne laser pumping, and optical fiber acceptance angle.',
    keyTopics: ['Schrödinger 1D Wave Equation', 'Energy Quantization in Infinite Potential Well', 'He-Ne Four-Level Laser System', 'Numerical Aperture (NA) & V-Number'],
    formulas: [
      {
        label: 'Schrödinger Time-Independent Equation (1D)',
        formula: '-(ħ² / 2m) · (d²ψ / dx²) + V(x)·ψ = E·ψ',
        explanation: 'Fundamental wave equation where ħ = h / 2π, m is particle mass, V(x) is potential, and E is total quantized energy.'
      },
      {
        label: 'Energy Eigenvalues (Particle in 1D Box of width L)',
        formula: 'E_n = (n² · h²) / (8 · m · L²)  for n = 1, 2, 3...',
        explanation: 'Energy is strictly quantized; ground state zero-point energy E1 > 0 by Heisenberg uncertainty.'
      },
      {
        label: 'Optical Fiber Numerical Aperture (NA)',
        formula: 'NA = sin(θ_a) = √(n₁² - n₂²)',
        explanation: 'n1 is core refractive index, n2 is cladding index (n1 > n2). Governs the light gathering capacity of the fiber.'
      }
    ],
    sections: [
      {
        id: 'sec-quantum-box',
        title: '1. Particle Confined in a 1D Infinite Potential Box',
        content: `Consider a particle of mass m confined to move along the x-axis between x = 0 and x = L, with potential V(x) = 0 for 0 < x < L and V(x) = ∞ at boundaries.

Boundary Conditions:
ψ(0) = 0  and  ψ(L) = 0 (particle cannot penetrate infinite potential).

Wavefunction Solution:
Inside the well, d²ψ/dx² + k²ψ = 0 where k = √(2mE)/ħ.
General solution: ψ(x) = A·sin(kx) + B·cos(kx).
Applying ψ(0) = 0 yields B = 0.
Applying ψ(L) = 0 yields sin(kL) = 0 ⇒ kL = nπ (n = 1, 2, 3...).
Normalized Eigenfunctions:
ψ_n(x) = √(2/L) · sin(nπx / L)`,
        practiceNumerical: {
          problem: 'An electron is confined to an infinite 1D potential well of width 1 Å (10⁻¹⁰ m). Calculate its ground state energy in electron-volts (eV). (Take h = 6.626×10⁻³⁴ J·s, m = 9.1×10⁻³¹ kg).',
          solution: 'E1 ≈ 37.6 eV.',
          steps: [
            'E1 = (1² · h²) / (8 · m · L²)',
            'E1 = (6.626 × 10⁻³⁴)² / (8 × 9.1 × 10⁻³¹ × (10⁻¹⁰)²)',
            'E1 = (4.39 × 10⁻⁶⁷) / (7.28 × 10⁻⁴⁹) = 6.03 × 10⁻¹⁸ Joules.',
            'Convert to eV: E1 = 6.03 × 10⁻¹⁸ / (1.602 × 10⁻¹⁹) ≈ 37.64 eV.'
          ]
        }
      },
      {
        id: 'sec-laser-he-ne',
        title: '2. Helium-Neon (He-Ne) Gas Laser',
        content: `The He-Ne laser is a continuous four-level neutral gas laser generating monochromatic, coherent red radiation at 632.8 nm.

Pumping & Population Inversion Mechanism:
1. Gas Mixture: Helium and Neon in an approximate ratio of 10:1 inside a quartz discharge tube at low pressure (~1 mm Hg).
2. Electric Discharge: High voltage DC creates energetic electrons that collide with ground state Helium atoms, exciting them to metastable states 2¹S and 2³S.
3. Resonant Energy Transfer: The metastable states of Helium (20.61 eV) coincide closely with Neon's excited 3s energy levels (20.66 eV). Through inelastic atomic collisions, energy is transferred to Neon atoms.
4. Laser Transition: Stimulated emission occurs between Neon levels 3s₂ and 2p₄, releasing photons of wavelength λ = 632.8 nm.`
      }
    ]
  },

  // --- 3. ENGINEERING MATHEMATICS (MULTIVARIABLE & ODE) ---
  {
    id: 'note-math-multivar-ode',
    title: 'Multivariable Calculus, Euler\'s Theorem & Exact Differential Equations',
    subjectId: 'math-core-1',
    subjectName: 'Engineering Mathematics',
    subjectTag: 'MATHEMATICS',
    branch: 'COMMON',
    semester: 1,
    readTime: '26 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Mastering partial differentiation, Euler theorem on homogeneous functions, maxima-minima in two variables with Hessian discriminant, integrating factors, and Gauss-Stokes vector integrals.',
    keyTopics: ['Euler\'s Theorem for Homogeneous Functions', 'Maxima & Minima Discriminant (rt - s²)', 'Exact ODE Condition (∂M/∂y = ∂N/∂x)', 'Green\'s & Gauss Divergence Theorems'],
    formulas: [
      {
        label: 'Euler\'s Theorem on Homogeneous Functions',
        formula: 'x · (∂u / ∂x) + y · (∂u / ∂y) = n · u (for homogeneous function u of degree n)',
        explanation: 'Higher order: x²·u_xx + 2xy·u_xy + y²·u_yy = n(n - 1)·u.'
      },
      {
        label: 'Two-Variable Maxima-Minima Test',
        formula: 'Discriminant Δ = r·t - s²  where r = f_xx, s = f_xy, t = f_yy',
        explanation: 'If Δ > 0 and r < 0 ⇒ Local Maximum. If Δ > 0 and r > 0 ⇒ Local Minimum. If Δ < 0 ⇒ Saddle Point.'
      },
      {
        label: 'Exact First-Order Differential Equation',
        formula: 'M(x, y) dx + N(x, y) dy = 0  is Exact iff  ∂M/∂y = ∂N/∂x',
        explanation: 'Solution: ∫ M dx (treating y as constant) + ∫ (terms of N free from x) dy = Constant.'
      }
    ],
    sections: [
      {
        id: 'sec-exact-ode',
        title: '1. Exact Differential Equations & Integrating Factors',
        content: `A first order differential equation of the form M(x, y) dx + N(x, y) dy = 0 is exact when the cross partial derivatives match:
∂M/∂y = ∂N/∂x.

When ∂M/∂y ≠ ∂N/∂x, an Integrating Factor (IF) is multiplied to render the equation exact:
Case 1: If (1/N) · (∂M/∂y - ∂N/∂x) = f(x) alone, then IF = e^(∫ f(x) dx).
Case 2: If (1/M) · (∂N/∂x - ∂M/∂y) = g(y) alone, then IF = e^(∫ g(y) dy).
Case 3: For homogeneous functions M dx + N dy = 0, IF = 1 / (Mx + Ny) provided Mx + Ny ≠ 0.`,
        practiceNumerical: {
          problem: 'Solve the differential equation: (2xy + y) dx + (x² + x) dy = 0.',
          solution: 'x²y + xy = C.',
          steps: [
            'M = 2xy + y  ⇒  ∂M/∂y = 2x + 1.',
            'N = x² + x   ⇒  ∂N/∂x = 2x + 1.',
            'Since ∂M/∂y = ∂N/∂x, the equation is exact.',
            'Integrate M with respect to x (treat y as const): ∫ (2xy + y) dx = x²y + xy.',
            'Integrate terms in N free from x: N has no term free from x (both x² and x contain x).',
            'General solution: x²y + xy = C.'
          ]
        }
      }
    ]
  },

  // --- 4. ENGINEERING GRAPHICS ---
  {
    id: 'note-eg-projections-isometric',
    title: 'Engineering Graphics: Orthographic Projections & Isometric Scale',
    subjectId: 'eg-draw',
    subjectName: 'Engineering Graphics',
    subjectTag: 'GRAPHICS',
    branch: 'COMMON',
    semester: 1,
    readTime: '23 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Essential manual and CAD drafting principles: First angle vs Third angle projections, straight lines inclined to both HP and VP, true inclinations, and isometric view construction.',
    keyTopics: ['First Angle vs Third Angle Projections', 'True Length (TL) & Apparent Angles (α, β, θ, φ)', 'Projections of Regular Solids', 'Isometric Scale Ratio (√2 / √3 ≈ 0.816)'],
    formulas: [
      {
        label: 'Isometric Length to True Length Ratio',
        formula: 'Isometric Length = √(2 / 3) × True Length ≈ 0.816 × True Length',
        explanation: 'Due to the 45° to 30° foreshortening transformation in isometric projection.'
      },
      {
        label: 'True Length Line Relation',
        formula: 'TL² = (Plan Length)² + (Difference in Elevation)² = (Elevation Length)² + (Difference in Plan)²',
        explanation: 'Geometric hypotenuse relation between true length and apparent views.'
      }
    ],
    sections: [
      {
        id: 'sec-ortho',
        title: '1. First Angle vs. Third Angle Orthographic Projection',
        content: `Engineering orthographic drawing projects 3D spatial geometry onto mutually perpendicular 2D principal planes: the Vertical Plane (VP) and Horizontal Plane (HP).

First Angle Projection (Standard in Europe, India & ISO):
- Object is placed in the First Quadrant (Above HP, in front of VP).
- The observer looks at the object, and projection falls on the plane behind it (Observer → Object → Plane).
- Top View (Plan) is drawn BELOW the XY reference line.
- Front View (Elevation) is drawn ABOVE the XY reference line.
- Left-Hand Side View is projected to the RIGHT of the front view.

Third Angle Projection (Standard in USA, Canada):
- Object is placed in the Third Quadrant (Below HP, behind VP).
- Projection plane is transparent and situated between observer and object (Observer → Plane → Object).
- Top View is drawn ABOVE the XY reference line.
- Front View is drawn BELOW the XY reference line.`,
        examTips: [
          'In university exams, always draw the standard projection symbol (frustum of a cone) in the title block.',
          'Differentiate visible outlines (continuous thick lines - 0.5 mm) from hidden lines (dashed medium lines - 0.25 mm).'
        ]
      },
      {
        id: 'sec-lines',
        title: '2. Projection of Straight Lines Inclined to Both Planes',
        content: `When a straight line AB is inclined to both HP (angle θ) and VP (angle φ):
- True Length (TL) is seen ONLY when the line is parallel to that projection plane.
- Front View length is apparent (a'b') and inclined at apparent angle α to XY line.
- Top View length is apparent (ab) and inclined at apparent angle β to XY line.
- Rule: Apparent angles α > θ and β > φ.`
      }
    ]
  },

  // --- 5. FEE (BASIC ELECTRICAL ENGINEERING) ---
  {
    id: 'note-fee-3phase-transformers',
    title: 'FEE: 3-Phase AC Systems, Star-Delta & Single-Phase Transformers',
    subjectId: 'fee-basic',
    subjectName: 'Fundamentals of Electrical Engineering (FEE)',
    subjectTag: 'FEE',
    branch: 'COMMON',
    semester: 1,
    readTime: '25 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Mastering three-phase balanced Star and Delta networks, Two-Wattmeter power measurement, power factor calculation, transformer EMF equation, and core losses.',
    keyTopics: ['Star (Y) vs Delta (Δ) Voltage & Current Relations', 'Two-Wattmeter Method for 3-Phase Power', 'Power Factor (cos φ) Derivation', 'Transformer EMF Equation (E = 4.44 f N Φm)'],
    formulas: [
      {
        label: 'Star (Y) Connected Relations',
        formula: 'V_Line = √3 · V_Phase (leads by 30°)   and   I_Line = I_Phase',
        explanation: 'Line voltage is √3 times phase voltage in star configuration.'
      },
      {
        label: 'Delta (Δ) Connected Relations',
        formula: 'V_Line = V_Phase   and   I_Line = √3 · I_Phase (lags by 30°)',
        explanation: 'Line current is √3 times phase current in balanced delta loads.'
      },
      {
        label: 'Two-Wattmeter Power Factor Angle',
        formula: 'tan(φ) = √3 · [ (W₁ - W₂) / (W₁ + W₂) ]',
        explanation: 'Total real power P = W1 + W2. When W2 = 0, power factor = cos(60°) = 0.5.'
      },
      {
        label: 'Transformer Induced EMF Equation',
        formula: 'E_rms = 4.44 · f · N · Φ_max = 4.44 · f · N · B_max · A',
        explanation: 'f is supply frequency (Hz), N is turns count, Φ_max is peak core magnetic flux in Webers.'
      }
    ],
    sections: [
      {
        id: 'sec-wattmeter',
        title: '1. Two-Wattmeter Method for 3-Phase Power Measurement',
        content: `The two-wattmeter method measures total active real power in a 3-wire, 3-phase balanced or unbalanced load.

Wattmeter Readings:
W₁ = V_L · I_L · cos(30° - φ)
W₂ = V_L · I_L · cos(30° + φ)

Sum of readings:
W₁ + W₂ = V_L · I_L · [ cos(30° - φ) + cos(30° + φ) ] = √3 · V_L · I_L · cos(φ) = Total Real Power (P).

Special Cases:
1. Pure Resistive Load (cos φ = 1, φ = 0°): W₁ = W₂ = V_L · I_L · cos(30°) > 0.
2. Power factor = 0.5 (φ = 60°): W₂ = cos(90°) = 0; W₁ reads total power alone.
3. Power factor < 0.5 (φ > 60°): W₂ reads negative; its potential coil must be reversed to obtain magnitude.`,
        practiceNumerical: {
          problem: 'In a two-wattmeter test on a 3-phase balanced system, the meters read W1 = 5 kW and W2 = 2 kW. Determine total active power and load power factor.',
          solution: 'Total Power = 7 kW, Power Factor cos φ ≈ 0.814 lagging.',
          steps: [
            'Total Active Power P = W1 + W2 = 5 kW + 2 kW = 7 kW.',
            'tan φ = √3 · (W1 - W2) / (W1 + W2) = √3 · (5 - 2) / (5 + 2) = (3√3) / 7 ≈ 5.196 / 7 = 0.7423.',
            'φ = arctan(0.7423) ≈ 36.58°.',
            'Power factor = cos(36.58°) ≈ 0.803 lagging.'
          ]
        }
      }
    ]
  },

  // --- 6. CP (COMPUTER PROGRAMMING IN C) ---
  {
    id: 'note-cp-pointers-memory',
    title: 'Computer Programming in C: Pointers, Memory Allocation & Structures',
    subjectId: 'cp-c-prog',
    subjectName: 'Computer Programming in C (CP)',
    subjectTag: 'CP',
    branch: 'COMMON',
    semester: 1,
    readTime: '25 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Comprehensive guide to memory organization in C: pointer arithmetic, dynamic memory allocation (malloc, calloc, realloc, free), function pointers, struct padding, and file handling.',
    keyTopics: ['Pointer Dereferencing & Double Pointers (**ptr)', 'Dynamic Memory Allocation (Heap vs Stack)', 'Structure Memory Alignment & Padding', 'File I/O Streams (fopen, fread, fseek)'],
    formulas: [
      {
        label: 'Pointer Increment Address Step',
        formula: 'ptr + k = (Base Address of ptr) + k × sizeof(*ptr)',
        explanation: 'Pointer arithmetic scales automatically with the byte size of the underlying data type.'
      },
      {
        label: 'Dynamic Memory Allocation Syntax',
        formula: 'int *arr = (int *)malloc(n * sizeof(int)); free(arr);',
        explanation: 'Allocates n contiguous uninitialized integers on the heap; free() prevents catastrophic memory leaks.'
      }
    ],
    sections: [
      {
        id: 'sec-pointers',
        title: '1. Pointers, Memory Model & Dynamic Allocation',
        content: `A pointer in C is a variable that stores the memory address of another variable.

Memory Layout of a C Program:
1. Text / Code Segment: Compiled binary machine instructions (read-only).
2. Data Segment: Initialized global and static variables.
3. BSS Segment: Uninitialized global and static variables (zero-initialized).
4. Heap: Dynamically allocated memory at runtime via malloc()/calloc(); grows upwards.
5. Stack: Local variables, function call frames, return addresses; grows downwards.`,
        codeSnippet: {
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

// Dynamic array demonstration with safety checks
int main() {
    int n = 5;
    int *arr = (int *)calloc(n, sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Heap memory allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    // Pointer traversal
    int *ptr = arr;
    for (int i = 0; i < n; i++) {
        printf("Element %d at %p = %d\\n", i, (void *)ptr, *ptr);
        ptr++; // advances by sizeof(int) = 4 bytes
    }

    free(arr);
    arr = NULL; // prevent dangling pointer
    return 0;
}`,
          explanation: 'Always free allocated heap memory and set pointers to NULL to prevent dangling pointers.'
        }
      }
    ]
  },

  // --- 7. PYTHON PROGRAMMING ---
  {
    id: 'note-python-oop-scientific',
    title: 'Python Programming: OOP, List Comprehensions & NumPy Computing',
    subjectId: 'python-core',
    subjectName: 'Python Programming',
    subjectTag: 'PYTHON',
    branch: 'COMMON',
    semester: 2,
    readTime: '20 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Practical Python for engineers: data structures, list/dict comprehensions, object-oriented programming (inheritance, dunder methods), exception handling, and NumPy vectorization.',
    keyTopics: ['List & Dict Comprehensions', 'OOP (Classes, __init__, Encapsulation, Polymorphism)', 'Context Managers (`with open(...)`)', 'NumPy Vectorized Matrix Operations'],
    formulas: [
      {
        label: 'List Comprehension Syntax',
        formula: '[expression for item in iterable if condition]',
        explanation: 'Pythonic, optimized C-speed array construction avoiding explicit append loops.'
      },
      {
        label: 'NumPy Vectorized Dot Product',
        formula: 'C = np.dot(A, B)  or  C = A @ B',
        explanation: 'Leverages BLAS/LAPACK C libraries for orders-of-magnitude faster matrix algebra.'
      }
    ],
    sections: [
      {
        id: 'sec-py-oop',
        title: '1. Object-Oriented Engineering Design in Python',
        content: `Python supports full object-oriented programming paradigms:
- Classes & Instances: Defined using the class keyword with __init__ constructor.
- Self Reference: Explicit reference to the current instance object.
- Dunder (Magic) Methods: __str__, __repr__, __len__, __add__ for operator overloading.`,
        codeSnippet: {
          language: 'python',
          code: `import numpy as np

class ElectricCircuit:
    def __init__(self, voltage: float, resistance: float):
        self.voltage = voltage
        self.resistance = resistance

    @property
    def current(self) -> float:
        """Ohm's Law: I = V / R"""
        if self.resistance <= 0:
            raise ValueError("Resistance must be positive")
        return self.voltage / self.resistance

    def __repr__(self):
        return f"Circuit(V={self.voltage}V, R={self.resistance}Ω, I={self.current:.2f}A)"

# Vectorized simulation across voltage range
voltages = np.linspace(10, 100, 5)
currents = voltages / 20.0 # R = 20 ohms
print("Voltages (V):", voltages)
print("Currents (A):", currents)`,
          explanation: 'Demonstrates encapsulation, properties, and NumPy vectorization.'
        }
      }
    ]
  },

  // --- 8. DATA STRUCTURES & ALGORITHMS (CSE) ---
  {
    id: 'note-dsa-trees-graphs',
    title: 'Balanced Binary Search Trees & Graph Algorithms',
    subjectId: 'cs-dsa',
    subjectName: 'Data Structures & Algorithms',
    subjectTag: 'DSA',
    branch: 'CSE',
    semester: 3,
    readTime: '18 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'In-depth guide to AVL tree rotations, Red-Black balancing invariants, and single-source shortest path via Dijkstra and Bellman-Ford algorithms with time complexities.',
    keyTopics: ['AVL Balance Factor', 'LL/RR/LR/RL Rotations', 'Dijkstra Priority Queue', 'Negative Weight Cycle Detection in Bellman-Ford'],
    formulas: [
      {
        label: 'AVL Balance Factor',
        formula: 'BF(node) = Height(LeftSubtree) - Height(RightSubtree) ∈ {-1, 0, +1}',
        explanation: 'Any node with |BF| > 1 requires rotation to restore O(log n) tree height.'
      },
      {
        label: 'Dijkstra Time Complexity',
        formula: 'O((V + E) log V) with Min-Heap Priority Queue',
        explanation: 'Each vertex is extracted once (V log V) and edges are relaxed at most once (E log V).'
      }
    ],
    sections: [
      {
        id: 'sec-avl',
        title: '1. AVL Tree Rotations & Invariants',
        content: `An AVL tree is a strictly height-balanced Binary Search Tree (BST). For every node in the tree, the height difference between its left and right subtrees (known as the Balance Factor, BF) cannot exceed ±1.`,
        codeSnippet: {
          language: 'cpp',
          code: `Node* rotateRight(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}`,
          explanation: 'Restores balanced height in O(1) pointer updates.'
        }
      }
    ]
  },

  // --- 9. OPERATING SYSTEMS (CSE) ---
  {
    id: 'note-os-concurrency-scheduling',
    title: 'Process Synchronization, Deadlocks & CPU Scheduling',
    subjectId: 'cs-os',
    subjectName: 'Operating Systems',
    subjectTag: 'OS',
    branch: 'CSE',
    semester: 4,
    readTime: '20 min read',
    lastUpdated: 'Semester 2026 Revision',
    summary: 'Complete guide to the Critical Section problem, Peterson algorithm, Semaphores, Banker algorithm for deadlock avoidance, and SJF/Round-Robin Gantt charts.',
    keyTopics: ['Mutual Exclusion', 'Counting & Binary Semaphores', 'Banker\'s Safety Algorithm', 'Average Turnaround & Waiting Times'],
    formulas: [
      {
        label: 'Turnaround Time',
        formula: 'Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT)',
        explanation: 'Total elapsed time from process arrival to final execution completion.'
      },
      {
        label: 'Waiting Time',
        formula: 'Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT)',
        explanation: 'Total time a process spends waiting in the ready queue.'
      }
    ],
    sections: [
      {
        id: 'sec-sync',
        title: '1. The Critical Section Problem & Semaphores',
        content: `Any solution to the Critical Section problem must satisfy three strict requirements: Mutual Exclusion, Progress, and Bounded Waiting.`
      }
    ]
  }
];

export const VIDEO_LECTURES: VideoLecture[] = [
  // --- 1. ENGINEERING CHEMISTRY ---
  {
    id: 'vid-chem-water-edta',
    title: 'Lecture 03: Water Hardness, EDTA Complexometry & Boiler Troubles',
    subjectId: 'chem-eng',
    subjectName: 'Engineering Chemistry',
    subjectTag: 'CHEMISTRY',
    branch: 'COMMON',
    semester: 1,
    instructor: 'Prof. B.S. Murty',
    institution: 'IIT Madras Department of Chemistry',
    duration: '44:15',
    durationSeconds: 2655,
    videoUrl: 'https://www.youtube.com/embed/z4rM3iS4iI8',
    youtubeId: 'z4rM3iS4iI8',
    thumbnail: '/src/assets/images/course_physics_chemistry_1792473394917.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Types of Hardness: Temporary vs Permanent' },
      { timeSec: 360, timeFormatted: '06:00', title: 'Why Hardness is Expressed in CaCO3 Equivalents' },
      { timeSec: 840, timeFormatted: '14:00', title: 'Principle of EDTA Titration & EBT Indicator' },
      { timeSec: 1440, timeFormatted: '24:00', title: 'Boiler Troubles: Scales, Sludges & Caustic Embrittlement' },
      { timeSec: 2040, timeFormatted: '34:00', title: 'Zeolite (Permutit) Process & Demineralization Resins' }
    ],
    keyTakeaways: [
      'Equivalent weight of CaCO3 is 50 g/eq; used as global baseline due to its simple molar mass of 100 g/mol.',
      'Ammoniacal buffer strictly maintains pH 9–10 so the Ca-EDTA and Mg-EDTA chelate complexes stay stable.',
      'Zeolite process replaces Ca²⁺ and Mg²⁺ with Na⁺ ions, but does not remove anions.'
    ]
  },

  // --- 2. ENGINEERING PHYSICS ---
  {
    id: 'vid-phys-lasers-he-ne',
    title: 'Lecture 07: Quantum Mechanics, Schrödinger Equation & He-Ne Lasers',
    subjectId: 'phys-eng',
    subjectName: 'Engineering Physics',
    subjectTag: 'PHYSICS',
    branch: 'COMMON',
    semester: 1,
    instructor: 'Prof. H.C. Verma',
    institution: 'IIT Kanpur Department of Physics',
    duration: '51:20',
    durationSeconds: 3080,
    videoUrl: 'https://www.youtube.com/embed/DFgRz1c5kP8',
    youtubeId: 'DFgRz1c5kP8',
    thumbnail: '/src/assets/images/course_physics_chemistry_1792473394917.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Wave-Particle Duality & de Broglie Hypothesis' },
      { timeSec: 480, timeFormatted: '08:00', title: 'Derivation of 1D Time-Independent Schrödinger Equation' },
      { timeSec: 1140, timeFormatted: '19:00', title: 'Particle in 1D Infinite Potential Well (Eigenvalues)' },
      { timeSec: 1860, timeFormatted: '31:00', title: 'Spontaneous vs Stimulated Emission & Einstein Coefficients' },
      { timeSec: 2520, timeFormatted: '42:00', title: 'He-Ne Laser Construction & Population Inversion' }
    ],
    keyTakeaways: [
      'Zero-point energy E1 = h²/(8mL²) can never be zero due to Heisenberg Uncertainty Principle.',
      'Einstein relation: B12 = B21 (probability of stimulated absorption equals stimulated emission).',
      'Optical fibers guide light via Total Internal Reflection when launch angle θ ≤ acceptance angle θa.'
    ]
  },

  // --- 3. ENGINEERING MATHEMATICS ---
  {
    id: 'vid-math-multivar-chain',
    title: 'Lecture 04: Multivariable Calculus, Partial Derivatives & Exact ODEs',
    subjectId: 'math-core-1',
    subjectName: 'Engineering Mathematics',
    subjectTag: 'MATHEMATICS',
    branch: 'COMMON',
    semester: 1,
    instructor: 'Prof. Gilbert Strang',
    institution: 'MIT Department of Mathematics',
    duration: '47:10',
    durationSeconds: 2830,
    videoUrl: 'https://www.youtube.com/embed/jhXCTbFnK8o',
    youtubeId: 'jhXCTbFnK8o',
    thumbnail: '/src/assets/images/hero_engineering_workspace_1792472653506.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Functions of Several Variables & Partial Derivatives' },
      { timeSec: 420, timeFormatted: '07:00', title: 'Euler\'s Theorem for Homogeneous Functions' },
      { timeSec: 960, timeFormatted: '16:00', title: 'Taylor\'s Series Expansion in Two Variables' },
      { timeSec: 1620, timeFormatted: '27:00', title: 'Maxima & Minima of Two Variables (rt - s² test)' },
      { timeSec: 2280, timeFormatted: '38:00', title: 'Exact First-Order Differential Equations & Integrating Factors' }
    ],
    keyTakeaways: [
      'Euler theorem states x·(∂u/∂x) + y·(∂u/∂y) = n·u for any homogeneous function of degree n.',
      'Saddle points occur when the discriminant rt - s² < 0.',
      'M dx + N dy = 0 is exact if and only if ∂M/∂y = ∂N/∂x.'
    ]
  },

  // --- 4. ENGINEERING GRAPHICS ---
  {
    id: 'vid-eg-ortho-projections',
    title: 'Lecture 02: Orthographic Projections & Straight Line Inclinations',
    subjectId: 'eg-draw',
    subjectName: 'Engineering Graphics',
    subjectTag: 'GRAPHICS',
    branch: 'COMMON',
    semester: 1,
    instructor: 'Prof. N.D. Bhatt Foundation Series',
    institution: 'IIT Kharagpur Mechanical & Drawing Faculty',
    duration: '49:15',
    durationSeconds: 2955,
    videoUrl: 'https://www.youtube.com/embed/hB8M4_4aZ4c',
    youtubeId: 'hB8M4_4aZ4c',
    thumbnail: '/src/assets/images/course_engineering_graphics_1792473394930.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Quadrant System & Reference Planes (HP, VP)' },
      { timeSec: 420, timeFormatted: '07:00', title: 'First Angle vs Third Angle Projection Differences' },
      { timeSec: 1080, timeFormatted: '18:00', title: 'Projection of Points in 4 Quadrants' },
      { timeSec: 1680, timeFormatted: '28:00', title: 'Line Inclined to Both HP and VP (Locus Method)' },
      { timeSec: 2340, timeFormatted: '39:00', title: 'Isometric Scale Construction & 3D Projection' }
    ],
    keyTakeaways: [
      'In First Angle projection, top view is placed below the front view; in Third Angle, top view is placed above.',
      'True length of an inclined line can only be measured on a plane parallel to the line.',
      'Isometric projection reduces dimensions by a factor of √(2/3) ≈ 0.816 compared to true size.'
    ]
  },

  // --- 5. FEE (BASIC ELECTRICAL) ---
  {
    id: 'vid-fee-3phase-star-delta',
    title: 'Lecture 11: 3-Phase Balanced Systems & Two-Wattmeter Power Test',
    subjectId: 'fee-basic',
    subjectName: 'Fundamentals of Electrical Engineering (FEE)',
    subjectTag: 'FEE',
    branch: 'COMMON',
    semester: 1,
    instructor: 'Prof. K. Uma Rao',
    institution: 'Indian Institute of Science (IISc)',
    duration: '46:40',
    durationSeconds: 2800,
    videoUrl: 'https://www.youtube.com/embed/5kLh3k2M0mQ',
    youtubeId: '5kLh3k2M0mQ',
    thumbnail: '/src/assets/images/course_electronics_robotics_1792472654717.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Generation of 3-Phase Symmetrical Voltages' },
      { timeSec: 480, timeFormatted: '08:00', title: 'Star (Y) Connection: VL = √3 Vph Phasor Derivation' },
      { timeSec: 1140, timeFormatted: '19:00', title: 'Delta (Δ) Connection: IL = √3 Iph Derivation' },
      { timeSec: 1740, timeFormatted: '29:00', title: 'Two-Wattmeter Method Phasor Diagrams' },
      { timeSec: 2400, timeFormatted: '40:00', title: 'Transformer EMF Equation: E = 4.44 f N Φm' }
    ],
    keyTakeaways: [
      'Star systems have a neutral point; useful for distribution circuits feeding single-phase loads.',
      'Two-wattmeter method measures total real power W1 + W2 in any 3-wire 3-phase system.',
      'When load power factor is 0.5, one wattmeter reads zero and the other reads total power.'
    ]
  },

  // --- 6. CP (COMPUTER PROGRAMMING IN C) ---
  {
    id: 'vid-cp-pointers-dma',
    title: 'Lecture 05: C Pointers, Dynamic Memory Allocation & Struct Memory',
    subjectId: 'cp-c-prog',
    subjectName: 'Computer Programming in C (CP)',
    subjectTag: 'CP',
    branch: 'COMMON',
    semester: 1,
    instructor: 'Prof. David J. Malan',
    institution: 'Harvard CS50 / Engineering Programming',
    duration: '53:10',
    durationSeconds: 3190,
    videoUrl: 'https://www.youtube.com/embed/2ybLD6_2gKM',
    youtubeId: '2ybLD6_2gKM',
    thumbnail: '/src/assets/images/course_computer_science_1792472653369.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Address Space & Pointer Dereferencing (*p and &var)' },
      { timeSec: 540, timeFormatted: '09:00', title: 'Pointer Arithmetic & Array Pointer Equivalence' },
      { timeSec: 1200, timeFormatted: '20:00', title: 'Heap Allocation: malloc(), calloc(), realloc(), free()' },
      { timeSec: 1920, timeFormatted: '32:00', title: 'Dangling Pointers, Memory Leaks & Valgrind' },
      { timeSec: 2640, timeFormatted: '44:00', title: 'Structures, Struct Pointers (->) & Padding' }
    ],
    keyTakeaways: [
      'malloc(n) leaves memory uninitialized; calloc(count, size) zero-initializes memory.',
      'Pointer increment scales automatically by sizeof(datatype) in bytes.',
      'Compiler adds struct padding bytes to align multi-byte types to word boundaries.'
    ]
  },

  // --- 7. PYTHON PROGRAMMING ---
  {
    id: 'vid-python-numpy-oop',
    title: 'Lecture 08: Python for Engineers: OOP, Comprehensions & NumPy',
    subjectId: 'python-core',
    subjectName: 'Python Programming',
    subjectTag: 'PYTHON',
    branch: 'COMMON',
    semester: 2,
    instructor: 'Prof. John Guttag',
    institution: 'MIT Department of EECS',
    duration: '48:50',
    durationSeconds: 2930,
    videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
    youtubeId: 'kqtD5dpn9C8',
    thumbnail: '/src/assets/images/course_computer_science_1792472653369.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Pythonic Idioms & List Comprehensions' },
      { timeSec: 450, timeFormatted: '07:30', title: 'Object-Oriented Programming & __init__ Constructors' },
      { timeSec: 1080, timeFormatted: '18:00', title: 'Inheritance, Super() & Magic Methods' },
      { timeSec: 1740, timeFormatted: '29:00', title: 'Exception Handling: try, except, finally, raise' },
      { timeSec: 2400, timeFormatted: '40:00', title: 'NumPy Arrays & Vectorized Matrix Computations' }
    ],
    keyTakeaways: [
      'List comprehensions run in optimized C speed and are more idiomatic than explicit append loops.',
      'Context managers (with statement) automatically guarantee file closure even during runtime errors.',
      'NumPy operations bypass Python loop overhead by dispatching to vectorized SIMD C primitives.'
    ]
  },

  // --- 8. DSA (CSE) ---
  {
    id: 'vid-dsa-avl-graphs',
    title: 'Lecture 12: AVL Trees, Rotations & Priority Queue Implementations',
    subjectId: 'cs-dsa',
    subjectName: 'Data Structures & Algorithms',
    subjectTag: 'DSA',
    branch: 'CSE',
    semester: 3,
    instructor: 'Prof. Erik Demaine',
    institution: 'MIT Department of Electrical Engineering and Computer Science',
    duration: '48:30',
    durationSeconds: 2910,
    videoUrl: 'https://www.youtube.com/embed/7m94ipKeP1U',
    youtubeId: '7m94ipKeP1U',
    thumbnail: '/src/assets/images/course_computer_science_1792472653369.jpg',
    chapters: [
      { timeSec: 0, timeFormatted: '00:00', title: 'Introduction & BST Degeneracy Problem' },
      { timeSec: 360, timeFormatted: '06:00', title: 'AVL Balance Factor Definition' },
      { timeSec: 780, timeFormatted: '13:00', title: 'Single Left & Right Rotations' },
      { timeSec: 1320, timeFormatted: '22:00', title: 'Double Rotations (LR and RL Cases)' },
      { timeSec: 1980, timeFormatted: '33:00', title: 'Amortized Cost Analysis & Min-Heap' }
    ],
    keyTakeaways: [
      'Height of AVL tree with n nodes is bounded strictly by 1.44 log2(n).',
      'Insertion takes O(log n) time and requires at most 2 rotations.'
    ]
  }
];

export const PRACTICE_QUIZZES: Quiz[] = [
  // --- 1. CHEMISTRY QUIZ ---
  {
    id: 'quiz-chem-gate',
    title: 'Engineering Chemistry: Water Hardness, EDTA & Corrosion Test',
    subjectId: 'chem-eng',
    subjectName: 'Engineering Chemistry',
    subjectTag: 'CHEMISTRY',
    branch: 'COMMON',
    difficulty: 'Foundation',
    totalQuestions: 5,
    durationMinutes: 12,
    questions: [
      {
        id: 'q-chem-1',
        question: 'Why is water hardness universally expressed in terms of CaCO3 equivalents in engineering calculations?',
        options: [
          'Because CaCO3 is the most abundant salt on Earth',
          'Because CaCO3 has an easily calculable molecular weight of 100 g/mol and equivalent weight of 50 g/eq',
          'Because CaCO3 dissolves completely in neutral water',
          'Because it is the only precipitate formed in boilers'
        ],
        correctIndex: 1,
        explanation: 'CaCO3 has a molar mass of 100 g/mol and an equivalent weight of exactly 50 g/eq, making arithmetic calculation and cross-salt comparison straightforward.',
        formulaRef: 'CaCO3 Equivalent = (Mass of Salt / Equivalent Weight) * 50',
        topic: 'Water Technology'
      },
      {
        id: 'q-chem-2',
        question: 'In the complexometric EDTA titration for total water hardness, what is the color change at the equivalence point?',
        options: [
          'Colorless to Pink',
          'Wine Red to Steel Blue',
          'Steel Blue to Wine Red',
          'Yellow to Deep Orange'
        ],
        correctIndex: 1,
        explanation: 'The unstable [M-EBT] complex is wine red. As EDTA displaces the EBT indicator to form a more stable metal-EDTA chelate, free EBT turns the solution steel blue at pH 10.',
        topic: 'EDTA Titration'
      },
      {
        id: 'q-chem-3',
        question: 'According to the Pilling-Bedworth rule, an oxide film on a metal is non-porous and protective against further oxidation if the PB ratio is:',
        options: [
          'Less than 1.0',
          'Between 1.0 and 2.0',
          'Greater than 5.0',
          'Exactly zero'
        ],
        correctIndex: 1,
        explanation: 'If PB ratio is between 1 and 2, the volume of oxide layer is sufficient to cover the underlying metal without creating excessive internal shear stresses that cause cracking.',
        formulaRef: 'PB Ratio = (Volume of Metal Oxide) / (Volume of Metal Consumed)',
        topic: 'Corrosion Engineering'
      },
      {
        id: 'q-chem-4',
        question: 'According to Beer-Lambert Law, if the concentration of an absorbing solution is doubled while keeping path length constant, the absorbance (A) will:',
        options: [
          'Remain unchanged',
          'Double (2×)',
          'Quadruple (4×)',
          'Decrease by half'
        ],
        correctIndex: 1,
        explanation: 'Absorbance A = ε · c · l. Absorbance is directly proportional to concentration c. Doubling concentration doubles the absorbance.',
        formulaRef: 'A = ε · c · l',
        topic: 'Spectroscopy'
      },
      {
        id: 'q-chem-5',
        question: 'Which method can remove BOTH temporary and permanent hardness from feed water to produce demineralized water?',
        options: [
          'Boiling the water',
          'Ion-Exchange Resin Process (Demineralization)',
          'Clark\'s Lime Process',
          'Addition of Sodium Chloride'
        ],
        correctIndex: 1,
        explanation: 'Ion-exchange demineralization uses cation exchangers (R-H) to remove all cations (Ca²⁺, Mg²⁺, Na⁺) and anion exchangers (R-OH) to remove all anions (Cl⁻, SO₄²⁻), producing demineralized water.',
        topic: 'Water Treatment'
      }
    ]
  },

  // --- 2. PHYSICS QUIZ ---
  {
    id: 'quiz-phys-quantum-lasers',
    title: 'Engineering Physics: Quantum Mechanics, Lasers & Optical Fibers',
    subjectId: 'phys-eng',
    subjectName: 'Engineering Physics',
    subjectTag: 'PHYSICS',
    branch: 'COMMON',
    difficulty: 'Foundation',
    totalQuestions: 5,
    durationMinutes: 12,
    questions: [
      {
        id: 'q-phys-1',
        question: 'What is the ground state energy of a particle of mass m in an infinite 1D potential well of width L?',
        options: [
          'Zero',
          'h² / (8 · m · L²)',
          'h² / (4 · m · L²)',
          'h / (2 · m · L)'
        ],
        correctIndex: 1,
        explanation: 'For quantum number n = 1, E1 = (1² · h²) / (8 · m · L²). Ground state energy can never be zero due to Heisenberg uncertainty.',
        formulaRef: 'E_n = (n² h²) / (8 m L²)',
        topic: 'Quantum Mechanics'
      },
      {
        id: 'q-phys-2',
        question: 'In a Helium-Neon (He-Ne) laser, the actual laser stimulated emission transition takes place between energy levels of which atom?',
        options: [
          'Helium atom only',
          'Neon atom only',
          'Both Helium and Neon simultaneously',
          'Quartz container impurities'
        ],
        correctIndex: 1,
        explanation: 'Helium acts as the pumping agent to excite Neon via resonant collisions; the laser emission at 632.8 nm occurs between the excited states of Neon atoms.',
        topic: 'Lasers'
      },
      {
        id: 'q-phys-3',
        question: 'An optical fiber has a core refractive index n1 = 1.50 and cladding index n2 = 1.48. What is the Numerical Aperture (NA)?',
        options: [
          '0.244',
          '0.020',
          '0.500',
          '0.141'
        ],
        correctIndex: 0,
        explanation: 'NA = √(n1² - n2²) = √(1.50² - 1.48²) = √(2.25 - 2.1904) = √0.0596 ≈ 0.244.',
        formulaRef: 'NA = √(n1² - n2²)',
        topic: 'Fiber Optics'
      },
      {
        id: 'q-phys-4',
        question: 'In Newton\'s rings experiment with reflected monochromatic light, the central spot is always:',
        options: [
          'Bright',
          'Dark',
          'Yellow',
          'Alternating bright and dark'
        ],
        correctIndex: 1,
        explanation: 'At the contact point, air film thickness t = 0. Reflection from denser glass plate introduces a phase shift of π (path difference λ/2), resulting in destructive interference (dark center).',
        topic: 'Wave Optics'
      },
      {
        id: 'q-phys-5',
        question: 'What is the de Broglie wavelength of an electron accelerated through a potential difference of V volts?',
        options: [
          'λ = 12.27 / √V  Å',
          'λ = 1.227 × √V  Å',
          'λ = 6.626 / V  nm',
          'λ = V² / 150  Å'
        ],
        correctIndex: 0,
        explanation: 'Using λ = h / √(2 m e V) and substituting electronic constants yields λ = 12.27 / √V Angstroms.',
        formulaRef: 'λ = 12.27 / √V  Å',
        topic: 'de Broglie Hypothesis'
      }
    ]
  },

  // --- 3. MATHEMATICS QUIZ ---
  {
    id: 'quiz-math-multivar',
    title: 'Engineering Mathematics: Multivariable Calculus & ODEs Exam',
    subjectId: 'math-core-1',
    subjectName: 'Engineering Mathematics',
    subjectTag: 'MATHEMATICS',
    branch: 'COMMON',
    difficulty: 'Core Semester',
    totalQuestions: 5,
    durationMinutes: 12,
    questions: [
      {
        id: 'q-math-1',
        question: 'If u = (x³ + y³) / (x + y), what is the value of x·(∂u/∂x) + y·(∂u/∂y)?',
        options: [
          'u',
          '2u',
          '3u',
          '0'
        ],
        correctIndex: 1,
        explanation: 'The function u is homogeneous of degree n = 3 - 1 = 2. By Euler\'s Theorem, x·(∂u/∂x) + y·(∂u/∂y) = n·u = 2u.',
        formulaRef: 'Euler\'s Theorem: x·u_x + y·u_y = n·u',
        topic: 'Euler\'s Theorem'
      },
      {
        id: 'q-math-2',
        question: 'In the test for extreme values of f(x, y), if r = f_xx, s = f_xy, t = f_yy at a stationary point, and rt - s² < 0, then the point is:',
        options: [
          'A point of local maximum',
          'A point of local minimum',
          'A saddle point (neither max nor min)',
          'The test is inconclusive'
        ],
        correctIndex: 2,
        explanation: 'When discriminant Δ = rt - s² < 0, the Hessian matrix has eigenvalues of opposite signs, creating a saddle point.',
        topic: 'Multivariable Maxima'
      },
      {
        id: 'q-math-3',
        question: 'What is the necessary and sufficient condition for M(x, y) dx + N(x, y) dy = 0 to be an exact differential equation?',
        options: [
          '∂M/∂x = ∂N/∂y',
          '∂M/∂y = ∂N/∂x',
          'M + N = 0',
          '∂²M/∂x² = ∂²N/∂y²'
        ],
        correctIndex: 1,
        explanation: 'Equality of cross-partial derivatives ∂M/∂y = ∂N/∂x ensures the existence of a potential function f such that df = M dx + N dy.',
        formulaRef: '∂M/∂y = ∂N/∂x',
        topic: 'Differential Equations'
      },
      {
        id: 'q-math-4',
        question: 'Gauss Divergence Theorem converts:',
        options: [
          'A line integral into a surface integral',
          'A closed surface integral into a volume integral',
          'A volume integral into a line integral',
          'A double integral into single integral'
        ],
        correctIndex: 1,
        explanation: 'Gauss Divergence Theorem states ∬_S (F · n̂) dS = ∭_V (∇ · F) dV, relating flux across a closed surface to divergence within volume.',
        formulaRef: '∬_S F·dS = ∭_V (∇·F) dV',
        topic: 'Vector Calculus'
      },
      {
        id: 'q-math-5',
        question: 'What is the Laplace transform of the function f(t) = e^(3t) · cos(4t)?',
        options: [
          '(s - 3) / [ (s - 3)² + 16 ]',
          '4 / [ (s - 3)² + 16 ]',
          '(s + 3) / [ (s + 3)² + 16 ]',
          's / (s² + 16)'
        ],
        correctIndex: 0,
        explanation: 'By the First Shifting Theorem: L{ e^(at) cos(bt) } = (s - a) / [ (s - a)² + b² ]. Here a = 3, b = 4.',
        formulaRef: 'L{ e^(at) f(t) } = F(s - a)',
        topic: 'Laplace Transforms'
      }
    ]
  },

  // --- 4. ENGINEERING GRAPHICS QUIZ ---
  {
    id: 'quiz-eg-graphics',
    title: 'Engineering Graphics: Projections, Lines & Isometric Rules Test',
    subjectId: 'eg-draw',
    subjectName: 'Engineering Graphics',
    subjectTag: 'GRAPHICS',
    branch: 'COMMON',
    difficulty: 'Foundation',
    totalQuestions: 5,
    durationMinutes: 12,
    questions: [
      {
        id: 'q-eg-1',
        question: 'In First Angle projection, where is the Top View (Plan) drawn relative to the Front View (Elevation)?',
        options: [
          'Above the Front View',
          'Below the Front View',
          'To the right of the Front View',
          'Superimposed on the Front View'
        ],
        correctIndex: 1,
        explanation: 'In First Angle projection, the object lies in Quadrant 1. The top view is projected downward onto HP and unfolded below the XY reference line (below front view).',
        topic: 'Orthographic Projections'
      },
      {
        id: 'q-eg-2',
        question: 'What is the ratio of Isometric Length to True Length in isometric projection?',
        options: [
          '√(2/3) ≈ 0.816',
          '√(3/2) ≈ 1.22',
          '1.000 (Exact match)',
          '0.500'
        ],
        correctIndex: 0,
        explanation: 'In isometric projection, edges foreshorten by cos(45°)/cos(30°) = (1/√2) / (√3/2) = √(2/3) ≈ 0.816.',
        formulaRef: 'Isometric Scale = 0.816 × True Scale',
        topic: 'Isometric Scale'
      },
      {
        id: 'q-eg-3',
        question: 'If a point P lies 30 mm above HP and 40 mm behind VP, in which quadrant is point P located?',
        options: [
          'First Quadrant',
          'Second Quadrant',
          'Third Quadrant',
          'Fourth Quadrant'
        ],
        correctIndex: 1,
        explanation: 'Quadrant 1: Above HP, In Front VP. Quadrant 2: Above HP, Behind VP. Quadrant 3: Below HP, Behind VP. Quadrant 4: Below HP, In Front VP.',
        topic: 'Projection of Points'
      },
      {
        id: 'q-eg-4',
        question: 'If a straight line is parallel to both HP and VP, its True Length is visible in:',
        options: [
          'Front View only',
          'Top View only',
          'Both Front View and Top View',
          'Side View only'
        ],
        correctIndex: 2,
        explanation: 'When parallel to both planes, neither view undergoes foreshortening; both Front View and Top View show True Length.',
        topic: 'Projection of Lines'
      },
      {
        id: 'q-eg-5',
        question: 'The trace of a line where it pierces or meets the Horizontal Plane (HP) is called:',
        options: [
          'Horizontal Trace (HT)',
          'Vertical Trace (VT)',
          'Profile Trace (PT)',
          'Ground Line'
        ],
        correctIndex: 0,
        explanation: 'The point of intersection of a line with the Horizontal Plane (produced if necessary) is known as the Horizontal Trace (HT).',
        topic: 'Line Traces'
      }
    ]
  },

  // --- 5. FEE QUIZ ---
  {
    id: 'quiz-fee-ac-machines',
    title: 'FEE: 3-Phase AC Systems, Star-Delta & Transformers Exam',
    subjectId: 'fee-basic',
    subjectName: 'Fundamentals of Electrical Engineering (FEE)',
    subjectTag: 'FEE',
    branch: 'COMMON',
    difficulty: 'Core Semester',
    totalQuestions: 5,
    durationMinutes: 12,
    questions: [
      {
        id: 'q-fee-1',
        question: 'In a balanced 3-phase Star (Y) connected system, what is the relation between Line Voltage VL and Phase Voltage Vph?',
        options: [
          'VL = Vph',
          'VL = √3 · Vph',
          'VL = Vph / √3',
          'VL = 3 · Vph'
        ],
        correctIndex: 1,
        explanation: 'In star connection, line voltage is the phasor difference between two phase voltages: VL = 2 · Vph · cos(30°) = √3 · Vph.',
        formulaRef: 'VL = √3 · Vph (Star Connection)',
        topic: '3-Phase Systems'
      },
      {
        id: 'q-fee-2',
        question: 'In the Two-Wattmeter method for measuring 3-phase power, what is the load power factor if one wattmeter reads zero (W2 = 0)?',
        options: [
          'Unity (1.0)',
          '0.5 lagging or leading',
          'Zero',
          '0.866'
        ],
        correctIndex: 1,
        explanation: 'W2 = VL · IL · cos(30° + φ). W2 = 0 implies 30° + φ = 90° ⇒ φ = 60°. Hence power factor = cos(60°) = 0.5.',
        formulaRef: 'W2 = 0  ⇒  cos φ = 0.5',
        topic: 'Two-Wattmeter Method'
      },
      {
        id: 'q-fee-3',
        question: 'A single-phase transformer has 500 primary turns and operates at 50 Hz. If maximum core flux is 0.02 Wb, what is the induced primary EMF E1?',
        options: [
          '2220 V',
          '4440 V',
          '1110 V',
          '500 V'
        ],
        correctIndex: 0,
        explanation: 'E1 = 4.44 · f · N1 · Φm = 4.44 · 50 · 500 · 0.02 = 4.44 · 500 = 2220 Volts.',
        formulaRef: 'E = 4.44 · f · N · Φm',
        topic: 'Transformers'
      },
      {
        id: 'q-fee-4',
        question: 'Open Circuit (OC) test on a single-phase transformer is primarily conducted to determine:',
        options: [
          'Full-load copper losses',
          'Core (Iron) losses and magnetizing branch parameters',
          'Winding equivalent resistance',
          'Mechanical friction loss'
        ],
        correctIndex: 1,
        explanation: 'The OC test is conducted at rated voltage on the low-voltage side with the high-voltage side open. The current is very small, so copper loss is negligible; input power measures core (hysteresis + eddy current) loss.',
        topic: 'Transformer Testing'
      },
      {
        id: 'q-fee-5',
        question: 'In a balanced Delta (Δ) connected load, line current IL is related to phase current Iph by:',
        options: [
          'IL = Iph',
          'IL = √3 · Iph',
          'IL = Iph / √3',
          'IL = 3 · Iph'
        ],
        correctIndex: 1,
        explanation: 'In delta connection, line current is the phasor difference between adjacent phase currents: IL = √3 · Iph and lags phase current by 30°.',
        formulaRef: 'IL = √3 · Iph (Delta Connection)',
        topic: 'Delta Connection'
      }
    ]
  },

  // --- 6. CP (C PROGRAMMING) QUIZ ---
  {
    id: 'quiz-cp-c-programming',
    title: 'Computer Programming in C: Pointers, Memory & Structs',
    subjectId: 'cp-c-prog',
    subjectName: 'Computer Programming in C (CP)',
    subjectTag: 'CP',
    branch: 'COMMON',
    difficulty: 'Core Semester',
    totalQuestions: 5,
    durationMinutes: 12,
    questions: [
      {
        id: 'q-cp-1',
        question: 'What is the output of the following C code?\nint a[5] = {10, 20, 30, 40, 50};\nint *p = a;\nprintf("%d", *(p + 3));',
        options: [
          '10',
          '30',
          '40',
          'Garbage value'
        ],
        correctIndex: 2,
        explanation: '*(p + 3) is equivalent to a[3]. a[0]=10, a[1]=20, a[2]=30, a[3]=40. The output is 40.',
        topic: 'Pointer Arithmetic'
      },
      {
        id: 'q-cp-2',
        question: 'What is the key difference between malloc() and calloc() in standard C library?',
        options: [
          'malloc() allocates heap memory while calloc() allocates stack memory',
          'calloc() initializes all allocated bytes to zero; malloc() leaves memory with garbage values',
          'malloc() requires two arguments; calloc() requires one',
          'calloc() cannot be freed with free()'
        ],
        correctIndex: 1,
        explanation: 'void* calloc(size_t num, size_t size) zeroes out all bytes; void* malloc(size_t size) does not clear memory.',
        topic: 'Dynamic Memory'
      },
      {
        id: 'q-cp-3',
        question: 'What is a Dangling Pointer in C programming?',
        options: [
          'A pointer that has not been initialized to any address',
          'A pointer that still points to a memory location that has already been deallocated using free()',
          'A pointer initialized to NULL',
          'A pointer to a function'
        ],
        correctIndex: 1,
        explanation: 'A dangling pointer points to freed heap memory or an out-of-scope stack variable. Accessing it causes undefined behavior.',
        topic: 'Memory Bugs'
      },
      {
        id: 'q-cp-4',
        question: 'Why does sizeof(struct { char a; int b; }) typically evaluate to 8 bytes instead of 5 bytes on a 32/64-bit architecture?',
        options: [
          'Because of Structure Padding / Word Alignment by compiler',
          'Because char occupies 4 bytes in structs',
          'Because pointers are automatically created for each field',
          'Because int occupies 7 bytes'
        ],
        correctIndex: 0,
        explanation: 'Processors fetch data faster when 4-byte integers are aligned to addresses that are multiples of 4. The compiler adds 3 padding bytes after char a.',
        topic: 'Struct Padding'
      },
      {
        id: 'q-cp-5',
        question: 'Which file opening mode in C opens an existing file for both reading and writing without truncating its contents?',
        options: [
          '"w+"',
          '"r+"',
          '"a+"',
          '"rw"'
        ],
        correctIndex: 1,
        explanation: '"r+" opens for update (reading and writing) from the beginning without truncating. "w+" truncates existing content to zero length.',
        topic: 'File Handling'
      }
    ]
  },

  // --- 7. PYTHON QUIZ ---
  {
    id: 'quiz-python-engineers',
    title: 'Python for Engineering: OOP, Comprehensions & NumPy Test',
    subjectId: 'python-core',
    subjectName: 'Python Programming',
    subjectTag: 'PYTHON',
    branch: 'COMMON',
    difficulty: 'Foundation',
    totalQuestions: 5,
    durationMinutes: 12,
    questions: [
      {
        id: 'q-py-1',
        question: 'What is the output of the list comprehension: [x**2 for x in range(5) if x % 2 != 0]?',
        options: [
          '[0, 1, 4, 9, 16]',
          '[1, 9]',
          '[0, 4, 16]',
          '[1, 4, 9]'
        ],
        correctIndex: 1,
        explanation: 'range(5) gives 0, 1, 2, 3, 4. The odd numbers are 1 and 3. Their squares are 1² = 1 and 3² = 9.',
        topic: 'List Comprehensions'
      },
      {
        id: 'q-py-2',
        question: 'In Python, what is the role of the `self` parameter inside a class method?',
        options: [
          'It is a reserved keyword that imports parent modules',
          'It refers explicitly to the specific instance object invoking the method',
          'It defines static variables shared across all instances',
          'It destroys the instance when the method terminates'
        ],
        correctIndex: 1,
        explanation: '`self` represents the instance of the class and allows access to its attributes and methods.',
        topic: 'Python OOP'
      },
      {
        id: 'q-py-3',
        question: 'Which of the following data types in Python is MUTABLE?',
        options: [
          'tuple',
          'str',
          'list',
          'frozenset'
        ],
        correctIndex: 2,
        explanation: 'Lists and dictionaries are mutable (can be changed in-place); tuples, strings, integers, and frozensets are immutable.',
        topic: 'Mutability'
      },
      {
        id: 'q-py-4',
        question: 'In NumPy, what does the expression `a * b` perform on two 2D arrays of identical shape?',
        options: [
          'Matrix multiplication (Dot product)',
          'Element-wise multiplication (Hadamard product)',
          'Cross product',
          'Scalar projection'
        ],
        correctIndex: 1,
        explanation: 'The `*` operator performs element-wise multiplication. Matrix multiplication is performed using `np.dot(a, b)` or the `@` operator (`a @ b`).',
        topic: 'NumPy Computing'
      },
      {
        id: 'q-py-5',
        question: 'What is the advantage of using `with open("data.txt") as f:` over regular `f = open("data.txt")`?',
        options: [
          'It makes the file read faster',
          'It guarantees automatic closure of the file stream even if an exception is raised',
          'It automatically encrypts the file on disk',
          'It allows writing without permission'
        ],
        correctIndex: 1,
        explanation: 'The `with` statement leverages Python\'s context manager protocol (`__enter__` and `__exit__`), ensuring `f.close()` is executed reliably under all circumstances.',
        topic: 'File Context Managers'
      }
    ]
  }
];

export const FORMULA_CHEATSHEETS: { category: string; branch: BranchId; subjectTag?: SubjectTag; items: FormulaItem[] }[] = [
  // --- 1. ENGINEERING CHEMISTRY ---
  {
    category: 'Engineering Chemistry & Water Technology',
    branch: 'COMMON',
    subjectTag: 'CHEMISTRY',
    items: [
      {
        label: 'Hardness in CaCO3 Equivalents',
        formula: 'CaCO₃ Equiv (mg/L) = [ Mass of Salt (mg/L) / Eq. Wt. of Salt ] × 50',
        explanation: 'Standardizes disparate hardness salts (Ca(HCO3)2, MgSO4, CaCl2) to standard CaCO3 scale.'
      },
      {
        label: 'Beer-Lambert Law (Absorbance)',
        formula: 'A = log₁₀(I₀ / I) = ε · c · l',
        explanation: 'Relates light absorption to molar absorptivity ε, concentration c, and optical path length l.'
      },
      {
        label: 'Pilling-Bedworth Ratio (PB Ratio)',
        formula: 'PB Ratio = (Volume of Metal Oxide) / (Volume of Metal Consumed)',
        explanation: 'Protective oxide film forms when 1.0 < PB < 2.0 (e.g. Al, Cr, Ni).'
      },
      {
        label: 'Nernst Equation for Electrode Potential',
        formula: 'E = E° - (2.303 · R · T / (n · F)) · log₁₀( [Red] / [Ox] ) = E° - (0.0591 / n) · log₁₀(1 / [Mⁿ⁺]) at 298 K',
        explanation: 'Predicts single electrode potential as a function of ion concentration.'
      }
    ]
  },

  // --- 2. ENGINEERING PHYSICS ---
  {
    category: 'Engineering Physics & Quantum Optics',
    branch: 'COMMON',
    subjectTag: 'PHYSICS',
    items: [
      {
        label: 'de Broglie Matter Wavelength',
        formula: 'λ = h / p = h / (m · v) = h / √(2 · m · E)',
        explanation: 'Wavelength associated with any moving quantum or macroscopic particle.'
      },
      {
        label: '1D Potential Box Quantized Energy',
        formula: 'E_n = (n² · h²) / (8 · m · L²)  for n = 1, 2, 3...',
        explanation: 'Quantized energy levels for a particle trapped in an infinite well of width L.'
      },
      {
        label: 'Numerical Aperture (Fiber Optics)',
        formula: 'NA = sin(θ_acceptance) = √(n₁² - n₂²)',
        explanation: 'Measures maximum light-gathering acceptance angle of optical fiber.'
      },
      {
        label: 'Newton\'s Rings Diameter (Reflected Dark Rings)',
        formula: 'D_n = √(4 · n · λ · R)  where R is radius of curvature of lens',
        explanation: 'Diameter of n-th dark concentric interference ring in air film.'
      }
    ]
  },

  // --- 3. ENGINEERING MATHEMATICS ---
  {
    category: 'Engineering Mathematics (Calculus & ODEs)',
    branch: 'COMMON',
    subjectTag: 'MATHEMATICS',
    items: [
      {
        label: 'Euler\'s Theorem for Homogeneous Functions',
        formula: 'x · (∂u / ∂x) + y · (∂u / ∂y) = n · u (degree n)',
        explanation: 'Key property utilized in thermodynamic equations of state and fluid functions.'
      },
      {
        label: 'Two-Variable Maxima-Minima Discriminant',
        formula: 'Δ = r · t - s²   where r = f_xx, s = f_xy, t = f_yy',
        explanation: 'Δ > 0 and r < 0: Maximum. Δ > 0 and r > 0: Minimum. Δ < 0: Saddle point.'
      },
      {
        label: 'Exact Differential Equation Condition',
        formula: 'M dx + N dy = 0  is Exact iff  ∂M/∂y = ∂N/∂x',
        explanation: 'Solution: ∫ M dx (y const) + ∫ (terms in N free of x) dy = C.'
      },
      {
        label: 'Gauss Divergence Theorem',
        formula: '∬_S (F · n̂) dS = ∭_V (∇ · F) dV',
        explanation: 'Relates outward flux through closed surface S to divergence throughout volume V.'
      }
    ]
  },

  // --- 4. ENGINEERING GRAPHICS ---
  {
    category: 'Engineering Graphics & Projections',
    branch: 'COMMON',
    subjectTag: 'GRAPHICS',
    items: [
      {
        label: 'Isometric Scale Transformation',
        formula: 'Isometric Length = √(2 / 3) × True Length ≈ 0.816 × True Length',
        explanation: 'Used when drawing true isometric projections (foreshortened by 18.4%).'
      },
      {
        label: 'True Length Line Invariants',
        formula: 'TL² = (Plan Length)² + (Δ Elevation)² = (Elevation Length)² + (Δ Plan)²',
        explanation: 'Fundamental relation linking apparent projected lengths to true spatial length.'
      },
      {
        label: 'Representative Fraction (RF)',
        formula: 'RF = (Dimension of object on drawing) / (Actual dimension of object)',
        explanation: 'Full scale (1:1), Reducing scale (1:5, 1:100), Enlarging scale (10:1).'
      }
    ]
  },

  // --- 5. FEE (BASIC ELECTRICAL) ---
  {
    category: 'Fundamentals of Electrical Engineering (FEE)',
    branch: 'COMMON',
    subjectTag: 'FEE',
    items: [
      {
        label: 'Star (Y) Connection Relations',
        formula: 'V_Line = √3 · V_Phase   and   I_Line = I_Phase',
        explanation: 'Line voltage leads phase voltage by 30°.'
      },
      {
        label: 'Delta (Δ) Connection Relations',
        formula: 'V_Line = V_Phase   and   I_Line = √3 · I_Phase',
        explanation: 'Line current lags phase current by 30°.'
      },
      {
        label: 'Three-Phase Balanced Real Power',
        formula: 'P = √3 · V_Line · I_Line · cos(φ) = 3 · V_Phase · I_Phase · cos(φ)',
        explanation: 'Total real active power delivered to balanced 3-phase load.'
      },
      {
        label: 'Two-Wattmeter Power Factor Angle',
        formula: 'tan(φ) = √3 · [ (W₁ - W₂) / (W₁ + W₂) ]',
        explanation: 'Allows calculating load power factor directly from two wattmeter readings.'
      },
      {
        label: 'Transformer EMF Equation',
        formula: 'E_rms = 4.44 · f · N · Φ_max',
        explanation: 'RMS induced electromotive force in transformer winding with N turns.'
      }
    ]
  },

  // --- 6. CP (C PROGRAMMING) ---
  {
    category: 'Computer Programming in C (CP)',
    branch: 'COMMON',
    subjectTag: 'CP',
    items: [
      {
        label: 'Pointer Arithmetic Step Rule',
        formula: 'Address(ptr + k) = Address(ptr) + k × sizeof(*ptr)',
        explanation: 'Compiler automatically scales address addition by datatype size in bytes.'
      },
      {
        label: 'Dynamic Heap Allocation Call',
        formula: 'ptr = (type *)malloc(n * sizeof(type));  or  calloc(n, sizeof(type));',
        explanation: 'malloc() leaves garbage memory; calloc() zero-initializes memory. Always free(ptr).'
      },
      {
        label: 'Structure Member Dereference',
        formula: 'ptr->member   is equivalent to   (*ptr).member',
        explanation: 'Arrow operator dereferences struct pointer and accesses member.'
      }
    ]
  },

  // --- 7. PYTHON PROGRAMMING ---
  {
    category: 'Python Programming for Engineers',
    branch: 'COMMON',
    subjectTag: 'PYTHON',
    items: [
      {
        label: 'List Comprehension Syntax',
        formula: '[expression for item in iterable if condition]',
        explanation: 'Concise, high performance Pythonic list generation.'
      },
      {
        label: 'File Context Management',
        formula: 'with open("filename.txt", "r") as f: content = f.read()',
        explanation: 'Automatically calls f.close() upon exiting block, preventing file descriptor leaks.'
      },
      {
        label: 'NumPy Vectorized Matrix Multiplication',
        formula: 'C = A @ B  or  C = np.dot(A, B)',
        explanation: 'Blazing fast matrix dot product dispatched directly to optimized C BLAS libraries.'
      }
    ]
  }
];
