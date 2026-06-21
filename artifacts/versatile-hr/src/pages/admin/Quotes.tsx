import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface QuoteRequest {
  id: number; companyName: string; contactName: string; email: string;
  phone: string | null; service: string; requirements: string | null;
  status: string; createdAt: string;
}

const STATUS_OPTIONS = ["new", "reviewing", "quoted", "closed"];

export default function AdminQuotes() {
  const { toast } = useToast();
  const [items, setItems] = useState<QuoteRequest[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const token = localStorage.getItem("versatile_token");
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const load = () => {
    setLoading(true);
    fetch("/api/quote-requests", { headers })
      .then(r => r.json()).then(data => setItems([...data].reverse()))
      .catch(() => toast({ title: "Failed to load", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/quote-requests/${id}`, { method: "PATCH", headers, body: JSON.stringify({ status }) });
    load();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = { new: "bg-blue-100 text-blue-800", reviewing: "bg-yellow-100 text-yellow-800", quoted: "bg-green-100 text-green-800", closed: "bg-muted text-muted-foreground" };
    return map[s] || "bg-muted text-muted-foreground";
  };

  const filtered = filter === "all" ? items : items.filter(i => i.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Quote Requests</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.filter(i => i.status === "new").length} new requests</p>
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
                : filtered.length === 0 ? <div className="p-6 text-center text-muted-foreground">No quote requests</div>
                : filtered.map(item => (
                  <button key={item.id} onClick={() => setSelected(item)}
                    className={`w-full text-left p-4 border-b last:border-0 hover:bg-muted/30 transition-colors ${selected?.id === item.id ? "bg-muted/40" : ""}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.companyName}</div>
                        <div className="text-xs text-muted-foreground">{item.contactName} · {item.email}</div>
                        <div className="text-xs text-accent font-medium mt-1">{item.service}</div>
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
                    <h2 className="font-bold text-lg">{selected.companyName}</h2>
                    <p className="text-sm text-muted-foreground">{selected.contactName} · {selected.email} {selected.phone ? `· ${selected.phone}` : ""}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(selected.status)}`}>{selected.status}</span>
                </div>
                <div className="border rounded-lg p-3 bg-accent/5">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Service Requested</p>
                  <p className="font-medium">{selected.service}</p>
                </div>
                {selected.requirements && (
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Requirements</p>
                    <p className="text-muted-foreground text-sm leading-relaxed border rounded-lg p-4 bg-muted/30">{selected.requirements}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{new Date(selected.createdAt).toLocaleString()}</p>
                <div className="flex gap-2 pt-2 flex-wrap">
                  {STATUS_OPTIONS.filter(s => s !== selected.status).map(s => (
                    <Button key={s} size="sm" variant="outline" onClick={() => updateStatus(selected.id, s)} className="capitalize">
                      Mark as {s}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card><CardContent className="py-16 text-center text-muted-foreground">Select a quote request to view details</CardContent></Card>
          )}
        </div>
      </div>
    </div>
  );
}
