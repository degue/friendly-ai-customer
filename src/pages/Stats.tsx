
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Stats = () => {
  // Mock data for charts
  const weeklyData = [
    { name: "Seg", atendimentos: 12, resolvidos: 10 },
    { name: "Ter", atendimentos: 19, resolvidos: 15 },
    { name: "Qua", atendimentos: 15, resolvidos: 12 },
    { name: "Qui", atendimentos: 21, resolvidos: 18 },
    { name: "Sex", atendimentos: 25, resolvidos: 22 },
    { name: "Sáb", atendimentos: 17, resolvidos: 14 },
    { name: "Dom", atendimentos: 8, resolvidos: 7 },
  ];

  const monthlyData = [
    { name: "Jan", atendimentos: 120, resolvidos: 100 },
    { name: "Fev", atendimentos: 150, resolvidos: 130 },
    { name: "Mar", atendimentos: 180, resolvidos: 160 },
    { name: "Abr", atendimentos: 210, resolvidos: 190 },
    { name: "Mai", atendimentos: 250, resolvidos: 220 },
    { name: "Jun", atendimentos: 320, resolvidos: 290 },
  ];

  const pieData = [
    { name: "Resolvidos pela IA", value: 68 },
    { name: "Transferidos para agente", value: 32 },
  ];

  const COLORS = ["#00C49F", "#0088FE"];

  const timeMetrics = [
    { name: "Tempo médio de resposta", value: "45 seg" },
    { name: "Tempo médio até resolução", value: "4:30 min" },
    { name: "Taxa de resolução pela IA", value: "68%" },
    { name: "Satisfação do cliente", value: "4.7/5" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Estatísticas</h1>
          <p className="text-muted-foreground">
            Análise de desempenho do atendimento ao cliente
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {timeMetrics.map((metric) => (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Atendimentos da semana</CardTitle>
                <CardDescription>
                  Total de atendimentos e resoluções nos últimos 7 dias
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atendimentos" name="Total de atendimentos" fill="hsl(var(--primary))" />
                    <Bar dataKey="resolvidos" name="Resolvidos" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Evolução mensal</CardTitle>
                <CardDescription>
                  Desempenho ao longo dos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="atendimentos"
                      name="Total de atendimentos"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="resolvidos"
                      name="Resolvidos"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de atendimentos</CardTitle>
              <CardDescription>
                Proporção de atendimentos resolvidos automaticamente vs. transferidos
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Assuntos mais frequentes</CardTitle>
              <CardDescription>
                Principais tópicos de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span>Status do pedido</span>
                      <span className="text-sm font-medium">38%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "38%" }} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span>Problemas técnicos</span>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "24%" }} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span>Dúvidas sobre produto</span>
                      <span className="text-sm font-medium">19%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "19%" }} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span>Troca ou devolução</span>
                      <span className="text-sm font-medium">14%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "14%" }} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span>Outros</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "5%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Stats;
