import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ScrollArea } from './ui/scroll-area';

interface DataType {
  id: number;
  刷新ID: string;
  刷新方法: string;
  刷新优化: string;
  开始时间: string;
  结束时间: string;
  运行时长: string;
  其他字段: string;
}

const data: DataType[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  刷新ID: '20241212',
  刷新方法: '20241212',
  刷新优化: '20241212',
  开始时间: '20241212',
  结束时间: '20241212',
  运行时长: '20241212',
  其他字段: '20241212',
}));

export function ResultTable() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ 
        position: 'absolute',
        top: -40,
        right: 0,
        background: '#fffbe6',
        border: '1px solid #ffe58f',
        padding: '4px 12px',
        borderRadius: 4,
        fontSize: 12,
        color: '#595959',
        zIndex: 10,
      }}>
        返回滚动时间定表头
      </div>
      <div className="border rounded-md">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50 z-10">
              <TableRow>
                <TableHead className="w-[120px]">刷新 ID</TableHead>
                <TableHead className="w-[120px]">刷新方法</TableHead>
                <TableHead className="w-[120px]">刷新优化</TableHead>
                <TableHead className="w-[120px]">开始时间</TableHead>
                <TableHead className="w-[120px]">结束时间</TableHead>
                <TableHead className="w-[120px]">运行时长</TableHead>
                <TableHead className="w-[120px]">其他字段</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.刷新ID}</TableCell>
                  <TableCell>{row.刷新方法}</TableCell>
                  <TableCell>{row.刷新优化}</TableCell>
                  <TableCell>{row.开始时间}</TableCell>
                  <TableCell>{row.结束时间}</TableCell>
                  <TableCell>{row.运行时长}</TableCell>
                  <TableCell>{row.其他字段}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
