// Plain-text resume context fed to the AI as system grounding.
// Keep this in sync with frontend/src/data/resume.ts.

export const RESUME_CONTEXT = `
ANANT KUMAR — DevOps Engineer | AI Cloud Infrastructure
Location: Abu Dhabi, UAE
Email: tyagianant98@gmail.com | Phone: +971 54 713 5292
LinkedIn: linkedin.com/in/tyagianant98 | GitHub: github.com/tyagianant5292

SUMMARY
DevOps Engineer with 5+ years of experience building, automating, and operating
cloud-native and bare-metal infrastructure for large-scale AI/ML workloads.
Specialized in Kubernetes orchestration, GPU compute provisioning, and AI model
deployment (vLLM), with strong expertise in CI/CD, GitOps, infrastructure
automation, and high-performance cluster networking.

SKILLS
- Containers & Orchestration: Kubernetes, Docker, Helm, Rancher, Slurm
- CI/CD & GitOps: ArgoCD, GitHub Actions, GitLab CI, Jenkins, Git
- IaC & Automation: Ansible, MAAS, Bare-metal Provisioning (PXE)
- Cloud & Virtualization: Azure, AWS, OpenStack
- Networking & Gateways: Apache APISIX, Nginx, Load Balancing, Cisco NDFC, Keepalived (HA)
- Monitoring & Observability: Prometheus, Grafana
- Databases & Storage: PostgreSQL, MongoDB, MinIO
- Operating Systems: Linux (administration, tuning, security)

EXPERIENCE

ABOUT THE CORE42 AI CLOUD (Anant's current main work)
Core42 is one of the largest AI cloud providers. Anant helps build and operate their GPU cloud platform:
- Console: https://console.aicloud.core42.ai — a self-service portal where customers can purchase GPU compute on demand.
- Hardware: NVIDIA H100 GPU servers and AMD GPUs.
- On the platform, users can buy GPUs, spin up Kubernetes clusters, create Slurm clusters, and deploy their own AI/ML models on Kubernetes.
- Anant has personally deployed vLLM inference models on this platform and works on the bare-metal provisioning, GPU/InfiniBand commissioning, and networking that makes it reliable.

1) Netgroup.ai (Client: Core42) — DevOps Engineer — Abu Dhabi, UAE — Jul 2025 to Present
- Builds and maintains cloud-native and bare-metal infrastructure for large-scale AI/ML workloads across hybrid environments.
- Deploys and manages vLLM and other inference models on Kubernetes, optimizing GPU resource utilization for real-time and batch inference.
- Designed and maintains Machine-as-a-Service (MaaS) frameworks delivering on-demand GPU/CPU compute for AI training, inference, and research.
- Leads troubleshooting of bare-metal provisioning issues — PXE boot failures and node-commissioning network faults.
- Developed a custom script that validates InfiniBand port and GPU node health at commissioning time, before hardware enters production.
- Contributes to a unified internal AI Cloud Portal integrating Kubernetes, Slurm, GPU bare-metals, and model deployment services.
- Automates provisioning with Ansible; builds CI/CD and GitOps pipelines using GitHub Actions and ArgoCD.
- Configures high-speed cluster interconnects via Cisco NDFC; manages Apache APISIX for routing, load balancing, auth, and observability.
- Administers Slurm and Kubernetes clusters for scheduling, performance tuning, and multi-tenant isolation.

2) Coredge.io (Client: NIC) — DevOps Engineer — Noida, India — Jun 2024 to Jul 2025
- Ensured high availability and reliability through proactive monitoring and rapid incident response.
- Provided L3/L4 production support and root-cause analysis across services.
- Managed critical production deployments and configured highly available, scalable Kubernetes clusters.
- Deployed applications on Kubernetes using Helm charts and manifests.
- Designed a container-based infrastructure that improved resource efficiency.
- Automated end-to-end deployment for a major application, cutting deployment time.
- Implemented centralized logging and monitoring.

3) NEC Corporation India Pvt Ltd — DevOps Engineer — Noida, India — Jan 2022 to Mar 2024
- Built next-gen infrastructure on Nginx, Docker, Kubernetes, Rancher, and load balancing.
- Onboarded new microservices for dev teams.
- Created Kubernetes clusters using Rancher across on-premises, AWS, and Azure for the G-FIWARE platforms.
- Deployed all G-FIWARE components via manifests; implemented a local storage feature.
- Built an Nginx HA setup with Keepalived; enabled HA for WSO2 API-M and Identity Server.
- Configured Nginx with multiple HTTPS ports and SSL; integrated MinIO object storage.
- Implemented IoT Agent protocols: UL, LWM2M, OPC UA, LoRaWAN.

4) NGBPS Ltd — NOC & Cloud Engineer — Noida, India — Mar 2021 to Jan 2022
- Administered OpenStack-based private clouds; deployed OpenStack via Packstack.
- Configured networking and created Windows/Linux images.
- Managed data-center hardware: disks, RAID, LVM, file-systems.
- Provided L2 support and root-cause analysis; created cron jobs for batch processing.

PROJECTS
Company projects (one per role — note: "AI Cloud" is a single platform, not several projects):
- AI Cloud — the Core42 self-service GPU cloud (client Core42, company New Emerging Technology / NET). H100 + AMD GPUs, self-service Kubernetes/Slurm, vLLM model deployment.
- Service Cloud — managed container platform for NIC (National Informatics Centre), company Coredge. HA Kubernetes, Helm, centralized logging/monitoring.
- G-FIWARE — multi-cloud smart platform at NEC (Rancher K8s on on-prem/AWS/Azure, Nginx HA + Keepalived, WSO2 HA, MinIO, IoT agent protocols).
- Data Centre — OpenStack private cloud at NGBPS (Packstack, networking, DC hardware: RAID/LVM).

Personal projects:
- K8s-IAM (k8s-iam-tool): a Kubernetes access-management tool in Go + client-go (Gin API, SQLite, runs in-cluster). Manages users/teams and per-namespace kubeconfigs, RBAC bindings, JWT auth, temporary namespace-access requests, audit/anomaly alerts, cluster details, and webhooks.
- This portfolio: an interactive terminal site (Next.js) with a Groq-powered AI chat, deployable on Vercel and on Kubernetes via Helm, with CI/CD to Docker Hub.

EDUCATION
- B.Tech in Computer Science — Uttarakhand Technical University, Dehradun — 2015 to 2019
- Senior Secondary (Class XII) — U.P. Board, Saharanpur — 2014 to 2015

AWARDS (all at NEC)
- Individual Oscar Award — JFM Quarter 2022-23
- Team Oscar Award — JAS Quarter 2022-23
- Quarterly Award Winner — JFM 2022-23
- Team Spot Award — 2023
- Monthly Spot Award — May 2022

LANGUAGES: Hindi (Native), English (Professional)
`.trim();
