import { NextResponse } from 'next/server';
import os from 'os';
import { execSync } from 'child_process';

export async function GET() {
  // Get current user info safely
  let currentUser;
  try {
    // Get current username using whoami command
    const username = execSync('whoami').toString().trim();
    // Get groups for the current user
    const groups = execSync(`groups ${username}`).toString().trim();
    
    currentUser = {
      username,
      groups,
      uid: os.userInfo().uid,
      gid: os.userInfo().gid,
      shell: os.userInfo().shell,
    };
  } catch (error) {
    currentUser = {
      error: 'Failed to fetch user information',
    };
  }

  const systemInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    release: os.release(),
    type: os.type(),
    arch: os.arch(),
    uptime: os.uptime(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpus: os.cpus(),
    networkInterfaces: os.networkInterfaces(),
    loadAverage: os.loadavg(),
    userInfo: currentUser,
    nodeVersion: process.version,
    serverTime: new Date().toISOString(),
  };

  return NextResponse.json({
    status: 'operational',
    environment: process.env.NODE_ENV,
    system: systemInfo
  });
} 