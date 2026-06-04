// Case-study deep-dives surfaced via the terminal `projects` command.
// Two groups: real company projects (one per role) and personal projects.

export type Project = {
  slug: string;
  category: "company" | "personal";
  title: string;
  org: string;
  period: string;
  stack: string[];
  problem: string;
  architecture: string; // ASCII diagram, rendered in a <pre>
  contributions: string[];
  impact: string[];
  link?: string;
};

export const projects: Project[] = [
  // ───────────────────────── company projects ─────────────────────────
  {
    slug: "ai-cloud",
    category: "company",
    title: "AI Cloud — Self-Service GPU Cloud",
    org: "Client: Core42 · New Emerging Technology (NET)",
    period: "Jul 2025 – present",
    stack: [
      "Kubernetes",
      "Slurm",
      "NVIDIA H100",
      "AMD GPU",
      "InfiniBand",
      "vLLM",
      "Apache APISIX",
      "Ansible",
      "ArgoCD",
      "Cisco NDFC",
    ],
    problem:
      "Core42 (one of the largest AI clouds) needed a self-service GPU cloud where customers buy compute and provision it themselves — spin up Kubernetes or Slurm and deploy their own models — on a bare-metal H100/AMD fleet that has to be rock-solid and multi-tenant.",
    architecture: String.raw`
  customer ─▶  console.aicloud.core42.ai      (self-service portal)
                        │  buy GPU · deploy K8s/Slurm · ship models
                        ▼
              ┌─────────────────────┐
              │  Apache APISIX       │   routing · auth · LB · observability
              └──────────┬──────────┘
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     ┌─────────┐   ┌─────────┐   ┌──────────┐
     │Kubernetes│   │  Slurm  │   │  vLLM /  │
     │multi-tenant  │ HPC jobs│   │  models  │
     └────┬────┘   └────┬────┘   └────┬─────┘
          └──────────────┼──────────────┘
                         ▼
              ┌─────────────────────┐
              │ Bare-metal GPU fleet │  H100 · AMD
              │ InfiniBand · Cisco NDFC
              └─────────────────────┘`,
    contributions: [
      "Bare-metal provisioning of GPU nodes via MAAS / PXE; lead debugging of boot & node-commissioning faults.",
      "Custom InfiniBand + GPU health gate at commissioning so only verified hardware joins the pool.",
      "Deployed and managed vLLM inference on Kubernetes with GPU scheduling for real-time + batch.",
      "Multi-tenant Kubernetes + Slurm scheduling with isolation; Apache APISIX at the edge.",
      "High-speed interconnects via Cisco NDFC; GitOps with ArgoCD + GitHub Actions; automation with Ansible.",
    ],
    impact: [
      "Customers self-serve GPU compute (H100 / AMD) — buy, deploy K8s/Slurm, run models with no manual ops.",
      "Reliable onboarding of GPU bare-metals; bad hardware caught before production.",
    ],
    link: "https://console.aicloud.core42.ai",
  },
  {
    slug: "service-cloud",
    category: "company",
    title: "Service Cloud — Managed Container Platform",
    org: "Client: NIC (National Informatics Centre) · Coredge",
    period: "Jun 2024 – Jul 2025",
    stack: ["Kubernetes", "Helm", "Docker", "Prometheus", "Grafana", "CI/CD"],
    problem:
      "NIC needed highly available, scalable services running on a managed container platform, with fast deployments and early detection of production issues across many teams.",
    architecture: String.raw`
   users ─▶ load balancer ─▶ ┌──────────────────────────┐
                              │  HA Kubernetes clusters   │
                              │  Helm-deployed services   │
                              └────────────┬─────────────┘
                                           ▼
                          centralized logging + monitoring
                              (Prometheus · Grafana)`,
    contributions: [
      "Configured highly available, scalable Kubernetes clusters for critical production workloads.",
      "Deployed applications via Helm charts and manifests; standardized container-based infrastructure.",
      "Automated end-to-end deployment of a major application, cutting deployment time and manual effort.",
      "Built centralized logging + monitoring for early issue detection; provided L3/L4 RCA support.",
    ],
    impact: [
      "Improved resource efficiency and reduced operational overhead.",
      "Faster, repeatable deployments with earlier incident detection.",
    ],
  },
  {
    slug: "g-fiware",
    category: "company",
    title: "G-FIWARE — Multi-Cloud Smart-Platform",
    org: "NEC Corporation India",
    period: "Jan 2022 – Mar 2024",
    stack: ["Rancher", "Kubernetes", "Nginx", "Keepalived", "WSO2", "MinIO", "AWS", "Azure"],
    problem:
      "The G-FIWARE platform had to run across on-premises, AWS and Azure with high availability for its API and identity layers, plus support for a range of IoT device protocols.",
    architecture: String.raw`
   ┌── on-prem ──┐  ┌──── AWS ────┐  ┌──── Azure ───┐
   │  Rancher K8s│  │ Rancher K8s │  │ Rancher K8s  │
   └──────┬──────┘  └──────┬──────┘  └──────┬───────┘
          └────────────────┼────────────────┘
                           ▼
              Nginx HA + Keepalived (DNS routing)
              WSO2 API-M / Identity (HA) · MinIO
                           ▼
          IoT Agents: UL · LWM2M · OPC UA · LoRaWAN`,
    contributions: [
      "Created Kubernetes clusters with Rancher across on-prem, AWS and Azure for prod + dev.",
      "Deployed all G-FIWARE components via manifests; implemented a local storage feature.",
      "Built Nginx HA with Keepalived for DNS routing; enabled HA for WSO2 API-M and Identity Server.",
      "Configured Nginx with multiple HTTPS ports + SSL; integrated MinIO object storage.",
      "Implemented IoT Agent protocols: UL, LWM2M, OPC UA, LoRaWAN.",
    ],
    impact: [
      "A resilient multi-cloud platform with HA API/identity layers.",
      "Broad IoT device support through multiple agent protocols.",
    ],
  },
  {
    slug: "data-centre",
    category: "company",
    title: "Data Centre — OpenStack Private Cloud",
    org: "NGBPS Limited",
    period: "Mar 2021 – Jan 2022",
    stack: ["OpenStack", "Packstack", "Linux", "RAID / LVM", "Networking"],
    problem:
      "A private cloud had to be stood up and operated on physical servers in the data centre — from hardware and storage up to running OpenStack and supporting workloads.",
    architecture: String.raw`
   ┌──────────────── Data Centre ────────────────┐
   │  physical servers · disks · RAID · LVM       │
   │            ▼                                  │
   │   OpenStack (deployed via Packstack)          │
   │   compute · networking · images (Win/Linux)   │
   └──────────────────────────────────────────────┘`,
    contributions: [
      "Administered OpenStack-based private clouds; deployed OpenStack via Packstack on physical servers.",
      "Configured networking and created Windows / Linux images for the environment.",
      "Managed data-centre hardware: disk installation, RAID, LVM, file-systems; scaled CPU/memory.",
      "Provided L2 support and RCA; created cron jobs for batch processing and scheduled reports.",
    ],
    impact: [
      "A working private cloud delivered and operated end-to-end.",
      "Reliable capacity scaling to meet changing workload demands.",
    ],
  },

  // ───────────────────────── personal projects ─────────────────────────
  {
    slug: "k8s-iam",
    category: "personal",
    title: "K8s-IAM — Kubernetes Access Management",
    org: "Personal project",
    period: "2025",
    stack: ["Go", "client-go", "Gin", "Kubernetes RBAC", "JWT", "SQLite", "Docker"],
    problem:
      "Managing who can do what across Kubernetes namespaces is painful — handing out kubeconfigs, scoping RBAC, granting temporary access, and spotting suspicious activity. I built a tool to manage users and teams' kubeconfigs and permissions from one place.",
    architecture: String.raw`
   admin/user ─▶ ┌──────────────────────────────┐
                  │   k8s-iam (Go · Gin API)      │  in-cluster pod
                  │  • users/teams + JWT auth     │
                  │  • per-namespace kubeconfigs  │
                  │  • RBAC bindings              │
                  │  • temp-access requests       │
                  │  • audit / anomaly alerts     │
                  │  • webhooks · SQLite store    │
                  └───────────────┬──────────────┘
                                  ▼  ServiceAccount (ClusterRole)
                       Kubernetes API server
                  (ServiceAccounts · Role/ClusterRoleBindings)`,
    contributions: [
      "Built a Go + client-go service (Gin API) to manage users/teams and generate per-namespace kubeconfigs.",
      "Permissions scoped per namespace via Role/ClusterRole bindings; JWT-based auth.",
      "Temporary namespace-access requests, plus anomaly alerts from Kubernetes audit logs.",
      "Cluster details, webhooks, and an embedded SQLite store — runs entirely in-cluster.",
    ],
    impact: [
      "Self-service, auditable Kubernetes access without hand-editing RBAC.",
      "Time-bound access + anomaly alerts reduce standing-permission risk.",
    ],
  },
  {
    slug: "portfolio",
    category: "personal",
    title: "This Portfolio — Terminal UI + AI",
    org: "Personal project",
    period: "2025",
    stack: ["Next.js", "TypeScript", "Express", "Groq", "Docker", "Helm", "GitHub Actions"],
    problem:
      "A DevOps portfolio should prove the skills, not just list them. So this site is both an interactive terminal and a piece of real infrastructure — deployable to Vercel and to Kubernetes via Helm.",
    architecture: String.raw`
   visitor ─▶ Next.js terminal UI (Vercel edge)
                       │  ask / status / projects
                       ▼
              Express API (Render)
              • /api/ask  ─▶ Groq (streaming LLM)
              • /api/status · /api/contact
                       ▲
   GitHub ─▶ Actions ─▶ Docker Hub ─▶ Helm chart ─▶ Kubernetes`,
    contributions: [
      "Interactive terminal front-end (command engine, history, streaming AI chat).",
      "Express backend with a Groq-powered, resume-grounded 'ask' endpoint.",
      "Dockerized both tiers; Helm chart for Kubernetes; CI/CD to Docker Hub via GitHub Actions.",
    ],
    impact: [
      "The portfolio itself demonstrates Kubernetes, Helm, Docker, CI/CD and AI integration.",
    ],
    link: "https://github.com/tyagianant5292/portfolio",
  },
];
