// api/proxy.js
import { NextResponse } from 'next/server';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export async function POST(request) {
  const body = await request.text(); // Get the raw body
  const url = new URL(request.url); // Get the request URL

  // Remove the `/api/proxy` prefix from the path
  const targetPath = url.pathname.replace(/^\/api\/proxy/, '');

  return new Promise((resolve, reject) => {
    proxy.web(
      request,
      NextResponse.json({}), // Placeholder response
      {
        target: 'http://49.12.193.156:5300', // Backend target URL
        changeOrigin: true,
        pathRewrite: { '^/api/proxy': '' }, // Rewrite path if necessary
        buffer: body, // Forward the raw body
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}