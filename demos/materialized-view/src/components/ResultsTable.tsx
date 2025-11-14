import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ScrollArea } from './ui/scroll-area';

interface ResultsTableProps {
  data: Array<{
    id: number;
    删除ID: string;
    删除方法: string;
    删除优化: string;
    开始时间: string;
    结束时间: string;
    运行时长: string;
    其他字段: string;
  }>;
}

export function ResultsTable({ data }: ResultsTableProps) {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>删除 ID</TableHead>
              <TableHead>删除方法</TableHead>
              <TableHead>删除优化</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>结束时间</TableHead>
              <TableHead>运行时长</TableHead>
              <TableHead>其他字段</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.删除ID}</TableCell>
                <TableCell>{row.删除方法}</TableCell>
                <TableCell>{row.删除优化}</TableCell>
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
  );
}
