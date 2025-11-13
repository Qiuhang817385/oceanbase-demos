import React, { useState } from "react";
import { Star, Copy, ChevronDown, ChevronUp, Play } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SQLEditor } from "./components/SQLEditor";
import { ResultsTable } from "./components/ResultsTable";
import "./styles/globals.css";

// Mock 数据
const scenarios = [
  {
    key: "1",
    label: "场景 1",
    description: "这是一个简单的场景描述这是一个简单的场景描述",
    sql: `SELECT (
    COUNT(CASE WHEN event_type = 'purchase' THEN 1 ELSE NULL END) /
    COUNT(CASE WHEN event_type = 'view' THEN 1 ELSE NULL END)
) AS bought_rate
FROM events
WHERE event_time >= '2019-11-23 23:59:59'
    AND event_time <= '2019-11-30 23:59:59'`,
  },
  {
    key: "2",
    label: "场景 2",
    description: "这是场景2的描述信息",
    sql: `SELECT user_id, COUNT(*) as event_count
FROM events
WHERE event_date >= '2024-01-01'
GROUP BY user_id
ORDER BY event_count DESC
LIMIT 100`,
  },
  {
    key: "3",
    label: "场景 3",
    description: "这是场景3的描述信息",
    sql: `SELECT 
    DATE(event_time) as date,
    COUNT(DISTINCT user_id) as unique_users
FROM events
GROUP BY DATE(event_time)
ORDER BY date DESC`,
  },
];

// Mock 查询结果数据
const mockTableData = Array.from({ length: 6 }, (_, idx) => ({
  id: idx + 1,
  删除ID: "20241212",
  删除方法: "20241212",
  删除优化: "20241212",
  开始时间: "20241212",
  结束时间: "20241212",
  运行时长: "20241212",
  其他字段: "20241212",
}));

// Mock 执行时间数据
const mockChartData = [
  { name: "查询1", value: 120 },
  { name: "查询2", value: 95 },
  { name: "查询3", value: 150 },
  { name: "查询4", value: 80 },
  { name: "查询5", value: 110 },
];

export default function App() {
  const [activeScenario, setActiveScenario] = useState("1");
  const [queryMode, setQueryMode] = useState("basic");
  const [sqlCode, setSqlCode] = useState(scenarios[0].sql);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [resultTab, setResultTab] = useState("chart");
  const [isDatasetOpen, setIsDatasetOpen] = useState(false);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);

  const handleScenarioChange = (key: string) => {
    setActiveScenario(key);
    const scenario = scenarios.find((s) => s.key === key);
    if (scenario) {
      setSqlCode(scenario.sql);
    }
  };

  const handleExecuteSQL = async () => {
    setIsExecuting(true);
    // 模拟查询执行
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsExecuting(false);
    setHasResults(true);
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlCode);
  };

  const currentScenario = scenarios.find((s) => s.key === activeScenario);

  const queryModeButtons = [
    { value: "basic", label: "查询基本表" },
    { value: "materialized", label: "查询实时物化视图" },
    { value: "rewrite", label: "查询改写" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* 数据集介绍 */}
        <Collapsible open={isDatasetOpen} onOpenChange={setIsDatasetOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span>数据集介绍</span>
                  {isDatasetOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <p className="text-gray-600">
                  这里是数据集的详细介绍信息。可以包含数据来源、字段说明、更新频率等内容。
                </p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* 场景切换 */}
        <Card>
          <CardContent className="pt-6">
            <Tabs value={activeScenario} onValueChange={handleScenarioChange}>
              <TabsList className="w-full justify-start">
                {scenarios.map((scenario) => (
                  <TabsTrigger key={scenario.key} value={scenario.key}>
                    {scenario.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* 场景说明和 SQL 编辑器 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* 场景说明和执行按钮 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-blue-500" />
                <span className="text-gray-700">
                  场景说明：{currentScenario?.description}
                </span>
              </div>
              <Button
                onClick={handleExecuteSQL}
                disabled={isExecuting}
                className="min-w-[120px]"
              >
                {isExecuting ? (
                  <>
                    <Play className="h-4 w-4 mr-2 animate-pulse" />
                    执行中...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    执行 SQL
                  </>
                )}
              </Button>
            </div>

            {/* 查询模式选择 */}
            <div className="flex gap-2">
              {queryModeButtons.map((mode) => (
                <Button
                  key={mode.value}
                  variant={queryMode === mode.value ? "default" : "outline"}
                  onClick={() => setQueryMode(mode.value)}
                  size="sm"
                >
                  {mode.label}
                </Button>
              ))}
            </div>

            {/* SQL 编辑器 */}
            <div className="relative">
              <SQLEditor
                code={sqlCode}
                onChange={setSqlCode}
                expanded={isEditorExpanded}
              />
              <div className="flex items-center justify-between mt-2 px-3 py-2 bg-gray-50 border-t border-gray-200 rounded-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditorExpanded(!isEditorExpanded)}
                >
                  {isEditorExpanded ? "收起" : "展开"}{" "}
                  {isEditorExpanded ? "▲" : "▼"}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopySQL}>
                  <Copy className="h-4 w-4 mr-2" />
                  复制
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 执行结果 */}
        {hasResults && (
          <Card>
            <CardContent className="pt-6">
              <Tabs value={resultTab} onValueChange={setResultTab}>
                <TabsList>
                  <TabsTrigger value="chart">执行时间</TabsTrigger>
                  <TabsTrigger value="table">执行结果</TabsTrigger>
                </TabsList>

                <TabsContent value="chart" className="mt-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: "#3b82f6", r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="table" className="mt-4">
                  <div className="mb-3 text-right text-sm text-gray-500">
                    返回滚动到固定表头
                  </div>
                  <ResultsTable data={mockTableData} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
