import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface JobApplication {
  id: number; applicantName: string; email: string; phone: string | null;
  position: string; department: string | null; experience: string | null;
  coverLetter: string | null; status: string; createdAt: string;
}

const STATUS_OPTIONS = ["new", "shortlisted", "interviewed", "offered", "rejected"];

export default function AdminApplications() {
  const { toast } = useToast();
  const [items, setItems] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const token = localStorage.getItem("versatile_token");
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const load = () => {
    setLoading(true);
    fetch("/api/job-applications", { headers })
      .then(r => r.json()).then(data => setItems([...data].reverse()))
      .catch(() => toast({ title: "Failed to load", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/job-applications/${id}`, { method: "PATCH", headers, body: JSON.stringify({ status }) });
    load();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      shortlisted: "bg-purple-100 text-purple-800",
      interviewed: "bg-yellow-100 text-yellow-800",
      offered: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return map[s] || "bg-muted text-muted-foreground";
  };

  const filtered = filter === "all" ? items : items.filter(i => i.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.filter(i => i.status === "new").length} new, {items.length} total</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", ...STATUS_OPTIONS].map(s => (
            <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)} className="capitalize">
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {loading ? <div className="p-6 text-center text-muted-foreground">Loading...</div>
                : filtered.length === 0 ? <div className="p-6 text-center text-muted-foreground">No applications</div>
                : filtered.map(item => (
                  <button key={item.id} onClick={() => setSelected(item)}
                    className={`w-full text-left p-4 border-b last:border-0 hover:bg-muted/30 transition-colors ${selected?.id === item.id ? "bg-muted/40" : ""}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.applicantName}</div>
                        <div className="text-xs text-muted-foreground">{item.position}</div>
                        <div className="text-xs text-muted-foreground">{item.email}</div>
                      </div>
                      <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(item.status)}`}>{item.status}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">{new Date(item.createdAt).toLocaleDateString()}</div>
                  </button>
                ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-lg">{selected.applicantName}</h2>
                    <p className="text-sm text-muted-foreground">{selected.email} {selected.phone ? `· ${selected.phone}` : ""}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(selected.status)}`}>{selected.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-muted-foreground text-xs">Position</p><p className="font-medium">{selected.position}</p></div>
                  <div><p className="text-muted-foreground text-xs">Department</p><p className="font-medium">{selected.department || "—"}</p></div>
                  <div><p className="text-muted-foreground text-xs">Experience</p><p className="font-medium">{selected.experience || "—"}</p></div>
                  <div><p className="text-muted-foreground text-xs">Applied</p><p className="font-medium">{new Date(selected.createdAt).toLocaleDateString()}</p></div>
                </div>
                {selected.coverLetter && (
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Cover Letter</p>
                    <p className="text-muted-foreground text-sm leading-relaxed border rounded-lg p-4 bg-muted/30">{selected.coverLetter}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2 flex-wrap">
                  {STATUS_OPTIONS.filter(s => s !== selected.status).map(s => (
                    <Button key={s} size="sm" variant={s === "rejected" ? "destructive" : s === "offered" ? "default" : "outline"}
                      onClick={() => updateStatus(selected.id, s)} className="capitalize">
                      {s === "rejected" ? "Reject" : s === "offered" ? "Offer Job" : `Mark ${s}`}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card><CardContent className="py-16 text-center text-muted-foreground">Select an application to view details</CardContent></Card>
          )}
        </div>
      </div>
    </div>
  );
}
