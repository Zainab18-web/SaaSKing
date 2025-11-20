import { useState } from "react";
import { useAuth } from "@/lib/mock-auth";
import { extractBacklinks, BacklinkResult } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, ExternalLink, Loader2, TrendingUp, Link as LinkIcon, Hash } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BacklinkResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!user) {
    // In a real app we would redirect, but here we might need to wait for auth to load.
    // For now, if no user, just show nothing (auth provider handles redirect usually, but we added a manual check)
    // Actually let's just render, the layout handles some protection visually, but logically we should redirect.
    // Let's rely on Layout or AuthProvider to redirect if needed.
  }

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    try {
      const data = await extractBacklinks(url);
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your campaigns and extract new data.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">
             <Download className="mr-2 h-4 w-4" /> Export CSV
           </Button>
        </div>
      </div>

      {/* Search Section */}
      <Card className="border-primary/10 shadow-lg bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" /> New Extraction
          </CardTitle>
          <CardDescription>Enter a domain or URL to find its top backlinks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleExtract} className="flex flex-col md:flex-row gap-3">
            <Input 
              placeholder="https://example.com" 
              className="h-12 text-lg bg-background flex-1"
              value={url} 
              onChange={e => setUrl(e.target.value)} 
            />
            <Button size="lg" className="h-12 px-8" type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Extract"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Analyzing backlink profile...</p>
        </div>
      ) : hasSearched ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-4 md:grid-cols-3">
             <MetricCard title="Total Backlinks" value="1,240" icon={<LinkIcon className="h-4 w-4 text-blue-500" />} />
             <MetricCard title="Avg. Domain Authority" value="82" icon={<TrendingUp className="h-4 w-4 text-green-500" />} />
             <MetricCard title="Ranking Keywords" value="450+" icon={<Hash className="h-4 w-4 text-purple-500" />} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Backlink Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Source URL</TableHead>
                    <TableHead>Anchor Text</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Metrics</TableHead>
                    <TableHead>Context</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((row, i) => (
                    <TableRow key={i} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[250px] block text-primary hover:underline cursor-pointer">
                            {row.source_url}
                          </span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-50" />
                        </div>
                      </TableCell>
                      <TableCell>{row.anchor_text}</TableCell>
                      <TableCell>
                        <Badge variant={row.link_type === 'dofollow' ? 'default' : 'secondary'} className="capitalize">
                          {row.link_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 text-xs">
                          <span className="font-bold text-foreground">DA {row.domain_authority}</span>
                          <span className="text-muted-foreground">PA {row.page_authority}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {row.ranking_keywords?.map((k, j) => (
                            <span key={j} className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] dark:bg-blue-900/30 dark:text-blue-300">
                              {k}
                            </span>
                          ))}
                          {row.hashtags?.map((h, j) => (
                            <span key={j} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] dark:bg-gray-800 dark:text-gray-400">
                              {h}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-muted rounded-xl bg-muted/10">
          <div className="bg-muted/50 p-4 rounded-full inline-block mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No results yet</h3>
          <p className="text-muted-foreground">Enter a URL above to start analyzing backlinks.</p>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
