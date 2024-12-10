'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SystemInfo {
  hostname: string;
  platform: string;
  release: string;
  type: string;
  arch: string;
  uptime: number;
  totalMemory: number;
  freeMemory: number;
  cpus: any[];
  networkInterfaces: any;
  loadAverage: number[];
  userInfo: {
    username?: string;
    groups?: string;
    uid?: number;
    gid?: number;
    shell?: string;
    error?: string;
  };
  nodeVersion: string;
  serverTime: string;
}

interface StatusResponse {
  status: string;
  environment: string;
  system: SystemInfo;
}

export default function StatusPage() {
  const [statusData, setStatusData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        if (!response.ok) throw new Error('Failed to fetch status');
        const data = await response.json();
        setStatusData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();  }, []);

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">System Status</h1>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">System Status</h1>
        <Card className="p-6 bg-red-50">
          <p className="text-red-600">Error: {error}</p>
        </Card>
      </div>
    );
  }

  if (!statusData) return null;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">System Status</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Service Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  statusData.status === 'operational' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                {statusData.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Environment</p>
              <p className="font-medium">{statusData.environment}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Server Time</p>
              <p className="font-medium">{new Date(statusData.system.serverTime).toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Hostname</p>
              <p className="font-medium">{statusData.system.hostname}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Platform</p>
              <p className="font-medium">{statusData.system.platform}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">OS Release</p>
              <p className="font-medium">{statusData.system.release}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Architecture</p>
              <p className="font-medium">{statusData.system.arch}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Node Version</p>
              <p className="font-medium">{statusData.system.nodeVersion}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Uptime</p>
              <p className="font-medium">{formatUptime(statusData.system.uptime)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {statusData.system.userInfo.error ? (
              <div className="col-span-full">
                <p className="text-sm text-red-500">{statusData.system.userInfo.error}</p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{statusData.system.userInfo.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-medium">{statusData.system.userInfo.uid}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Group ID</p>
                  <p className="font-medium">{statusData.system.userInfo.gid}</p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm text-muted-foreground">Groups</p>
                  <p className="font-medium break-words">{statusData.system.userInfo.groups}</p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm text-muted-foreground">Shell</p>
                  <p className="font-medium">{statusData.system.userInfo.shell}</p>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Memory</p>
              <p className="font-medium">{formatBytes(statusData.system.totalMemory)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Free Memory</p>
              <p className="font-medium">{formatBytes(statusData.system.freeMemory)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CPU Cores</p>
              <p className="font-medium">{statusData.system.cpus.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Load Average (1m, 5m, 15m)</p>
              <p className="font-medium">
                {statusData.system.loadAverage.map(load => load.toFixed(2)).join(', ')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 