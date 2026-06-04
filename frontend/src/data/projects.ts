// Case-study deep-dives surfaced via the terminal `projects` command.

export type Project = {
  slug: string;
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
  {
    slug: "core42-ai-cloud",
    title: "Self-Service GPU Cloud Platform",
    org: "Core42 — one of the largest AI clouds",
    period: "2025 – present",
    stack: [
      "Kubernetes",
      "Slurm",
      "NVIDIA H100",
      "AMD GPU",
      "InfiniBand",
      "Apache APISIX",
      "Ansible",
      "ArgoCD",
    ],
    problem:
      "Customers need on-demand GPU compute that they can self-provision — buy GPUs, spin up Kubernetes or Slurm, and deploy their own models — without filing tickets or waiting on ops. That means turning a bare-metal H100/AMD fleet into a reliable, multi-tenant, self-service cloud.",
    architecture: String.raw`
  customer ─▶  console.aicloud.core42.ai      (self-service portal)
                        │
                        ▼   buy GPU · deploy K8s/Slurm · ship models
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
              │ Bare-metal GPU fleet │
              │ H100 · AMD · InfiniBand
              └─────────────────────┘`,
    contributions: [
      "Bare-metal provisioning of GPU nodes via MAAS / PXE; lead debugging of boot & node-commissioning faults.",
      "GPU + InfiniBand commissioning health gate so only verified hardware enters the pool.",
      "Multi-tenant Kubernetes + Slurm scheduling with isolation between customers.",
      "Apache APISIX for routing, auth, load balancing and observability at the edge.",
      "GitOps with ArgoCD + GitHub Actions; provisioning automated with Ansible.",
    ],
    impact: [
      "Customers self-serve GPU compute (H100 / AMD) — buy, deploy K8s/Slurm, and run models with no manual ops.",
      "Reliable onboarding of new GPU bare-metals into production.",
    ],
    link: "https://console.aicloud.core42.ai",
  },
  {
    slug: "vllm-on-k8s",
    title: "vLLM Inference on Kubernetes with GPU Scheduling",
    org: "Core42",
    period: "2025 – present",
    stack: ["vLLM", "Kubernetes", "Helm", "GPU scheduling", "Prometheus", "Grafana"],
    problem:
      "Serving large language models efficiently means packing expensive GPUs well — handling both low-latency real-time requests and high-throughput batch inference — without idle silicon or noisy-neighbor contention.",
    architecture: String.raw`
   requests ─▶ APISIX ─▶ ┌───────────────────────────┐
                          │  Kubernetes (GPU nodes)   │
                          │  ┌─────────┐  ┌─────────┐ │
                          │  │ vLLM pod│  │ vLLM pod│ │  ◀ GPU-scheduled
                          │  │  H100   │  │  H100   │ │
                          │  └─────────┘  └─────────┘ │
                          │     ▲ autoscale  ▲        │
                          └─────┼────────────┼────────┘
                                │            │
                          Prometheus ─▶ Grafana  (utilization, latency)`,
    contributions: [
      "Deployed and managed vLLM inference services on Kubernetes with GPU resource requests/limits.",
      "Tuned GPU scheduling to balance real-time and batch inference workloads.",
      "Packaged deployments with Helm; wired Prometheus + Grafana for utilization and latency.",
    ],
    impact: [
      "Optimized GPU utilization across real-time and batch inference.",
      "Repeatable, version-controlled model rollouts.",
    ],
  },
  {
    slug: "gpu-health-validation",
    title: "InfiniBand + GPU Health Validation at Commissioning",
    org: "Core42",
    period: "2025 – present",
    stack: ["Bash", "InfiniBand", "NVIDIA GPU", "Ansible", "PXE / MAAS"],
    problem:
      "A single bad InfiniBand port or unhealthy GPU slipping into the cluster shows up later as failed training runs and hard-to-trace incidents. Hardware needed to be proven healthy before it ever joined the production pool.",
    architecture: String.raw`
   new node ─▶ PXE / MAAS commission
                    │
                    ▼
          ┌───────────────────────────┐
          │  health validation script  │
          │  • InfiniBand port status   │
          │  • GPU presence & health    │
          │  • link/bandwidth checks    │
          └─────────────┬─────────────┘
              pass ◀─────┴─────▶ fail
               │                  │
               ▼                  ▼
        join prod pool      quarantine + alert`,
    contributions: [
      "Built a custom script that validates InfiniBand ports and GPU node health at commissioning time.",
      "Integrated it into the provisioning flow as a gate before nodes join production.",
    ],
    impact: [
      "Bad hardware is caught at commission time, not in production.",
      "Smoother, more trustworthy GPU node onboarding.",
    ],
  },
];
