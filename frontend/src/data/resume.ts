// Single source of truth for all portfolio content.
// Edit here to update the site — components read from this file.

export const profile = {
  name: "Anant Kumar",
  title: "DevOps Engineer | AI Cloud Infrastructure",
  location: "Abu Dhabi, UAE",
  phone: "+971 54 713 5292",
  email: "tyagianant98@gmail.com",
  linkedin: "https://linkedin.com/in/tyagianant98",
  github: "https://github.com/tyagianant5292",
  summary:
    "DevOps Engineer with 5+ years of experience building, automating, and operating cloud-native and bare-metal infrastructure for large-scale AI/ML workloads. Specialized in Kubernetes orchestration, GPU compute provisioning, and AI model deployment (vLLM), with strong expertise in CI/CD, GitOps, infrastructure automation, and high-performance cluster networking.",
  tagline:
    "I build and operate the infrastructure that runs large-scale AI/ML workloads — Kubernetes, GPU compute, and everything that keeps them reliable.",
};

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Containers & Orchestration",
    items: ["Kubernetes", "Docker", "Helm", "Rancher", "Slurm"],
  },
  {
    category: "CI/CD & GitOps",
    items: ["ArgoCD", "GitHub Actions", "GitLab CI", "Jenkins", "Git"],
  },
  {
    category: "IaC & Automation",
    items: ["Ansible", "MAAS", "Bare-metal Provisioning (PXE)"],
  },
  {
    category: "Cloud & Virtualization",
    items: ["Azure", "AWS", "OpenStack"],
  },
  {
    category: "Networking & Gateways",
    items: [
      "Apache APISIX",
      "Nginx",
      "Load Balancing",
      "Cisco NDFC",
      "Keepalived (HA)",
    ],
  },
  {
    category: "Monitoring & Observability",
    items: ["Prometheus", "Grafana"],
  },
  {
    category: "Databases & Storage",
    items: ["PostgreSQL", "MongoDB", "MinIO"],
  },
  {
    category: "Operating Systems",
    items: ["Linux (administration, tuning, security)"],
  },
];

export type Experience = {
  company: string;
  client?: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Netgroup.ai",
    client: "Core42",
    role: "DevOps Engineer",
    location: "Abu Dhabi, UAE",
    period: "Jul 2025 – Present",
    highlights: [
      "Build and maintain cloud-native and bare-metal infrastructure supporting large-scale AI/ML workloads across hybrid environments.",
      "Deploy and manage vLLM and other inference models on Kubernetes, optimizing GPU resource utilization for real-time and batch inference.",
      "Designed and maintain Machine-as-a-Service (MaaS) frameworks delivering on-demand GPU/CPU compute for AI training, inference, and research.",
      "Lead troubleshooting of bare-metal provisioning issues — PXE boot failures and node-commissioning network faults.",
      "Developed a custom script that validates InfiniBand port and GPU node health at commissioning time, before hardware enters production.",
      "Contribute to a unified internal AI Cloud Portal integrating Kubernetes, Slurm, GPU bare-metals, and model deployment services.",
      "Automate provisioning with Ansible; build and maintain CI/CD and GitOps pipelines using GitHub Actions and ArgoCD.",
      "Configure high-speed cluster interconnects via Cisco NDFC; manage Apache APISIX for routing, load balancing, auth, and observability.",
      "Administer Slurm and Kubernetes clusters for scheduling, performance tuning, and multi-tenant isolation.",
    ],
  },
  {
    company: "Coredge.io",
    client: "NIC",
    role: "DevOps Engineer",
    location: "Noida, India",
    period: "Jun 2024 – Jul 2025",
    highlights: [
      "Ensured high system availability and reliability through proactive monitoring and rapid incident response.",
      "Provided L3/L4 production support and root-cause analysis across services, partnering with development teams.",
      "Managed critical production deployments and configured highly available, scalable Kubernetes clusters.",
      "Deployed applications on Kubernetes using Helm charts and deployment manifests.",
      "Designed a container-based infrastructure that improved resource efficiency and reduced operational overhead.",
      "Automated end-to-end deployment for a major application, significantly cutting deployment time and manual effort.",
      "Implemented a centralized logging and monitoring solution for early detection and resolution of system issues.",
    ],
  },
  {
    company: "NEC Corporation India Pvt Ltd",
    role: "DevOps Engineer",
    location: "Noida, India",
    period: "Jan 2022 – Mar 2024",
    highlights: [
      "Built next-generation infrastructure on Nginx, Docker, Kubernetes, Rancher, and load balancing.",
      "Onboarded new microservices for dev teams — requirements gathering, design review, and solution proposals.",
      "Created Kubernetes clusters using Rancher across on-premises, AWS, and Azure for the G-FIWARE platforms.",
      "Deployed all G-FIWARE components via Kubernetes manifests and implemented a local storage feature.",
      "Built an Nginx HA setup with Keepalived for DNS routing; enabled HA for WSO2 API-M and Identity Server.",
      "Configured Nginx with multiple HTTPS ports and SSL certificates; integrated MinIO object storage.",
      "Implemented IoT Agent protocols including UL, LWM2M, OPC UA, and LoRaWAN.",
    ],
  },
  {
    company: "NGBPS Ltd",
    role: "NOC & Cloud Engineer",
    location: "Noida, India",
    period: "Mar 2021 – Jan 2022",
    highlights: [
      "Administered OpenStack-based private clouds; deployed OpenStack via Packstack on physical servers.",
      "Configured networking and created Windows and Linux images for OpenStack environments.",
      "Managed data-center hardware: physical disk installation, RAID configuration, LVM, and file-systems.",
      "Scaled server CPU and memory configurations to meet changing workload demands.",
      "Provided L2 support and root-cause analysis; created cron jobs for batch processing and reporting.",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Uttarakhand Technical University, Dehradun, India",
    period: "2015 – 2019",
  },
  {
    degree: "Senior Secondary (Class XII)",
    institution: "U.P. Board of Education, Saharanpur, India",
    period: "2014 – 2015",
  },
];

export const awards = [
  "Individual Oscar Award — JFM Quarter 2022–23, NEC",
  "Team Oscar Award — JAS Quarter 2022–23, NEC",
  "Quarterly Award Winner — JFM 2022–23, NEC",
  "Team Spot Award — 2023, NEC",
  "Monthly Spot Award — May 2022, NEC",
];

export const languages = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "Professional" },
];
