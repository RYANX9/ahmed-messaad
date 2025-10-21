// =============================================================================
// DATA.TS - Project Data & Type Definitions
// =============================================================================

export interface Project {
  id: string;
  name: string;
  context: string;
  year: string;
  description: string;
  tech: string[];
  link: string;
  linkText: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "clinrl",
    name: "ClinRL: Safe Treatment Optimization with DRL",
    context: "Reinforcement Learning for Clinical Decision Optimization",
    year: "2025",
    description:
      "Reinforcement learning framework (PPO, A2C, DQN) for treatment optimization. Achieved +107% reward gain and >94% clinical safety using reward normalization, evaluation callbacks, and policy filtering.",
    tech: ["Stable-Baselines3", "Gym", "NumPy", "Pandas"],
    link: "https://www.kaggle.com/code/ahmedmessaad/clinrl-safe-treatment-optimization-with-drl",
    linkText: "notebook",
    image: "/clinrl.jpeg",
  },
  {
    id: "airm",
    name: "AIRM Brain Tumor System",
    context: "Clinical AI Research",
    year: "2024",
    description:
      "Clinical-grade diagnostic system achieving 99% four-class tumor classification with radiologist-validated interface. End-to-end DICOM pipeline development investigating optimal preprocessing strategies for limited medical imaging datasets. Deployment-ready architecture with clinical workflow integration.",
    tech: ["EfficientNet-B7", "PyDICOM", "PyQt5", "SQL"],
    link: "https://youtu.be/2OeqBKF3X_A",
    linkText: "Watch Demo",
    image: "/brain.jpg",
  },
  {
    id: "hemavision",
    name: "HemaVision",
    context: "Medical Automation",
    year: "2023–2024",
    description:
      "Automated hematology platform achieving 97% multi-class blood cell classification. Reduced diagnostic time from 45 minutes to 3 minutes through optimized detection pipeline. Research investigating efficient segmentation architectures for microscopy imaging in clinical workflows.",
    tech: ["YOLOv8", "U-Net", "OpenCV", "PyTorch"],
    link: "https://youtu.be/YxhA877Wyn0",
    linkText: "Watch Demo",
    image: "/blood.jpg",
  },
  {
    id: "healthcost",
    name: "Healthcare Cost Prediction",
    context: "Deep Learning Methodology",
    year: "2024",
    description:
      "Conv1D neural network achieving R² = 0.88 for insurance cost forecasting. Feature engineering with SHAP analysis identified key cost drivers. Systematic ablation study investigating optimal temporal convolution strategies for healthcare prediction tasks.",
    tech: ["Conv1D", "SHAP", "Scikit-learn", "Plotly"],
    link: "https://www.kaggle.com/code/ahmedmessaad/healthcare-cost-prediction-using-neural-networks",
    linkText: "View Project",
    image: "/healthcarecost.png",
  },
  {
    id: "mydailyhealth",
    name: "My Daily Health",
    context: "Research Thesis",
    year: "2023",
    description:
      "Multi-disease diagnostic platform with 90-99% accuracy across five disease domains. Systematic comparative evaluation of 12 deep learning architectures using stratified cross-validation. Transfer learning investigation for multi-domain medical classification.",
    tech: ["TensorFlow", "ResNet", "EfficientNet", "Flask"],
    link: "https://youtu.be/kh7WBjNPpEM",
    linkText: "Watch Demo",
    image: "/daily.png",
  },
];
