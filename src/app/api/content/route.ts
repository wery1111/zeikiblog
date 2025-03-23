import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

// 内容目录路径
const contentPath = join(process.cwd(), 'outstatic/content');

/**
 * GET 请求处理器 - 获取所有内容
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection') || 'posts';
    
    // 读取特定集合的内容目录
    const collectionPath = join(contentPath, collection);
    
    // 检查目录是否存在
    try {
      const files = readdirSync(collectionPath);
      
      // 读取并解析每个内容文件
      const contentItems = files.map(file => {
        const fileContent = readFileSync(join(collectionPath, file), 'utf8');
        try {
          return JSON.parse(fileContent);
        } catch (e) {
          return { error: 'Invalid JSON', file };
        }
      });
      
      return NextResponse.json({ items: contentItems });
    } catch (error) {
      // 集合目录不存在
      return NextResponse.json({ error: `Collection '${collection}' not found` }, { status: 404 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 