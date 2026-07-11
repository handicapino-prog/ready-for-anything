export function formatCurrency(value: number, currency = "NGN"): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date))
}

export function relativeTime(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(date)
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "open":
    case "active":
    case "accepted":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
    case "in_progress":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20"
    case "completed":
    case "won":
      return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
    case "cancelled":
    case "rejected":
    case "failed":
      return "bg-red-500/10 text-red-600 border-red-500/20"
    case "pending":
    case "under_review":
    case "disputed":
      return "bg-slate-500/10 text-slate-600 border-slate-500/20"
    default:
      return "bg-slate-500/10 text-slate-600 border-slate-500/20"
  }
}
